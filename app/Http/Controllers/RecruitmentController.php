<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostCategory;
use App\Models\RecruitmentPost;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;

class RecruitmentController extends Controller
{

    public function index()
    {
        $query = RecruitmentPost::orderBy('created_at', 'desc');
        $posts = $query->paginate(9);
        return Inertia::render('Recruitment/Index', compact('posts'));
    }

    public function show($slug)
    {
        $post = RecruitmentPost::whereSlug($slug)->firstOrFail();
        $relatedPosts = RecruitmentPost::where('id', '!=', $post->id)->orderByDesc('created_at')->limit(3)->get();
        return Inertia::render('Recruitment/Detail', compact('post', 'relatedPosts'));
    }
}
