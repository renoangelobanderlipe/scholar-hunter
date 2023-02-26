<?php

namespace App\Http\Controllers\UserManagement;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserManagement\UserManagementModel;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{

    protected $user;

    public function __construct(UserManagementModel $user)
    {
        return $this->user = $user;
    }

    public function create(Request $request)
    {
        return $this->user->create((object)$request->only(['values'])['values']);
    }

    public function update(Request $request)
    {
        return $this->user->updateStatus($request->all());
    }

    public function show()
    {
        // $this->user->page(10);

        return $this->user->show();
    }
    public function destroy(Request $request)
    {
        return $this->user->deleteUser($request->all()['id']);
    }
}
