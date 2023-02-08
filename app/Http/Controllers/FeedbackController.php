<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Feedback;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        $pendingCourses = DB::table('courses')
            ->where('status', '=', 'pending')
            ->get();

        return Inertia::render('Dashboard/Partials/NewFeedback', [
            'pendingCourses' => $pendingCourses
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Application|RedirectResponse|Redirector
     * @throws Exception
     */
    public function store(Request $request): Application|RedirectResponse|Redirector
    {
        $validated = $request->validate([
            'course_title' => 'required|string',
            'feedback_content' => 'required|string|max:5000',
            'status' => 'required',
        ]);

        $course = DB::table('courses')
            ->where('title', '=', $validated['course_title'])
            ->get()[0];

        if (!$course) {
            throw new Exception('course not found in the DB.');
        }

        $idFeedback = DB::table('feedbacks')->insertGetId([
            'content' => $validated['feedback_content'],
            'status' => $validated['status'],
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => null
        ]);

        DB::table('courses')
            ->where('title', '=', $validated['course_title'])
            ->update([
                'status' => $validated['status']
            ]);

        DB::table('feedbacks_courses')
            ->insert([
                'id_course' => $course->id,
                'id_feedback' => $idFeedback,
                'id_user' => Auth::user()->id
            ]);

        return redirect('/dashboard');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Application|Redirector|RedirectResponse
     */
    public function destroy(int $id): Redirector|RedirectResponse|Application
    {
        $idCourse = DB::table('feedbacks_courses')
                ->where('id_feedback', '=', $id)
                ->value('id_course');

        DB::table('courses')
            ->where('id', '=', $idCourse)
            ->update([
                'status' => 'pending'
            ]);

        DB::table('feedbacks')
            ->where('id', '=', $id)
            ->delete();

        return redirect('/dashboard');
    }
}
