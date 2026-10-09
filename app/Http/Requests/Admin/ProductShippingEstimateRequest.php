<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ProductShippingEstimateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin' && (bool) $this->user()?->is_active;
    }

    public function rules(): array
    {
        return array_fill_keys(['weight', 'length', 'width', 'height'], ['required', 'numeric', 'gt:0', 'max:1000000000']);
    }

    public function messages(): array
    {
        return [
            'required' => ':attribute wajib diisi untuk menghitung estimasi ongkir.',
            'numeric' => ':attribute harus berupa angka.',
            'gt' => ':attribute harus lebih dari 0.',
            'max' => ':attribute terlalu besar untuk dihitung.',
        ];
    }

    public function attributes(): array
    {
        return ['weight' => 'Berat (gram)', 'length' => 'Panjang (cm)', 'width' => 'Lebar (cm)', 'height' => 'Tinggi (cm)'];
    }
}
