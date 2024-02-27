<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model {
    protected $table = 'courses';

    protected $fillable = [
        'course_category_id',
        'teacher_id',
        'name',
        'slug',
        'description',
        'image',
        'is_active',
        'duration',
        'discount',
        'price',
        'one_on_one_price',
        'position',
        'created_by',
        'updated_by'
    ];

    public function teacher(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CourseCategory::class, 'course_category_id');
    }

    public function sections(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CourseSection::class, 'course_id');
    }

    public function masterCourses(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(MasterCourse::class, 'master_course_has_course', 'course_id', 'master_course_id');
    }
}
