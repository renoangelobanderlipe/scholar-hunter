<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ScholarshipRequest extends FormRequest
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
            'id' => ['required', 'string'],
            'foundation_id' => ['required', 'string'],
            'file' => ['required', 'file', 'max:5000', 'mimes:jpeg,jpg,png,pdf,doc,docx'],
        ];
    }
}
