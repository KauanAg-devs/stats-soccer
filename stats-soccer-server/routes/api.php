<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizzesController;

use App\Models\Quiz;


Route::get('/', function(){
    return response()->json(['message' =>'Server is okay', 200]);
});

Route::get('/quizzes/filter/{name?}', [QuizzesController::class, 'filter']);
Route::get('/quizzes/filter/id/{id}', [QuizzesController::class, 'filterById']);
Route::post('/quizzes/store', [QuizzesController::class, 'store']);
Route::delete('/quizzes/{id}', [QuizzesController::class, 'destroy']);
