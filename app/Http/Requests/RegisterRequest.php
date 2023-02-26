<?php

namespace App\Http\Requests;

use App\Http\Controllers\Auth\AuthController;
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
            'id_no' => ['nullable', 'string', 'max:255'],
            'firstname' => ['required', 'string', 'max:255'],
            'middlename' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255'],
            'contact_no' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'course' => ['nullable', 'string', 'max:255'],
            'course_type' => ['nullable', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ];
    }

    public function register()
    {
        $request = (object)$this->all();
        $authModel = new AuthModel;
        $authModel->idNo($request->id_no == null ? null :  $request->id_no);
        $authModel->firstname($request->firstname);
        $authModel->middlename($request->middlename);
        $authModel->lastname($request->lastname);
        $authModel->address($request->address);
        $authModel->username($request->username);
        $authModel->contactNo($request->contact_no);
        $authModel->email($request->email);
        $authModel->course($request->course);
        $authModel->courseType($request->course_type);
        $authModel->password($request->password);

        return $authModel->registerTransaction();
    }
}
