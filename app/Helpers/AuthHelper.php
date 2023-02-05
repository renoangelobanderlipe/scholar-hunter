<?php

namespace App\Helpers;

use App\Contracts\AuthContract;
use App\Models\User;
use App\Traits\HttpResponseTraits;
use App\Traits\UserTrait;
use Illuminate\Support\Facades\Hash;

class AuthHelper implements AuthContract
{
  use UserTrait, HttpResponseTraits;

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

  public function show()
  {
    $response = $this->info();

    $data = [
      'email' => $response->email,
      'id_no' => $response->id_no,
      'firstname' => $response->firstname,
      'middlename' => $response->middlename,
      'lastname' => $response->lastname,
      'address' => $response->address,
      'username' => $response->username,
      'contact_no' => $response->contact_no,
      'course_type' => $response->course_type,
      'course' => $response->course,
    ];

    return $data;
  }

  public function updateProfile($data)
  {
    try {
      \DB::beginTransaction();
      $response = User::where('id', \Auth::user()->id)->update($data);
      \DB::commit();
      return $this->success($response == 1 ?  'Success' : 'Something Wen\'t Wrong');
    } catch (\Throwable $throwable) {
      return $this->error($throwable->getMessage());
    }
  }

  public function updatePassword()
  {
    try {
      if (!Hash::check($this->password['current_password'], \Auth::user()->password)) {
        return $this->error('Invalid Credentials');
      }

      \DB::beginTransaction();
      $response = User::where('id', \Auth::user()->id)->update(['password' => Hash::make($this->password['password'])]);
      \DB::commit();

      return $this->success($response);
    } catch (\Throwable $throwable) {
      return $this->error($throwable->getMessage());
    }
  }
}
