<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UserAuthRequest;
use App\Models\AuthModel;
use App\Traits\HttpResponseTraits;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    use HttpResponseTraits;

    public function register(RegisterRequest $request)
    {
        return $request->register();
    }

    public function login(LoginRequest $request)
    {
        return $request->login();
    }

    public function logout()
    {
        return (new AuthModel)->logout();
    }
}
