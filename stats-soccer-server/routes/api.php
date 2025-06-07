<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Models\Quiz;


Route::get('/', function(){
    return response()->json(['message' =>'Server is okay', 200]);
});

Route::get('/quizes/filter/{name?}', function (Request $request, $name = '') {
    $query = Quiz::with('questions.options');

    if (trim($name) !== '') {
        $query->where('name', 'like', "%{$name}%");
        $quiz = $query->first();

        if (!$quiz) {
            return response()->json(['error' => 'Quiz not found'], 404);
        }

        return response()->json($quiz);
    } else {
        $quizzes = $query->limit(4)->get();
        return response()->json($quizzes);
    }
});


Route::post('/quizes/filterQuizes', function (Request $request) {
    return response()->json(['message' => 'filter quizzes']);
});

Route::post('/quizes/create', function (Request $request) {
    return response()->json(['message' => 'create quiz']);
});
