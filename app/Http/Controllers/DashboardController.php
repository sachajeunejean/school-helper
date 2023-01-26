<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function getFollowedCourses(int $idUser): JsonResponse
    {
        $idCourses = DB::table('followed_courses')
            ->where('id_user', '=', $idUser)
            ->get();

        

        return response()->json([
           'idCourses' => $idCourses
        ]);
    }
}
