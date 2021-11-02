<?php

namespace App\Contracts;

use Illuminate\Support\Collection;

interface EventRepositoryInterface
{
    public function all(): Collection;
    public function search(string $query): Collection;
}
