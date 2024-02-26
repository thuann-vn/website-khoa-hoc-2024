<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseChapter extends Model {
    protected $table = 'course_chapters';
    protected $guarded = [];

    public function section(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CourseSection::class, 'course_section_id');
    }

    public function lessons(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CourseLesson::class, 'course_chapter_id');
    }
}
