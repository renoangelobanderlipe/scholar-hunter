<?php

namespace App\Models;

use App\Traits\HttpResponse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class RoleListener extends Model
{
    use HttpResponse;

    public function listen()
    {
        try {
            $user = \Auth::user();
            $status = User::find($user->id)->status;
            $role = $user
                ->getRoleNames()
                ->first();

            $data = [
                'status' => $status,
                'role' => $role,
            ];
            return $this->success($data);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage);
        }
    }

    public function authListener($data)
    {
        try {
            $user = User::where('email', $data)->first(['status']);
            return $this->success($user);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }
}
