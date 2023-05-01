<?php

namespace App\Http\Controllers;

use App\Models\ActivityLogsModel;
use App\Traits\HttpResponse;
use Illuminate\Http\Request;

class ActivityLogsController extends Controller
{

    use HttpResponse;

    protected $logs;

    public function __construct(ActivityLogsModel $logs)
    {
        $this->logs = $logs;
    }

    public function show(Request $request)
    {
        try {
            return $this->success($this->logs->show());
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }
}
