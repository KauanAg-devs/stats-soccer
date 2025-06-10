<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizzesController;

use App\Models\Quiz;


Route::get('/', function(){
    return response()->json(['message' =>'Server is okay', 200]);
});

Route::get('/quizzes/filter/{name?}', [QuizzesController::class, 'filter']);


Route::post('/quizes/filterQuizes', function (Request $request) {
    return response()->json(['message' => 'filter quizzes']);
});

Route::post('/quizes/create', function (Request $request) {
    return response()->json(['message' => 'create quiz']);
});
