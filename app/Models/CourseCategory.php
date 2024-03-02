<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseCategory extends Model {
    protected $table = 'course_categories';

    protected $fillable = [
        'name',
        'slug',
        'image',
        'status',
        'created_by',
        'updated_by'
    ];

    protected $appends = ['course_count'];

    public function Courses()
    {
        return $this->hasMany(Course::class, 'course_category_id', 'id');
    }
    public function getCourseCountAttribute()
    {
        return $this->Courses()->count();
    }
}
