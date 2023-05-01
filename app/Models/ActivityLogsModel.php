<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityLogsModel extends Model
{
    use HasFactory;
    protected $table = 'logs';
    protected $fillable = ['account_type', 'section', 'action', 'old_data', 'new_data'];

    protected $user_id;
    protected $type;
    protected $section;
    protected $action;
    protected $old_data;
    protected $new_data;


    public function scopeCreate(\Builder $query, array $data)
    {
        return self::craete($data);
    }

    public function setUserId(string $user_id)
    {
        $this->user_id = $user_id;

        return $this;
    }

    public function setAccountType(string $type)
    {
        $this->type = $type;

        return $this;
    }
    public function setSection(string $section)
    {
        $this->section = $section;

        return $this;
    }
    public function setAction(string $action)
    {
        $this->action = $action;

        return $this;
    }
    public function setOldData(string $old_data = '')
    {
        $this->old_data = $old_data;

        return $this;
    }
    public function setNewData(string $new_data = '')
    {
        $this->new_data = $new_data;

        return $this;
    }

    public function create()
    {
        try {
            \DB::table('logs')->insert($this->format());
        } catch (\Throwable $throwable) {
            return $throwable->getMessage();
        }
    }

    public function format()
    {
        return [
            'user_id' => $this->user_id,
            'account_type' => $this->type,
            'section' => $this->section,
            'action' => $this->action,
            'old_data' => $this->old_data,
            'new_data' => $this->new_data,
        ];
    }


    public function show()
    {
        return $this->arrayResponse();
    }

    public function arrayResponse()
    {
        return self::select([
            'logs.*',
            \DB::raw("CONCAT(users.firstname,' ',users.lastname) AS full_name")
        ])->join('users', 'users.id', 'logs.user_id')

            ->get()
            ->toArray();
    }

    public function array()
    {
    }
}
