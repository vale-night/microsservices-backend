<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class Authenticate
{


    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @param string|null $guard
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ?string $guard = null): mixed
    {
        if(app()->environment('local')){
            return $next($request);
        }

        $client = Http::post(config('authentication.url') . '/verifyToken', [
            'token' => $request->header('Authorization')
        ]);

        if($client->ok()) {
            return $next($request);
        }

        return response('Unauthorized.', 401);
    }
}
