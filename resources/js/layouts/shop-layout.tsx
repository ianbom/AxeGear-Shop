import { Link, usePage } from '@inertiajs/react';
import { Home, LayoutGrid, ShoppingBag, User } from 'lucide-react';
import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/sonner';

interface ShopLayoutProps {
    children: ReactNode;
}

type SharedShopProps = {
    auth: {
        user: unknown | null;
    };
    shop?: {
        cart_count?: number;
        featured_collections?: Array<{
            id: number;
            name: string;
            slug: string;
        }>;
    };
};

export default function ShopLayout({ children }: ShopLayoutProps) {
    const { url, props } = usePage<SharedShopProps>();
    const cartCount = props.shop?.cart_count ?? 0;
    const featuredCollections = props.shop?.featured_collections ?? [];
    const isAuthenticated = Boolean(props.auth.user);

    const navItems = [
        { icon: Home, label: 'Home', href: '/', active: url === '/' },
        {
            icon: LayoutGrid,
            label: 'Shop',
            href: '/list',
            active: url.startsWith('/list'),
        },
        {
            icon: ShoppingBag,
            label: 'Cart',
            href: '/my-cart',
            active: url.startsWith('/my-cart'),
            count: cartCount,
        },
        {
            icon: User,
            label: 'Account',
            href: '/my-profile',
            active: url.startsWith('/my-profile'),
        },
    ];

    return (
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-white font-sans text-[#272727] selection:bg-[#B98B63] selection:text-white">
            <Navbar
                cartCount={cartCount}
                collections={featuredCollections}
                currentUrl={url}
                isAuthenticated={isAuthenticated}
            />
            <main className="mx-auto w-full max-w-md flex-grow bg-white pb-24 md:max-w-none md:pb-0">
                {children}
            </main>
            <Toaster />
            <Footer />

            {/* Mobile Bottom Navigation */}
            <nav className="pb-safe fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-[#e7e2de] bg-white/98 px-6 py-2 backdrop-blur-xl md:hidden">
                <div className="flex h-14 items-center justify-between">
                    {navItems.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={`flex w-14 flex-col items-center justify-center transition-colors ${item.active ? 'text-[#151515]' : 'text-[#8b827c]'}`}
                            >
                                <div className="relative mb-1">
                                    <Icon
                                        strokeWidth={item.active ? 2 : 1.5}
                                        size={22}
                                        className={
                                            item.active
                                                ? 'fill-[#151515]/10'
                                                : ''
                                        }
                                    />
                                    {'count' in item &&
                                        Number(item.count ?? 0) > 0 && (
                                            <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center bg-[#B98B63] px-1 text-[9px] leading-none font-semibold text-white">
                                                {Number(item.count ?? 0) > 99
                                                    ? '99+'
                                                    : item.count}
                                            </span>
                                        )}
                                </div>
                                <span className="text-[10px] font-medium">
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
