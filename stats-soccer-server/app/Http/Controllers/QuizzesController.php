<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizzesController extends Controller
{
    function filter(Request $request, $name = ''){
      $query = Quiz::with('questions.options');

      if(trim($name == '')) {
         $quizzes = $query->limit(4)->get();
        return response()->json($quizzes);
      }

      $query->where('name', 'like', "%{$name}%");
      $quiz = $query->first();

      if (!$quiz) {
        return response()->json(['error' => 'Quiz not found'], 404);
      }

      return response()->json([$quiz]);
    }
}
