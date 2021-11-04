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

    public function set(Model $model): self
    {
        $this->model = $model;
        return $this;
    }

    /**
     * @param array $attributes
     *
     * @return self
     */
    public function create(array $attributes): self
    {
        $this->model = $this->model->create($attributes);
        return $this;
    }

    /**
     * @param $id
     * @return self
     */
    public function find($id): self
    {
        $this->model = $this->model?->findOrFail($id);
        return $this;
    }

    public function object(): ?Model
    {
        return $this->model;
    }

    /**
     * @param array $attributes
     * @param $id
     *
     * @return self
     */
    public function update(array $attributes): self
    {
        $this->model->update($attributes);
        return $this;
    }

    public function delete(): self
    {
        $this->model->delete();
        return $this;
    }
}
