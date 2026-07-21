import { Link } from '@inertiajs/react';
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

const columns = [
    {
        title: 'SHOP',
        links: [
            { label: 'Enduro', href: '#' },
            { label: 'MTB', href: '#' },
            { label: 'Running', href: '#' },
            { label: 'Adventure', href: '#' },
            { label: 'New Product', href: '#' },
        ],
    },
    {
        title: 'EXPLORE',
        links: [
            { label: 'About Axegear', href: '/about' },
            { label: 'Brand Ambassador', href: '#' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Blog', href: '/blog' },
        ],
    },
    {
        title: 'SUPPORT',
        links: [
            { label: 'FAQ', href: '#' },
            { label: 'Contact Us', href: '#' },
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
        <footer id="contact" className="bg-[#0d0d0d] text-white">
            <section className="border-b border-white/10 bg-[#0c0c0c]">
                <div className="mx-auto grid max-w-[1728px] gap-10 px-6 py-9 sm:px-8 md:grid-cols-[1.25fr_0.7fr_0.7fr_0.7fr_1.45fr] md:gap-0 md:px-[68px] md:py-10">
                    <section className="pr-0 md:pr-12">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3"
                        >
                            <img
                                src="/logo-shay/axegear-logo-transparant.webp"
                                alt="AxeGear"
                                className="h-16 w-auto object-contain brightness-100 invert-0 sm:h-18"
                            />
                            <span className="text-[28px] leading-none font-black tracking-[-0.08em] text-white uppercase sm:text-[34px] md:text-[42px]">
                                AxeGear
                            </span>
                        </Link>
                        <p className="mt-5 max-w-[310px] text-[16px] leading-[1.45] font-medium text-white/76">
                            Performance eyewear and gear engineered for athletes
                            who refuse to slow down.
                        </p>
                        <div className="mt-7 flex items-center gap-5">
                            {socialLinks.map(({ label, href, icon: Icon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="inline-flex h-8 w-8 items-center justify-center text-white transition-colors hover:text-[#F58220]"
                                >
                                    <Icon
                                        className="h-[22px] w-[22px]"
                                        strokeWidth={2.1}
                                    />
                                </Link>
                            ))}
                        </div>
                    </section>

                    {columns.map((column) => (
                        <section
                            key={column.title}
                            className="md:border-l md:border-white/10 md:px-10"
                        >
                            <h3 className="text-[15px] leading-none font-extrabold tracking-[0.04em] text-white uppercase">
                                {column.title}
                            </h3>
                            <ul className="mt-6 grid gap-3.5">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            onClick={(event) => {
                                                if (link.href === '#') {
                                                    event.preventDefault();
                                                }
                                            }}
                                            className="text-[16px] leading-none font-medium text-white/82 transition-colors hover:text-[#F58220]"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}

                    <section className="md:border-l md:border-white/10 md:pl-12">
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
                                <label
                                    htmlFor="footer-stay-connected"
                                    className="sr-only"
                                >
                                    Email address
                                </label>
                                <input
                                    id="footer-stay-connected"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="h-full min-w-0 flex-1 bg-transparent text-[16px] font-medium text-white outline-none placeholder:text-white/52"
                                />
                                <button
                                    type="submit"
                                    aria-label="Submit email"
                                    className="inline-flex h-9 w-9 items-center justify-center text-white transition-colors hover:text-[#F58220]"
                                >
                                    <ArrowRight
                                        className="h-5 w-5"
                                        strokeWidth={2.2}
                                    />
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </section>

            <section className="bg-[#0b0b0b]">
                <div className="mx-auto flex max-w-[1728px] flex-col gap-4 px-6 py-5 text-[15px] font-medium text-white/72 sm:px-8 md:flex-row md:items-center md:justify-between md:px-[68px]">
                    <p>© 2024 AxeGear Shop. All Rights Reserved.</p>
                    <div className="flex flex-wrap items-center gap-3 text-white/78">
                        <Link
                            href="/privacy-policy"
                            className="transition-colors hover:text-[#F58220]"
                        >
                            Privacy Policy
                        </Link>
                        <span className="text-white/35">|</span>
                        <Link
                            href="/terms-conditions"
                            className="transition-colors hover:text-[#F58220]"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </section>
        </footer>
    );
}
