<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use JetBrains\PhpStorm\NoReturn;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Courses', [
            'courses' => Course::all()
        ]);
    }

        /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function search(): Response
    {
        return Inertia::render('Search', [
            'courses' => Course::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('NewCourse');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Application|RedirectResponse|Redirector
     */
    public function store(Request $request): Redirector|RedirectResponse|Application
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
        ]);

        $formattedTitle = strtolower(join('-', explode(' ', $request->title)));

        $file = $request->file('preview_image');
        $path =  '/images';

        Storage::disk('resources_views')->putFileAs($path, $file, $file->getClientOriginalName());

        $idCourse = DB::table('courses')->insertGetId([
            'title' => $request->title,
            'formatted_title' => $formattedTitle,
            'description' => $request->description,
            'category' => $request->category,
            'preview_image' => $file->getClientOriginalName(),
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => null
        ]);

        DB::table('courses_users')->insert([
           'id_course' => $idCourse,
           'id_user' => Auth::user()->id
        ]);

        return redirect('/courses/' . $formattedTitle);
    }

    /**
     * Display the specified resource.
     *
     * @param string $title
     * @return Response
     */
    public function show(string $title): Response
    {
        $course = DB::table('courses')
            ->where('formatted_title', '=', $title)
            ->get()[0];

        $idCourse = DB::table('courses')->where('formatted_title', '=', $title)->value('id');

        $course->owner = DB::table('users')
            ->join('courses_users', 'courses_users.id_user', '=', 'users.id')
            ->join('courses', 'courses_users.id_course', '=', 'courses.id')
            ->value('username');

        $chapters = DB::table('chapters')
            ->join('courses_chapters', 'courses_chapters.id_chapter', '=', 'chapters.id')
            ->where('courses_chapters.id_course', '=', $idCourse)
            ->get();

        $comments = DB::table('comments')
            ->join('courses_comments', 'courses_comments.id_comment', 'comments.id')
            ->where('courses_comments.id_course', '=', $idCourse)
            ->get();

        foreach ($comments as $comment) {
            $comment->username = DB::table('users')
                ->where('id', '=', $comment->id_user)
                ->value('username');
        }

        $likes = DB::table('likes')
            ->where('id_course', '=', $idCourse)
            ->count();

        if (Auth::user()) {

            $idUserLike = DB::table('likes')
                ->where('id_course', '=', $idCourse)
                ->where('id_user', '=', Auth::user()->id)
                ->value('id_user');

            $isLiked = !($idUserLike === null);

            $idUserFollow = DB::table('followed_courses')
                ->where('id_course', '=', $idCourse)
                ->where('id_user', '=', Auth::user()->id)
                ->value('id_user');

            $isFollowed = !($idUserFollow === null);

        } else {

            $isLiked = false;
            $isFollowed = false;

        }

        return Inertia::render('Course', [
            'course' => $course,
            'chapters' => $chapters,
            'comments' => $comments,
            'sessionUser' => Auth::check() ? Auth::user() : false,
            'isLiked' => $isLiked,
            'likes' => $likes,
            'isFollowed' => $isFollowed
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param string $title
     * @return Response
     */
    public function edit(string $title): Response
    {
        $course = DB::table('courses')
            ->where('formatted_title', '=', $title)
            ->get()[0];

        return Inertia::render('UpdateCourse', [
            'course' => $course
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @return Application|Redirector|RedirectResponse
     */
    public function update(Request $request): RedirectResponse|Application|Redirector
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
        ]);

        $lastFormattedTitle = explode('/', url()->current())[4];
        $newFormattedTitle = strtolower(join('-', explode(' ', $request->title)));

        $file = $request->file('preview_image');
        $path =  '/images';

        $isFile = false;

        if ($file) {
            Storage::disk('resources_views')->putFileAs($path, $file, $file->getClientOriginalName());
            $isFile = true;
        }

        $idCourse = DB::table('courses')
            ->where('formatted_title', '=', $lastFormattedTitle)
            ->value('id');

        DB::table('courses')
            ->where('id', $idCourse)
            ->update(
              [
                  'title' => $request->title,
                  'formatted_title' => $newFormattedTitle,
                  'description' => $request->description,
                  'category' => $request->category,
                  'preview_image' => $isFile ? $file->getClientOriginalName() : $request->last_preview_image
              ]
            );

        return redirect('/courses/' . $newFormattedTitle);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return Application|Redirector|RedirectResponse
     */
    public function destroy(): RedirectResponse|Application|Redirector
    {
        $currentURL = url()->current();
        $courseFormattedTitle = explode('/', $currentURL)[4];

        $idCourse = DB::table('courses')
            ->where('formatted_title', '=', $courseFormattedTitle)
            ->value('id');

        Course::find($idCourse)->delete();

        return redirect('/courses/');
    }
}
