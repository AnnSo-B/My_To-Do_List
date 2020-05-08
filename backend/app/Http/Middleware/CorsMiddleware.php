<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Dealing with Cross-Origin Ressource Sharing
 *
 * https://lumen.laravel.com/docs/7.x/middleware
 */
class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request - request from client-side
     * @param  \Closure  $next - action to do after middleware
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Request header
        $headers =
        [
            // Allowed domain
            'Access-Control-Allow-Origin'  => '*', // for all domains
            // Allowed methods
            'Access-Control-Allow-Methods' => 'GET, POST, PATCH, PUT, DELETE',
            // Allowed headers
            'Access-Control-Allow-Headers' => 'Accept, Content-Type, Authorization, X-Requested-With'
        ];

        // dealing with the first fetch request OPTIONS
        if ($request->isMethod('OPTIONS')) {
            // answer that it's ok and send the headers
            return response()->json('', Response::HTTP_OK, $headers);
        }
        // dealing with the following fetch request
        else {
            // prepare the answer that will be forwarded to the controller
            $response = $next($request);

            // adding the headers to the answer
            foreach ($headers as $authorization => $authorized) {
                $response->header($authorization, $authorized);
            }
        }

        // return the answer to the client side so it can be forwarded to the controller again
        return $response;
    }
}
