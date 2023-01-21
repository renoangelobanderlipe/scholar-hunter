<?php

namespace App\Http\Controllers\UserManagement;

use App\Http\Controllers\Controller;
use App\Traits\HttpResponseTraits;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{
    use HttpResponseTraits;

    public function store()
    {
        try {
        } catch (\Throwable $throwable) {
            $this->error($throwable->getMessage());
        }
    }
}
