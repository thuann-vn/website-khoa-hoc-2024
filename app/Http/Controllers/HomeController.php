<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $categories = \App\Models\CourseCategory::whereIsActive(true)->get();
        $courses = \App\Models\Course::with(['teacher','category'])->whereIsActive(true)->get();
        $masterCourses = \App\Models\MasterCourse::with(['courses'])->get();
        $featuredPosts = \App\Models\Post::whereIsPublished(true)->orderByDesc('published_at')->limit(3)->get();
        return Inertia::render('Welcome', [
            'categories' => $categories,
            'courses' => $courses,
            'masterCourses' => $masterCourses,
             'featuredPosts' => $featuredPosts
        ]);
    }
}
