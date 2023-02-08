<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
           'com_content' => 'required|string|max:200'
        ]);

        $comment = Comment::create([
           'content' => $request->com_content
        ]);

        $comment->save();

        DB::table('courses_comments')->insert([
            'id_course' => $request->id_course,
            'id_user' => Auth::id(),
            'id_comment' => $comment->id,
            'created_at' => date("Y-m-d H:i:s")
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @return Application|Redirector|RedirectResponse
     */
    public function update(Request $request)
    {
        $request->validate([
            'com_content_up' => 'required|string|max:200'
        ]);

        DB::table('comments')
            ->where('id', $request->id)
            ->update(
                [
                    'content' => $request->com_content_up
                ]
            );

        $courseFormattedTitle = explode('/', url()->current())[4];

        return redirect('/courses/' . $courseFormattedTitle);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $formattedTitle
     * @param int $id
     * @return Application|RedirectResponse|Redirector
     */
    public function destroy(string $formattedTitle, int $id)
    {
        Comment::find($id)->delete();

        return redirect('/courses/' . $formattedTitle);
    }
}
