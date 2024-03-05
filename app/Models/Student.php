<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;

class Student extends User{
    protected $table =  'users';
    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope('type', function (Builder $builder) {
            $builder->where('type', 'student');
        });
    }

    public function courses(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'user_has_courses', 'user_id', 'course_id')
            ->withPivot('course_section_id')
            ->using(UserCourse::class);
    }
}
