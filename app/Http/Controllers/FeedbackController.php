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

        DB::table('feedbacks')->insert([
            'content' => $validated['feedback_content']
        ]);

        DB::table('courses')
            ->where('title', '=', $validated['course_title'])
            ->update([
                'status' => $validated['status']
            ]);

        DB::table('feedbacks_courses')
            ->insert([
                'id_course' => $course->id,
                'id_user' => Auth::user()->id
            ]);

        return redirect('/dashboard');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Feedback  $feedback
     * @return Response
     */
    public function show(Feedback $feedback)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Feedback  $feedback
     * @return Response
     */
    public function edit(Feedback $feedback)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  \App\Models\Feedback  $feedback
     * @return Response
     */
    public function update(Request $request, Feedback $feedback)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Feedback  $feedback
     * @return Response
     */
    public function destroy(Feedback $feedback)
    {
        //
    }
}
