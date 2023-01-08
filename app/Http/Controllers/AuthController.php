<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Traits\HttpResponseTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use HttpResponseTraits;

    /**
     * This uses a custom request to handle a customisable validation
     * 
     * 
     */
    public function login(LoginUserRequest $request)
    {
        $request->validated($request->all());

        if (!Auth::attempt($request->only(['email', 'password']))) {
            return $this->error('', 'Invalid credentials', 401);
        }

        $user = User::where('email', $request->email)->first();

        // This will be fix later with to add abilities to the token
        return $this->success([
            'user' => $user,
            'token' => $user->createToken('auth-token ' . $user->name)->plainTextToken
        ]);
    }

    /**
     * This uses a custom request to handle a customisable validation
     * 
     * 
     */
    public function register(StoreUserRequest $request)
    {
        $request->validated($request->only([
            'firstname', 'middlename', 'lastname', 'address', 'username', 'email', 'password', 'status',
        ]));

        $user = User::create([
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'address' => $request->address,
            'username' => $request->username,
            'email' => $request->email,
            'course' => $request->course,
            'degree' => $request->degree,
            'account_type' => $request->account_type,
            'school' => $request->school,
            'password' => Hash::make($request->password),
            'status' => 0,
        ]);
        // This will be fix later with to add abilities to the token


        return $this->success([
            // 'user' => $user,
            'token' => $user->createToken('auth-token')->plainTextToken,
        ]);
    }


    /**
     * This method used to revoke the current access token of a user
     * 
     */
    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();
        return $this->success(['message' => 'Successfuly Logged out!']);
    }
}
