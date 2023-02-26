<?php

namespace App\Models;

use App\Traits\HttpResponse;
use Illuminate\Database\Eloquent\Model;

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
}
