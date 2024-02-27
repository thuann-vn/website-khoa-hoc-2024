<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterCourse extends Model {
    protected $table = 'master_courses';
    protected $guarded = [];

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'master_course_has_course', 'master_course_id', 'course_id');
    }
}
