<?php

namespace App\Repository\Eloquent;

use App\Contracts\EloquentRepositoryInterface;
use Jenssegers\Mongodb\Eloquent\Model;

class BaseRepository implements EloquentRepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * @param array $attributes
     *
     * @return Model
     */
    public function create(array $attributes): Model
    {
        return $this->model->create($attributes);
    }

    /**
     * @param $id
     * @return Model|null
     */
    public function find($id): ?Model
    {
        return $this->model?->findOrFail($id);
    }

    /**
     * @param array $attributes
     * @param $id
     *
     * @return Model
     */
    public function update(array $attributes, $id): Model
    {
        $model = $this->find($id);

        $model->update($attributes);

        return $model;
    }
}
