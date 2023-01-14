<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountTypeModel extends Model
{
    use HasFactory;

    protected $table = 'config';
    protected $guarded = ['id'];
    protected $hidden = ['id', 'updated_at', 'craeted_at'];

    public static function show()
    {
        try {
            return self::where('option_name', 'account_type')->first();
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
