<?php

namespace App\Http\Requests;

use App\Models\AuthModel;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'id_no' => ['required', 'string', 'max:255'],
            'firstname' => ['required', 'string', 'max:255'],
            'middlename' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255'],
            'contact_no' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'course' => ['required', 'string', 'max:255'],
            'course_type' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ];
    }

    public function register()
    {
        $request = (object)$this->all()['values'];

        return (new AuthModel)->register($request);
    }
}
