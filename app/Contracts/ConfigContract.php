<?php

namespace App\Contracts;

interface ConfigContract
{
  public function setType(string $type);
  public function setValue(array $value);
}
