<?php

namespace App\Console\Commands;

use App\Actions\Payments\SyncExpiredDokuPaymentsAction;
use Illuminate\Console\Command;

class SyncExpiredDokuPaymentsCommand extends Command
{
    protected $signature = 'payments:sync-expired-doku';

    protected $description = 'Reconcile expired or uncertain DOKU payments without speculative reservation release.';

    public function handle(SyncExpiredDokuPaymentsAction $syncPayments): int
    {
        $stats = $syncPayments->execute();
        $this->components->info("DOKU sync checked {$stats['checked']}, synced {$stats['synced']}, failed {$stats['failed']}.");

        return $stats['failed'] > 0 ? self::FAILURE : self::SUCCESS;
    }
}
