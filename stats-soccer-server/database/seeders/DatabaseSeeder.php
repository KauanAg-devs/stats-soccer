<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\Option;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        $quiz = Quiz::create([
            'name' => 'Fifa World Cup 1970 Quiz',
            'year' => '1970',
            'category' => 'fifaworldcup',
            'img' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/1970_FIFA_World_Cup.svg/250px-1970_FIFA_World_Cup.svg.png',
        ]);

        $data = [
            [
                'question' => 'Who won the 1970 World Cup?',
                'options' => ['Argentina', 'Brazil', 'Italia', 'Germany'],
                'correct' => 1,
            ],
            [
                'question' => 'Which country hosted the 1970 World Cup?',
                'options' => ['Mexico', 'Germany', 'Italy', 'France'],
                'correct' => 0,
            ],
        ];

        foreach ($data as $qData) {
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
    }
}

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
   public function run(): void {
    $this->call(QuizSeeder::class);
   }

}
