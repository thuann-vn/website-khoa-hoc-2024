<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MasterCourse extends Model {
    use SoftDeletes;
    protected $table = 'master_courses';
    protected $guarded = [];

    protected $appends = ['course_count', 'course_duration_sum'];


    public function courses()
    {
        return $this->belongsToMany(Course::class, 'master_course_has_course', 'master_course_id', 'course_id');
    }

    public function getCourseCountAttribute()
    {
        return $this->courses->count();
    }

    public function getCourseDurationSumAttribute()
    {
        //Count all the lessons in the course
        $sum = 0;
        foreach ($this->courses as $course) {
            $sum += $course->course_sum_duration;
        }
        return $sum;
    }

    public function getOldPriceAttribute()
    {
        return $this->courses->sum('price');
    }
}
