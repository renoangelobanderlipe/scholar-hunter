<?php

namespace App\Traits;

trait UserTrait
{
  /**
   * User logged in information
   * 
   */
  protected function hasAuth()
  {
    return \Auth::user();
  }
}
