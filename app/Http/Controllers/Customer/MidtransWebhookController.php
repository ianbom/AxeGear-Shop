<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Services\Customer\MidtransWebhookService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MidtransWebhookController extends Controller
{
    public function __invoke(Request $request, MidtransWebhookService $webhook): JsonResponse
    {
        $context = array_filter($request->only(['order_id', 'transaction_status']), 'is_string');
        Log::info('Midtrans Webhook received', $context);
        $webhook->handle($request->all());
        Log::info('Midtrans Webhook processed', [...$context, 'http_status' => 200]);

        return response()->json(['ok' => true]);
    }
}
