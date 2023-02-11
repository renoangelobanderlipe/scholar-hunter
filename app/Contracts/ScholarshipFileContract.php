<?php

namespace App\Contracts;

interface ScholarshipFileContract
{
  public function idNo(string $id);
  public function foundationId(int $id);
  public function fileId(int $id);
  public function fileName(string $name);
  public function fileLocation(string $name);
}
