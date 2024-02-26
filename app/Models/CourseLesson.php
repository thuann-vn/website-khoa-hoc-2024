<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseLesson extends Model {
    protected $table = 'course_lessons';

    protected $guarded = [];
    public function chapter(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CourseChapter::class, 'course_chapter_id');
    }
}
