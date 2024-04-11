<?php

namespace App\Http\Controllers;

use App\Settings\SiteSettings;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\SEOTools;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $categories = \App\Models\CourseCategory::whereIsActive(true)->get();
        $courses = \App\Models\Course::with(['teacher','category'])->whereIsActive(true)->get();
        $masterCourses = \App\Models\MasterCourse::with(['courses'])->get();
        $featuredPosts = \App\Models\Post::whereIsPublished(true)->orderByDesc('published_at')->limit(3)->get();

        //Site settings
        $appSettings = app(SiteSettings::class);
        SEOTools::setTitle('Trang chủ');
        SEOTools::setDescription($appSettings->seo_description);
        SEOMeta::setKeywords($appSettings->seo_keywords);
        SEOTools::opengraph()->setUrl(url()->current());
        SEOTools::setCanonical(url()->current());
        SEOTools::opengraph()->addProperty('type', 'website');

        return Inertia::render('Welcome', [
            'categories' => $categories,
            'courses' => $courses,
            'masterCourses' => $masterCourses,
             'featuredPosts' => $featuredPosts
        ]);
    }
}
