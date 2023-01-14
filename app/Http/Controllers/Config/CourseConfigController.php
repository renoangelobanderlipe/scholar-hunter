<?php

namespace App\Http\Controllers\Config;

use App\Http\Controllers\Controller;
use App\Http\Requests\CourseConfigRequest;
use App\Models\CourseConfig;
use App\Traits\HttpResponseTraits;

class CourseConfigController extends Controller
{

    use HttpResponseTraits;

    public function show()
    {
        try {
            $response = CourseConfig::show();
            return $this->success($response);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function store(CourseConfigRequest $courseConfigRequest)
    {
        try {
            $response = CourseConfig::store($courseConfigRequest);
            return $this->success($response);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }
}
