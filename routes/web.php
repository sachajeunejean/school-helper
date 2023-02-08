<?php

use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\LikeFollowController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

/*Route::get('/', function () {
    return Inertia::render('Home/Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');*/

/*Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');*/

date_default_timezone_set('Europe/Brussels');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/feedbacks/new', [FeedbackController::class, 'create']);
    Route::post('/dashboard/feedbacks/new', [FeedbackController::class, 'store']);
    Route::delete('/dashboard/feedbacks/delete/{id}', [FeedbackController::class, 'destroy']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/courses', [CourseController::class, 'index'])->name('courses');
    Route::get('/courses/new', [CourseController::class, 'create']);
    Route::post('/courses/new', [CourseController::class, 'store']);
    Route::get('/courses/{title}', [CourseController::class, 'show']);
    Route::get('/courses/{title}/edit', [CourseController::class, 'edit']);
    Route::patch('/courses/{title}/update', [CourseController::class, 'update']);
    Route::delete('/courses/{title}/delete', [CourseController::class, 'destroy']);

    Route::post('/courses/{title}/like/{id}', [LikeFollowController::class, 'like']);
    Route::delete('/courses/{title}/delete-like/{id}', [LikeFollowController::class, 'deleteLike']);
    Route::post('/courses/{title}/follow/{id}', [LikeFollowController::class, 'follow']);
    Route::delete('/courses/{title}/delete-follow/{id}', [LikeFollowController::class, 'deleteFollow']);

    Route::get('/courses/{title}/new-chapter', [ChapterController::class, 'create']);
    Route::post('/courses/{title}/new-chapter', [ChapterController::class, 'store']);
    Route::get('/courses/{title_course}/{title_chapter}', [ChapterController::class, 'show']);
    Route::get('/courses/{title_course}/{title_chapter}/edit', [ChapterController::class, 'edit']);
    Route::patch('/courses/{title_course}/{title_chapter}/update', [ChapterController::class, 'update']);
    Route::delete('/courses/{title_course}/{title_chapter}/delete', [ChapterController::class, 'destroy']);

    Route::post('/courses/{title}/new-comment', [CommentController::class, 'store']);
    Route::patch('/courses/{title}/update-comment/{id}', [CommentController::class, 'update']);
    Route::delete('/courses/{title}/delete-comment/{id}', [CommentController::class, 'destroy']);
});

Route::get('/search', [CourseController::class, 'search'])->name('search');

Route::get('/about', function (){
    return Inertia::render('About');
})->name('about');

Route::get('/contact', function (){
    return Inertia::render('Contact');
})->name('contact');

Route::get('/', function (){
    return Inertia::render('Home/Home');
})->name('home');

require __DIR__.'/auth.php';
