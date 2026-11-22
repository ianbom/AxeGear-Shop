<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Services\Customer\DokuWebhookService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class DokuWebhookController extends Controller
{
    public function __invoke(Request $request, DokuWebhookService $webhook): JsonResponse
    {
        try {
            $webhook->handle($request->getContent(), $request->headers->all(), $request->getPathInfo());
        } catch (ValidationException) {
            return response()->json(['message' => 'Notifikasi DOKU tidak valid.'], 422);
        }

        return response()->json(['ok' => true]);
    }
}
