<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Course;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
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
    public function store(string $title, Request $request): Redirector|RedirectResponse|Application
    {
        $request->validate([
            'title' => 'required|string|max:120',
            'chap_content' => 'required',
            'description' => 'required|string|max:180'
        ]);

        //récupérer le dernier chapitre crée
        $courseFormattedTitle = $title;

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

        DB::table('courses')
            ->where('id', '=', $idCourse)
            ->update(
                [
                    'status' => 'pending'
                ]
            );

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
        $course = DB::table('courses')
            ->where('formatted_title', '=', $title_course)
            ->get()[0];

        $idChapters = DB::table('courses_chapters')
            ->where('id_course', '=', $course->id)
            ->get();

        $chapters = [];

        foreach ($idChapters as $idChapter) {
            array_push($chapters, Chapter::find($idChapter->id_chapter));
        }

        $chapter = null;

        foreach ($chapters as $chap) {
            if ($chap->formatted_title === $title_chapter)
                $chapter = $chap;
        }

        $idUser = DB::table('courses_users')
            ->where('id_course', '=', $course->id)
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
    public function edit(string $title_course, string $title_chapter): Response
    {
        $courseFormattedTitle = $title_course;
        $chapterFormattedTitle = $title_chapter;

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
            'title' => 'required|string|max:120',
            'chap_content' => 'required|string',
            'description' => 'required|string|max:180'
        ]);

        $courseFormattedTitle = explode('/', url()->current())[4];
        $lastFormattedTitle = explode('/', url()->current())[5];
        $newFormattedTitle = strtolower(join('-', explode(' ', $request->title)));

        $idChapter = DB::table('chapters')
            ->where('formatted_title', '=', $lastFormattedTitle)
            ->value('id');

        $idCourse = DB::table('courses_chapters')
            ->where('id_chapter', '=', $idChapter)
            ->value('id_course');

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

        DB::table('courses')
            ->where('id', '=', $idCourse)
            ->update(
                [
                    'status' => 'pending'
                ]
            );

        return redirect('/courses/' . $courseFormattedTitle . '/' . $newFormattedTitle);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return Application|Redirector|RedirectResponse
     */
    public function destroy(string $title_course, string $title_chapter): RedirectResponse|Application|Redirector
    {
        $courseFormTitle = $title_course;
        $chapterFormTitle = $title_chapter;

        $chapter = DB::table('chapters')
            ->where('formatted_title', '=', $chapterFormTitle)
            ->get()[0];

        $nextChapter = Chapter::find($chapter->id_next);
        $previousChapter = Chapter::find($chapter->id_previous);

        if ($previousChapter === null && $nextChapter !== null) {
            DB::table('chapters')
                ->where('id', $nextChapter->id)
                ->update(
                    [
                        'id_previous' => null
                    ]
                );
        } else {
            if ($nextChapter !== null) {
                DB::table('chapters')
                    ->where('id', $previousChapter->id)
                    ->update(
                        [
                            'id_next' => $nextChapter->id
                        ]
                    );

                DB::table('chapters')
                    ->where('id', $nextChapter->id)
                    ->update(
                        [
                            'id_previous' => $previousChapter->id
                        ]
                    );
            } else if ($previousChapter !== null) {
                DB::table('chapters')
                    ->where('id', $previousChapter->id)
                    ->update(
                        [
                            'id_next' => null
                        ]
                    );
            }
        }

        Chapter::find($chapter->id)->delete();

        return redirect('/courses/' . $courseFormTitle);
    }

    /**
     * @param int $urlIdCourse
     * @param int $urlIdChapter
     * @return JsonResponse
     */
    public function getChapterTitleInfos(int $urlIdCourse, int $urlIdChapter): JsonResponse
    {
        $idChapter = DB::table('courses_chapters')
                        ->where('id_course', '=', $urlIdCourse)
                        ->where('id_chapter', '=', $urlIdChapter)
                        ->value('id_chapter');

        $chapter = DB::table('chapters')
                            ->select('title', 'formatted_title')
                            ->where('id', '=', $idChapter)
                            ->get()[0];

        return response()->json([
           'title' => $chapter->title,
            'formatted_title' => $chapter->formatted_title
        ]);
    }
}
