<?php

namespace App\Http\Controllers\Config;

use App\Http\Controllers\Controller;
use App\Models\DegreeModel;
use App\Traits\HttpResponseTraits;

class DegreeController extends Controller
{
    use HttpResponseTraits;

    public function show()
    {
        try {
            $response = DegreeModel::show();

            return $this->success($response);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function store()
    {
        try {
            $response = DegreeModel::show();

            return $this->success($response);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }
}
