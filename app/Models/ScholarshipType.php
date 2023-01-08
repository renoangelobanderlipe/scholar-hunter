<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScholarshipType extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public static function store($data)
    {
        dd('model data');
    }
}
