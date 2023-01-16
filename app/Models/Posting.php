<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posting extends Model
{
    use HasFactory;

    protected $fillable = [
        'scholarship_id',
        'from',
        'to',
    ];

    public function posting()
    {
        return $this->belongsTo(Scholarship::class);
    }
}
