import { Link } from '@inertiajs/react';
import {
    ChevronDown,
    Menu,
    ShoppingCart,
    User,
    X,
} from 'lucide-react';
import { useState } from 'react';

import { login } from '@/routes';

type NavbarCollection = { id: number; name: string; slug: string };
type NavbarProps = {
    cartCount?: number;
    collections?: NavbarCollection[];
    currentUrl?: string;
    isAuthenticated?: boolean;
};

const navItems = [
    { label: 'About Us', href: '/about', hasDropdown: false },
    { label: 'Shop By Product', href: '/list', hasDropdown: true },
    {
        label: 'New Product',
        href: '/new-product',
        hasDropdown: false,
    },
    { label: 'Gallery', href: '/gallery', hasDropdown: false },
    { label: 'Blog', href: '/blog', hasDropdown: false },
    { label: 'Contact Us', href: '/contact', hasDropdown: false },
] as const;

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
    const [isShopOpen, setIsShopOpen] = useState(false);
    const cartBadge = cartCount > 99 ? '99+' : String(cartCount);
    const accountHref = isAuthenticated ? '/my-profile' : login.url();
    const [pathname] = currentUrl.split('?');

    const isActive = (href: string): boolean => {
        if (href === '/list') {
            return pathname === '/list';
        }

        return pathname === href;
    };

    const closeMobileMenu = () => {
        setIsOpen(false);
        setIsShopOpen(false);
    };

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

                <nav className="hidden items-stretch gap-5 text-[11px] leading-none font-extrabold tracking-[0.03em] text-ink uppercase md:flex lg:gap-8 lg:text-[13px]">
                    {navItems.map((item) =>
                        item.hasDropdown ? (
                            <div
                                key={item.label}
                                className="group relative flex items-stretch"
                            >
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-1.5 py-7 transition-colors group-focus-within:text-primary group-hover:text-primary hover:text-primary ${isActive(item.href) ? 'text-primary' : 'text-ink'}`}
                                >
                                    {item.label}
                                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" />
                                </Link>
                                <div className="invisible absolute top-full left-1/2 z-50 w-[280px] -translate-x-1/2 translate-y-2 border border-[#D9D9D9] bg-white p-3 opacity-0 shadow-[0_18px_42px_rgba(0,0,0,0.14)] transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                    <p className="border-b border-[#E5E5E5] px-3 py-2 text-[9px] font-bold tracking-[0.08em] text-[#707070] uppercase">
                                        Featured Collections
                                    </p>
                                    <div className="mt-1 grid">
                                        {collections.length > 0 ? (
                                            collections.map((collection) => (
                                                <Link
                                                    key={collection.id}
                                                    href={`/list?collection=${collection.slug}`}
                                                    className="flex items-center justify-between px-3 py-3 text-[12px] font-bold tracking-normal text-[#1A1A1A] normal-case hover:bg-[#FFF3E8] hover:text-[#F58220]"
                                                >
                                                    {collection.name}
                                                    <ArrowMark />
                                                </Link>
                                            ))
                                        ) : (
                                            <Link
                                                href="/list"
                                                className="flex items-center justify-between px-3 py-3 text-[12px] font-bold tracking-normal text-[#1A1A1A] normal-case hover:bg-[#FFF3E8] hover:text-[#F58220]"
                                            >
                                                View All Products
                                                <ArrowMark />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center py-7 transition-colors hover:text-primary ${isActive(item.href) ? 'text-primary' : 'text-ink'}`}
                            >
                                {item.label}
                            </Link>
                        ),
                    )}
                </nav>

                <div className="flex items-center gap-3 text-ink sm:gap-5">
      
                    <Link
                        href={accountHref}
                        aria-label={
                            isAuthenticated ? 'Open account' : 'Login account'
                        }
                        className="hidden size-10 items-center justify-center hover:text-primary sm:flex"
                    >
                        <User size={27} strokeWidth={2.1} />
                    </Link>
                    <Link
                        href="/my-cart"
                        aria-label="Open cart"
                        className="relative flex size-10 items-center justify-center hover:text-primary"
                    >
                        <ShoppingCart size={29} strokeWidth={2.2} />
                        <span className="absolute top-0 right-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[11px] leading-none font-extrabold text-white">
                            {cartBadge}
                        </span>
                    </Link>
                    <button
                        type="button"
                        aria-label="Open menu"
                        onClick={() => setIsOpen(true)}
                        className="flex size-10 items-center justify-center hover:text-primary md:hidden"
                    >
                        <Menu size={29} strokeWidth={2.2} />
                    </button>
                </div>
            </div>

            <button
                type="button"
                aria-label="Close menu overlay"
                onClick={closeMobileMenu}
                className={`fixed inset-0 z-[70] bg-black/50 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            />
            <aside
                className={`fixed top-0 right-0 bottom-0 z-[80] w-[min(88vw,380px)] border-l border-ink bg-canvas p-5 transition-transform md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="mb-8 flex items-center justify-between border-b border-ink pb-5">
                    <AxeGearWordmark />
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={closeMobileMenu}
                        className="flex size-10 items-center justify-center border border-hairline hover:border-ink hover:text-primary"
                    >
                        <X size={24} />
                    </button>
                </div>
                <nav className="grid divide-y divide-hairline text-[15px] font-extrabold tracking-[0.03em] uppercase">
                    {navItems.map((item) =>
                        item.hasDropdown ? (
                            <div key={item.label}>
                                <div className="flex items-center">
                                    <Link
                                        href={item.href}
                                        onClick={closeMobileMenu}
                                        className={`flex-1 py-4 hover:text-primary ${isActive(item.href) ? 'text-primary' : 'text-ink'}`}
                                    >
                                        {item.label}
                                    </Link>
                                    <button
                                        type="button"
                                        aria-label="Toggle product collections"
                                        aria-expanded={isShopOpen}
                                        onClick={() =>
                                            setIsShopOpen((value) => !value)
                                        }
                                        className="flex size-12 items-center justify-center rounded-none hover:text-primary"
                                    >
                                        <ChevronDown
                                            className={`h-5 w-5 transition-transform ${isShopOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                </div>
                                <div
                                    className={`grid overflow-hidden transition-[grid-template-rows] ${isShopOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                                >
                                    <div className="min-h-0">
                                        <div className="mb-3 grid border-l-2 border-[#F58220] bg-[#F8F8F8] px-4 py-2 text-[13px] tracking-normal normal-case">
                                            {collections.length > 0 ? (
                                                collections.map(
                                                    (collection) => (
                                                        <Link
                                                            key={collection.id}
                                                            href={`/list?collection=${collection.slug}`}
                                                            onClick={
                                                                closeMobileMenu
                                                            }
                                                            className="py-3 hover:text-primary"
                                                        >
                                                            {collection.name}
                                                        </Link>
                                                    ),
                                                )
                                            ) : (
                                                <Link
                                                    href="/list"
                                                    onClick={closeMobileMenu}
                                                    className="py-3 hover:text-primary"
                                                >
                                                    View All Products
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={closeMobileMenu}
                                className={`py-4 hover:text-primary ${isActive(item.href) ? 'text-primary' : 'text-ink'}`}
                            >
                                {item.label}
                            </Link>
                        ),
                    )}
                    <Link
                        href={accountHref}
                        onClick={closeMobileMenu}
                        className="py-4 hover:text-primary"
                    >
                        {isAuthenticated ? 'ACCOUNT' : 'LOGIN'}
                    </Link>
                </nav>
            </aside>
        </header>
    );
}

function ArrowMark() {
    return (
        <span aria-hidden="true" className="text-[#F58220]">
            →
        </span>
    );
}
