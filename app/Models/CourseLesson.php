<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseLesson extends Model {
    protected $table = 'course_lessons';

    protected $guarded = [];

    protected $casts = [
        'attachments' => 'array'
    ];

    protected $hidden = ['created_at', 'updated_at'];
    public function chapter(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CourseChapter::class, 'course_chapter_id');
    }

    public function section(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CourseSection::class, 'course_section_id');
    }

    public function course(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function exercise(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Exercise::class, 'lesson_id')->where('user_id', auth()->user()->id);
    }
}
