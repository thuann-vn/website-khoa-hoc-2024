<?php

namespace App\Observers;

use App\Jobs\ProcessVideo;
use App\Models\CourseLesson;
use App\Models\CourseLessonVideo;

class CourseLessonObserver
{
    /**
     * Handle the CourseLesson "created" event.
     */
    public function created(CourseLesson $courseLesson): void
    {
        //
        if(!empty($data['video_url'])){
            $lessonVideo = new CourseLessonVideo([
                'course_lesson_id' => $courseLesson->id,
                'status' => 0,
                'progress' => 0,
                'video_url' => $data['video_url'],
                'started_at' => null,
                'completed_at' => null
            ]);
            $lessonVideo->save();
            dispatch(new ProcessVideo($lessonVideo));
        }
    }

    /**
     * Handle the CourseLesson "updated" event.
     */
    public function updated(CourseLesson $courseLesson): void
    {
        //
    }

    /**
     * Handle the CourseLesson "deleted" event.
     */
    public function deleted(CourseLesson $courseLesson): void
    {
        //
    }

    /**
     * Handle the CourseLesson "restored" event.
     */
    public function restored(CourseLesson $courseLesson): void
    {
        //
    }

    /**
     * Handle the CourseLesson "force deleted" event.
     */
    public function forceDeleted(CourseLesson $courseLesson): void
    {
        //
    }
}
