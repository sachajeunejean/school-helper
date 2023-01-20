<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

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

        DB::table('courses')->insert([
            'title' => $request->title,
            'formatted_title' => $formattedTitle,
            'description' => $request->description,
            'category' => $request->category,
            'preview_image' => $file->getClientOriginalName()
        ]);

        return redirect('/courses/'.$formattedTitle);
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

        $chapters = DB::table('chapters')
            ->join('courses_chapters', 'courses_chapters.id_chapter', '=', 'chapters.id')
            ->where('courses_chapters.id_course', '=', $idCourse)
            ->get();

        return Inertia::render('Course', [
            'course' => $course,
            'chapters' => $chapters
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
     * @return void
     */
    public function update(Request $request): void
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
        ]);

        $formattedTitle = strtolower(join('-', explode(' ', $request->title)));


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Course $course
     * @return void
     */
    public function destroy(Course $course): void
    {
        //
    }
}
