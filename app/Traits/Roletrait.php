<?php

namespace App\Traits;

trait RoleTrait
{
  protected function assignRole($user, string $role)
  {
    return $user->assignRole($role);
  }
}
