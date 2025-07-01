<?php

namespace App\Http\Controllers;

use App\Models\InvoiceWebinar;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    public function callbackXendit(Request $request)
    {
        // Validasi Callback Token
        $callbackToken = config('xendit.CALLBACK_TOKEN');
        if ($request->header('x-callback-token') !== $callbackToken) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Cari Invoice Webinar berdasarkan external_id dari Xendit
        $invoice = InvoiceWebinar::where('invoice_code', $request->external_id)->first();

        if (!$invoice) {
            return response()->json(['message' => 'Invoice Webinar Not Found'], 404);
        }

        // Jika invoice sudah lunas, tidak perlu proses ulang
        if ($invoice->status === 'paid') {
            return response()->json(['message' => 'Invoice already paid'], 200);
        }

        // Proses berdasarkan status pembayaran dari Xendit
        if ($request->status == 'PAID' || $request->status == 'SETTLED') {
            DB::transaction(function () use ($invoice, $request) {
                $invoice->update([
                    'status'          => 'paid',
                    'paid_at'         => now(),
                    'payment_method'  => $request->payment_method,
                    'payment_channel' => $request->payment_channel,
                ]);

                // Daftarkan user sebagai peserta webinar
                Participant::firstOrCreate(
                    [
                        'user_id'    => $invoice->user_id,
                        'webinar_id' => $invoice->webinar_id,
                    ],
                    [
                        'invoice_webinar_id' => $invoice->id,
                        'registered_at'      => now(),
                    ]
                );
            });
        } else {
            $invoice->update(['status' => 'failed']);
        }

        return response()->json(['message' => 'Callback processed successfully'], 200);
    }
}
