<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseLessonProgress extends Model
{
    use HasFactory;
    protected $table = 'course_lesson_progress';

    protected $fillable = [
        'user_id',
        'course_id',
        'course_lesson_id',
        'progress',
        'status'
    ];
}
