<?php

namespace App\Models;

use App\Traits\HttpResponse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class Foundation extends Model
{
    use HttpResponse;

    protected $fillable = [
        'name',
        'description',
        'address',
        'contact_no',
        'email',
        'type',
    ];


    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function scholarship()
    {
        return $this->belongsto(Scholarship::class);
    }

    public function assignUserTransaction($data)
    {
        try {
            \DB::beginTransaction();

            $user_id = $data['users']['id'];

            $foundation = Foundation::create($data);
            $transaction = \DB::table('foundation_user')
                ->insert([
                    'foundation_id' => $foundation->id,
                    'user_id' => $user_id,
                ]);

            \DB::commit();

            return $this->success($foundation);
        } catch (\Throwable $throwable) {
            \DB::rollback();
            $this->error($throwable->getMessage());
        }
    }


    public function destroyFoundation($id)
    {
        try {
            \DB::beginTransaction();
            self::find($id)->delete();
            \DB::commit();

            return $this->success(['message' => 'Successfully Deleted']);
        } catch (\Throwable $throwable) {
            \DB::rollback();
            $this->error($throwable->getMessage());
        }
    }
}
