<?php

namespace App\Models;

use App\Http\Requests\UserRequest;
use App\Traits\AuthTraits;
use App\Traits\UserTrait;
use Illuminate\Database\Eloquent\Model;

class UserModel extends Model
{
    protected $table = 'users';

    // use AuthTraits, UserTrait;

    public function showProfile()
    {
        return ['Reno Angelo'];
        // return $this->user();
    }
    public function updateProfile()
    {
    }
}
