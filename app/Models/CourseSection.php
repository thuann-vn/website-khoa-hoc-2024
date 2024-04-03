<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseSection extends Model {
    protected $table = 'course_sections';

    protected $fillable = [
        'course_id',
        'name',
        'slug',
        'description',
        'is_active',
        'position',
        'discount',
        'duration',
        'image_url',
        'locked',
        'price',
        'video_url',
        'created_by',
        'updated_by'
    ];

    public function course(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function chapters(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CourseChapter::class, 'course_section_id');
    }

    public function lessons(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CourseLesson::class, 'course_section_id');
    }
}
