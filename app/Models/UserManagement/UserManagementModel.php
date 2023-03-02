<?php

namespace App\Models\UserManagement;

use App\Contracts\UserManagementContract;
use App\Mail\StatusMailer;
use App\Models\User;
use App\Traits\HttpResponse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserManagementModel extends Model implements UserManagementContract
{
    use HttpResponse;

    protected $page;

    const APPROVE = 1;
    const ROLE = ['user', 'admin', 'foundation'];

    public function page(int $page = 10)
    {
        $this->page = $page;
    }


    public function show()
    {
        try {
            // $data = User::with('roles')->get()->toArray();
            // $response = [];

            // foreach ($data as  $key => $datas) {
            //     $response[] = [
            //         'id' => $datas['id'],
            //         'id_no' => $datas['id_no'],
            //         'firstname' => $datas['firstname'],
            //         'middlename' => $datas['middlename'],
            //         'lastname' => $datas['lastname'],
            //         'lastname' => $datas['lastname'],
            //         'contact_no' => $datas['contact_no'],
            //         'email' => $datas['email'],
            //         // 'role' => $datas['roles']['name'],
            //         'status' => $datas['status'],
            //     ];
            // }
            $users = User::select('*')->get();

            // $role = $user
            //   ->getRoleNames()
            //   ->first();

            $response = \Auth::user();

            $data = [];
            foreach ($users as $key => $user) {
                $role = $user->getRoleNames()->first();

                $data[] = [
                    'id' => $user->id,
                    'id_no' => $user->id_no,
                    'firstname' => $user->firstname,
                    'middlename' => $user->middlename,
                    'lastname' => $user->lastname,
                    'contact_no' => $user->contact_no,
                    'email' => $user->email,
                    'role' => $role,
                    'status' => $user->status,
                    'username' => $user->username,
                    'address' => $user->address,
                    'course_type' => $user->course_type,
                    'course' => $user->course,
                ];
            }


            return $this->success($data);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }



    public function create($data)
    {
        try {

            $role = $data->role;

            \DB::beginTransaction();

            $response = User::create([
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
                'status' => 1,
            ]);

            $response->assignRole($role);
            \DB::commit();

            return $this->success($response);
        } catch (\Throwable $throwable) {
            \DB::rollback();
            return $this->error($throwable->getMessage());
        }
    }

    public function updateStatus($data)
    {
        try {

            \DB::beginTransaction();
            $response = User::find($data['id'])->update(['status' => self::APPROVE]);

            Mail::to(User::find($data['id'])['email'])->send(new StatusMailer());

            throw_if($response != 1, \Exception::class, 'Invalid Request');

            \DB::commit();
            return $this->success([
                'message' => 'Successfully Updated Status'
            ]);
        } catch (\Throwable $throwable) {
            \DB::rollback();
            return $this->error($throwable->getMessage());
        }
    }

    public function deleteUser($id)
    {
        try {
            User::find($id)->delete();

            return  $this->success([
                'message' => 'Successfully Deleted'
            ]);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }
}
