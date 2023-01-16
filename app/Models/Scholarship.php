<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scholarship extends Model
{
    use HasFactory;

    protected $fillable = [
        'foundation_id',
        'name',
        'description',
    ];
    
    public function foundation()
    {
        return $this->belongsTo(Foundation::class);
    }
}
