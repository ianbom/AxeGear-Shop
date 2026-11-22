<?php

use App\Http\Controllers\Customer\BiteshipWebhookController;
use App\Http\Controllers\Customer\DokuWebhookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/payments/doku/notification', DokuWebhookController::class)->name('payments.doku.notification');
Route::post('/shipments/biteship/webhook', BiteshipWebhookController::class)->name('shipments.biteship.webhook');
