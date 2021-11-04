<?php

namespace App\Contracts;

use Jenssegers\Mongodb\Eloquent\Model;

/**
 * Interface EloquentRepositoryInterface
 * @package App\Repositories
 */
interface EloquentRepositoryInterface
{
    /**
     * @param array $attributes
     * @return Model
     */
    public function create(array $attributes): self;

    /**
     * @param $id
     * @return Model
     */
    public function find($id): self;

    /**
     * @return Model|null;
     */
    public function object(): ?Model;
}
