<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ConfigServiceProvider extends ServiceProvider
{

    protected array $allow_mime_types = [
        'text/php',
        'text/x-php',
        'application/php',
        'application/x-php',
        'application/x-httpd-php',
        'application/x-httpd-php-source'
    ];


    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $path = $this->app->configPath();
        $files = collect(scandir($path));
        $files
            ->skipWhile(fn($file) => !$this->isPhpFile(realpath($path . DIRECTORY_SEPARATOR . $file)))
            ->map(fn($file) => $this->clearExtension($file))
            ->each(fn($file) => $this->app?->configure(basename($file)));
    }


    protected function isPhpFile(string $file): bool
    {
        $mimeType = (mime_content_type($file));
        return in_array($mimeType, $this->allow_mime_types);
    }

    protected function clearExtension(string $file): string
    {
        return str_replace('.php', '', $file);
    }
}
