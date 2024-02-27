<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');


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

Route::get('/video/{playlist}', function ($playlist) {
    return \ProtoneMedia\LaravelFFMpeg\Support\FFMpeg::
        dynamicHLSPlaylist('public')
        ->fromDisk('public')
        ->open($playlist)
        ->setMediaUrlResolver(function ($mediaFilename) {
            return Storage::disk('public')->url($mediaFilename);
        })
        ->setPlaylistUrlResolver(function ($playlistFilename) {
            return route('video.playlist', ['playlist' => $playlistFilename]);
        });
})->name('video.playlist');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/article/{post:slug}', PostShow::class)->name('post.show');

require __DIR__.'/auth.php';
