<?php

namespace App\Http\Controllers;

use App\Models\Webinar;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class WebinarController extends Controller
{
    public function index() 
    {
        $webinars = Webinar::latest()->get();
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
            'payment_type' => 'required|in:paid,free,pay_what_you_want',
            'price' => 'nullable|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'description' => 'required|string',
            'webinar_link' => 'required|url',
            'start_datetime' => 'required|date|after:now',
            'end_datetime' => 'nullable|date|after:start_datetime',
            'cover_image_path' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'instructions' => 'nullable|string',
            'terms_and_conditions' => 'nullable|string',
            'sales_start_datetime' => 'nullable|date',
            'registration_close_datetime' => 'nullable|date|before:start_datetime',
            'max_participants' => 'nullable|integer|min:1',
            'redirect_url' => 'nullable|url',
            'is_affiliatable' => 'boolean',
            'affiliate_commission_percentage' => 'nullable|numeric|min:0|max:100',
        ]);

        $data = $request->all();

        // Handle cover image upload
        if ($request->hasFile('cover_image_path')) {
            $image = $request->file('cover_image_path');
            $imagePath = $image->store('webinars', 'public');
            $data['cover_image_path'] = $imagePath;
        }

        // Set price to null if payment type is free
        if ($data['payment_type'] === 'free') {
            $data['price'] = null;
            $data['original_price'] = null;
        }

        // Set affiliate commission to null if not affiliatable
        if (!$data['is_affiliatable']) {
            $data['affiliate_commission_percentage'] = null;
        }

        Webinar::create($data);

        return redirect()->route('webinars.index')->with('success', 'Webinar created successfully.');
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
            'payment_type' => 'required|in:paid,free,pay_what_you_want',
            'price' => 'nullable|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'description' => 'required|string',
            'webinar_link' => 'required|url',
            'start_datetime' => 'required|date',
            'end_datetime' => 'nullable|date|after:start_datetime',
            'cover_image_path' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'instructions' => 'nullable|string',
            'terms_and_conditions' => 'nullable|string',
            'sales_start_datetime' => 'nullable|date',
            'registration_close_datetime' => 'nullable|date|before:start_datetime',
            'max_participants' => 'nullable|integer|min:1',
            'redirect_url' => 'nullable|url',
            'is_affiliatable' => 'boolean',
            'affiliate_commission_percentage' => 'nullable|numeric|min:0|max:100',
        ]);

        $webinar = Webinar::findOrFail($id);
        $data = $request->all();

        // Handle cover image upload
        if ($request->hasFile('cover_image_path')) {
            // Delete old image if exists
            if ($webinar->cover_image_path) {
                Storage::disk('public')->delete($webinar->cover_image_path);
            }

            $image = $request->file('cover_image_path');
            $imagePath = $image->store('webinars', 'public');
            $data['cover_image_path'] = $imagePath;
        } else {
            // Keep existing image
            unset($data['cover_image_path']);
        }

        // Set price to null if payment type is free
        if ($data['payment_type'] === 'free') {
            $data['price'] = null;
            $data['original_price'] = null;
        }

        // Set affiliate commission to null if not affiliatable
        if (!$data['is_affiliatable']) {
            $data['affiliate_commission_percentage'] = null;
        }

        $webinar->update($data);

        return redirect()->route('webinars.index')->with('success', 'Webinar updated successfully.');
    }

    public function destroy(string $id)
    {
        $webinar = Webinar::findOrFail($id);
        
        // Delete cover image if exists
        if ($webinar->cover_image_path) {
            Storage::disk('public')->delete($webinar->cover_image_path);
        }
        
        $webinar->delete();

        return redirect()->route('webinars.index')->with('success', 'Webinar deleted successfully.');
    }

    // User dashboard - show upcoming webinars
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

    // Seller dashboard - show webinar statistics
    public function sellerDashboard()
    {
        $webinarCount = Webinar::count();
        $upcomingWebinars = Webinar::where('start_datetime', '>', now())->count();
        $pastWebinars = Webinar::where('start_datetime', '<', now())->count();
        $freeWebinars = Webinar::where('payment_type', 'free')->count();
        $paidWebinars = Webinar::where('payment_type', 'paid')->count();

        return Inertia::render('seller/dashboard', [
            'webinarCount' => $webinarCount,
            'upcomingWebinars' => $upcomingWebinars,
            'pastWebinars' => $pastWebinars,
            'freeWebinars' => $freeWebinars,
            'paidWebinars' => $paidWebinars,
        ]);
    }

    // Public webinar listing for users
    public function publicIndex()
    {
        $webinars = Webinar::where('start_datetime', '>', now())
            ->where('sales_start_datetime', '<=', now())
            ->where(function($query) {
                $query->whereNull('registration_close_datetime')
                      ->orWhere('registration_close_datetime', '>', now());
            })
            ->orderBy('start_datetime', 'asc')
            ->get();

        return Inertia::render('webinars/index', [
            'webinars' => $webinars
        ]);
    }

    // Public webinar detail for users
    

    public function publicShow(string $id)
    {
        $webinar = Webinar::findOrFail($id);
        
        // Check if webinar is available for registration
        $canRegister = $webinar->start_datetime > now() && 
                    ($webinar->sales_start_datetime === null || $webinar->sales_start_datetime <= now()) &&
                    ($webinar->registration_close_datetime === null || $webinar->registration_close_datetime > now());

        return Inertia::render('webinar-detail', [
            'webinar' => $webinar,
            'canRegister' => $canRegister
        ]);
    }
}