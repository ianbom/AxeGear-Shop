<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    public function run(): void
    {
        // Data banner dikurasi dari aset produk https://zaskiamecca.com/.
        $banners = [
        [
            'title' => 'Home1',
            'subtitle' => 'Scarf Voal Alaska Premium edisi pahlawan perempuan Indonesia.',
            'image_desktop_url' => '/img/materi/BA.jpg',
            'image_mobile_url' => '/img/materi/BA.jpg',
            'button_text' => 'Belanja Sekarang',
            'button_url' => '/list',
            'placement' => 'homepage',
            'sort_order' => '1',
            'is_active' => true,
        ],
        [
            'title' => 'Home2',
            'subtitle' => 'Koleksi Raya ZM Zaskia Mecca untuk tampilan modest elegan.',
            'image_desktop_url' => '/img/materi/New Produk.jpg',
            'image_mobile_url' => '/img/materi/New Produk.jpg',
            'button_text' => 'Lihat Koleksi',
            'button_url' => '/collections/primadona-series',
            'placement' => 'homepage',
            'sort_order' => '2',
            'is_active' => true,
        ],
        // [
        //     'title' => 'Home3',
        //     'subtitle' => 'Motif Nusantara dalam scarf dan tunik ZM Zaskia Mecca.',
        //     'image_desktop_url' => '/img/materi/About Axegear.jpg',
        //     'image_mobile_url' => '/img/materi/About Axegear.jpg',
        //     'button_text' => 'Jelajahi',
        //     'button_url' => '/collections/jejak-teduh',
        //     'placement' => 'homepage',
        //     'sort_order' => '3',
        //     'is_active' => true,
        // ],
        [
                'title'              => 'Col1',
                'subtitle'           => 'Abaya Premium dengan Material Berkualitas Tinggi',
            'image_desktop_url' => '/img/materi/About Axegear.jpg',
            'image_mobile_url' => '/img/materi/About Axegear.jpg',
                'button_text'        => 'Shop Abaya',
                'button_url'         => '/list',
                'placement'          => 'collection',
                'sort_order'         => 1,
                'is_active'          => true,
            ],
            [
                'title'              => 'Hijab & Khimar Pilihan',
                'subtitle'           => 'Warna-warna Elegan untuk Setiap Kesempatan',
                'image_desktop_url'  => 'https://images.unsplash.com/photo-1655909961998-7d92664b2ecb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'image_mobile_url'   => 'https://images.unsplash.com/photo-1655909961998-7d92664b2ecb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'button_text'        => 'Lihat Semua',
                'button_url'         => '/list',
                'placement'          => 'collection',
                'sort_order'         => 2,
                'is_active'          => true,
            ],
                        [
                'title'              => 'Flash Sale — Up to 30% Off',
                'subtitle'           => 'Promo Terbatas! Dapatkan Penawaran Terbaik Hari Ini',
                'image_desktop_url'  => 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&auto=format&fit=crop',
                'image_mobile_url'   => 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=768&auto=format&fit=crop',
                'button_text'        => 'Klaim Diskon',
                'button_url'         => '/list',
                'placement'          => 'cta',
                'sort_order'         => 0,
                'is_active'          => true,
            ],


        ];
        foreach ($banners as $banner) {
            Banner::query()->updateOrCreate(['placement' => $banner['placement'], 'sort_order' => $banner['sort_order']], $banner);
        }
    }
}
