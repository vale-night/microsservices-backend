<?php

namespace App\Providers;

use App\Models\Event;
use mmghv\LumenRouteBinding\RouteBindingServiceProvider as BaseServiceProvider;

class RouteBindingServiceProvider extends BaseServiceProvider
{
    /**
    * Boot the service provider
    */
    public function boot()
    {
        $binder = $this->binder;
        $binder->bind('event', Event::class);
    }
}
