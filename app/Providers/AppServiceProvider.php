<?php

namespace App\Providers;

use App\Models\CourseLesson;
use App\Models\Order;
use App\Observers\CourseLessonObserver;
use App\Observers\OrderObserver;
use App\Settings\SiteSettings;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\SEOTools;
use Filament\Support\Facades\FilamentView;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        FilamentView::registerRenderHook(
            'panels::head.start',
            fn (): string => '<meta name="robots" content="noindex,nofollow">'
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Order::observe(OrderObserver::class);
        CourseLesson::observe(CourseLessonObserver::class);

        $appSettings = app(SiteSettings::class);
        SEOTools::setTitle($appSettings->seo_title);
        SEOTools::setDescription($appSettings->seo_description);
        SEOMeta::setKeywords($appSettings->seo_keywords);
        SEOTools::opengraph()->setUrl(url()->current());
        SEOTools::setCanonical(url()->current());
        SEOTools::opengraph()->addProperty('type', 'website');
    }
}
