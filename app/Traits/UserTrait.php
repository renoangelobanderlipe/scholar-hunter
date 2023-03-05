<?php

namespace App\Traits;

trait UserTrait
{
  protected function info()
  {
    return \Auth::user();
  }
}
