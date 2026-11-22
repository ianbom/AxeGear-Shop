<?php

namespace App\Http\Requests\Customer;

use Illuminate\Foundation\Http\FormRequest;

class UpsertAddressRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, list<mixed>>
     */
    public function rules(): array
    {
        return [
            'recipient_name' => ['required', 'string', 'max:150'],
            'recipient_phone' => ['required', 'string', 'max:30'],
            'label' => ['nullable', 'string', 'max:100'],
            'province' => ['required', 'string', 'max:100'],
            'city' => ['required', 'string', 'max:100'],
            'district' => ['required', 'string', 'max:100'],
            'subdistrict' => ['nullable', 'string', 'max:100'],
            'postal_code' => ['required', 'max:20'],
            'biteship_area_id' => ['required', 'string', 'max:100'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'full_address' => ['required', 'string', 'max:5000'],
            'note' => ['nullable', 'string', 'max:2000'],
            'is_default' => ['sometimes', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'required' => ':attribute wajib diisi.',
            'string' => ':attribute harus berupa teks.',
            'max' => ':attribute maksimal :max karakter.',
            'numeric' => ':attribute harus berupa angka.',
            'between' => ':attribute harus berada di antara :min dan :max.',
            'boolean' => ':attribute harus berupa pilihan ya atau tidak.',
            'province.required' => 'Pilih area dari hasil pencarian kode pos untuk mengisi provinsi.',
            'city.required' => 'Pilih area dari hasil pencarian kode pos untuk mengisi kota.',
            'district.required' => 'Pilih area dari hasil pencarian kode pos untuk mengisi kecamatan.',
            'postal_code.required' => 'Pilih area dari hasil pencarian kode pos untuk mengisi kode pos.',
            'biteship_area_id.required' => 'Pilih area pengiriman dari hasil pencarian kode pos.',
        ];
    }

    public function attributes(): array
    {
        return [
            'recipient_name' => 'Nama penerima',
            'recipient_phone' => 'Nomor telepon',
            'label' => 'Label alamat',
            'province' => 'Provinsi',
            'city' => 'Kota',
            'district' => 'Kecamatan',
            'subdistrict' => 'Kelurahan',
            'postal_code' => 'Kode pos',
            'biteship_area_id' => 'Area pengiriman',
            'latitude' => 'Koordinat lintang',
            'longitude' => 'Koordinat bujur',
            'full_address' => 'Alamat lengkap',
            'note' => 'Catatan alamat',
            'is_default' => 'Pilihan alamat utama',
        ];
    }
}
