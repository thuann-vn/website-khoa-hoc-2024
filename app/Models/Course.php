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
        'old_price',
        'old_one_on_one_price',
        'sale_start',
        'sale_end',
        'position',
        'created_by',
        'updated_by'
    ];

    protected $casts = [
        'sale_start' => 'date',
        'sale_end' => 'date'
    ];

    protected $appends = ['course_lesson_count', 'course_duration_sum', 'progress', 'is_sale'];

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
        return $this->hasMany(CourseSection::class, 'course_id')->orderBy('position');
    }

    public function masterCourses(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(MasterCourse::class, 'master_course_has_course', 'course_id', 'master_course_id');
    }

    public function courseSections(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CourseSection::class, 'course_id');
    }

    public function getCourseLessonCountAttribute()
    {
        //Count all the lessons in the course
        return $this->lessons()->count();
    }

    public function getCourseDurationSumAttribute()
    {
        //Count all the lessons in the course
        return round($this->lessons->map(function ($lesson) {
                return $lesson->duration ?? 0;
            })->sum() / 3600, 0);
    }

    public function students(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Student::class, 'user_has_courses', 'course_id', 'user_id')->withPivot('course_section_id');
    }

    public function getProgressAttribute()
    {
        //Check if logged in user is a student
        if(auth()->check()){
            if(auth()->user()->enrolledCourses()->where('course_id', $this->id)->exists()){
                $course = auth()->user()->enrolledCourses()->where('course_id', $this->id)->first();
                $total_lessons = $this->course_lesson_count;
                $completed_lessons = CourseLessonProgress::where('user_id', auth()->user()->id)
                    ->where('course_id', $this->id)
                    ->where('status', 'completed')
                    ->count();
                return $total_lessons ? round(($completed_lessons / $total_lessons) * 100, 0):  0;
            }
        }
        return false;
    }

    public function lessons(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CourseLesson::class, 'course_id')->orderBy('position');
    }

    public function getIsSaleAttribute()
    {
        return $this->sale_start && $this->sale_end && now()->between($this->sale_start, $this->sale_end);
    }
}
