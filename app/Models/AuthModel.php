<?php

namespace App\Models;

use App\Contract\AuthContract;
use App\Traits\UserTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class AuthModel extends Model implements AuthContract
{

    use UserTrait;

    protected $idNo;
    protected $firstname;
    protected $middlename;
    protected $lastname;
    protected $address;
    protected $username;
    protected $email;
    protected $courseType;
    protected $course;
    protected $role;
    protected $contactNo;
    protected $password;
    protected $status;

    public function idNo(string $idNo)
    {
        $this->idNo = $idNo;
    }

    public function firstname(string $firstname)
    {
        $this->firstname = $firstname;
    }

    public function middlename(string $middlename)
    {
        $this->middlename = $middlename;
    }

    public function lastname(string $lastname)
    {
        $this->lastname = $lastname;
    }
    public function address(string $address)
    {
        $this->address = $address;
    }

    public function username(string $username)
    {
        $this->username = $username;
    }

    public function email($email)
    {
        $this->email = $email;
    }

    public function course(string $course)
    {
        $this->course = $course;
    }

    public function role(string $role)
    {
        $this->role = $role;
    }

    public function contact_no($contactNo)
    {
        $this->contactNo = $contactNo;
    }

    public function password($password)
    {
        $this->password = Hash::make($password);
    }

    public function status(bool $status)
    {
        $this->status = self::STATUS;
    }

    public function register()
    {
        \DB::beginTransaction();
        $user = [
            'id_no' => $this->idNo,
            'firstname' => $this->firstname,
            'middlename' => $this->middlename,
            'lastname' => $this->lastname,
            'address' => $this->address,
            'username' => $this->username,
            'email' => $this->email,
            'course_type' => $this->course_type,
            'course' => $this->course_type,
            'role' => $this->role,
            'contact_no' => $this->contact_no,
            'password' => Hash::make($this->password),
            'status' => 0,
        ];

        $createdUser = User::updateOrCreate([
            'id_no' => $this->idNo,
            'email' => $this->email,
        ], $user);

        \DB::commit();

        $createdUser->assignRole('user');

        return $this->success([
            'token' => $createdUser->createToken('auth-token')->plainTextToken,
        ]);
    }

    public function login()
    {
        \DB::beginTransaction();
        $user = User::where('email', $this->email)->first();
        \DB::commit();

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('auth-token')->plainTextToken
        ]);
    }

    public function logout()
    {
        if ($this->hasAuth()) {
            $this->hasAuth()->currentAccssToken()->delete();

            return ['data' => 'Successfully Deleted'];
        }

        return ['data' => 'No User Found'];
    }
}
