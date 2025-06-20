<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizzesController extends Controller
{

    public function destroy($id) {
        $quiz = Quiz::with('questions.options')->find($id);

        if (!$quiz) {
            return response()->json(['error' => 'Quiz not found'], 404);
        }

        try {
            foreach ($quiz->questions as $question) {
                $question->options()->delete();
            }

            $quiz->questions()->delete();
            $quiz->delete();

            return response()->json(['message' => 'Quiz deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete quiz', 'details' => $e->getMessage()], 500);
        }
   }

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

    public function filterById(Request $request, $id = ''){
    if (trim($id) === '') {
        return response()->json(['error' => 'Quiz not found'], 404);
    }

    $quiz = Quiz::with('questions.options')->where('id', $id)->first();

    if (!$quiz) {
        return response()->json(['error' => 'Quiz not found'], 404);
    }

    return response()->json($quiz);
   }


    public function store(Request $request){
    $validated = $request->validate([
        'name' => 'required|string',
        'year' => 'required|integer',
        'img' => 'nullable|string',
        'category' => 'required|string',
        'questions' => 'required|array|min:1',
        'questions.*.question' => 'required|string',
        'questions.*.correct' => 'required|integer',
        'questions.*.options' => 'required|array|min:2',
        'questions.*.options.*' => 'required|string',
    ]);

    try {
        $quiz = Quiz::create([
            'name' => $validated['name'],
            'year' => $validated['year'],
            'img' => $validated['img'] ?? null,
            'category' => $validated['category'],
        ]);

        foreach ($validated['questions'] as $qData) {
            $question = $quiz->questions()->create([
                'question' => $qData['question'],
                'correct_option' => $qData['correct'],
            ]);

            foreach ($qData['options'] as $index => $text) {
                $question->options()->create([
                    'index' => $index,
                    'text' => $text,
                ]);
            }
        }


        return response()->json(['message' => 'Quiz created successfully', 'quiz' => $quiz], 201);

    } catch (\Exception $e) {
        return response()->json(['error' => 'Quiz creation failed', 'details' => $e->getMessage()], 500);
    }
  }


}
