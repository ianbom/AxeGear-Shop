import { Head } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    Clock3,
    Instagram,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    ShoppingBag,
    Youtube,
} from 'lucide-react';
import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

import ShopLayout from '@/layouts/shop-layout';

const unsplash = (id: string, width = 1400) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&q=85&w=${width}`;

const supportInfo = [
    {
        icon: Clock3,
        title: 'Support Hours',
        content: (
            <div className="grid grid-cols-[1fr_auto] gap-x-6 text-[11px] leading-[1.55]">
                <span>Monday–Friday</span>
                <span>09:00 – 17:00</span>
                <span>Saturday</span>
                <span>09:00 – 14:00</span>
                <span>Sunday & Public Holidays</span>
                <span>Closed</span>
            </div>
        ),
    },
    {
        icon: Mail,
        title: 'Customer Support Email',
        content: 'support@axegearshop.com',
    },
    { icon: Phone, title: 'Phone / WhatsApp', content: '+62 812 3456 7890' },
    {
        icon: MapPin,
        title: 'Head Office',
        content: 'AxeGear Shop\nSurabaya, Indonesia',
    },
];

const fieldClass =
    'h-11 w-full rounded-none border border-[#BEBEBE] bg-white px-3 text-[13px] text-[#252525] outline-none focus:border-[#F58220] focus:ring-0';

export default function ContactIndex() {
    const [messageLength, setMessageLength] = useState(0);
    const [sent, setSent] = useState(false);

    const submitContact = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSent(true);
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
                                Contact Support <ArrowRight className="h-4 w-4" />
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
                                Complete the form and our support team will
                                respond as soon as possible.
                            </p>
                            <div className="mt-5 grid gap-x-5 gap-y-4 sm:grid-cols-2">
                                <Field label="Full Name" required>
                                    <input
                                        required
                                        className={fieldClass}
                                        placeholder="Rizky Pratama"
                                    />
                                </Field>
                                <Field label="Phone Number" required>
                                    <input
                                        required
                                        type="tel"
                                        className={fieldClass}
                                        placeholder="+62 812 3456 7890"
                                    />
                                </Field>
                            </div>
                            <Field label="Message" required className="mt-4">
                                <textarea
                                    required
                                    maxLength={1000}
                                    onChange={(event) =>
                                        setMessageLength(
                                            event.target.value.length,
                                        )
                                    }
                                    className="h-[150px] w-full resize-none rounded-none border border-[#BEBEBE] p-3 text-[13px] outline-none focus:border-[#F58220]"
                                    placeholder={'Tell us how we can help you.'}
                                />
                                <span className="block text-right text-[9px] text-[#777]">
                                    {messageLength} / 1000
                                </span>
                            </Field>
                            <div className="mt-5 flex justify-end">
                                <button
                                    type="submit"
                                    className="h-12 w-full rounded-none bg-[#F58220] px-8 text-[13px] font-bold text-white uppercase hover:bg-[#E67312] sm:w-[230px]"
                                >
                                    Send Message
                                </button>
                            </div>
                            {sent && (
                                <div className="mt-4 flex items-center gap-3 border border-[#52A76C] bg-[#F6FFF8] p-3 text-[10px] text-[#28753E]">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span>
                                        <strong className="block">
                                            Your message has been sent.
                                        </strong>
                                        Our support team will contact you
                                        shortly.
                                    </span>
                                </div>
                            )}
                        </form>

                        <aside className="bg-[linear-gradient(145deg,#181818,#080808)] px-7 py-8 text-white sm:px-10">
                            <h2 className="text-[18px] font-black text-white uppercase">
                                Support Information
                            </h2>
                            <div className="mt-4">
                                {supportInfo.map(
                                    ({ icon: Icon, title, content }) => (
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
                                                <div className="mt-1 text-[11px] leading-[1.5] whitespace-pre-line text-white/85">
                                                    {content}
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                            <p className="mt-5 max-w-[350px] text-[11px] leading-[1.5] text-white/75">
                                For faster assistance, provide an active phone
                                number and explain your request clearly.
                            </p>
                        </aside>
                    </section>

                    <section className="mt-5 grid gap-5 lg:grid-cols-2">
                        <div className="relative min-h-[260px] overflow-hidden border border-[#D8D8D8]">
                            <iframe
                                title="AxeGear Surabaya location"
                                src="https://www.google.com/maps?q=Surabaya%2C%20Indonesia&output=embed"
                                className="absolute inset-0 h-full w-full border-0 grayscale-[25%]"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <div className="border border-[#D8D8D8] p-5">
                            <p className="text-[10px] font-bold text-[#F58220] uppercase">
                                Stay Connected
                            </p>
                            <p className="mt-2 max-w-[520px] text-[10px] leading-[1.45] text-[#555]">
                                Follow AxeGear for product launches, athlete
                                stories, riding inspiration, and event updates.
                            </p>
                            <div className="mt-10 grid grid-cols-4 gap-4 text-center">
                                {[
                                    [Instagram, 'Instagram'],
                                    [MessageCircle, 'TikTok'],
                                    [Youtube, 'YouTube'],
                                    [ShoppingBag, 'Facebook'],
                                ].map(([Icon, label]) => {
                                    const SocialIcon = Icon as typeof Instagram;

                                    return (
                                        <a
                                            key={String(label)}
                                            href="#"
                                            onClick={(event) =>
                                                event.preventDefault()
                                            }
                                            className="flex flex-col items-center gap-3 text-[8px]"
                                        >
                                            <SocialIcon
                                                className="h-9 w-9"
                                                strokeWidth={2}
                                            />
                                            <span>@axegearshop</span>
                                        </a>
                                    );
                                })}
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
