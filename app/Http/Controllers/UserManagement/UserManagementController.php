<?php

namespace App\Http\Controllers\UserManagement;

use App\Http\Controllers\Controller;
use App\Models\UserManagement\UserManagementModel;
use App\Traits\HttpResponseTraits;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{

    protected $user;

    public function __construct(UserManagementModel $user)
    {
        return $this->user = $user;
    }

    public function show()
    {
        $this->user->page(10);
        
        return $this->user->show();
    }
}
