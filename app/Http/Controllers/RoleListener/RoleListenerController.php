<?php

namespace App\Http\Controllers\RoleListener;

use App\Http\Controllers\Controller;
use App\Models\RoleListenerModel;
use Illuminate\Http\Request;

class RoleListenerController extends Controller
{
    public function check()
    {
        return (new RoleListenerModel)->check();
    }
    //
}
