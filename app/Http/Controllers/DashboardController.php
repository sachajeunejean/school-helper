<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Feedback;
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
        $followedCourses = $this->getUserData(Auth::user()->id, "followed_courses");
        $createdCourses = $this->getUserData(Auth::user()->id, "courses_users");
        $feedbacksGiven = $this->getFeedbacks(Auth::user()->id);

        return Inertia::render('Dashboard/Dashboard', [
            'followedCourses' => $followedCourses,
            'createdCourses' => $createdCourses,
            'feedbacksGiven' => $feedbacksGiven
        ]);
    }

    /**
     * @return array|null
     */
    private function getUserData(int $idUser, string $tableName): array|null
    {
        $idCourses = DB::table($tableName)
            ->where('id_user', '=', $idUser)
            ->get();

        $courses = [];

        foreach ($idCourses as $idCourse) {
            $courses[] = Course::find($idCourse->id_course);
        }

        return (count($courses) ? $courses : null);
    }

    private function getFeedbacks(int $idModerator): ?array
    {

        $idFeedbacks = DB::table('feedbacks_courses')
            ->where('id_user', '=', $idModerator)
            ->get();

        $feedbacks = [];

        foreach ($idFeedbacks as $idFeedback) {
            $feedbacks[] = DB::table('feedbacks')->where('id', '=', $idFeedback->id_course)->get();
        }

        return (count($feedbacks) ? $feedbacks : null);
    }
}
