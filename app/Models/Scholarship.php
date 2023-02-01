<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Scholarship extends Model
{
    protected $fillable = [
        'foundation_id',
        'name',
        'description',
    ];
    protected $hidden = ['created_at', 'updated_at'];

    public function foundation()
    {
        return $this->belongsTo(Foundation::class);
    }

    public function showList()
    {
        dd('test', Scholarship::all()->toArray());
    }
}
