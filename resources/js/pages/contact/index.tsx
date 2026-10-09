import { Head } from '@inertiajs/react';
import {
    ArrowRight,
    Clock3,
    Instagram,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
} from 'lucide-react';
import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

import ShopLayout from '@/layouts/shop-layout';

const unsplash = (id: string, width = 1400) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&q=85&w=${width}`;

interface ContactSettings {
    store_name: string | null;
    store_email: string | null;
    store_phone: string | null;
    store_address: string | null;
    business_hours: string | null;
    store_latitude: string | null;
    store_longitude: string | null;
    contact_maps_url: string | null;
    instagram_url: string | null;
    tiktok_url: string | null;
}

function httpUrl(value: string | null): string | null {
    try {
        const url = new URL(value ?? '');

        return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
    } catch {
        return null;
    }
}

const fieldClass =
    'h-11 w-full rounded-none border border-[#BEBEBE] bg-white px-3 text-[13px] text-[#252525] outline-none focus:border-[#F58220] focus:ring-0';

export default function ContactIndex({
    contactSettings,
}: {
    contactSettings: ContactSettings;
}) {
    const [messageLength, setMessageLength] = useState(0);
    const [error, setError] = useState('');
    const settings = contactSettings;
    const digits = (settings.store_phone ?? '').replace(/[\s()+.-]/g, '');
    const internationalPhone = digits.startsWith('0')
        ? '62' + digits.slice(1)
        : digits;
    const whatsappPhone = /^[1-9]\d{7,14}$/.test(internationalPhone)
        ? internationalPhone
        : null;
    const email = settings.store_email?.trim();
    const emailHref =
        email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ? 'mailto:' + encodeURIComponent(email)
            : undefined;
    const latitude = Number(settings.store_latitude);
    const longitude = Number(settings.store_longitude);
    const coordinatesValid =
        Boolean(
            settings.store_latitude?.trim() && settings.store_longitude?.trim(),
        ) &&
        Number.isFinite(latitude) &&
        Number.isFinite(longitude) &&
        Math.abs(latitude) <= 90 &&
        Math.abs(longitude) <= 180;
    const mapQuery = coordinatesValid
        ? latitude + ',' + longitude
        : settings.store_address?.trim();
    const mapEmbedUrl = mapQuery
        ? 'https://www.google.com/maps?q=' +
          encodeURIComponent(mapQuery) +
          '&output=embed'
        : null;
    const mapLink =
        httpUrl(settings.contact_maps_url) ??
        (mapQuery
            ? 'https://www.google.com/maps/search/?api=1&query=' +
              encodeURIComponent(mapQuery)
            : null);
    const supportInfo = [
        {
            icon: Clock3,
            title: 'Support Hours',
            content: settings.business_hours || '—',
        },
        {
            icon: Mail,
            title: 'Customer Support Email',
            content: email || '—',
            href: emailHref,
        },
        {
            icon: Phone,
            title: 'Phone / WhatsApp',
            content: settings.store_phone || '—',
            href: whatsappPhone ? 'tel:+' + whatsappPhone : undefined,
        },
        {
            icon: MapPin,
            title: 'Head Office',
            content:
                [settings.store_name, settings.store_address]
                    .filter(Boolean)
                    .join('\n') || '—',
        },
    ];
    const socialLinks = [
        {
            icon: Instagram,
            label: 'Instagram',
            url: httpUrl(settings.instagram_url),
        },
        {
            icon: MessageCircle,
            label: 'TikTok',
            url: httpUrl(settings.tiktok_url),
        },
    ].filter((social) => social.url);

    const submitContact = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        const form = new FormData(event.currentTarget);
        const name = String(form.get('full_name') ?? '').trim();
        const message = String(form.get('message') ?? '').trim();

        if (!name || !message || message.length > 1000) {
            setError('Isi nama dan pesan. Pesan maksimal 1.000 karakter.');

            return;
        }

        if (!whatsappPhone) {
            setError('Nomor WhatsApp toko belum tersedia.');

            return;
        }

        const text =
            'Halo ' +
            (settings.store_name?.trim() || 'toko') +
            ', saya ingin menghubungi customer support.\n\nNama: ' +
            name +
            '\n\nPesan:\n' +
            message;
        window.location.assign(
            'https://wa.me/' +
                whatsappPhone +
                '?text=' +
                encodeURIComponent(text),
        );
    };

    return (
        <ShopLayout>
            <Head title="Contact Us" />
            <div className="bg-white text-[13px] text-[#171717] [&_a]:text-[12px] [&_button]:text-[12px] [&_input]:text-[13px] [&_label]:text-[12px] [&_p]:text-[13px] [&_select]:text-[13px] [&_textarea]:text-[13px]">
                <section className="relative h-[320px] overflow-hidden sm:h-[340px]">
                    <img
                        src={unsplash('photo-1558981806-ec527fa84c39', 1800)}
                        alt="Enduro rider exploring an outdoor trail"
                        className="absolute inset-0 h-full w-full object-cover object-[65%_45%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/0" />
                    <div className="relative mx-auto flex h-full max-w-[1640px] items-center px-7 py-9 sm:px-11 lg:px-[76px]">
                        <div className="max-w-[390px]">
                            <p className="flex items-center gap-3 text-[13px] font-bold tracking-[0.04em] uppercase">
                                <span className="h-px w-6 bg-[#F58220]" />
                                Customer Support
                            </p>
                            <h1 className="mt-3 text-[38px] leading-[0.93] font-black tracking-[-0.035em] uppercase sm:text-[50px]">
                                Let’s Talk
                            </h1>
                            <p className="mt-4 max-w-[420px] text-[16px] leading-[1.5]">
                                Questions about products, orders, shipping, or
                                warranty? Our team is here to help you find the
                                answers you need.
                            </p>
                            <a
                                href="#contact-form"
                                className="mt-5 inline-flex items-center gap-3 text-[14px] font-bold text-[#F58220]"
                            >
                                Contact Support{' '}
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </section>

                <div className="mx-auto max-w-[1450px] px-4 py-5 sm:px-8 lg:px-[52px]">
                    <section className="mt-5 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
                        <form
                            id="contact-form"
                            onSubmit={submitContact}
                            className="border border-[#D8D8D8] p-5 sm:p-8"
                        >
                            <p className="text-[11px] font-bold tracking-[0.04em] text-[#F58220] uppercase">
                                Send Us a Message
                            </p>
                            <h2 className="mt-1 text-[29px] leading-none font-black">
                                How Can We Help?
                            </h2>
                            <p className="mt-2 text-[10px] text-[#666]">
                                Isi nama dan pesan untuk membuka draft WhatsApp.
                                Kirim pesan melalui WhatsApp setelah chat
                                terbuka.
                            </p>
                            <div className="mt-5">
                                <Field label="Full Name" required>
                                    <input
                                        required
                                        name="full_name"
                                        autoComplete="name"
                                        aria-describedby={
                                            error ? 'contact-error' : undefined
                                        }
                                        className={fieldClass}
                                        placeholder="Rizky Pratama"
                                    />
                                </Field>
                            </div>
                            <Field label="Message" required className="mt-4">
                                <textarea
                                    required
                                    name="message"
                                    aria-describedby={
                                        error
                                            ? 'contact-message-count contact-error'
                                            : 'contact-message-count'
                                    }
                                    maxLength={1000}
                                    onChange={(event) =>
                                        setMessageLength(
                                            event.target.value.length,
                                        )
                                    }
                                    className="h-[150px] w-full resize-none rounded-none border border-[#BEBEBE] p-3 text-[13px] outline-none focus:border-[#F58220]"
                                    placeholder={'Tell us how we can help you.'}
                                />
                                <span
                                    id="contact-message-count"
                                    className="block text-right text-[9px] text-[#777]"
                                >
                                    {messageLength} / 1000
                                </span>
                            </Field>
                            <div className="mt-5 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={!whatsappPhone}
                                    className="min-h-12 w-full rounded-none bg-[#F58220] px-6 py-3 text-[13px] font-bold text-white uppercase hover:bg-[#E67312] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                                >
                                    Lanjutkan ke WhatsApp
                                </button>
                            </div>
                            {!whatsappPhone && (
                                <p className="mt-3 text-sm text-[#555]">
                                    Nomor WhatsApp toko belum tersedia.
                                </p>
                            )}
                            {error && (
                                <p
                                    id="contact-error"
                                    role="alert"
                                    className="mt-3 text-sm text-destructive"
                                >
                                    {error}
                                </p>
                            )}
                        </form>

                        <aside className="bg-[linear-gradient(145deg,#181818,#080808)] px-7 py-8 text-white sm:px-10">
                            <h2 className="text-[18px] font-black text-white uppercase">
                                Support Information
                            </h2>
                            <div className="mt-4">
                                {supportInfo.map(
                                    ({ icon: Icon, title, content, href }) => (
                                        <div
                                            key={title}
                                            className="flex gap-5 border-b border-white/20 py-5"
                                        >
                                            <Icon
                                                className="h-7 w-7 shrink-0 text-[#F58220]"
                                                strokeWidth={1.7}
                                            />
                                            <div className="min-w-0">
                                                <h3 className="text-[11px] font-black tracking-[0.03em] text-white uppercase">
                                                    {title}
                                                </h3>
                                                <div className="mt-1 text-[11px] leading-[1.5] wrap-anywhere whitespace-pre-line text-white/85">
                                                    {href ? (
                                                        <a
                                                            href={href}
                                                            className="underline underline-offset-2"
                                                        >
                                                            {content}
                                                        </a>
                                                    ) : (
                                                        content
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                            <p className="mt-5 max-w-[350px] text-[11px] leading-[1.5] text-white/75">
                                Jelaskan kebutuhan Anda dengan jelas agar tim
                                support dapat membantu melalui WhatsApp.
                            </p>
                        </aside>
                    </section>

                    <section className="mt-5 grid gap-5 lg:grid-cols-2">
                        <div className="relative min-h-[260px] overflow-hidden border border-[#D8D8D8]">
                            {mapEmbedUrl ? (
                                <iframe
                                    title={
                                        'Lokasi ' +
                                        (settings.store_name || 'toko')
                                    }
                                    src={mapEmbedUrl}
                                    className="absolute inset-0 h-full w-full border-0 grayscale-[25%]"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            ) : (
                                <p className="p-5 text-sm text-[#555]">
                                    Lokasi toko belum tersedia.
                                </p>
                            )}
                            {mapLink && (
                                <a
                                    href={mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute right-3 bottom-3 bg-white px-3 py-2 font-medium underline shadow-sm"
                                >
                                    Buka Google Maps
                                </a>
                            )}
                        </div>
                        <div className="border border-[#D8D8D8] p-5">
                            <p className="text-[10px] font-bold text-[#F58220] uppercase">
                                Stay Connected
                            </p>
                            <p className="mt-2 max-w-[520px] text-[10px] leading-[1.45] text-[#555]">
                                Follow {settings.store_name || 'our store'} for
                                product launches, athlete stories, riding
                                inspiration, and event updates.
                            </p>
                            <div className="mt-10 grid grid-cols-2 gap-4 text-center">
                                {socialLinks.map(
                                    ({ icon: Icon, label, url }) => (
                                        <a
                                            key={label}
                                            href={url ?? undefined}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex flex-col items-center gap-3 text-[8px]"
                                        >
                                            <Icon
                                                className="h-9 w-9"
                                                strokeWidth={2}
                                            />
                                            <span>{label}</span>
                                        </a>
                                    ),
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </ShopLayout>
    );
}

function Field({
    label,
    required = false,
    className = '',
    children,
}: {
    label: string;
    required?: boolean;
    className?: string;
    children: ReactNode;
}) {
    return (
        <label
            className={`block text-[9px] font-medium text-[#333] ${className}`}
        >
            <span className="mb-1.5 block">
                {label}
                {required && <span className="sr-only"> required</span>}
            </span>
            {children}
        </label>
    );
}
