<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
      protected $fillable = [
        'name',
        'year',
        'img',
        'category',
    ];
    
    public function questions() {
      return $this->hasMany(Question::class);
    }
}
