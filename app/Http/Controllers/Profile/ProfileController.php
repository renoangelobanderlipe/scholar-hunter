<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\HttpResponseTraits;
use Illuminate\Http\Request;
use App\Scopes\UserScope;

class ProfileController extends Controller
{
    use HttpResponseTraits;

    public function index()
    {
        try {
        } catch (\Throwable $throwable) {
            $this->error($throwable->getMessage());
        }
    }

    public function updateInfo()
    {
        try {
        } catch (\Throwable $throwable) {
            $this->error($throwable->getMessage());
        }
    }

    public function updatePassword(Request $request)
    {
        try {
        } catch (\Throwable $throwable) {
            $this->error($throwable->getMessage());
        }
    }
}
