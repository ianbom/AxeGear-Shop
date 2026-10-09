<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $settings = [
            // ─── Store Identity ──────────────────────────────────────────────────
            ['key' => 'store_name',             'value' => 'AxeGear',                                   'type' => 'string'],
            ['key' => 'store_email',            'value' => 'indonesiaaxegear@gmail.com',                 'type' => 'string'],
            ['key' => 'store_phone',            'value' => '6285780645938',                              'type' => 'string'],
            ['key' => 'store_address',          'value' => 'Bavva (Samping Erafone atau seberang Solaria), Jl Ciater Raya, Ciater, Serpong, Tangerang Selatan 15310', 'type' => 'text'],
            ['key' => 'instagram_url',          'value' => 'https://instagram.com/itsarsyari.id',        'type' => 'string'],
            ['key' => 'tiktok_url',             'value' => 'https://tiktok.com/@itsarsyari.id',          'type' => 'string'],
            ['key' => 'footer_text',            'value' => "© 2026 Auréa Syar'i. Seluruh hak cipta dilindungi.", 'type' => 'text'],

            ['key' => 'store_latitude',       'value' => '-6.314540',                                    'type' => 'string'],
            ['key' => 'store_longitude',       'value' => '106.699569',                                    'type' => 'string'],

            // ─── Contact & Location ──────────────────────────────────────────────
            ['key' => 'contact_maps_url',       'value' => 'https://maps.app.goo.gl/hJaZggaoj14kGQqq5',   'type' => 'string'],
            ['key' => 'business_hours',         'value' => 'Senin – Jumat: 09.00–17.00 WIB | Sabtu: 09.00–13.00 WIB', 'type' => 'string'],

            // ─── Shipping ────────────────────────────────────────────────────────
            ['key' => 'origin_province',        'value' => 'Banten',                                    'type' => 'string'],
            ['key' => 'origin_city',            'value' => 'Tangerang Selatan',                         'type' => 'string'],
            ['key' => 'origin_district',        'value' => 'Serpong',                                   'type' => 'string'],
            ['key' => 'shipping_couriers',      'value' => 'jnt,jne',                                   'type' => 'string'],
            ['key' => 'store_postal_code',       'value' => '15310',                                    'type' => 'string'],

            // ─── Payment ─────────────────────────────────────────────────────────
            ['key' => 'payment_expiry_duration', 'value' => '1440',                                      'type' => 'integer'],
            ['key' => 'payment_service_fee',    'value' => '0',                                         'type' => 'integer'],

        ];

        foreach ($settings as &$setting) {
            $setting['created_at'] = $now;
            $setting['updated_at'] = $now;
        }

        DB::table('site_settings')->where('key', 'enabled_couriers')->delete();

        DB::table('site_settings')->upsert(
            $settings,
            ['key'],             // unique column to match on
            ['value', 'type', 'updated_at']  // columns to update if exists
        );
    }
}
