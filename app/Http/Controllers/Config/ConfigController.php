<?php

namespace App\Http\Controllers\Config;

use App\Helpers\Config\ConfigHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\ConfigRequest;
use App\Traits\HttpResponseTraits;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
    use HttpResponseTraits;

    public function show()
    {
    }

    public function store(ConfigRequest $request)
    {
        try {
            $configHelper = new ConfigHelper;

            $configHelper->setType($request->option_name);
            $configHelper->setValue($request->option_value);

            return $this->success($configHelper->create());
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }
}
