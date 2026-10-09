<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use App\Services\Settings\SiteSettingService;
use Inertia\Response;

class ContactController extends Controller
{
    public function __invoke(): Response
    {
        $keys = ['store_name', 'store_email', 'store_phone', 'store_address', 'business_hours', 'store_latitude', 'store_longitude', 'contact_maps_url', 'instagram_url', 'tiktok_url'];
        $values = SiteSettingService::canonicalize(SiteSetting::query()
            ->whereIn('key', [...$keys, 'shipper_name', 'whatsapp_number', 'contact_phone', 'shipper_phone', 'origin_address', 'contact_address'])
            ->pluck('value', 'key')->all());

        return inertia('contact/index', [
            'contactSettings' => array_replace(array_fill_keys($keys, null), array_intersect_key($values, array_flip($keys))),
        ]);
    }
}
