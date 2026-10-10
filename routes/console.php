<?php

use App\Services\Admin\ShipmentManagementService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('payments:sync-expired-midtrans')->everyTenMinutes()->withoutOverlapping();

Artisan::command('shipments:replay-biteship-webhooks', function (ShipmentManagementService $shipments) {
    $this->info('Processed: '.$shipments->replayWebhooks());
})->purpose('Replay pending Biteship webhook receipts with matching shipments');

Schedule::command('shipments:replay-biteship-webhooks')->everyTenMinutes()->withoutOverlapping();
