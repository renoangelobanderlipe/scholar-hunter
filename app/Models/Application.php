<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'scholarship_id',
        'status',
        'attachments',
    ];

    public function scholarship()
    {
        return $this->belongsTo(Scholarship::class);
    }
}
