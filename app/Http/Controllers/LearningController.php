<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Iman\Streamer\VideoStreamer;
use Inertia\Inertia;

class LearningController extends Controller
{
    public function index()
    {
        $slug = request()->slug;
        $course = \App\Models\Course::with(['teacher','category', 'sections', 'sections.chapters', 'lessons', 'sections.chapters.lessons', 'sections.lessons', 'sections.chapters.exercise', 'sections.lessons.exercise'])->where('slug', $slug)->first();
        //Check if user is enrolled in the course
        $userCourse = \App\Models\UserCourse::where('user_id', auth()->user()->id)->where('course_id', $course->id)->first();

        //Learning progress
        $learningProgress = [];
        if(!empty($userCourse)){
            $userProgress = \App\Models\CourseLessonProgress::where('user_id', auth()->user()->id)
                ->where('course_id', $course->id)
                ->get();
            foreach ($userProgress as $progress){
                $learningProgress[$progress->course_lesson_id] = $progress;
            }
        }

        if(!empty($userCourse)){
            return Inertia::render('Account/CourseLearning', compact('course', 'userCourse', 'learningProgress'));
        }else{
            return redirect()->route('enrolled-course');
        }
    }

    public function learnVideo(Request $request)
    {
        $id = $request->id;
        $filename = $request->filename;

        //Get lesson
        $lesson = \App\Models\CourseLesson::with(['chapter', 'chapter.section', 'chapter.section.course'])->findOrFail($id);
        if(!$lesson->is_trial){
            //Check if user have access to the lesson
            if(auth()->check()){
                $userCourses = \App\Models\UserCourse::where('user_id', auth()->user()->id)
                    ->where('course_id', $lesson->course_id)->first();
                if(empty($userCourses)){
                    return redirect()->route('enrolled-course');
                }
            }else{
                return redirect()->route('login');
            }
        }
        $video = \App\Models\CourseLessonVideo::where('course_lesson_id', $id)->first();
        return \ProtoneMedia\LaravelFFMpeg\Support\FFMpeg::
        dynamicHLSPlaylist('public')
            ->fromDisk('public')
            ->open(!empty($filename) ? 'lesson_' . $video->courseLesson->id . '/' . $filename : $video->video_url)
            ->setMediaUrlResolver(function ($mediaFilename) use ($video, $request){
                return Storage::disk('public')->url('lesson_' . $video->courseLesson->id . '/' . $mediaFilename);
            })
            ->setPlaylistUrlResolver(function ($playlistFilename) use ($id){
                return route('video.playlist', ['id' => $id, 'filename' => $playlistFilename]);
            });
    }

    public function updateLearningProgress(Request $request)
    {
        $user_id = auth()->user()->id;
        $course_id = $request->course_id;
        $course_lesson_id = $request->course_lesson_id;
        $progress = $request->progress;
        $status = $request->status;
        $lessonProgress = \App\Models\CourseLessonProgress::where('user_id', $user_id)->where('course_lesson_id', $course_lesson_id)->first();
        if(empty($lessonProgress)){
            $lessonProgress = new \App\Models\CourseLessonProgress();
            $lessonProgress->course_id = $course_id;
            $lessonProgress->user_id = $user_id;
            $lessonProgress->course_lesson_id = $course_lesson_id;
        }
        $lessonProgress->progress = $progress;
        $lessonProgress->status = $status;
        $lessonProgress->save();
        return response()->json(['message' => 'Progress updated successfully']);
    }

    public function uploadExercise(Request $request)
    {
        //Validate
        $request->validate([
            'id' => 'required',
            'file' => 'required|max:10000',
        ]);
        $id = $request->id;
        $user_id = auth()->user()->id;
        $lesson = \App\Models\CourseLesson::findOrFail($id);

        $savePath = 'exercises/' . $user_id . '_' . $lesson->course_id . '_' . $id . '/completed';
        $file = $request->file('file');
        $filename = $file->getClientOriginalName();
        $file->storeAs($savePath, $filename, 'public');

        //Save to database
        $exercise = \App\Models\Exercise::where('lesson_id', $id)->where('user_id', $user_id)->first();
        if(!empty($exercise)){
            if(empty($exercise->completed_attachments)){
                $exercise->completed_attachments = [];
            }
            $newAttachments = $exercise->completed_attachments;
            $newAttachments[] = $savePath . '/' . $filename;
            $exercise->completed_attachments = $newAttachments;
            $exercise->save();
        }
        return response()->json(['message' => 'Exercise uploaded successfully']);
    }

    public function deleteExercise(Request $request)
    {
        $id = $request->id;
        $user_id = auth()->user()->id;
        $exercise = \App\Models\Exercise::where('lesson_id', $id)->where('user_id', $user_id)->first();
        $filename = str_replace('storage/', '', $request->filename);
        $exercise->completed_attachments = array_diff($exercise->completed_attachments, [$filename]);
        $exercise->save();
        Storage::disk('public')->delete($filename);
        return response()->json(['message' => 'Exercise deleted successfully']);
    }
}
