<?php

namespace App\Contracts;

interface UserManagementContract
{
  public function page(int $page=10);
}
