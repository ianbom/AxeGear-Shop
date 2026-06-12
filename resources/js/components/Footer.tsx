import { Link } from '@inertiajs/react';

const columns = [
    {
        title: 'SHOP',
        links: [
            { label: 'Sunglasses', href: '/list?search=sunglasses' },
            { label: 'Goggles', href: '/list?search=goggles' },
        ],
    },
    {
        title: 'SUPPORT',
        links: [
            { label: 'Help Center', href: '/notifications' },
            { label: 'Shipping & Returns', href: '/shipping-policy' },
        ],
    },
    {
        title: 'COMPANY',
        links: [
            { label: 'About AxeGear', href: '/' },
            { label: 'Careers', href: '/' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-ink text-white">
            <div className="mx-auto grid max-w-[1728px] gap-8 px-8 py-8 sm:px-12 lg:grid-cols-[1fr_1fr_1fr_1.45fr] lg:gap-10 lg:px-[60px]">
                {columns.map((column, index) => (
                    <section
                        key={column.title}
                        className={`min-h-24 ${
                            index > 0
                                ? 'lg:border-l lg:border-white/35 lg:pl-14'
                                : ''
                        }`}
                    >
                        <p className="mb-3 text-[16px] leading-none font-extrabold tracking-[0.02em] text-white uppercase">
                            {column.title}
                        </p>
                        <ul className="grid gap-2.5 text-[16px] leading-6 text-white/88">
                            {column.links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}

                <section className="lg:border-l lg:border-white/35 lg:pl-11">
                    <p className="mb-3 text-[16px] leading-none font-extrabold tracking-[0.02em] text-white uppercase">
                        NEWSLETTER
                    </p>
                    <p className="max-w-[410px] text-[14px] leading-6 text-white/82">
                        Get updates on new arrivals, exclusive offers and
                        performance tips.
                    </p>
                    <form
                        className="mt-5 flex max-w-[420px]"
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <input
                            type="email"
                            aria-label="Email address"
                            placeholder="Enter your email"
                            className="h-[54px] min-w-0 flex-1 border border-white/45 bg-transparent px-5 text-[16px] text-white placeholder:text-white/80 focus:border-white focus:ring-0 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="h-[54px] bg-primary px-7 text-[15px] font-extrabold text-white uppercase hover:bg-[#E67312]"
                        >
                            Subscribe
                        </button>
                    </form>
                </section>
            </div>
        </footer>
    );
}
