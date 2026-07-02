import {
    ArrowRight,
    Facebook,
    Instagram,
    RotateCcw,
    ShieldCheck,
    Truck,
    Youtube,
    Zap,
} from 'lucide-react';
import { Link } from '@inertiajs/react';

const heroCopy = {
    title: 'JOIN THE AXEGEAR COMMUNITY',
    body: 'Be first to know about new releases, exclusive offers, and athlete stories.',
};

const columns = [
    {
        title: 'SHOP',
        links: [
            { label: 'Sunglasses', href: '/list?search=sunglasses' },
            { label: 'Goggles', href: '/list?search=goggles' },
            { label: 'Gloves', href: '/list?search=gloves' },
            { label: 'Apparel', href: '/list?search=apparel' },
            { label: 'Accessories', href: '/list?search=accessories' },
            { label: 'Sale', href: '/list?search=sale' },
        ],
    },
    {
        title: 'EXPLORE',
        links: [
            { label: 'Our Story', href: '/about' },
            { label: 'Technology', href: '/about' },
            { label: 'Athlete Stories', href: '/about' },
            { label: 'Blog', href: '/about' },
            { label: 'Care Guide', href: '/size-guide.webp' },
        ],
    },
    {
        title: 'SUPPORT',
        links: [
            { label: 'FAQ', href: '/about' },
            { label: 'Shipping & Returns', href: '/shipping-policy' },
            { label: 'Warranty', href: '/no-return-policy' },
            { label: 'Contact Us', href: '/about' },
            { label: 'Size Guide', href: '/size-guide.webp' },
        ],
    },
];

const socialLinks = [
    { label: 'Instagram', href: '/', icon: Instagram },
    { label: 'Facebook', href: '/', icon: Facebook },
    { label: 'YouTube', href: '/', icon: Youtube },
    { label: 'Athletes', href: '/', icon: Zap },
];

const trustItems = [
    { label: 'Secure Payments', icon: ShieldCheck },
    { label: 'Free Shipping Over $75', icon: Truck },
    { label: '30-Day Returns', icon: RotateCcw },
];

export default function Footer() {
    return (
        <footer className="bg-[#0d0d0d] text-white">
            <section className="relative overflow-hidden bg-[#111111] px-6 py-10 text-white md:px-10 lg:px-12 lg:py-14">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-18"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1800&auto=format&fit=crop')",
                }}
            />
            <div className="relative mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                <div>
                    <h2 className="text-[48px] leading-[0.9] font-black text-white uppercase italic md:text-[68px]">
                        Join the AxeGear community
                    </h2>
                    <p className="mt-4 max-w-[560px] text-[17px] leading-8 font-medium text-white/82">
                        Be first to know about new releases, exclusive offers,
                        and athlete stories.
                    </p>
                </div>

                <form
                    className="grid gap-3 sm:grid-cols-[1fr_auto]"
                    onSubmit={(event) => event.preventDefault()}
                >
                    <input
                        type="email"
                        placeholder="Enter your email"
                        aria-label="Enter your email"
                        className="h-13 border border-white/35 bg-white px-5 text-[15px] font-medium text-[#1A1A1A] placeholder:text-[#707070] focus:border-[#F58220] focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="inline-flex h-13 items-center justify-center bg-[#F58220] px-10 text-[14px] font-black tracking-[0.06em] text-white uppercase hover:bg-[#E67312]"
                    >
                        Join Us
                    </button>
                </form>
            </div>
        </section>

            <section className="border-b border-white/10 bg-[#0c0c0c]">
                <div className="mx-auto grid max-w-[1728px] gap-10 px-6 py-9 sm:px-8 lg:grid-cols-[1.25fr_0.7fr_0.7fr_0.7fr_1.45fr] lg:gap-0 lg:px-[68px] lg:py-10">
                    <section className="pr-0 lg:pr-12">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <img
                                src="/logo-shay/axegear-logo-transparant.webp"
                                alt="AxeGear"
                                className="h-16 w-auto object-contain brightness-100 invert-0 sm:h-18"
                            />
                            <span className="text-[28px] leading-none font-black tracking-[-0.08em] text-white uppercase sm:text-[34px] lg:text-[42px]">
                                AxeGear
                            </span>
                        </Link>
                        <p className="mt-5 max-w-[310px] text-[16px] leading-[1.45] font-medium text-white/76">
                            Performance eyewear and gear engineered for athletes who refuse to slow down.
                        </p>
                        <div className="mt-7 flex items-center gap-5">
                            {socialLinks.map(({ label, href, icon: Icon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="inline-flex h-8 w-8 items-center justify-center text-white transition-colors hover:text-[#F58220]"
                                >
                                    <Icon className="h-[22px] w-[22px]" strokeWidth={2.1} />
                                </Link>
                            ))}
                        </div>
                    </section>

                    {columns.map((column) => (
                        <section
                            key={column.title}
                            className="lg:border-l lg:border-white/10 lg:px-10"
                        >
                            <h3 className="text-[15px] leading-none font-extrabold tracking-[0.04em] text-white uppercase">
                                {column.title}
                            </h3>
                            <ul className="mt-6 grid gap-3.5">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-[16px] leading-none font-medium text-white/82 transition-colors hover:text-[#F58220]"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}

                    <section className="lg:border-l lg:border-white/10 lg:pl-12">
                        <h3 className="text-[15px] leading-none font-extrabold tracking-[0.04em] text-white uppercase">
                            STAY CONNECTED
                        </h3>
                        <p className="mt-3 text-[16px] leading-[1.4] font-medium text-white/86">
                            Be the first to know.
                        </p>
                        <form
                            className="mt-5"
                            onSubmit={(event) => event.preventDefault()}
                        >
                            <div className="flex h-[56px] items-center border border-white/14 bg-[#101010] px-5">
                                <label htmlFor="footer-stay-connected" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="footer-stay-connected"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="h-full min-w-0 flex-1 bg-transparent text-[16px] font-medium text-white placeholder:text-white/52 outline-none"
                                />
                                <button
                                    type="submit"
                                    aria-label="Submit email"
                                    className="inline-flex h-9 w-9 items-center justify-center text-white transition-colors hover:text-[#F58220]"
                                >
                                    <ArrowRight className="h-5 w-5" strokeWidth={2.2} />
                                </button>
                            </div>
                        </form>
                        <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
                            {trustItems.map(({ label, icon: Icon }) => (
                                <div key={label} className="flex items-center gap-3 text-white/82">
                                    <Icon className="h-[18px] w-[18px] shrink-0 text-white" strokeWidth={2} />
                                    <span className="text-[15px] leading-[1.25] font-medium">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </section>

            <section className="bg-[#0b0b0b]">
                <div className="mx-auto flex max-w-[1728px] flex-col gap-4 px-6 py-5 text-[15px] font-medium text-white/72 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-[68px]">
                    <p>© 2024 AxeGear Shop. All Rights Reserved.</p>
                    <div className="flex flex-wrap items-center gap-3 text-white/78">
                        <Link href="/privacy-policy" className="transition-colors hover:text-[#F58220]">
                            Privacy Policy
                        </Link>
                        <span className="text-white/35">|</span>
                        <Link href="/terms-conditions" className="transition-colors hover:text-[#F58220]">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </section>
        </footer>
    );
}
