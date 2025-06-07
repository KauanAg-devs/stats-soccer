<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Models\Quiz;


Route::get('/', function(){
    return response()->json(['message' =>'Server is okay', 200]);
});

Route::get('/quizes/filter/{name}', function (string $name) {

    $quiz = Quiz::with('questions.options')
        ->where('name', 'like', "%{$name}%")
        ->first();

    if (!$quiz) {
        return response()->json(['error' => 'Quiz not found'], 404);
    }

    return response()->json($quiz);
});

Route::post('/quizes/filterQuizes', function (Request $request) {
    return response()->json(['message' => 'filter quizzes']);
});

Route::post('/quizes/create', function (Request $request) {
    return response()->json(['message' => 'create quiz']);
});
