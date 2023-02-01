<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Foundation extends Model
{
    protected $fillable = [
        'name',
        'description',
        'address',
        'contact_no',
        'email',
        'type',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
