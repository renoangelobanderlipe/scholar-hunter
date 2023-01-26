<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\UserModel;
use App\Traits\HttpResponseTraits;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    use HttpResponseTraits;

    protected $user;

    public function __construct(UserModel $user)
    {
        $this->user = $user;
    }

    public function index()
    {
        try {
            return $this->success($this->user->showProfile());
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function updateProfile(UserRequest $request)
    {
        try {
            return $this->success($this->user->updateProfile());
        } catch (\Throwable $throwable) {
            $this->error($throwable->getMessage());
        }
    }

    public function updatePassword()
    {
        try {
            return $this->success($this->user->updatePassword());
        } catch (\Throwable $throwable) {
            $this->error($throwable->getMessage());
        }
    }
}
