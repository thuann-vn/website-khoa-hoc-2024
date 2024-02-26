<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model {
    protected $table = 'courses';

    protected $fillable = [
        'course_category_id',
        'name',
        'slug',
        'description',
        'image',
        'is_active',
        'duration',
        'discount',
        'price',
        'created_by',
        'updated_by'
    ];

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CourseCategory::class, 'course_category_id');
    }

    public function sections(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CourseSection::class, 'course_id');
    }
}
