<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostCategory;
use App\Settings\SiteSettings;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;

class BlogController extends Controller
{

    public function index()
    {
        $categorySlug = request()->category;
        $query = Post::with('categories')->where('published_at', '<=', date('Y-m-d'))->orderBy('published_at', 'desc');
        $category = null;
        if($categorySlug) {
            $category = PostCategory::whereSlug($categorySlug)->firstOrFail();
            $query->whereHas('categories', function ($query) use ($categorySlug) {
                $query->whereSlug($categorySlug);
            });
        }

        $featuredPosts =$query->clone()->where('is_featured', true)->limit(3)->get();
        if($featuredPosts->count()){
            $query->whereNotIn('id', $featuredPosts->pluck('id')->toArray());
        }
        $posts = $query->paginate(9);

        SEOTools::setTitle('Kiến thức');
        SEOTools::setDescription($category->seo_description ?? 'Tổng hợp kiến thức về thiết kế trang sức và chia sẻ kinh nghiệm từ các chuyên gia.');

        return Inertia::render('Blog/Index', compact('posts', 'category', 'featuredPosts'));
    }

    public function show($slug)
    {
        $post = Post::with('categories')->whereSlug($slug)->firstOrFail();
        $relatedPosts = Post::whereHas('categories', function (Builder $query) use ($post){
            $query->whereIn('post_categories.id', $post->categories->pluck('id')->toArray());
        })->where('id', '!=', $post->id)->orderByDesc('created_at')->limit(3)->get();
        $categories = PostCategory::withCount('posts')->orderBy('posts_count', 'desc')->limit(10)->get();


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

        return Inertia::render('Blog/Detail', compact('post', 'relatedPosts', 'categories'));
    }
}
