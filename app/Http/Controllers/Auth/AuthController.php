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


    // public function login(LoginUserRequest $request)
    // {

    //     if (!Auth::attempt($request->only(['email', 'password']))) {
    //         return $this->error('', 'Invalid credentials', 401);
    //     }

    //     $user = User::where('email', $request->email)->first();

    //     return $this->success([
    //         'user' => $user,
    //         'token' => $user->createToken('auth-token')->plainTextToken
    //     ]);
    // }

    // public function register(StoreUserRequest $request)
    // {
    //     $request->validated($request->only([
    //         'firstname', 'middlename', 'lastname', 'address', 'username', 'email', 'course', 'course_type', 'degree', 'contact_no', 'account_type', 'password',
    //     ]));

    //     $user = User::create([
    //         'id_no' => $request->id_no,
    //         'firstname' => $request->firstname,
    //         'middlename' => $request->middlename,
    //         'lastname' => $request->lastname,
    //         'address' => $request->address,
    //         'username' => $request->username,
    //         'email' => $request->email,
    //         'course_type' => $request->course_type,
    //         'course' => $request->course_type,
    //         'role' => $request->role,
    //         'contact_no' => $request->contact_no,
    //         'password' => Hash::make($request->password),
    //         'status' => 0,
    //     ]);

    //     return $this->success([
    //         'token' => $user->createToken('auth-token')->plainTextToken,
    //     ]);
    // }

    // public function logout()
    // {
    //     dd(\Auth::user()->currentAccessToken()->delete());
    //     \Auth::user()->currentAccessToken()->delete();
    //     return $this->success(['message' => 'Successfuly Logged out!']);
    // }
}
