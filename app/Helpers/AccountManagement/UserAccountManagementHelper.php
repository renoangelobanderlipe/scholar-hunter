<?php

namespace App\Helpers\AccountManagement;

use App\Contracts\UserManagementContract;
use App\Models\UserManagementModel;

class UserAccountManagementHelper implements UserManagementContract
{

  protected $profile;
  protected $password;

  public function setUpdateProfile()
  {
  }
  public function setUpdatePassword()
  {
  }

  public function create()
  {
    $this->updateInfo();
  }

  public function updateInfo()
  {
    $userAccountManagement = new UserManagementModel;

    dd
  }
}
