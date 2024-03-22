<?php

use App\Http\Controllers\ProfileController;
use App\Models\UserCourse;
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

Route::get('/master-class/{slug}', [App\Http\Controllers\CourseController::class, 'masterCourseDetail'])->name('master-class-detail');
Route::get('/master-class/{slug}/dang-ky', [App\Http\Controllers\CourseController::class, 'masterCheckout'])->name('master-class-checkout');
Route::post('/master-class/{slug}/dang-ky', [App\Http\Controllers\CourseController::class, 'masterCheckoutStore'])->name('master-class-checkout-store');
Route::get('/master-class/{slug}/dang-ky-thanh-cong', [App\Http\Controllers\CourseController::class, 'masterCheckoutSuccess'])->name('master-class-checkout-success');

Route::get('/teacher/{id}', [App\Http\Controllers\CourseController::class, 'teacherDetail'])->name('teacher-detail');

Route::group(['prefix' => 'blog'], function () {
    Route::get('/', [\App\Http\Controllers\BlogController::class, 'index'])->name('blog');
    Route::get('/category/{category}', [\App\Http\Controllers\BlogController::class, 'index'])->name('blog.category');
    Route::get('/tag/{tag}', [\App\Http\Controllers\BlogController::class, 'index'])->name('blog.tag');
    Route::get('/{slug}', [\App\Http\Controllers\BlogController::class, 'show'])->name('blog.detail');
});

Route::get('/video/{id}', [\App\Http\Controllers\LearningController::class, 'learnVideo'])
    ->name('video.playlist');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        $enrolledCourses = auth()->user()->enrolledCourses->count();
        $activeCourses = UserCourse::where('user_id', auth()->id())->where('status', 'active')->count();
        $completedCourses = UserCourse::where('user_id', auth()->id())->where('status', 'completed')->count();
        return Inertia::render('Account/Dashboard', [
            'data' => compact('enrolledCourses', 'activeCourses', 'completedCourses')
        ]);
    })->name('dashboard');
    Route::get('/enrolled-course', function () {
        $courses = auth()->user()->enrolledCourses;
        return Inertia::render('Account/Courses', compact('courses'));
    })->name('enrolled-course');

    Route::get('/enrolled-course/{slug}', [\App\Http\Controllers\LearningController::class, 'index'])->name('enrolled-course.learn');
    Route::post('/update-progress', [\App\Http\Controllers\LearningController::class, 'updateLearningProgress'])->name('update-progress');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/article/{post:slug}', PostShow::class)->name('post.show');

require __DIR__.'/auth.php';
