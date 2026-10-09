<?php

namespace App\Services\Admin;

use App\Models\SiteSetting;
use App\Services\Settings\SiteSettingService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class SettingManagementService
{
    private array $sections = [
        'store' => [
            'title' => 'Store Settings',
            'description' => 'Kelola identitas toko, kontak, dan link sosial. Nama, telepon, dan alamat toko juga digunakan untuk WhatsApp dan pengiriman.',
            'fields' => [
                ['key' => 'store_name', 'label' => 'Store Name', 'type' => 'string'],
                ['key' => 'store_email', 'label' => 'Store Email', 'type' => 'string', 'input' => 'email'],
                ['key' => 'store_phone', 'label' => 'Store Phone', 'type' => 'string'],
                ['key' => 'store_address', 'label' => 'Store Address', 'type' => 'string', 'input' => 'textarea'],
                ['key' => 'contact_maps_url', 'label' => 'Store Maps URL', 'type' => 'string', 'input' => 'url'],
                ['key' => 'instagram_url', 'label' => 'Instagram URL', 'type' => 'string', 'input' => 'url'],
                ['key' => 'tiktok_url', 'label' => 'TikTok URL', 'type' => 'string', 'input' => 'url'],
                ['key' => 'footer_text', 'label' => 'Footer Text', 'type' => 'string', 'input' => 'textarea'],
            ],
        ],
        'payment' => [
            'title' => 'Payment Settings',
            'description' => 'Simpan konfigurasi pembayaran non-sensitif. Server key tetap dikelola dari .env.',
            'fields' => [
                ['key' => 'payment_expiry_duration', 'label' => 'Payment Expiry Duration (minutes)', 'type' => 'number', 'input' => 'number'],
                ['key' => 'payment_service_fee', 'label' => 'Payment Service Fee', 'type' => 'number', 'input' => 'number'],
            ],
        ],
        'shipping' => [
            'title' => 'Shipping Settings',
            'description' => 'Kelola lokasi asal pengiriman dan kurir aktif. Identitas pengirim menggunakan Store Settings. API key Biteship tetap disimpan di .env.',
            'fields' => [
                ['key' => 'origin_province', 'label' => 'Origin Province', 'type' => 'string'],
                ['key' => 'origin_city', 'label' => 'Origin City', 'type' => 'string'],
                ['key' => 'origin_district', 'label' => 'Origin District', 'type' => 'string'],
                ['key' => 'store_postal_code', 'label' => 'Store Postal Code', 'type' => 'string'],
                ['key' => 'store_latitude', 'label' => 'Store Latitude', 'type' => 'string', 'input' => 'number'],
                ['key' => 'store_longitude', 'label' => 'Store Longitude', 'type' => 'string', 'input' => 'number'],
                ['key' => 'shipping_couriers', 'label' => 'Shipping Couriers', 'type' => 'string'],
            ],
        ],
    ];

    public function indexData(Request $request): array
    {
        $activeSection = (string) $request->route('section', 'store');
        abort_unless(array_key_exists($activeSection, $this->sections), 404);

        $keys = $this->fields()->pluck('key')->all();
        $values = SiteSettingService::canonicalize(SiteSetting::query()->pluck('value', 'key')->all());

        return [
            'activeSection' => $activeSection,
            'sections' => $this->sections,
            'values' => array_intersect_key($values, array_flip($keys)),
        ];
    }

    public function update(array $validated): void
    {
        foreach ($this->fields() as $field) {
            $key = $field['key'];

            if (! array_key_exists($key, $validated)) {
                continue;
            }

            SiteSetting::query()->updateOrCreate(
                ['key' => $key],
                [
                    'value' => $this->normalizeValue($validated[$key]),
                    'type' => $field['type'],
                ],
            );
        }
    }

    private function fields(): Collection
    {
        return collect($this->sections)->flatMap(fn (array $section): array => $section['fields'])->values();
    }

    private function normalizeValue(mixed $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        if (is_bool($value)) {
            return $value ? '1' : '0';
        }

        if (is_array($value)) {
            return json_encode($value, JSON_THROW_ON_ERROR);
        }

        return (string) $value;
    }
}
