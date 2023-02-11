<?php

namespace App\Models;

use App\Traits\HttpResponseTraits;
use Illuminate\Database\Eloquent\Model;

class RoleListener extends Model
{
    use HttpResponseTraits;
    
    public function listen()
    {
        // dd(\Auth::user()->status);
        return \Auth::user()->status;
    }
}
