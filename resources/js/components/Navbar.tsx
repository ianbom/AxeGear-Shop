import { Link } from '@inertiajs/react';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { useState } from 'react';
import { login } from '@/routes';

type NavbarCollection = {
    id: number;
    name: string;
    slug: string;
};

type NavbarProps = {
    cartCount?: number;
    collections?: NavbarCollection[];
    currentUrl?: string;
    isAuthenticated?: boolean;
};

function AxeGearWordmark() {
    return (
        <span className="text-[28px] leading-none font-black tracking-[-0.08em] text-ink uppercase sm:text-[34px] lg:text-[42px]">
            AxeGear
        </span>
    );
}

export default function Navbar({
    cartCount = 0,
    collections = [],
    currentUrl = '/',
    isAuthenticated = false,
}: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const cartBadge = cartCount > 99 ? '99+' : String(cartCount);
    const accountHref = isAuthenticated ? '/my-profile' : login.url();
    const navItems = collections.map((collection) => ({
        label: collection.name,
        href: `/list?collection=${collection.slug}`,
    }));

    const isActive = (href: string) =>
        href.includes('?') && currentUrl === href;

    return (
        <header className="sticky top-0 z-50 border-b-2 border-ink bg-canvas">
            <div className="flex h-[72px] items-center justify-between px-5 sm:px-8 lg:h-[78px] lg:px-9">
                <Link
                    href="/"
                    aria-label="AxeGear home"
                    className="shrink-0 transition-opacity hover:opacity-80"
                >
                    <AxeGearWordmark />
                </Link>

                <nav className="hidden items-center gap-8 text-[15px] leading-none font-extrabold tracking-[0.03em] text-ink uppercase xl:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`py-7 transition-colors hover:text-primary ${
                                isActive(item.href) ? 'text-primary' : 'text-ink'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3 text-ink sm:gap-5">
                    <Link
                        href={accountHref}
                        aria-label={
                            isAuthenticated ? 'Open account' : 'Login account'
                        }
                        className="hidden size-11 items-center justify-center hover:text-primary sm:flex"
                    >
                        <User size={31} strokeWidth={2.1} />
                    </Link>
                    <Link
                        href="/my-cart"
                        aria-label="Open cart"
                        className="relative flex size-11 items-center justify-center hover:text-primary"
                    >
                        <ShoppingCart size={34} strokeWidth={2.2} />
                        <span className="absolute top-0 right-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[11px] leading-none font-extrabold text-white">
                            {cartBadge}
                        </span>
                    </Link>
                    <button
                        type="button"
                        aria-label="Open menu"
                        onClick={() => setIsOpen(true)}
                        className="flex size-11 items-center justify-center hover:text-primary xl:hidden"
                    >
                        <Menu size={31} strokeWidth={2.2} />
                    </button>
                </div>
            </div>

            <button
                type="button"
                aria-label="Close menu overlay"
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 z-[70] bg-black/50 transition-opacity xl:hidden ${
                    isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
            />
            <aside
                className={`fixed top-0 right-0 bottom-0 z-[80] w-[min(86vw,360px)] border-l border-ink bg-canvas p-5 transition-transform xl:hidden ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="mb-8 flex items-center justify-between border-b border-ink pb-5">
                    <AxeGearWordmark />
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={() => setIsOpen(false)}
                        className="flex size-10 items-center justify-center border border-hairline hover:border-ink hover:text-primary"
                    >
                        <X size={24} />
                    </button>
                </div>
                <nav className="grid divide-y divide-hairline text-[15px] font-extrabold tracking-[0.03em] uppercase">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`py-4 hover:text-primary ${
                                isActive(item.href) ? 'text-primary' : 'text-ink'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href={accountHref}
                        onClick={() => setIsOpen(false)}
                        className="py-4 hover:text-primary"
                    >
                        {isAuthenticated ? 'ACCOUNT' : 'LOGIN'}
                    </Link>
                </nav>
            </aside>
        </header>
    );
}
