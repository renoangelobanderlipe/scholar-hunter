<?php

namespace App\Models;

use App\Traits\HttpResponseTraits;
use Exception;
use Illuminate\Database\Eloquent\Model;

class HomePageModel extends Model
{
    use HttpResponseTraits;

    const ALLOWED_KEYWORD = ['private', 'public'];
    const ALLOWED_SCHOLARS_KEYWORD = ['active', 'inactive'];

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

            return $this->success(User::where('status', $keyword == 'active' ? 1 : 0)->get()->count());
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }
}
