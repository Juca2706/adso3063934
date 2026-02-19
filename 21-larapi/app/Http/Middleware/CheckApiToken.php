<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;

class CheckApiToken
{
    public function handle($request, Closure $next)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Token not provided'], 401);
        }

        // Buscamos al usuario por el token
        $user = User::where('remember_token', $token)->first();

        if (!$user) {
            return response()->json(['message' => 'invalid session'], 401);
        }

        // Esto es vital para que $request->user() funcione en el controlador
        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        return $next($request);
    }
}
