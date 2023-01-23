<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Traits\HttpResponseTraits;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use HttpResponseTraits;

    public function login(LoginUserRequest $request)
    {
        // if (!Auth::attempt($request->only(['email', 'password']))) {
        //     return $this->error('', 'Invalid credentials', 401);
        // }

        $user = User::where('email', $request->email)->first();

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('auth-token ' . $user->name)->plainTextToken
        ]);
    }

    public function register(StoreUserRequest $request)
    {
        $request->validated($request->only([
            'firstname', 'middlename', 'lastname', 'address', 'username', 'email', 'course', 'course_type', 'degree', 'contact_no', 'account_type', 'password',
        ]));

        $user = User::create([
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'address' => $request->address,
            'username' => $request->username,
            'email' => $request->email,
            'course_type' => $request->course_type,
            'course' => $request->course_type,
            'degree' => $request->degree,
            'contact_no' => $request->contact_no,
            'account_type' => $request->account_type,
            'password' => Hash::make($request->password),
            'status' => 0,
        ]);

        return $this->success([
            'token' => $user->createToken('auth-token')->plainTextToken,
        ]);
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();
        return $this->success(['message' => 'Successfuly Logged out!']);
    }
}
