<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostCategory;
use App\Models\RecruitmentPost;
use App\Settings\SiteSettings;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;

class RecruitmentController extends Controller
{

    public function index()
    {
        $query = RecruitmentPost::orderBy('created_at', 'desc');
        $posts = $query->paginate(9);

        SEOTools::setTitle('Việc Làm Kim Hoàn');
        SEOTools::setDescription($category->seo_description ?? 'Danh sách các việc làm mới nhất trong ngành kim hoàn - trang sức.');

        return Inertia::render('Recruitment/Index', compact('posts'));
    }

    public function show($slug)
    {
        $post = RecruitmentPost::whereSlug($slug)->firstOrFail();
        $relatedPosts = RecruitmentPost::where('id', '!=', $post->id)->orderByDesc('created_at')->limit(3)->get();
        $post->content = str_replace('src="/storage/', 'src="' . asset('storage/'), $post->content);

        //Site settings
        $appSettings = app(SiteSettings::class);
        SEOTools::setTitle($post->seo_title ?? $post->title);
        SEOTools::setDescription($post->seo_description ?? '');
        SEOTools::opengraph()->setUrl(url()->current());
        SEOTools::setCanonical(url()->current());
        SEOMeta::setKeywords($post->seo_keywords ?? $appSettings->seo_keywords);
        SEOMeta::setTitle($course->seo_title ?? $post->title);
        SEOMeta::setDescription($post->seo_description ?? '');
        SEOTools::addImages([asset('/storage/' .  $post->image)]);

        return Inertia::render('Recruitment/Detail', compact('post', 'relatedPosts'));
    }
}
