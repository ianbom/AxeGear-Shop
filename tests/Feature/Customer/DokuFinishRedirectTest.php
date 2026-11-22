<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('returns from DOKU without trusting browser payment status', function () {
    $user = User::factory()->create();
    $this->actingAs($user)->get('/payments/doku/finish?status=SUCCESS&invoice_number=forged')->assertRedirect(route('my-order'));
    $this->assertDatabaseCount('payments', 0);
});
