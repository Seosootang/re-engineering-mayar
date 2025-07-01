<?php

namespace App\Http\Controllers;

use App\Models\Webinar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebinarParticipantController extends Controller
{
    public function index(Webinar $webinar)
    {
        // Load peserta yang berelasi dengan user
        $participants = $webinar->participants()->with('user')->paginate(10);

        return Inertia::render('seller/webinars/participants', [
            'webinar' => $webinar,
            'participants' => $participants
        ]);
    }
}