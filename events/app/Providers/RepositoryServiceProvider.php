<?php

namespace App\Providers;

use App\Contracts\EloquentRepositoryInterface;
use App\Contracts\EventRepositoryInterface;
use App\Repository\Eloquent\BaseRepository;
use App\Repository\EventRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(EloquentRepositoryInterface::class, BaseRepository::class);
        $this->app->bind(EventRepositoryInterface::class, EventRepository::class);
    }
}
