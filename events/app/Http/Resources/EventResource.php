<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{


    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            '_id' => $this->_id,
            'name' => $this->name,
            'description' => $this->description,
            'highlight' => $this->highlight,
            'age_group' => $this->age_group,
            'location' => $this->location,
        ];
    }
}
