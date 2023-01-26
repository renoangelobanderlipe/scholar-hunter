<?php

namespace App\Models;

use App\Traits\HttpResponseTraits;
use Illuminate\Database\Eloquent\Model;

class UserManagementModel extends Model
{

  use HttpResponseTraits;

  protected $table = 'users';
  protected $hidden = ['password', 'created_at', 'updated_at', 'remember_token', 'email_verified_at'];

  public function scopeAll()
  {
    return UserModel::query();
  }

  public function scopeUser()
  {
    return User::query();
  }

  public function showList()
  {
    return $this->all()->toArray();
  }

  public function createUser(array $data)
  {

    return User::create([
      'id_no' => $data['id_no'],
      'firstname' => $data['firstname'],
      'middlename' => $data['middlename'],
      'lastname' => $data['lastname'],
      'address' => $data['address'],
      'username' => $data['username'],
      'contact_no' => $data['contact_no'],
      'email' => $data['email'],
      'course' => $data['course'],
      'course_type' => $data['course_type'],
      'role' => $data['role'],
      'password' => $data['password'],
      'status' => $data['status']
    ]);
  }

  public function getInfoById(int $id)
  {
    return $this->all()->where('id', $id)->toArray();
  }

  public function updateStatus($id)
  {
    $user = UserModel::find($id);
    $user->status = 1;
    $user->save();
    return $user;
  }

  public function deleteUser(int $id)
  {
    return $this->all()->find($id)->delete();
  }
}
