<?php

namespace App\Jobs\Payments;

use App\Actions\Payments\SyncExpiredDokuPaymentsAction;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SyncExpiredDokuPaymentsJob implements ShouldQueue
{
    use Queueable;

    public function handle(SyncExpiredDokuPaymentsAction $syncPayments): void
    {
        $syncPayments->execute();
    }
}
