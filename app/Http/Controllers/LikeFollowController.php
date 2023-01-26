<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\DB;

class LikeFollowController extends Controller
{
    /**
     * Add a like to the course
     *
     * @param string $formattedTitle
     * @param int $idUser
     * @return Application|RedirectResponse|Redirector
     */
    public function like(string $formattedTitle, int $idUser)
    {
        $idCourse = DB::table('courses')
            ->where('formatted_title', '=', $formattedTitle)
            ->value('id');

        DB::table('likes')->insert([
            'id_course' => $idCourse,
            'id_user' => $idUser
        ]);

        return redirect('/courses/' . $formattedTitle);
    }

    /**
     * Delete the like of the user
     *
     * @param string $formattedTitle
     * @param int $idUser
     * @return Application|RedirectResponse|Redirector
     */
    public function deleteLike(string $formattedTitle, int $idUser)
    {
        $idCourse = DB::table('courses')
            ->where('formatted_title', '=', $formattedTitle)
            ->value('id');

        DB::table('likes')
            ->where('id_course', '=', $idCourse)
            ->where('id_user', '=', $idUser)
            ->delete();

        return redirect('/courses/' . $formattedTitle);
    }

    /**
     * Add a course to the user followed courses
     *
     * @param string $formattedTitle
     * @param $idUser
     * @return Application|RedirectResponse|Redirector
     */
    public function follow(string $formattedTitle, $idUser)
    {
        $idCourse = DB::table('courses')
            ->where('formatted_title', '=', $formattedTitle)
            ->value('id');

        DB::table('followed_courses')->insert([
            'id_course' => $idCourse,
            'id_user' => $idUser
        ]);

        return redirect('/courses/' . $formattedTitle);
    }

    /**
     * Delete the follow of the user
     *
     * @param string $formattedTitle
     * @param int $idUser
     * @return Application|RedirectResponse|Redirector
     */
    public function deleteFollow(string $formattedTitle, int $idUser)
    {
        $idCourse = DB::table('courses')
            ->where('formatted_title', '=', $formattedTitle)
            ->value('id');

        DB::table('followed_courses')
            ->where('id_course', '=', $idCourse)
            ->where('id_user', '=', $idUser)
            ->delete();

        return redirect('/courses/' . $formattedTitle);
    }
}
