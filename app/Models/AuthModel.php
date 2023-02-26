<?php

namespace App\Models;

use App\Contracts\AuthContract;
use App\Traits\HttpResponse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AuthModel extends Model implements AuthContract
{
    use HttpResponse;

    protected $table = 'users';
    protected $hidden = ['id', 'created_at', 'updated_at'];
    protected $guard_name = 'api';

    protected $idNo;
    protected $firstname;
    protected $middlename;
    protected $lastname;
    protected $address;
    protected $username;
    protected $email;
    protected $courseType;
    protected $course;
    protected $contactNo;
    protected $password;


    public function idNo($idNo)
    {
        $this->idNo = $idNo;
    }

    public function firstname($firstname)
    {
        $this->firstname = $firstname;
    }

    public function middlename($middlename)
    {
        $this->middlename = $middlename;
    }

    public function lastname($lastname)
    {
        $this->lastname = $lastname;
    }

    public function address($address)
    {
        $this->address = $address;
    }

    public function username($username)
    {
        $this->username = $username;
    }

    public function email($email)
    {
        $this->email = $email;
    }

    public function courseType($courseType)
    {
        $this->courseType = $courseType;
    }

    public function course($course)
    {
        $this->course = $course;
    }

    public function contactNo($contactNo)
    {
        $this->contactNo = $contactNo;
    }

    public function password($password)
    {
        $this->password = $password;
    }

    public function register()
    {
        $data = [
            'id_no' => $this->idNo,
            'firstname' => $this->firstname,
            'middlename' => $this->middlename,
            'lastname' => $this->lastname,
            'address' => $this->address,
            'username' => $this->username,
            'email' => $this->email,
            'course_type' => $this->courseType,
            'course' => $this->course,
            'contact_no' => $this->contactNo,
            'password' => Hash::make($this->password),
            'status' => self::STATUS,
        ];
        return $data;
    }

    public function registerTransaction()
    {
        try {
            \DB::beginTransaction();
            $user = User::create($this->register());
            
            $data = [
                'data' => [
                    'id_no' => $user->id_no,
                    'firstname' => $user->firstname,
                    'middlename' => $user->middlename,
                    'lastname' => $user->lastname,
                    'status' => $user->status,
                    'role' => 'user',
                ],
                'token' => $user->createToken(env("SANCTUM_SECRET"))->plainTextToken
            ];

            $user->assignRole('user');
            \DB::commit();

            return $this->success($data);
        } catch (\Throwable $throwable) {
            \DB::rollback();
            return $this->error($throwable->getMessage());
        }
    }
    public function login($data)
    {
        $user = User::where('email', $data['email'])->first();

        return [
            'data' => [
                'firstname' => $user->firstname,
                'middlename' => $user->middlename,
                'lastname' => $user->lastname,
                'email' => $user->email,
                'role' => $user->getRoleNames()->first(),
                'status' => $user->status == 0 ? 'pending' : 'active',
            ],
            'token' => $user->createToken(env("SANCTUM_SECRET"))->plainTextToken
        ];
    }

    public function logout()
    {
        \Auth::user()->currentAccessToken()->delete();

        return $this->success([
            'message' => 'Successfully Logged Out!'
        ]);
    }

    public function userFoundationTransaction()
    {
        try {
            \DB::beginTransaction();
            $this->createUserFoundation();
            \DB::commit();

            return $this->success(['message' => 'Success']);
        } catch (\Throwable $throwable) {
            \DB::rollback();
            return $this->error($throwable->getMessage());
        }
    }

    public function foundation()
    {
    }
}
