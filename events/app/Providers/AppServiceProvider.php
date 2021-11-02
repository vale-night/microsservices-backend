<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->register(\Jenssegers\Mongodb\MongodbServiceProvider::class);
        $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
        $this->app->register(\App\Providers\RepositoryServiceProvider::class);
        $this->app->register(\Flipbox\LumenGenerator\LumenGeneratorServiceProvider::class);
        $this->app->register(\Anik\Form\FormRequestServiceProvider::class);
        $this->app->register(\SwaggerLume\ServiceProvider::class);

        if ($this->app->environment('local')) {
            $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
        }
    }
}
