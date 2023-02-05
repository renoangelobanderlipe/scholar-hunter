<?php

namespace App\Contracts;

interface AuthContract
{
  const STATUS = 0;

  public function idNo($idNo);
  public function firstname($firstname);
  public function middlename($middlename);
  public function lastname($lastname);
  public function address($address);
  public function username($username);
  public function email($email);
  public function courseType($courseType);
  public function course($course);
  public function contactNo($contactNo);
  public function password($password);
}
