<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class AuthModel extends Model
{
    const DEFAULT_ROLE = 'student';
    public function register($data)
    {

        \DB::beginTransaction();
        $user = User::create([
            'id_no' => $data->id_no,
            'firstname' => $data->firstname,
            'middlename' => $data->middlename,
            'lastname' => $data->lastname,
            'address' => $data->address,
            'username' => $data->username,
            'email' => $data->email,
            'course_type' => $data->course_type,
            'course' => $data->course,
            'contact_no' => $data->contact_no,
            'password' => Hash::make($data->password),
            'status' => 0,
        ]);
        $data = ['token' => $user->createToken(env("SANCTUM_SECRET"))->plainTextToken,];

        $user->assignRole('user');
        \DB::commit();

        return $data;
    }

    public function login($data)
    {

        $user = User::where('email', $data['email'])->first();

        return [
            'user' => $user,
            'token' => $user->createToken(env("SANCTUM_SECRET"))->plainTextToken
        ];
    }

    public function logout()
    {
        return \Auth::user()->currentAccessToken()->delete();
    }
}
