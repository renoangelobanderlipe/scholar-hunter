<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScholarshipTypeModel extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $table = 'config';


    public static function index()
    {
        dd('index');
        return self::select('id', 'type')->get()->toArray();
    }

    public static function store($data)
    {
        dd($data);
    }
}
