<?php

namespace App\Helpers\Config;

use App\Contracts\ConfigContract;
use App\Models\ConfigModel;
use App\Scopes\ConfigScope;
use PHPUnit\Framework\MockObject\ConfigurableMethod;

class ConfigHelper implements ConfigContract
{

  protected $type;
  protected $value;

  public function setType(string $type)
  {
    $this->type = $type;
  }

  public function setValue(array $value)
  {
    $this->value = $value;
  }

  public function create()
  {
    return $this->updateOrCreate();
  }

  public function updateOrCreate()
  {
  $configModel = new ConfigModel;

    $configModel->setType($this->type);
    $configModel->setValue($this->value);

    $configModel->configUpdateOrCreate();

    return $this;
  }
}
