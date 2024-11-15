<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;  // Import Auth facade
use Symfony\Component\HttpKernel\Exception\HttpException; // Import HttpException for abort()

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is authenticated and an admin
        if (!Auth::check() || !Auth::user()->isAdmin()) {
            // Abort with a 403 Forbidden response if unauthorized
            throw new HttpException(403, 'Unauthorized.');
        }
    
        return $next($request);
    }
}
