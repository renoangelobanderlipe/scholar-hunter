<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\AuthHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\Foundation;
use App\Traits\HttpResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    use HttpResponse;

    protected $helper;

    public function __construct(AuthHelper $helper)
    {
        $this->helper = $helper;
    }

    public function show()
    {
        return $this->success((new AuthHelper)->show());
    }

    public function all()
    {
        return (new AuthHelper)->all();
    }

    public function register(RegisterRequest $request)
    {
        return $request->register();
    }

    public function login(LoginRequest $request)
    {
        return $request->login();
    }

    public function updateProfile(Request $request)
    {

        $request = array_filter($request->all());

        return $this->helper->updateProfile($request);
    }

    public function updatePassword(Request $request)
    {
        $data = $request->all();
        $this->helper->password($data);

        return $this->helper->updatePassword();
    }

    public function logout(Request $request)
    {
        return $request->user()->currentAccessToken()->delete();
        // return (new AuthModel)->logout();
    }
}
