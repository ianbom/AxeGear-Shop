<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->string('payment_provider', 50)->default('doku');
            $table->string('payment_method', 100)->default('qris');
            $table->string('provider_reference', 64)->unique();
            $table->string('create_request_id', 100)->unique();
            $table->text('checkout_url')->nullable();
            $table->string('transaction_status', 50)->default('pending');
            $table->decimal('gross_amount', 15, 2);
            $table->string('currency', 10)->default('IDR');
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('expired_at')->nullable();
            $table->json('raw_response')->nullable();
            $table->timestamps();

            $table->index(['order_id', 'transaction_status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
