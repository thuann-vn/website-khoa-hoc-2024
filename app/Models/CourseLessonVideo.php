<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseLessonVideo extends Model {
    protected $table = 'course_lesson_videos';

    protected $guarded = [];
    public function courseLesson(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CourseLesson::class, 'course_lesson_id');
    }
}
