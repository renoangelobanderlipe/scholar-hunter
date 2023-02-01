<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleListenerModel extends Model
{
    public function check()
    {
        dd('test');
        dd(\Auth::user());
    }
}
