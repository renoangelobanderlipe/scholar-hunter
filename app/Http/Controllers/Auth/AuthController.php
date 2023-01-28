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
        try {
            return $this->success($request->register());
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            return $this->success($request->login());
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function logout()
    {
        try {
            return $this->success((new AuthModel)->logout());
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }
}
