<?php

namespace App\Http\Controllers;

use App\Models\InvoiceWebinar;
use App\Models\Participant;
use App\Models\Webinar;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class WebinarController extends Controller
{
    public function index()
    {
        // Sebaiknya hanya tampilkan webinar milik seller yang login
        $webinars = Webinar::where('user_id', Auth::id())->latest()->get();
        return Inertia::render('seller/webinars/index', [
            'webinars' => $webinars
        ]);
    }

    public function create()
    {
        return Inertia::render('seller/webinars/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'speaker_name' => 'required|string|max:255',
            'speaker_description' => 'nullable|string|max:255',
            'speaker_image_path' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'payment_type' => 'required|in:paid,free,pay_what_you_want',
            'price' => 'nullable|integer|min:0',
            'original_price' => 'nullable|integer|min:0',
            'description' => 'required|string',
            'webinar_link' => 'required|url',
            'start_datetime' => 'required|date|after:now',
            'end_datetime' => 'nullable|date|after:start_datetime',
            'cover_image_path' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'instructions' => 'nullable|string',
            'terms_and_conditions' => 'nullable|string',
            'sales_start_datetime' => 'required|date',
            'registration_close_datetime' => 'required|date|before:start_datetime',
            'max_participants' => 'nullable|integer|min:1',
            'redirect_url' => 'nullable|url',
            'is_affiliatable' => 'boolean',
            'affiliate_commission_percentage' => 'nullable|numeric|min:0|max:100',
        ]);

        $data = $request->all();
        $data['user_id'] = Auth::id();

        // Handle cover image upload
        if ($request->hasFile('cover_image_path')) {
            $image = $request->file('cover_image_path');
            $imagePath = $image->store('webinars', 'public');
            $data['cover_image_path'] = $imagePath;
        }

        // Handle speaker image upload
        if ($request->hasFile('speaker_image_path')) {
            $speakerImage = $request->file('speaker_image_path');
            $speakerImagePath = $speakerImage->store('speakers', 'public');
            $data['speaker_image_path'] = $speakerImagePath;
        }

        // --- PERBAIKAN: Lakukan casting secara manual untuk memastikan integer ---
        if (isset($data['price']) && $data['price'] !== '') {
            $data['price'] = (int) $data['price'];
        }
        if (isset($data['original_price']) && $data['original_price'] !== '') {
            $data['original_price'] = (int) $data['original_price'];
        }
        // --------------------------------------------------------------------

        if ($data['payment_type'] === 'free') {
            $data['price'] = null;
            $data['original_price'] = null;
        }

        if (!$data['is_affiliatable']) {
            $data['affiliate_commission_percentage'] = null;
        }

        Webinar::create($data);

        return redirect()->route('seller.webinars.my')->with('success', 'Webinar created successfully.');
    }

    public function show(string $id)
    {
        $webinar = Webinar::findOrFail($id);
        return Inertia::render('seller/webinars/show', [
            'webinar' => $webinar
        ]);
    }

    public function edit(string $id)
    {
        $webinar = Webinar::findOrFail($id);
        return Inertia::render('seller/webinars/edit', [
            'webinar' => $webinar
        ]);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'speaker_name' => 'required|string|max:255',
            'speaker_description' => 'nullable|string|max:255',
            'speaker_image_path' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'payment_type' => 'required|in:paid,free,pay_what_you_want',
            'price' => 'nullable|integer|min:0',
            'original_price' => 'nullable|integer|min:0',
            'description' => 'required|string',
            'webinar_link' => 'required|url',
            'start_datetime' => 'required|date',
            'end_datetime' => 'nullable|date|after:start_datetime',
            'cover_image_path' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'instructions' => 'nullable|string',
            'terms_and_conditions' => 'nullable|string',
            'sales_start_datetime' => 'required|date',
            'registration_close_datetime' => 'required|date|before:start_datetime',
            'max_participants' => 'nullable|integer|min:1',
            'redirect_url' => 'nullable|url',
            'is_affiliatable' => 'boolean',
            'affiliate_commission_percentage' => 'nullable|numeric|min:0|max:100',
        ]);

        $webinar = Webinar::findOrFail($id);
        $data = $request->all();

        // Handle cover image upload
        if ($request->hasFile('cover_image_path')) {
            if ($webinar->cover_image_path) {
                Storage::disk('public')->delete($webinar->cover_image_path);
            }
            $image = $request->file('cover_image_path');
            $imagePath = $image->store('webinars', 'public');
            $data['cover_image_path'] = $imagePath;
        } else {
            unset($data['cover_image_path']);
        }

        // Handle speaker image upload
        if ($request->hasFile('speaker_image_path')) {
            if ($webinar->speaker_image_path) {
                Storage::disk('public')->delete($webinar->speaker_image_path);
            }
            $speakerImage = $request->file('speaker_image_path');
            $speakerImagePath = $speakerImage->store('speakers', 'public');
            $data['speaker_image_path'] = $speakerImagePath;
        } else {
            unset($data['speaker_image_path']);
        }
        
        // --- PERBAIKAN: Tambahkan juga casting di method update ---
        if (isset($data['price']) && $data['price'] !== '') {
            $data['price'] = (int) $data['price'];
        }
        if (isset($data['original_price']) && $data['original_price'] !== '') {
            $data['original_price'] = (int) $data['original_price'];
        }
        // ---------------------------------------------------------

        if ($data['payment_type'] === 'free') {
            $data['price'] = null;
            $data['original_price'] = null;
        }

        if (!$data['is_affiliatable']) {
            $data['affiliate_commission_percentage'] = null;
        }

        $webinar->update($data);

        return redirect()->route('seller.webinars.my')->with('success', 'Webinar updated successfully.');
    }

    public function destroy(string $id)
    {
        $webinar = Webinar::findOrFail($id);

        if ($webinar->cover_image_path) {
            Storage::disk('public')->delete($webinar->cover_image_path);
        }

        if ($webinar->speaker_image_path) {
            Storage::disk('public')->delete($webinar->speaker_image_path);
        }

        $webinar->delete();

        return redirect()->route('seller.webinars.my')->with('success', 'Webinar deleted successfully.');
    }

    public function userDashboard()
    {
        $upcomingWebinars = Webinar::where('start_datetime', '>', now())
            ->orderBy('start_datetime', 'asc')
            ->take(6)
            ->get();

        return Inertia::render('dashboard', [
            'upcomingWebinars' => $upcomingWebinars,
        ]);
    }

    public function sellerDashboard()
    {
        $userId = Auth::id();
        
        $webinarCount = Webinar::where('user_id', $userId)->count();
        $upcomingWebinars = Webinar::where('user_id', $userId)
            ->where('start_datetime', '>', now())
            ->count();
        $pastWebinars = Webinar::where('user_id', $userId)
            ->where('start_datetime', '<', now())
            ->count();
        $freeWebinars = Webinar::where('user_id', $userId)
            ->where('payment_type', 'free')
            ->count();
        $paidWebinars = Webinar::where('user_id', $userId)
            ->where('payment_type', '!=', 'free') // Gunakan != 'free' agar mencakup 'paid' dan 'pay_what_you_want'
            ->count();

        $totalIncome = InvoiceWebinar::where('status', 'paid')
            ->whereHas('webinar', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->sum('amount');
        
        $totalParticipants = Participant::whereHas('webinar', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->count();

        return Inertia::render('seller/dashboard', [
            'webinarCount' => $webinarCount,
            'upcomingWebinars' => $upcomingWebinars,
            'pastWebinars' => $pastWebinars,
            'freeWebinars' => $freeWebinars,
            'paidWebinars' => $paidWebinars,
            'totalIncome' => (int) $totalIncome, // Pastikan ini adalah integer
            'totalParticipants' => $totalParticipants,
        ]);
    }

    public function publicIndex()
    {
        $webinars = Webinar::where('start_datetime', '>', now())
            ->where(function ($query) {
                $query->whereNull('sales_start_datetime')
                    ->orWhere('sales_start_datetime', '<=', now());
            })
            ->where(function ($query) {
                $query->whereNull('registration_close_datetime')
                    ->orWhere('registration_close_datetime', '>', now());
            })
            ->orderBy('start_datetime', 'asc')
            ->get();

        return Inertia::render('webinars/index', [
            'webinars' => $webinars
        ]);
    }

    public function publicShow(string $id)
    {
        $webinar = Webinar::findOrFail($id);

        $canRegister = $webinar->start_datetime > now() &&
            ($webinar->sales_start_datetime === null || $webinar->sales_start_datetime <= now()) &&
            ($webinar->registration_close_datetime === null || $webinar->registration_close_datetime > now());

        return Inertia::render('webinar-detail', [
            'webinar' => $webinar,
            'canRegister' => $canRegister
        ]);
    }

    public function myWebinars()
    {
        $webinars = Webinar::where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('seller/webinar/MyWebinars', [
            'webinars' => $webinars,
        ]);
    }
}
