<?php

namespace App\Models\UserManagement;

use App\Contracts\UserManagementContract;
use App\Models\User;
use App\Traits\HttpResponse;
use Illuminate\Database\Eloquent\Model;

class UserManagementModel extends Model implements UserManagementContract
{
    use HttpResponse;

    protected $page;

    public function page(int $page = 10)
    {
        $this->page = $page;
    }

    public function show()
    {
        try {
            $data = User::select('*')->paginate(10);

            // $response = [];
            // foreach ($data as $users) {
            //     dd($users->getRoleNames());
            //     $response[] = $users->getRoleNames();
            // }


            return $this->success($data);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }
}
