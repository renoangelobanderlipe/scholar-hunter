<?php

namespace App\Models;

use App\Contracts\ConfigContract;
use App\Http\Resources\ConfigResource;
use App\Scopes\ConfigScope;
use Illuminate\Database\Eloquent\Model;

class ConfigModel extends Model implements ConfigContract
{
    protected $table = 'config';
    protected $guarded = ['id'];
    protected $hidden = ['id', 'created_at', 'updated_at'];

    public function setType(string $type)
    {
        $this->type = $type;
    }

    public function setValue(array $value)
    {
        $this->value = $value;
    }

    public function create(ConfigResource $configResource)
    {
    }


    public function configUpdateOrCreate()
    {
        return self::updateOrCreate(['option_name' => $this->type], [
            'option_name' => $this->type,
            'option_value' => json_encode($this->value),
        ]);
    }
}
