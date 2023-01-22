<?php

namespace App\Http\Controllers\UserManagement;

use App\Http\Controllers\Controller;
use App\Models\UserManagementModel;
use App\Traits\HttpResponseTraits;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{
    use HttpResponseTraits;

    protected $user;

    // Dependency Inject to avoid redundant calls
    public function __construct(UserManagementModel $user)
    {
        $this->user = $user;
    }

    public function list()
    {
        try {
            return $this->success($this->user->showList());
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function listById(Request $request)
    {
        try {
            return $this->success($this->user->getInfoById($request->only(['id'])['id']));
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            return $this->success($this->user->createUser($request->only(['values'])['values']));
        } catch (\Throwable $throwable) {
            $this->error($throwable->getMessage());
        }
    }


    public function deleteUser(Request $request)
    {
        try {
            return $this->success($this->user->deleteUser((int)$request->only(['id'])['id']));
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }
}
