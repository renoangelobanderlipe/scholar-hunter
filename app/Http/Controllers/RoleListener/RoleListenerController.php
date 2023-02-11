<?php

namespace App\Http\Controllers\RoleListener;

use App\Http\Controllers\Controller;
use App\Models\RoleListener;
use App\Models\RoleListenerModel;
use Illuminate\Http\Request;

class RoleListenerController extends Controller
{
    protected $listener;

    public function __construct(RoleListener $listener)
    {
        $this->listener = $listener;
    }

    public function index()
    {
        return $this->listener->listen();
    }
}
