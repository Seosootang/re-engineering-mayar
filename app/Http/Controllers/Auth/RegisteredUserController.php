<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'role' => ['required', 'string', Rule::in(['user', 'seller'])],
            // Validasi password dengan aturan yang lebih ketat
            'password' => [
                'required',
                'confirmed',
                Password::min(8)      // Minimal 8 karakter
                    ->letters()       // Harus ada setidaknya satu huruf
                    ->numbers()       // Harus ada setidaknya satu angka
                    ->symbols(),      // Harus ada setidaknya satu karakter unik/simbol
            ], // Validasi untuk role
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role, // Menyimpan role dari request
        ]);

        event(new Registered($user));

        Auth::login($user);

        // Cek role dari user yang baru saja dibuat
        if ($user->role === 'seller') {
            return redirect()->route('seller.dashboard');
        }

        // Untuk role lainnya, arahkan ke dashboard standar
        return redirect()->route('dashboard');
    }
}
