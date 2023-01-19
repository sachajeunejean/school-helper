<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ChapterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('NewChapter');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'chap_content' => 'required|string',
        ]);

        //récupérer le dernier chapitre crée
        $currentURL = url()->current();
        $idCourse = explode('/', $currentURL)[4];

        $lastChapterID = DB::table('chapters')
            ->join('courses_chapters', 'courses_chapters.id_chapter', '=', 'chapters.id')
            ->where('courses_chapters.id_course', '=', $idCourse)
            ->limit(1)
            ->value('chapters.id');

        //crée le chapitre
        $chapter = Chapter::create([
           'title' => $request->title,
           'content' => $request->chap_content,
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

        return redirect('/courses/' . $idCourse . '/chapters');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Chapter  $chapters
     * @return \Illuminate\Http\Response
     */
    public function show(string $title_course, string $title_chapter)
    {
        $chapter = DB::table('chapters')
            ->where('formatted_title', '=', $title_chapter)
            ->get()[0];

        return Inertia::render('Chapter', [
            'chapter' => $chapter
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Chapter  $chapters
     * @return \Illuminate\Http\Response
     */
    public function edit(Chapter $chapters)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Chapter  $chapters
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Chapter $chapters)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Chapter  $chapters
     * @return \Illuminate\Http\Response
     */
    public function destroy(Chapter $chapters)
    {
        //
    }
}
