<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model {
    protected $table = 'exercises';

    protected $guarded = [

    ];

    protected $casts = [
        'attachments' => 'array',
        'completed_attachments' => 'array',
        'fixed_attachments' => 'array'
    ];

    public function lesson(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CourseLesson::class, 'lesson_id');
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Student::class, 'user_id');
    }

    public function course(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id');
    }
}
