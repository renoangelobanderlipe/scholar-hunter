<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
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

    public function validateProfile()
    {
        return [
            'username' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'course_type' => ['required', 'string', 'max:255'],
            'course' => ['required', 'string', 'max:255'],
            'degree' => ['required', 'string', 'max:255'],
            'contact_no' => ['required', 'string', 'max:255'],
        ];
    }

    public function updateProfile()
    {
        try {
            $this->only([
                'username', 'address', 'course_type', 'course', 'degree', 'contact_no',
            ]);
            \DB::beginTransaction();

            \DB::commit();
            return $response;
        } catch (\Throwable $throwable) {
            // return $this->erro
        }
    }
}
