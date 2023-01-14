<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseConfig extends Model
{
    use HasFactory;
    protected $table = 'config';
    protected $guarded = ['id'];
    protected $hidden = ['id', 'created_at', 'updated_at'];

    public static function show()
    {
        try {
            return self::where('option_name', 'degree')->first();
        } catch (\Throwable $throwable) {
            return $throwable->getMessage();
        }
    }

    public static function store(object $data)
    {
        try {
            return self::create([
                'option_name' => $data->name,
                'option_value' => $data->value
            ]);
        } catch (\Throwable $throwable) {
            return $throwable->getMessage();
        }
    }
}
