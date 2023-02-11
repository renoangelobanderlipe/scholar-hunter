<?php

namespace App\Models;

use App\Traits\HttpResponse;
use Illuminate\Database\Eloquent\Model;

class RoleListener extends Model
{
    use HttpResponse;
    
    public function listen()
    {
        // dd(\Auth::user()->status);
        return \Auth::user()->status;
    }
}
