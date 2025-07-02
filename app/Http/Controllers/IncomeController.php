<?php

namespace App\Http\Controllers;

use App\Models\InvoiceWebinar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IncomeController extends Controller
{
    public function index()
    {
        $seller_id = Auth::id();

        // Ambil semua invoice lunas dari webinar yang dimiliki oleh seller
        $incomeTransactions = InvoiceWebinar::where('status', 'paid')
            ->whereHas('webinar', function ($query) use ($seller_id) {
                $query->where('user_id', $seller_id);
            })
            ->with(['webinar', 'user'])
            ->latest('paid_at')
            ->paginate(15);

        return Inertia::render('seller/webinar/income', [
            'transactions' => $incomeTransactions
        ]);
    }
}
