<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show()
    {
        dd('test show');
        // 
    }

    public function update(Request $request)
    {
        $request = $request->only(['current_password', 'password', 'confirm_password']);

        if ($request['password'] !=  $request['confirm_password']) {
            return response()->json('Password Mismatch', 201);
        };

        User::select('id', 'password')
            ->where('password', '=', $request['current_password'])
            ->update(['password' => $request['password']]);

        return response()->json('Success', 200);
    }

    public function password(Request $request)
    {
        // 
    }
}
