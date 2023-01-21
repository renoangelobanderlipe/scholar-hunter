<?php

namespace App\Traits;

use App\Models\User;

trait AuthTraits
{
  protected function role()
  {
    return \Auth::user();
  }

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

  // protected function assignAdminRole($id)
  // {
  //   return $this->where('id_no', $id)->update(['role' => 'admin']);
  // }

  // protected function assignUserRole($id)
  // {
  //   return $this->where('id_no', $id)->update(['role' => 'student']);
  // }

  // protected function assignFoundationRole($id)
  // {
  //   return $this->where('id_no', $id)->update(['role' => 'foundation']);
  // }
}
