<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserFormRequest extends FormRequest
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
            'id_no' => 'nullable|string',
            'firstname' => ['required', 'string', 'max:255'],
            'middlename' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'username' => [
                'nullable',
                'string',
                'max:255',
                'unique:users,username'
            ],
            'contact_no' => [
                'required',
                'min: 11',
                'max:11',
                'unique:users,contact_no'
            ],
            'email' => [
                'required',
                'string',
                'max:255',
                'unique:users,email'
            ],
            'course' => 'required|string',
            'course_type' => 'required|string',
            'password' => ['required', 'confirmed'],
            'role' => 'required|string',
            'status' => 'required|string',
        ];
    }
}
