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
        'foundation_id',
        'file_id',
        'file_name',
        'file_location',
        'status',

    ];

    protected $casts = [
        'attachments' => 'array',
    ];

    public function scholarship()
    {
        return $this->belongsTo(Scholarship::class);
    }
}
