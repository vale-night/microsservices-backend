<?php

namespace App\Contracts;

use App\Models\Event;
use Illuminate\Support\Collection;

interface EventRepositoryInterface
{
    public function all(): Collection;
    public function find(string $_id): Event;
    public function create(array $attributes): Event;
}
