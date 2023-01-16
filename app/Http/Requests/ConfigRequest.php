<?php

namespace App\Http\Requests;

use App\Helpers\Config\ConfigHelper;
use App\Traits\HttpResponseTraits;
use Illuminate\Foundation\Http\FormRequest;

class ConfigRequest extends FormRequest
{
    use HttpResponseTraits;
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            //
        ];
    }

    public function configValidation()
    {
        return [
            'option_name' => ['required', 'string', 'max:255'],
            'option_value' => ['required', 'string', 'max:255'],
        ];
    }

    public function createConfig()
    {
        try {
            $this->only(['option_name', 'option_value']);
            \DB::beginTransaction();
            $configHelper = new ConfigHelper;

            $configHelper->setType($this->option_name);
            $configHelper->setValue($this->option_value);

            $response = $configHelper->updateOrCreate();
            \DB::commit();
            return $response;
        } catch (\Throwable $throwable) {
            \DB::rollback();
            return $this->error($throwable->getMessage());
        }
    }
}
