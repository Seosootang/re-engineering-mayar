<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [ /* ...data dari Breeze... */ ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Route untuk webinar detail
    Route::get('/webinar-detail/{id}', function ($id) {
        return Inertia::render('webinar-detail');
    })->name('webinar.detail');
});

Route::middleware(['auth', 'verified', 'seller'])->group(function () {
    Route::get('/seller', function () {
        return Inertia::render('seller/dashboard');
    })->name('seller.dashboard');
    
    // Route untuk create webinar
    Route::get('/seller/webinar/create', function () {
        return Inertia::render('seller/webinar/CreateWebinar');
    })->name('seller.webinar.create');
});

// File-file route lainnya
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';