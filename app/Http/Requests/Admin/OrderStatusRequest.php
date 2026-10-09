<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OrderStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin' && (bool) $this->user()?->is_active;
    }

    /**
     * @return array<string, list<mixed>>
     */
    public function rules(): array
    {
        return [
            'status' => ['required', Rule::in(['processing', 'ready_to_ship', 'completed', 'shipment_failed'])],
            'reason' => ['required_if:status,shipment_failed', 'nullable', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'reason.required_if' => 'Tuliskan alasan pesanan ditandai gagal dikirim.',
            'reason.string' => 'Alasan harus berupa teks.',
            'reason.max' => 'Alasan maksimal 1000 karakter.',
            'status.in' => 'Perubahan status pesanan tidak diizinkan.',
        ];
    }
}
