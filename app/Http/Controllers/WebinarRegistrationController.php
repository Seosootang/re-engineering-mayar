<?php

namespace App\Http\Controllers;

use App\Models\InvoiceWebinar;
use App\Models\Participant;
use App\Models\Webinar;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Http\Request;
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
                'success_redirect_url' => route('user.webinars.register.show', $webinar->id),
                'failure_redirect_url' => route('user.webinars.register.show', $webinar->id),
            ]);

            $xendit_api_instance = new InvoiceApi();
            $xendit_invoice = $xendit_api_instance->createInvoice($xendit_create_invoice);

            $invoice->update(['invoice_url' => $xendit_invoice['invoice_url']]);

            DB::commit();
            return redirect()->away($xendit_invoice['invoice_url']);
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th);
            return redirect()->back()->with('error', 'Terjadi kesalahan. Silakan coba lagi. ' . $th->getMessage());
        }
    }
}
