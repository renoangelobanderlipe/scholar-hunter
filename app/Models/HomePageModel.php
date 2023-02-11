<?php

namespace App\Models;

use App\Traits\HttpResponse;
use Exception;
use Illuminate\Database\Eloquent\Model;

class HomePageModel extends Model
{
    use HttpResponse;

    const ALLOWED_KEYWORD = ['private', 'public'];
    const ALLOWED_SCHOLARS_KEYWORD = ['active', 'inactive'];
    const ALLOWED_USER_STATUS = ['applied', 'approved', 'pending'];

    public function foundationCount($keyword)
    {
        try {
            throw_if(!in_array($keyword, self::ALLOWED_KEYWORD),  Exception::class, 'Invalid Parameter');

            return $this->success(Foundation::where('type', $keyword)->count());
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function scholarsCount($keyword = 'active')
    {
        try {
            throw_if(!in_array($keyword, self::ALLOWED_SCHOLARS_KEYWORD),  Exception::class, 'Invalid Parameter');

            $response = User::where('status', $keyword == 'active' ? 1 : 0)->get()
                ->count();

            return $this->success($response);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function status($keyword)
    {
        try {
            throw_if(!in_array($keyword, self::ALLOWED_USER_STATUS),  Exception::class, 'Invalid Parameter');

            $user = \Auth::user();

            $response = User::where();

            return $this->success($response);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }
}
