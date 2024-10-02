<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|array',
            'name.*' => 'required|string', // Ensures each name in the array is a string
            'faculty_id' => 'required|exists:faculties,id',
            'semester_id' => 'required|exists:semesters,id',
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'name.array' => 'The name field must be an array of subjects.',
            'name.*.required' => 'Each subject name is required.',
            'faculty_id.required' => 'The faculty field is required.',
            'faculty_id.exists' => 'The selected faculty does not exist.',
            'semester_id.required' => 'The semester field is required.',
            'semester_id.exists' => 'The selected semester does not exist.',
        ];
    }
}
