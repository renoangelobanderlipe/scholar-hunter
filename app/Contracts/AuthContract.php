<?php

namespace App\Contract;

interface AuthContract
{

  const STATUS = 0;

  public function idNo(string $idNo);
  public function firstname(string $firstname);
  public function middlename(string $middlename);
  public function lastname(string $lastname);
  public function address(string $address);
  public function username(string $username);
  public function email($email);
  public function course(string $course);
  public function role(string $role);
  public function contact_no($contactNo);
  public function password($password);
  public function status(bool $status);
}
