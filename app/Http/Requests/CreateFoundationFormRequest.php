<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateFoundationFormRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'required',
            'address' => 'required',
            'contact_no' => [
                'required',
                'min: 11',
                'max:11',
                'unique:foundations,contact_no'
            ],
            'email' => [
                'required',
                'string',
                'max:255',
                'unique:foundations,email'
            ],
            'type' => 'required|string|max:255',
            'users' => 'array'
        ];
    }
}
