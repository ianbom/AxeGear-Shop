<?php

namespace App\Http\Requests\Customer;

use App\Services\Integrations\DokuService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PlaceOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'customer_address_id' => ['required', 'integer'],
            'shipping_rate_id' => ['required', 'string'],
            'payment_method' => ['required', 'string', Rule::in(array_keys(DokuService::PAYMENT_METHODS))],
            'idempotency_key' => ['required', 'string', 'max:100'],
            'voucher_code' => ['nullable', 'string', 'max:50'],
            'notes' => ['nullable', 'string', 'max:2000'],
            'no_return_refund_agreed' => ['accepted'],
        ];
    }
}
