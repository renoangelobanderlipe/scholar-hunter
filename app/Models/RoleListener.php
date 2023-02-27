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
            // $user = User::with('roles')->get()->first();
            $user = \Auth::user()
                ->with('roles')
                ->get()
                ->first()
                ->toArray();


            $data = [
                'status' => $user['status'],
                'role' => $user['roles'][0]['name'],
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
