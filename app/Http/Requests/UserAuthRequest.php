<?php

namespace App\Http\Requests;

use App\Models\AuthModel;
use App\Traits\UserTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UserAuthRequest extends FormRequest
{

    use UserTrait;

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

    public function validateCreate()
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
            'password' => ['required', 'string', 'min:6'],
            'role' => ['required', 'string', 'max:255'],
            'status' => ['required', 'max:255'],
        ];
    }

    public function register()
    {
        $authModel = new AuthModel;

        $authModel->idNo = $this->all()['idNo'];
        $authModel->firstname = $this->all()['firstname'];
        $authModel->middlename = $this->all()['middlename'];
        $authModel->lastname = $this->all()['lastname'];
        $authModel->address = $this->all()['address'];
        $authModel->username = $this->all()['username'];
        $authModel->contactNo = $this->all()['contact_no'];
        $authModel->email = $this->all()['email'];
        $authModel->course = $this->all()['course'];
        $authModel->courseType = $this->all()['course_type'];
        $authModel->password = $this->all()['password'];
        $authModel->role = $this->all()['role'];
        $authModel->status = $this->all()['status'];
    }

    public function validateLogin()
    {
        if (!Auth::attempt($this->only(['email', 'password']))) {
            return $this->error('', 'Invalid credentials', 401);
        }

        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string', 'min:6'],
        ];
    }

    public function validatedLogin()
    {
        $authModel = new AuthModel;

        $authModel->email = $this->all()['email'];
        $authModel->passthru = $this->all()['password'];
    }

    public function login()
    {
    }
}
