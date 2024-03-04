<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $slug = $request->slug;
        if($slug){
            $category = \App\Models\CourseCategory::whereSlug($slug)->first();
            $courses = \App\Models\Course::with(['teacher','category'])->whereCourseCategoryId($category->id)->whereIsActive(true)->get();
            return Inertia::render('Courses/Index', [
                'category' => $category,
                'courses' => $courses
            ]);
        }

        $courses = \App\Models\Course::with(['teacher','category'])->whereIsActive(true)->get();
        return Inertia::render('Courses/Index', [
            'courses' => $courses
        ]);
    }

    public function detail(Request $request)
    {
        $slug = $request->slug;
        $course = \App\Models\Course::with(['teacher','category', 'sections', 'sections.chapters', 'sections.chapters.lessons'])->whereSlug($slug)->first();
        return Inertia::render('Courses/Detail', [
            'course' => $course
        ]);
    }
}
