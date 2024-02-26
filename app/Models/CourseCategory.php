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
}
