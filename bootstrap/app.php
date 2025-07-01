<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
        
        // Registering middleware aliases
        $middleware->alias([
            'seller' => \App\Http\Middleware\EnsureSeller::class,
        ]);

        $middleware->redirectUsersTo(function ($request) {
            // Cek role user yang sedang login
            if ($request->user()->role === 'seller') {
                return route('seller.dashboard'); // Jika seller, arahkan ke dashboard seller
            }

            return route('dashboard'); // Jika bukan, arahkan ke dashboard standar
        });
        // =========================================================================

    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();