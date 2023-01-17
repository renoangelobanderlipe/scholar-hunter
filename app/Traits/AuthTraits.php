<?php

namespace App\Traits;

use App\Models\User;

trait AuthTraits
{
  // NOTE THIS IS A CUSTOM ROLE CHECKER 

  protected function role()
  {
    return \Auth::user();
  }

  protected function assignAdminRole($id)
  {
    return User::where('id_no', $id)->update(['role' => 'admin']);
  }

  protected function assignUserRole($id)
  {
    return User::where('id_no', $id)->update(['role' => 'student']);
  }

  protected function assignFoundationRole($id)
  {
    return User::where('id_no', $id)->update(['role' => 'foundation']);
  }
}
