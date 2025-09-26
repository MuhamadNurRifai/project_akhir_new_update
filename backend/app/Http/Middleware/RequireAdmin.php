<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequireAdmin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Jika tidak login atau bukan admin
        if (!$request->user() || !$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorized. Admin only.'], 403);
        }

        return $next($request);
    }
}
