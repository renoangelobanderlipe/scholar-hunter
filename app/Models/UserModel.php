<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserModel extends Model
{
    protected $table = 'users';

    public function showProfile()
    {
        $requiredData = ['id_no', 'firstname', 'middlename', 'lastname', 'username', 'address', 'email', 'course_type', 'course', 'contact_no', 'role'];

        return \Auth::user()->only($requiredData);
    }

    public function updateProfile()
    {
    }
}
