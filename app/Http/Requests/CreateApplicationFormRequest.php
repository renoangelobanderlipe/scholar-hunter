<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateApplicationFormRequest extends FormRequest
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
            'user_id' => 'required',
            'scholarship_id' => 'required',
            'status' => 'required',
            'attachments' => 'array',
            'attachments.*' => [
                'file',
                'mimes:jpeg,png,jpg,pdf,doc,docx,xls,xlsx',
            ] 
        ];
    }
}
