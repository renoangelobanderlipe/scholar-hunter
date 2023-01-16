<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Foundation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'address',
        'contact_no',
        'email',
        'type',
    ];

    protected $casts = [
        'attachments' => 'array',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
