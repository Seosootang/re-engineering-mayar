<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Log;
use Xendit\Configuration;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        try {
            $apiKey = config('services.xendit.api_key');

            if ($apiKey) {
                Configuration::getDefaultConfiguration()->setApiKey($apiKey);
            } else {
                Log::warning('Xendit API Key is not configured in config/services.php or .env file.');
            }

        } catch (\Throwable $th) {
            Log::error('Failed to configure Xendit service: ' . $th->getMessage());
        }
    }
}
