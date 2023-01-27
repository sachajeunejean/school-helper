<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * @return Response
     */
    public function index(): Response
    {
        $followedCourses = $this->getCourses(Auth::user()->id, "followed_courses");
        $createdCourses = $this->getCourses(Auth::user()->id, "courses_users");

        return Inertia::render('Dashboard/Dashboard', [
            'followedCourses' => $followedCourses,
            'createdCourses' => $createdCourses
        ]);
    }

    /**
     * @return array|null
     */
    public function getCourses(int $idUser, string $tableName): array|null
    {
        $idCourses = DB::table($tableName)
            ->where('id_user', '=', $idUser)
            ->get();

        $courses = [];

        foreach ($idCourses as $idCourse) {
            array_push($courses, Course::find($idCourse->id_course));
        }

        return (count($courses) ? $courses : null);
    }
}
