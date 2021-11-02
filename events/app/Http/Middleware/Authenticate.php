<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;
use Illuminate\Support\Facades\Http;

class Authenticate
{


    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
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
