<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Feedback;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
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

        if ($createdCourses)
            $coursesFeedbacks = $this->getFeedbacksCourses($createdCourses);
        else
            $coursesFeedbacks = null;

        return Inertia::render('Dashboard/Dashboard', [
            'followedCourses' => $followedCourses,
            'createdCourses' => $createdCourses,
            'feedbacksGiven' => $feedbacksGiven,
            'coursesFeedbacks' => $coursesFeedbacks
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
        $feedbacks = [];

        if (DB::table('feedbacks')->count() !== 0) {
            $idFeedbacks = DB::table('feedbacks_courses')
                ->where('id_user', '=', $idModerator)
                ->get();

            for ($i = 0; $i < count($idFeedbacks); $i++) {
                $feedbacks[$i] = DB::table('feedbacks')
                    ->where('id', '=', $idFeedbacks[$i]->id_feedback)
                    ->get()[0];
            }
        }

        return (count($feedbacks) ? $feedbacks : null);
    }

    private function getFeedbacksCourses(array $courses): ?array
    {
        $feedbacks = [];

        if (DB::table('feedbacks')->count() !== 0) {
            for ($i = 0, $j = 0; $i < count($courses); $i++) {
                $id_feedback = DB::table('feedbacks_courses')
                    ->where('id_course', '=', $courses[$i]->id)
                    ->orderByDesc('id_course')
                    ->value('id_feedback');

                if ($id_feedback) {
                    $feedback = DB::table('feedbacks')
                        ->where('id', '=', $id_feedback)
                        ->get()[0];

                    if ($feedback) {
                        $feedbacks[$j] = $feedback;

                        $j++;
                    }
                }
            }
        }

        return (count($feedbacks) ? $feedbacks : null);
    }
}
