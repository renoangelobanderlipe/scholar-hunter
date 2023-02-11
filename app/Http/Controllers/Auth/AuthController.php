<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\AuthHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\AuthModel;
use App\Traits\HttpResponseTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use HttpResponseTraits;

    protected $helper;

    public function __construct(AuthHelper $helper)
    {
        $this->helper = $helper;
    }

    public function show()
    {
        return $this->success((new AuthHelper)->show());
    }

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
}
