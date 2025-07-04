<?php

use App\Http\Controllers\IncomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\WebinarController;
use App\Http\Controllers\WebinarParticipantController;
use App\Http\Controllers\WebinarRegistrationController;
use Illuminate\Support\Facades\Redirect;

Route::get('/', function () {
    // Alihkan langsung ke halaman login yang sudah ada
    return Redirect::route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Update dashboard route to use controller method
    Route::get('/dashboard', [WebinarController::class, 'userDashboard'])->name('dashboard');

    // Route untuk webinar detail - update to use controller method
    Route::get('/webinar-detail/{id}', [WebinarController::class, 'publicShow'])->name('webinar.detail');

    Route::prefix('user/webinars')->name('user.webinars.')->group(function () {
        Route::get('/{webinar}/register', [WebinarRegistrationController::class, 'show'])->name('register.show');

        Route::post('/{webinar}/register', [WebinarRegistrationController::class, 'store'])->name('register.store');

        Route::get('/purchase-history', [WebinarRegistrationController::class, 'history'])
            ->name('history.index');

        Route::get('/registered-webinars/{webinar}', [WebinarRegistrationController::class, 'showRegistered'])
            ->name('registered.show');
    });
});

Route::middleware(['auth', 'verified', 'seller'])->group(function () {
    Route::get('/seller', [WebinarController::class, 'sellerDashboard'])->name('seller.dashboard');

    // Webinar management routes for sellers
    Route::get('/seller/webinars', [WebinarController::class, 'index'])->name('webinars.index');
    Route::get('/seller/webinars/create', [WebinarController::class, 'create'])->name('webinars.create');
    Route::post('/seller/webinars', [WebinarController::class, 'store'])->name('webinars.store');
    Route::get('/seller/webinars/{id}', [WebinarController::class, 'show'])->name('webinars.show');
    Route::get('/seller/webinars/{id}/edit', [WebinarController::class, 'edit'])->name('webinars.edit');
    Route::put('/seller/webinars/{id}', [WebinarController::class, 'update'])->name('webinars.update');
    Route::delete('/seller/webinars/{id}', [WebinarController::class, 'destroy'])->name('webinars.destroy');
    
    // My webinars route
    Route::get('/seller/my-webinars', [WebinarController::class, 'myWebinars'])->name('seller.webinars.my');
    
    // API endpoint for getting webinar data (for modals)
    Route::get('/seller/webinars/{id}/data', [WebinarController::class, 'getWebinarData'])->name('webinars.data');

    Route::prefix('seller/webinars')->name('seller.webinars.')->group(function () {
        Route::get('/{webinar}/participants', [WebinarParticipantController::class, 'index'])->name('participants.index');
    });

    // Keep your existing create route if you want to maintain it
    Route::get('/seller/webinar/create', function () {
        return Inertia::render('seller/webinar/CreateWebinar');
    })->name('seller.webinar.create');

    Route::get('/seller/income', [IncomeController::class, 'index'])->name('seller.income.index');
});

// File-file route lainnya
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';