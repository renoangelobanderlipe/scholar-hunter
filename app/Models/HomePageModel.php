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
    const ALLOWED_USERS = ['admin', 'foundation', 'user'];

    public function scopeId()
    {
        return \Auth::user()->id;
    }

    public function scopeApplications()
    {
        return Application::select('*');
    }

    public function scopeFoundationUser()
    {
        return \DB::table('foundation_user');
    }

    public function foundationStatus($type)
    {
        throw_if(!in_array($type, self::ALLOWED_USERS), \Exception::class, 'Invalid Request');

        return $this->applicantStatus();
    }

    public function applicants($keyword, $id)
    {
        return $this->applications()->where($keyword, $id);
    }

    public function userFoundation()
    {
        return  $this->foundationUser()
            ->where('user_id', $this->id())
            ->first();
    }

    public function totalScholarship($type)
    {
        throw_if(!in_array($type, self::ALLOWED_USERS), \Exception::class, 'Invalid Request');

        try {
            $total = $this->applicants('foundation_id', $this->userFoundation()->foundation_id)->get()->count();

            $data = [
                ['name' => 'total'],
                ['value' => $total],
            ];

            return $this->success($data);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function applicantStatus()
    {
        try {
            $pending = $this->applicants('foundation_id', $this->userFoundation()->foundation_id)->where('status', 'pending')->get()->count();

            $approved = $this->applicants('foundation_id', $this->userFoundation()->foundation_id)->where('status', 'approved')->get()->count();

            $rejected = $this->applicants('foundation_id', $this->userFoundation()->foundation_id)->where('status', 'rejected')->get()->count();

            $data =    [
                [
                    'name' => 'pending',
                    'value' => $pending,
                ],
                [
                    'name' => 'approved',
                    'value' => $approved,
                ],
                [
                    'rejected' => 'rejected',
                    'value' => $rejected,
                ]
            ];
            return $this->success($data);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function totalAll()
    {
        try {
            $totalScholars = User::join('model_has_roles', 'model_has_roles.model_id', '=', 'users.id')
                ->leftJoin('roles', 'roles.id', '=', 'model_has_roles.role_id')
                ->where('roles.name', '=', 'user')
                ->get()
                ->count();
            $totalScholarships = Scholarship::select('*')->get()->count();

            $totalFoundations = Foundation::select('*')->get()->count();

            $data = [
                [
                    'name' => 'scholars',
                    'value' => $totalScholars
                ],
                [
                    'name' => 'scholarships',
                    'value' => $totalScholarships
                ],
                [
                    'name' => 'foundations',
                    'value' => $totalFoundations
                ],
            ];

            return $this->success($data);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function userTypes()
    {
        try {
            $users = User::all();

            $approved = $users->where('status', 1)->count();
            $pending = $users->where('status', 0)->count();

            $data = [
                [
                    'name' => 'approved',
                    'value' => $approved,
                ],
                [
                    'name' => 'pending',
                    'value' => $pending,
                ],
            ];

            return $this->success($data);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    // public function foundationCount($keyword)
    // {
    //     try {
    //         throw_if(!in_array($keyword, self::ALLOWED_KEYWORD),  Exception::class, 'Invalid Parameter');

    //         return $this->success(Foundation::where('type', $keyword)->count());
    //     } catch (\Throwable $throwable) {
    //         return $this->error($throwable->getMessage());
    //     }
    // }

    // public function scholarsCount($keyword = 'active')
    // {
    //     try {
    //         throw_if(!in_array($keyword, self::ALLOWED_SCHOLARS_KEYWORD),  Exception::class, 'Invalid Parameter');

    //         $response = User::where('status', $keyword == 'active' ? 1 : 0)->get()
    //             ->count();

    //         return $this->success($response);
    //     } catch (\Throwable $throwable) {
    //         return $this->error($throwable->getMessage());
    //     }
    // }

    // public function status($keyword)
    // {
    //     try {
    //         throw_if(!in_array($keyword, self::ALLOWED_USER_STATUS),  Exception::class, 'Invalid Parameter');

    //         $user = \Auth::user();

    //         $response = User::where();

    //         return $this->success($response);
    //     } catch (\Throwable $throwable) {
    //         return $this->error($throwable->getMessage());
    //     }
    // }
}
