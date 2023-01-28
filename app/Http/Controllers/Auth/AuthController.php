<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserAuthRequest;
use App\Models\AuthModel;
use App\Traits\HttpResponseTraits;

class AuthController extends Controller
{
    use HttpResponseTraits;

    public function register(UserAuthRequest $request)
    {
        try {
            return (new AuthModel)->register();
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function login()
    {
        try {
            return (new AuthModel)->login();
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }
}
