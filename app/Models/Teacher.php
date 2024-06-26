<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Jeffgreco13\FilamentBreezy\Traits\TwoFactorAuthenticatable;
use Laravel\Sanctum\HasApiTokens;

class Teacher extends User{
    protected $table =  'users';
    protected $appends = ['course_count', 'student_count'];
    protected static function boot(): void
    {

        parent::boot();
        static::addGlobalScope('type', function (Builder $builder) {
            $builder->where('type', 'teacher');
        });
    }

    public function courses(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Course::class, 'teacher_id');
    }

    public function getCourseCountAttribute(): int
    {
        return $this->courses->count();
    }

    public function getStudentCountAttribute(): int
    {
        //Count all the students in the courses
        $countIds = $this->courses->pluck('id');
        $students = \App\Models\UserCourse::whereIn('course_id', $countIds)->get();
        return $students->count();
    }
}
