<?php

namespace App\Scopes;

use App\Models\ConfigModel;

class ConfigScope
{
  public function find($id)
  {
    return ConfigModel::find($id);
  }

  public function search($keyword, $value)
  {
    if (!isset($keyword)) return 'atdog';
    if (!isset($keyword)) return 'atdog';

    if ($keyword == 'option_value') {
      return ConfigModel::where('option_value', '=', $value);
    }
    if ($keyword == 'option_name') {
      return ConfigModel::where('option_value', '=', $value);
    }
    return 'Enter Valid Scope Request';
  }

  public function create(array $data)
  {
    return ConfigModel::create($data)->get()->toArray();
  }

  public function updateOrCreate(array $validate, array $data)
  {
    return ConfigModel::updateOrCreate($validate, $data)->get()->toArray();
  }
}
