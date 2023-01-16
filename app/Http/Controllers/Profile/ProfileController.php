<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\HttpResponseTraits;
use Illuminate\Http\Request;
use App\Scopes\UserScope;

class ProfileController extends Controller
{
    use HttpResponseTraits;

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::addGlobalScope(new UserScope);
    }

    public function index()
    {
        dd('test global scopes', User::select('*')->apply());
        // Send back user info to  
        try {
        } catch (\Throwable $throwable) {
            $this->error($throwable->getMessage());
        }
    }

    public function updateInfo()
    {
        try {
        } catch (\Throwable $throwable) {
            $this->error($throwable->getMessage());
        }
    }

    public function updatePassword(Request $request)
    {
        try {
            $request = $request->only(['current_password', 'password', 'confirm_password']);


            if ($request['confirm_password'] !=  $request['confirm_password']) {
                return response()->json('Password Mismatch', 201);
            };

            User::select('id', 'password')
                ->where('password', '=', $request['current_password'])
                ->update(['password' => $request['password']]);

            return $this->success('Successfully Updated Information');
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }
}
