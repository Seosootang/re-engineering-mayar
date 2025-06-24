<?php

// Tidak perlu import EnsureSeller di sini jika menggunakan alias
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // Nanti kita akan ubah ini menjadi landing page yang sesungguhnya
    return Inertia::render('welcome', [ /* ...data dari Breeze... */ ]);
})->name('home');


// Route untuk user biasa yang sudah login
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


// Route untuk seller yang sudah login
// Menggunakan alias 'seller' dan menambahkan 'verified'
Route::middleware(['auth', 'verified', 'seller'])->group(function () {
    Route::get('/seller', function () {
        // PENTING: Pastikan path komponen ini benar (S dan D kapital)
        return Inertia::render('seller/dashboard');
    })->name('seller.dashboard');
});

// File-file route lainnya
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';