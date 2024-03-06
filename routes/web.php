<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Livewire\Post\Show as PostShow;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/danh-sach-khoa-hoc', [App\Http\Controllers\CourseController::class, 'index'])->name('courses');
Route::get('/danh-sach-khoa-hoc/{slug}', [App\Http\Controllers\CourseController::class, 'index'])->name('courses-category');
Route::get('/khoa-hoc/{slug}', [App\Http\Controllers\CourseController::class, 'detail'])->name('courses-detail');
Route::get('/khoa-hoc/{slug}/dang-ky', [App\Http\Controllers\CourseController::class, 'checkout'])->name('courses-checkout');
Route::post('/khoa-hoc/{slug}/dang-ky', [App\Http\Controllers\CourseController::class, 'checkoutStore'])->name('courses-checkout-store');
Route::get('/khoa-hoc/{slug}/dang-ky-thanh-cong', [App\Http\Controllers\CourseController::class, 'checkoutSuccess'])->name('courses-checkout-success');

Route::get('/watch', function () {
    return \ProtoneMedia\LaravelFFMpeg\Support\FFMpeg::dynamicHLSPlaylist('videos')
        ->open('01HQNQ6VGJ5PXPD0KK0B556T0P_0_250.m3u8')
        ->setMediaUrlResolver(function ($segment) {
            return Storage::disk('public')->url($segment);
        });
    return Storage::disk('videos')->response(
        '01HQNQ6VGJ5PXPD0KK0B556T0P_0_250.m3u8',
        "01HQNQ6VGJ5PXPD0KK0B556T0P_0_250.m3u8",
        [
            'Content-Type' => 'application/x-mpegURL',
            'isHls' => true
        ]
    );
})->name('watch');

Route::get('/video/secret/{key}', function ($key) {
    return Storage::disk('videos')->download($key);
})->name('video.key');

Route::get('/video/{id}', [\App\Http\Controllers\LearningController::class, 'learnVideo'])
    ->name('video.playlist');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Account/Dashboard');
    })->name('dashboard');
    Route::get('/enrolled-course', function () {
        $courses = auth()->user()->enrolledCourses;
        return Inertia::render('Account/Courses', compact('courses'));
    })->name('enrolled-course');

    Route::get('/enrolled-course/{slug}', [\App\Http\Controllers\LearningController::class, 'index'])->name('enrolled-course.learn');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/article/{post:slug}', PostShow::class)->name('post.show');

require __DIR__.'/auth.php';
