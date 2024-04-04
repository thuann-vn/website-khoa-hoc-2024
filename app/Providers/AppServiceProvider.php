<?php

namespace App\Providers;

use App\Models\CourseLesson;
use App\Models\Order;
use App\Observers\CourseLessonObserver;
use App\Observers\OrderObserver;
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
    }
}
