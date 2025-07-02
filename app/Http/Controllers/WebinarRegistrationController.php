<?php

namespace App\Http\Controllers;

use App\Models\InvoiceWebinar;
use App\Models\Participant;
use App\Models\Webinar;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Xendit\Configuration;
use Xendit\Invoice\CreateInvoiceRequest;
use Xendit\Invoice\InvoiceApi;

class WebinarRegistrationController extends Controller
{
    public function __construct()
    {
        // dd(config('xendit.API_KEY'));
        Configuration::setXenditKey(config('xendit.API_KEY'));
    }

    public function show(Webinar $webinar)
    {
        // Cek apakah user sudah terdaftar dan lunas
        $isRegistered = Participant::where('user_id', Auth::id())
            ->where('webinar_id', $webinar->id)
            ->exists();

        return Inertia::render('register', [
            'webinar' => $webinar,
            'isRegistered' => $isRegistered
        ]);
    }

    public function store(Request $request, Webinar $webinar)
    {
        $user = Auth::user();

        // Validasi
        if ($webinar->max_participants && $webinar->participants()->count() >= $webinar->max_participants) {
            return redirect()->back()->with('error', 'Maaf, kuota webinar sudah penuh.');
        }

        if (Participant::where('user_id', $user->id)->where('webinar_id', $webinar->id)->exists()) {
            return redirect()->back()->with('error', 'Anda sudah terdaftar pada webinar ini.');
        }

        if ($webinar->payment_type === 'free') {

            // Langsung daftarkan sebagai peserta
            DB::transaction(function () use ($user, $webinar) {
                Participant::create([
                    'user_id' => $user->id,
                    'webinar_id' => $webinar->id,
                    'registered_at' => now(),
                ]);
            });

            // Langsung arahkan ke halaman detail webinar yang sudah dibeli/didaftar
            return Inertia::location(route('user.webinars.registered.show', $webinar->id));
        }

        DB::beginTransaction();
        try {
            $invoice_code = IdGenerator::generate([
                'table' => 'invoice_webinars',
                'field' => 'invoice_code',
                'length' => 14,
                'prefix' => 'WEBINV-' . date('y'),
            ]);

            $invoice = InvoiceWebinar::create([
                'user_id' => $user->id,
                'webinar_id' => $webinar->id,
                'amount' => $webinar->price,
                'invoice_code' => $invoice_code,
            ]);

            $xendit_create_invoice = new CreateInvoiceRequest([
                'external_id' => $invoice_code,
                'amount' => $webinar->price,
                'customer' => [
                    'given_names' => $user->name,
                    'email' => $user->email,
                ],
                'items' => [
                    [
                        'name' => $webinar->title,
                        'price' => $webinar->price,
                        'quantity' => 1,
                    ]
                ],
                'success_redirect_url' => route('user.webinars.registered.show', $webinar->id),
                'failure_redirect_url' => route('user.webinars.register.show', $webinar->id),
            ]);

            $xendit_api_instance = new InvoiceApi();
            $xendit_invoice = $xendit_api_instance->createInvoice($xendit_create_invoice);

            $invoice->update(['invoice_url' => $xendit_invoice['invoice_url']]);

            DB::commit();
            return Inertia::location($xendit_invoice['invoice_url']);
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Terjadi kesalahan. Silakan coba lagi. ' . $th->getMessage());
        }
    }

    public function history(Request $request)
    {
        $user_id = Auth::id();

        // 1. Ambil data webinar BERBAYAR dari InvoiceWebinar
        $paidWebinars = InvoiceWebinar::where('user_id', $user_id)
            ->where('status', 'paid')
            ->with('webinar')
            ->get()
            ->map(function ($invoice) {
                // Standarisasi format data
                return [
                    'id' => 'paid-' . $invoice->id,
                    'invoice_code' => $invoice->invoice_code,
                    'title' => $invoice->webinar->title,
                    'date' => $invoice->paid_at,
                    'amount' => $invoice->amount,
                    'type' => 'paid',
                    'webinar_id' => $invoice->webinar_id,
                ];
            });

        // 2. Ambil data webinar GRATIS dari Participant
        $freeWebinars = Participant::where('user_id', $user_id)
            ->whereHas('webinar', function ($query) {
                $query->where('payment_type', 'free');
            })
            ->with('webinar')
            ->get()
            ->map(function ($participant) {
                // Standarisasi format data
                return [
                    'id' => 'free-' . $participant->id,
                    'invoice_code' => 'GRATIS',
                    'title' => $participant->webinar->title,
                    'date' => $participant->registered_at,
                    'amount' => 0,
                    'type' => 'free',
                    'webinar_id' => $participant->webinar_id,
                ];
            });

        // 3. Gabungkan kedua koleksi data dan urutkan berdasarkan tanggal (terbaru dulu)
        $combinedHistory = $paidWebinars->concat($freeWebinars)->sortByDesc('date');

        // 4. Buat paginasi secara manual
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $perPage = 10;
        $currentPageItems = $combinedHistory->slice(($currentPage - 1) * $perPage, $perPage)->all();
        $paginatedItems = new LengthAwarePaginator($currentPageItems, count($combinedHistory), $perPage, $currentPage, [
            'path' => $request->url(),
            'query' => $request->query(),
        ]);

        return Inertia::render('history', [
            'history' => $paginatedItems
        ]);
    }

    public function showRegistered(Webinar $webinar)
    {
        $isParticipant = Participant::where('user_id', Auth::id())
            ->where('webinar_id', $webinar->id)
            ->exists();

        $hasPaidInvoice = false;
        if (!$isParticipant) {
            $hasPaidInvoice = InvoiceWebinar::where('user_id', Auth::id())
                ->where('webinar_id', $webinar->id)
                ->where('status', 'paid')
                ->exists();
        }

        if (!$isParticipant && !$hasPaidInvoice) {
            abort(403, 'ANDA TIDAK MEMILIKI AKSES KE HALAMAN INI.');
        }

        return Inertia::render('registered-show', [
            'webinar' => $webinar
        ]);
    }
}
