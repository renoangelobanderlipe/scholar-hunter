<?php

namespace App\Scopes;

use App\Models\User;

class UserScope
{
  public function all(): Object
  {
    return User::all()->limit(5);
  }

  public function create(array $data): Object
  {
    return User::create($data);
  }
}
