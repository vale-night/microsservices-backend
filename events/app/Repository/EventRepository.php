<?php

namespace App\Repository;

use App\Models\Event;
use Illuminate\Support\Collection;

class EventRepository extends Eloquent\BaseRepository implements \App\Contracts\EventRepositoryInterface
{

    /**
     * UserRepository constructor.
     *
     * @param Event $model
     */
    public function __construct(Event $model)
    {
        parent::__construct($model);
    }

    /**
     * @return Collection
     */
    public function all(): Collection
    {
        return $this->model->all();
    }

    /**
     * @param $id
     * @return Event
     */
    public function find($id): Event
    {
        return $this->model->find($id);
    }

    public function create(array $attributes): Event
    {
        return $this->model->create($attributes);
    }
}
