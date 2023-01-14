<?php

namespace App\Http\Controllers\Config;

use App\Http\Controllers\Controller;
use App\Models\AccountTypeModel;
use App\Traits\HttpResponseTraits;

class AccountTypeController extends Controller
{
    use HttpResponseTraits;

    public function show()
    {
        try {
            $response = AccountTypeModel::show();

            return $this->success($response);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }
}
