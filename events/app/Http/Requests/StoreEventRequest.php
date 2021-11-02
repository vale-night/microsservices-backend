<?php

namespace App\Http\Requests;

use Axiom\Rules\LocationCoordinates;

class StoreEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    protected function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    protected function rules(): array
    {
        return [
            'name' => 'required|string',
            'description' => 'string',
            'highlight' => 'boolean',
            'age_group' => 'string',
            'location.type' => 'string',
            'location.coordinates.longitude' => [new LocationCoordinates],
            'location.coordinates.latitude' => [new LocationCoordinates]
        ];
    }
}
