<?php

namespace App\Http\Requests;

use App\Models\AuthModel;
use App\Traits\HttpResponseTraits;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class LoginRequest extends FormRequest
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
            'email' => ['required', 'string', 'email'],
            'id_no' => ['nullable', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:6'],
        ];
    }

    public function login()
    {

        // if (!Auth::attempt($this->all())) {
        //     return $this->error(['message' => 'Invalid credentials'], 401);
        // }
        return (new AuthModel)->login($this->all());
    }
}
