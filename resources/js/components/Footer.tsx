import { Link } from '@inertiajs/react';
import {
    Instagram,
    Facebook,
    Twitter,
    Youtube,
    Mail,
    MapPin,
    Phone,
    ArrowRight,
} from 'lucide-react';
import React from 'react';

export default function Footer() {
    return (
        <footer className="border-t border-[#9A6B45] bg-[#B98B63] pt-14 pb-8 text-white md:pt-20 [&_*]:!text-white [&_a]:!text-white/80 [&_a:hover]:!text-white [&_h3]:!text-white [&_p]:!text-white/80 [&_span]:!text-white/80">
            {/* Top Section: Brand & CTA */}
            <div className="mx-auto mb-16 max-w-[1500px] px-6 md:px-10">
                <div className="grid grid-cols-1 items-center gap-12 border-b border-[#9A6B45] pb-12 lg:grid-cols-2">
                    <div className="flex flex-col">
                        <div className="mb-4 flex items-center gap-4">
                            {/* <img
                                src="/logo-shay/anemi-black.webp"
                                alt="Anemi"
                                className="h-16 w-auto object-contain md:h-20"
                            /> */}
                            <span className="text-xl font-semibold tracking-[0.3em] text-white uppercase md:text-2xl">
                                Anemi Official
                            </span>
                        </div>
                        <p className="max-w-md text-xs leading-relaxed text-white/80 md:text-sm">
                            Menghadirkan modest fashion dengan elegansi dan
                            kelembutan. Temukan identitas terbaikmu lewat
                            koleksi eksklusif kami.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 lg:items-end">
                        <h3 className="mb-4 text-xs font-semibold tracking-[0.2em] text-white uppercase">
                            Tetap Terhubung
                        </h3>
                        <p className="max-w-md text-sm leading-6 text-white/80 lg:text-right">
                            Jelajahi koleksi terbaru Anemi dan temukan pilihan
                            modest fashion yang siap melengkapi hari-harimu.
                        </p>
                        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row lg:justify-end">
                            <Link
                                href="/list"
                                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/60 bg-[#9A6B45] px-5 py-2.5 text-xs font-semibold tracking-[0.16em] !text-white uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 hover:border-white hover:bg-[#7D5638] hover:!text-white"
                            >
                                Lihat Koleksi
                                <span className="flex size-7 items-center justify-center rounded-full bg-white/20 !text-white transition-colors duration-300 group-hover:bg-white/30 group-hover:!text-white">
                                    <ArrowRight size={14} />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Section: Links */}
            <div className="mx-auto max-w-[1500px] px-6 md:px-10">
                <div className="mb-16 grid grid-cols-1 gap-12 text-[11px] font-medium tracking-[0.12em] md:grid-cols-2 lg:grid-cols-4">
                    {/* Contact Us */}
                    <div>
                        <h3 className="mb-6 text-xs font-semibold tracking-[0.2em] text-white uppercase">
                            Hubungi Kami
                        </h3>
                        <ul className="space-y-4 text-white/80">
                            <li className="group flex cursor-pointer items-start gap-3 transition-colors hover:text-white">
                                <MapPin
                                    size={16}
                                    className="mt-0.5 shrink-0 transition-colors group-hover:text-white"
                                />
                                <span className="leading-relaxed">
                                    Jl. Raya Surabaya No. 123,
                                    <br />
                                    Surabaya, 12345
                                </span>
                            </li>
                            <li className="group flex cursor-pointer items-center gap-3 transition-colors hover:text-white">
                                <Phone
                                    size={16}
                                    className="shrink-0 transition-colors group-hover:text-white"
                                />
                                <span>+62 812 3456 7890</span>
                            </li>
                            <li className="group flex cursor-pointer items-center gap-3 transition-colors hover:text-white">
                                <Mail
                                    size={16}
                                    className="shrink-0 transition-colors group-hover:text-white"
                                />
                                <span>hello@Anemi.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h3 className="mb-6 text-xs font-semibold tracking-[0.2em] text-white uppercase">
                            Layanan Pelanggan
                        </h3>
                        <ul className="space-y-4 text-white/80">
                            <li>
                                <Link
                                    href="/list"
                                    className="inline-block transition-transform hover:translate-x-1 hover:text-white"
                                >
                                    Cara Membeli
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/checkout"
                                    className="inline-block transition-transform hover:translate-x-1 hover:text-white"
                                >
                                    Informasi Pembayaran
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shipping-policy"
                                    className="inline-block transition-transform hover:translate-x-1 hover:text-white"
                                >
                                    Informasi Pengiriman
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/no-return-policy"
                                    className="inline-block transition-transform hover:translate-x-1 hover:text-white"
                                >
                                    Retur & Penukaran
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/my-order"
                                    className="inline-block transition-transform hover:translate-x-1 hover:text-white"
                                >
                                    Lacak Pesanan
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/notifications"
                                    className="inline-block transition-transform hover:translate-x-1 hover:text-white"
                                >
                                    Pertanyaan Umum
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="mb-6 text-xs font-semibold tracking-[0.2em] text-white uppercase">
                            Informasi
                        </h3>
                        <ul className="space-y-4 text-white/80">
                            <li>
                                <Link
                                    href="/"
                                    className="inline-block transition-transform hover:translate-x-1 hover:text-white"
                                >
                                    Cerita Kami
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/"
                                    className="inline-block transition-transform hover:translate-x-1 hover:text-white"
                                >
                                    Jurnal Kami
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shipping-policy"
                                    className="inline-block transition-transform hover:translate-x-1 hover:text-white"
                                >
                                    Kebijakan Pengiriman
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/no-return-policy"
                                    className="inline-block transition-transform hover:translate-x-1 hover:text-white"
                                >
                                    Kebijakan Tanpa Retur
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-conditions"
                                    className="inline-block transition-transform hover:translate-x-1 hover:text-white"
                                >
                                    Syarat & Ketentuan
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="inline-block transition-transform hover:translate-x-1 hover:text-white"
                                >
                                    Kebijakan Privasi
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Payment & Social */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h3 className="mb-6 text-xs font-semibold tracking-[0.2em] text-white uppercase">
                                Pembayaran Aman
                            </h3>
                            <div className="grid grid-cols-4 gap-2 opacity-90 transition-opacity hover:opacity-100">
                                {[
                                    'QRIS',
                                    'OVO',
                                    'Shopee',
                                    'Dana',
                                    'BNI',
                                    'Mandiri',
                                    'BCA',
                                    'BSI',
                                    'VISA',
                                    'JCB',
                                    'MasterCard',
                                ].map((method) => (
                                    <div
                                        key={method}
                                        className="flex h-8 cursor-default items-center justify-center border border-white/30 bg-white/10 text-[7px] font-semibold tracking-wider text-white uppercase transition-colors hover:border-white hover:bg-white/20"
                                    >
                                        {method}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center justify-between border-t border-white/30 pt-8 text-[10px] tracking-[0.15em] text-white/70 md:flex-row">
                    <p className="mb-4 md:mb-0">
                        © {new Date().getFullYear()} Anemi. All Rights Reserved.
                    </p>

                    <div className="flex items-center space-x-6">
                        <button
                            type="button"
                            className="transition-all duration-300 hover:-translate-y-1 hover:text-white"
                        >
                            <Instagram size={18} strokeWidth={1.5} />
                        </button>
                        <button
                            type="button"
                            className="transition-all duration-300 hover:-translate-y-1 hover:text-white"
                        >
                            <Facebook size={18} strokeWidth={1.5} />
                        </button>
                        <button
                            type="button"
                            className="transition-all duration-300 hover:-translate-y-1 hover:text-white"
                        >
                            <Twitter size={18} strokeWidth={1.5} />
                        </button>
                        <button
                            type="button"
                            className="transition-all duration-300 hover:-translate-y-1 hover:text-white"
                        >
                            <Youtube size={18} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
