<?php

namespace App\Services\Settings;

use App\Models\SiteSetting;

class SiteSettingService
{
    private const LEGACY_KEYS = [
        'shipper_name' => 'store_name',
        'whatsapp_number' => 'store_phone',
        'contact_phone' => 'store_phone',
        'shipper_phone' => 'store_phone',
        'origin_address' => 'store_address',
        'contact_address' => 'store_address',
    ];

    public function get(string $key, ?string $default = null): ?string
    {
        $canonicalKey = self::LEGACY_KEYS[$key] ?? $key;
        $keys = [$canonicalKey, ...array_keys(self::LEGACY_KEYS, $canonicalKey, true)];
        $values = self::canonicalize(SiteSetting::query()->whereIn('key', $keys)->pluck('value', 'key')->all());

        return $values[$canonicalKey] ?? $default;
    }

    public static function canonicalize(array $values): array
    {
        foreach (self::LEGACY_KEYS as $legacyKey => $canonicalKey) {
            if (! array_key_exists($canonicalKey, $values) && array_key_exists($legacyKey, $values)) {
                $values[$canonicalKey] = $values[$legacyKey];
            }

            unset($values[$legacyKey]);
        }

        return $values;
    }

    public function first(array $keys, ?string $default = null): ?string
    {
        foreach ($keys as $key) {
            $value = $this->get($key);

            if (filled($value)) {
                return $value;
            }
        }

        return $default;
    }
}
