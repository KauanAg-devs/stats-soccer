<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class QuizApiTest extends TestCase
{
    use RefreshDatabase;
public function test_quiz_can_be_destroyed()
{
    $payload = [
        'name' => 'Quiz Copa do Mundo 2018',
        'year' => 2018,
        'img' => 'https://upload.wikimedia.org/...png',
        'category' => 'Futebol',
        'questions' => [
            [
                'question' => 'Quem venceu a Copa de 2018?',
                'correct' => 1,
                'options' => ['Brasil', 'França', 'Alemanha', 'Croácia']
            ]
        ]
    ];

    $response = $this->postJson('/api/quizzes/store', $payload)
        ->assertStatus(201);

    $id = $response->json('quiz.id'); 

    $this->delete("/api/quizzes/{$id}")
        ->assertStatus(200); 
}


    public function test_quiz_can_be_created()
    {
        $payload = [
            'name' => 'Quiz Copa do Mundo 2018',
            'year' => 2018,
            'img' => 'https://upload.wikimedia.org/...png',
            'category' => 'Futebol',
            'questions' => [
                [
                    'question' => 'Quem venceu a Copa de 2018?',
                    'correct' => 1,
                    'options' => ['Brasil', 'França', 'Alemanha', 'Croácia']
                ]
            ]
        ];

        $response = $this->postJson('/api/quizzes/store', $payload);

        $response->assertStatus(201); 
        $this->assertDatabaseHas('quizzes', ['name' => 'Quiz Copa do Mundo 2018']);
    }

    function test_quiz_can_be_returned(){
      $payload = [
            'name' => 'Quiz Copa do Mundo 2018',
            'year' => 2018,
            'img' => 'https://upload.wikimedia.org/...png',
            'category' => 'Futebol',
            'questions' => [
                [
                    'question' => 'Quem venceu a Copa de 2018?',
                    'correct' => 1,
                    'options' => ['Brasil', 'França', 'Alemanha', 'Croácia']
                ]
            ]
        ];

      $response = $this->postJson('/api/quizzes/store', $payload)
        ->assertStatus(201);

      $response = $this->get('/api/quizzes/filter/2018');
      $response->assertStatus(200)
         ->assertJsonFragment([
                'name' => 'Quiz Copa do Mundo 2018',
                'year' => '2018'
             ]);
    }
}
