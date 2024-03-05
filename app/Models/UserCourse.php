<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserCourse extends Pivot
{
    protected $table = 'user_has_courses';
    //
    public function courseSection(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CourseSection::class, 'course_section_id');
    }
}

