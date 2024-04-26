<?php

namespace App\Models;

use App\Filament\Resources\PostResource;
use Awcodes\Curator\Models\Media;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'slug',
        'content',
        'image_id',
        'image',
        'user_id',
        'is_published',
        'published_at',
        'seo_title',
        'seo_description',
        'seo_keywords'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
        'content' => 'string',
    ];

    protected $appends = ['excerpt'];

    /**
     * Get the user that owns the post.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Retrieve the post URL.
     *
     * @return string
     */
    public function getUrlAttribute()
    {
        return route('post.show', $this);
    }

    /**
     * Retrieve the post edit URL.
     *
     * @return string
     */
    public function getEditUrlAttribute()
    {
        return PostResource::getUrl('edit', ['record' => $this]);
    }


    /**
     * Retrieve the post excerpt.
     *
     * @return string
     */
    public function getExcerptAttribute()
    {
        return Str::limit(strip_tags($this->content), 160);
    }

    /**
     * Retrieve the published posts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    /**
     * Retrieve the draft posts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeDrafts($query)
    {
        return $query->where('is_published', false);
    }

    public function categories(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(PostCategory::class, 'post_has_categories', 'post_id', 'post_category_id');
    }
}
