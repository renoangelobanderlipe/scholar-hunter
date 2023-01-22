<?php

namespace App\Traits;

use App\Models\User;

trait AuthTraits
{

  protected function scopeUser()
  {
    return User::query();
  }

  protected function assignRole(int $id, string $keyword = 'student')
  {
    return $this->where('id_no', $id)
      ->update(['role' => (string)$keyword]);
  }

  protected function hasRole()
  {
    return $this->user()
      ->where('id_no', $this->role()->id_no)
      ->first();
  }

}
