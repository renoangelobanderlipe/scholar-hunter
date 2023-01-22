<?php

namespace App\Traits;

trait UserTrait
{
  protected function user()
  {
    return \Auth::user();
  }

  protected function firstName()
  {
    return $this->user()->firstname;
  }

  protected function middleName()
  {
    return $this->user()->middlename;
  }

  protected function lastName()
  {
    return $this->user()->lastname;
  }

  protected function address()
  {
    return $this->user()->address;
  }

  protected function course()
  {
    return $this->user()->course;
  }

  protected function degree()
  {
    return $this->user()->degree;
  }

  protected function contactNo()
  {
    return $this->user()->contact_no;
  }
}
