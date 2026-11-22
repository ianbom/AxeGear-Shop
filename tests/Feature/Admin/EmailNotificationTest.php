<?php

use App\Jobs\SendPaidOrderNotificationJob;
use App\Mail\PaidOrderNotificationMail;
use App\Models\EmailNotification;
use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('allows active admins to manage notification recipients', function () {
    $admin = User::factory()->create(['role' => 'admin', 'is_active' => true]);
    $this->actingAs($admin)->get(route('admin.email-notifications.create'))->assertRedirect(route('admin.email-notifications.index'));
    $this->post(route('admin.email-notifications.store'), ['email' => '  Owner@Example.test ', 'is_active' => true])->assertRedirect(route('admin.email-notifications.index'));
    $recipient = EmailNotification::query()->sole();
    expect($recipient->email)->toBe('owner@example.test')->and($recipient->is_active)->toBeTrue();
    $this->get(route('admin.email-notifications.edit', $recipient))->assertOk();
    $this->put(route('admin.email-notifications.update', $recipient), ['email' => 'sales@example.test', 'is_active' => false])->assertRedirect(route('admin.email-notifications.index'));
    expect($recipient->fresh()->email)->toBe('sales@example.test')->and($recipient->fresh()->is_active)->toBeFalse();
    $this->delete(route('admin.email-notifications.destroy', $recipient))->assertRedirect(route('admin.email-notifications.index'));
    $this->assertDatabaseMissing('email_notification', ['id' => $recipient->id]);
});

it('validates recipient emails and rejects duplicates after normalization', function () {
    $this->actingAs(User::factory()->create(['role' => 'admin', 'is_active' => true]));
    $recipient = EmailNotification::query()->create(['email' => 'owner@example.test']);
    $this->post(route('admin.email-notifications.store'), ['email' => 'OWNER@example.test', 'is_active' => true])->assertSessionHasErrors('email');
    $this->post(route('admin.email-notifications.store'), ['email' => 'bad-address', 'is_active' => true])->assertSessionHasErrors('email');
    $this->post(route('admin.email-notifications.store'), ['email' => 'other@example.test'])->assertSessionHasErrors('is_active');
    $this->put(route('admin.email-notifications.update', $recipient), ['email' => $recipient->email, 'is_active' => true])->assertSessionHasNoErrors();
    $other = EmailNotification::query()->create(['email' => 'other@example.test']);
    $this->put(route('admin.email-notifications.update', $other), ['email' => $recipient->email, 'is_active' => true])->assertSessionHasErrors('email');
});

it('lists and searches recipients with pagination', function () {
    $this->actingAs(User::factory()->create(['role' => 'admin', 'is_active' => true]));
    foreach (range(1, 11) as $number) {
        EmailNotification::query()->create(['email' => "owner{$number}@example.test"]);
    }
    $this->get(route('admin.email-notifications.index'))->assertInertia(fn (Assert $page) => $page->component('admin/email-notifications/index')->has('recipients.data', 10)->where('recipients.total', 11));
    $this->get(route('admin.email-notifications.index', ['search' => 'owner11']))->assertInertia(fn (Assert $page) => $page->has('recipients.data', 1)->where('recipients.data.0.email', 'owner11@example.test'));
});

it('rejects unauthorized access to every recipient endpoint', function (string $role, bool $active) {
    $this->actingAs(User::factory()->create(['role' => $role, 'is_active' => $active]));
    $recipient = EmailNotification::query()->create(['email' => 'owner@example.test']);
    foreach (['index', 'create', 'edit'] as $action) {
        $this->get(route('admin.email-notifications.'.$action, $action === 'edit' ? $recipient : []))->assertForbidden();
    }
    $this->post(route('admin.email-notifications.store'), [])->assertForbidden();
    $this->put(route('admin.email-notifications.update', $recipient), [])->assertForbidden();
    $this->delete(route('admin.email-notifications.destroy', $recipient))->assertForbidden();
})->with([['customer', true], ['admin', false]]);

function paidEmailOrder(): Order
{
    $user = User::factory()->create();
    $order = Order::query()->create([
        'user_id' => $user->id, 'order_number' => 'ORD-EMAIL-PAID', 'customer_name' => $user->name,
        'customer_email' => $user->email, 'customer_phone' => '081234567890', 'subtotal' => 100000,
        'grand_total' => 100000, 'payment_status' => 'paid', 'order_status' => 'paid', 'paid_at' => now(),
    ]);
    $order->items()->create(['product_name' => 'Trail Gloves', 'color_name' => 'Black', 'size' => 'M', 'quantity' => 2, 'price' => 50000, 'subtotal' => 100000]);

    return $order;
}

it('sends the paid order summary to one active recipient per job', function () {
    $order = paidEmailOrder();
    $recipient = EmailNotification::query()->create(['email' => 'owner@example.test']);
    Mail::fake();
    (new SendPaidOrderNotificationJob($order->id, $recipient->id, $recipient->email))->handle();
    Mail::assertSent(PaidOrderNotificationMail::class, fn ($mail) => $mail->hasTo($recipient->email) && $mail->order->is($order));
    Mail::assertSentCount(1);
});

it('renders the purchase summary with its admin order link', function () {
    $order = paidEmailOrder();
    $mail = new PaidOrderNotificationMail($order);
    $mail->assertSeeInHtml('Trail Gloves');
    $mail->assertSeeInHtml('Black');
    $mail->assertSeeInHtml('100.000');
    $mail->assertSeeInHtml(route('admin.orders.show', $order));
});

it('processes committed database queue jobs and discards rolled back jobs', function () {
    $order = paidEmailOrder();
    $recipient = EmailNotification::query()->create(['email' => 'owner@example.test']);
    config(['queue.default' => 'database']);
    Mail::fake();
    try {
        DB::transaction(function () use ($order, $recipient) {
            SendPaidOrderNotificationJob::dispatch($order->id, $recipient->id, $recipient->email);
            expect(DB::table('jobs')->count())->toBe(0);
            throw new RuntimeException('rollback');
        });
    } catch (RuntimeException) {
        expect(DB::table('jobs')->count())->toBe(0);
    }
    DB::transaction(function () use ($order, $recipient) {
        SendPaidOrderNotificationJob::dispatch($order->id, $recipient->id, $recipient->email);
        expect(DB::table('jobs')->count())->toBe(0);
    });
    expect(DB::table('jobs')->count())->toBe(1);
    $this->artisan('queue:work', ['--once' => true, '--stop-when-empty' => true])->assertSuccessful();
    Mail::assertSentCount(1);
    expect(DB::table('jobs')->count())->toBe(0);
});

it('skips recipients removed deactivated or edited before processing', function (string $change) {
    $order = paidEmailOrder();
    $recipient = EmailNotification::query()->create(['email' => 'owner@example.test']);
    $job = new SendPaidOrderNotificationJob($order->id, $recipient->id, $recipient->email);
    match ($change) {
        'delete' => $recipient->delete(),
        'deactivate' => $recipient->update(['is_active' => false]),
        'edit' => $recipient->update(['email' => 'new@example.test']),
    };
    Mail::fake();
    $job->handle();
    Mail::assertNothingSent();
})->with(['delete', 'deactivate', 'edit']);

it('does not send email for unpaid or deleted orders', function (bool $deleted) {
    $order = paidEmailOrder();
    $recipient = EmailNotification::query()->create(['email' => 'owner@example.test']);
    $job = new SendPaidOrderNotificationJob($order->id, $recipient->id, $recipient->email);
    $deleted ? $order->delete() : $order->update(['paid_at' => null, 'payment_status' => 'pending']);
    Mail::fake();
    $job->handle();
    Mail::assertNothingSent();
})->with([false, true]);

it('defers jobs until commit and discards them on rollback', function () {
    $order = paidEmailOrder();
    $recipient = EmailNotification::query()->create(['email' => 'owner@example.test']);
    Mail::fake();
    DB::transaction(function () use ($order, $recipient) {
        SendPaidOrderNotificationJob::dispatch($order->id, $recipient->id, $recipient->email)->afterCommit();
        Mail::assertNothingSent();
    });
    Mail::assertSentCount(1);
    try {
        DB::transaction(function () use ($order, $recipient) {
            SendPaidOrderNotificationJob::dispatch($order->id, $recipient->id, $recipient->email)->afterCommit();
            throw new RuntimeException('rollback');
        });
    } catch (RuntimeException) {
        Mail::assertSentCount(1);
    }
});

it('lets mail transport errors propagate for queue retries', function () {
    $order = paidEmailOrder();
    $recipient = EmailNotification::query()->create(['email' => 'owner@example.test']);
    Mail::shouldReceive('to')->once()->with($recipient->email)->andReturnSelf();
    Mail::shouldReceive('send')->once()->andThrow(new RuntimeException('temporary SMTP failure'));
    $job = new SendPaidOrderNotificationJob($order->id, $recipient->id, $recipient->email);
    expect(fn () => $job->handle())->toThrow(RuntimeException::class, 'temporary SMTP failure');
    expect($order->fresh()->payment_status)->toBe('paid')->and($job->tries)->toBe(3)->and($job->backoff)->toBe([10, 60]);
});
