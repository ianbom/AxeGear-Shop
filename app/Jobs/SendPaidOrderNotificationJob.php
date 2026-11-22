<?php

namespace App\Jobs;

use App\Mail\PaidOrderNotificationMail;
use App\Models\EmailNotification;
use App\Models\Order;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class SendPaidOrderNotificationJob implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public int $timeout = 60;

    public array $backoff = [10, 60];

    public function __construct(
        public readonly int $orderId,
        public readonly int $recipientId,
        public readonly string $email,
    ) {
        $this->afterCommit();
    }

    public function handle(): void
    {
        $recipient = EmailNotification::query()->whereKey($this->recipientId)->where('email', $this->email)->where('is_active', true)->first();
        $order = Order::query()->with(['items', 'payment'])->whereKey($this->orderId)->whereNotNull('paid_at')->first();
        if (! $recipient || ! $order) {
            return;
        }
        Mail::to($this->email)->send(new PaidOrderNotificationMail($order));
    }

    public function failed(?Throwable $exception): void
    {
        Log::error('paid_order_notification_failed', [
            'order_id' => $this->orderId, 'recipient_id' => $this->recipientId,
            'exception' => $exception ? $exception::class : null,
        ]);
    }
}
