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
        $course = \App\Models\Course::with(['teacher','category', 'sections', 'sections.chapters', 'sections.chapters.lessons', 'sections.lessons'])->where('slug', $slug)->first();
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
                $userCourses = \App\Models\UserCourse::where('user_id', auth()->user()->id)->where('course_id', $lesson->chapter->section->course_id)->first();
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
}
