<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Course;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ChapterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    /*public function index()
    {
        //
    }*/

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('NewChapter');
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
            'title' => 'required|string|max:50',
            'chap_content' => 'required|string',
            'description' => 'required|string|max:300'
        ]);

        //récupérer le dernier chapitre crée
        $currentURL = url()->current();
        $courseFormattedTitle = explode('/', $currentURL)[4];

        $idCourse = DB::table('courses')
            ->where('formatted_title', '=', $courseFormattedTitle)
            ->value('id');

        $lastChapterID = DB::table('chapters')
            ->join('courses_chapters', 'courses_chapters.id_chapter', '=', 'chapters.id')
            ->where('courses_chapters.id_course', '=', $idCourse)
            ->orderByDesc('chapters.created_at')
            ->limit(1)
            ->value('chapters.id');

        $formattedTitle = strtolower(join('-', explode(' ', $request->title)));

        //crée le chapitre
        $chapter = Chapter::create([
           'title' => $request->title,
           'content' => $request->chap_content,
           'formatted_title' => $formattedTitle,
           'description' => $request->description,
           'id_previous' => $lastChapterID,
        ]);

        $chapter->save();

        DB::table('courses_chapters')->insert([
            'id_course' => $idCourse,
            'id_chapter' => $chapter->id
        ]);

        //une fois le chapitre crée update id_next du dernier chapitre crée
        DB::table('chapters')
            ->where('id', $lastChapterID)
            ->update(['id_next' => $chapter->id]);

        return redirect('/courses/' . $courseFormattedTitle . '/' . $formattedTitle);
    }

    /**
     * Display the specified resource.
     *
     * @param string $title_course
     * @param string $title_chapter
     * @return Response
     */
    public function show(string $title_course, string $title_chapter): Response
    {
        $chapter = DB::table('chapters')
            ->where('formatted_title', '=', $title_chapter)
            ->get()[0];

        $idCourse = DB::table('courses_chapters')
            ->where('id_chapter', '=', $chapter->id)
            ->value('id_course');

        $course = Course::find($idCourse);

        $idUser = DB::table('courses_users')
            ->where('id_course', '=', $idCourse)
            ->value('id_user');

        $user = User::find($idUser);

        return Inertia::render('Chapter', [
            'chapter' => $chapter,
            'course' => $course,
            'owner' => $user->username,
            'sessionUser' => Auth::user()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return Response
     */
    public function edit(): Response
    {
        $currentURL = url()->current();
        $courseFormattedTitle = explode('/', $currentURL)[4];
        $chapterFormattedTitle = explode('/', $currentURL)[5];

        $chapter = DB::table('chapters')
            ->where('formatted_title', '=', $chapterFormattedTitle)
            ->get()[0];

        $course = DB::table('courses')
            ->where('formatted_title', '=', $courseFormattedTitle)
            ->get()[0];

        $chapter->course = $course;

        return Inertia::render('UpdateChapter', [
            'chapter' => $chapter,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Chapter $chapters
     * @return Application|Redirector|RedirectResponse
     */
    public function update(Request $request, Chapter $chapters): Application|RedirectResponse|Redirector
    {
        $request->validate([
            'title' => 'required|string|max:50',
            'chap_content' => 'required|string',
            'description' => 'required|string|max:300'
        ]);

        $currentURL = url()->current();
        $courseFormattedTitle = explode('/', url()->current())[4];
        $lastFormattedTitle = explode('/', url()->current())[5];
        $newFormattedTitle = strtolower(join('-', explode(' ', $request->title)));

        $idChapter = DB::table('chapters')
            ->where('formatted_title', '=', $lastFormattedTitle)
            ->value('id');

        DB::table('chapters')
            ->where('id', $idChapter)
            ->update(
                [
                    'title' => $request->title,
                    'formatted_title' => $newFormattedTitle,
                    'description' => $request->description,
                    'content' => $request->chap_content,
                ]
            );

        return redirect('/courses/' . $courseFormattedTitle . '/' . $newFormattedTitle);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return void
     */
    public function destroy(): void
    {
        dd('pass here');
    }
}
