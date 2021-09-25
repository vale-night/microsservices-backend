<?php

namespace App\Contracts;

use Illuminate\Support\Collection;

interface EventRepositoryInterface
{
    public function all(): Collection;
}
