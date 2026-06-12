import { Link } from '@inertiajs/react';
import { Heart, LogIn, ShoppingBag, User } from 'lucide-react';
import AppLogo from './app-logo';
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

export default function Navbar({
    cartCount = 0,
    collections = [],
    currentUrl = '/',
    isAuthenticated = false,
}: NavbarProps) {
    const cartBadge = cartCount > 99 ? '99+' : String(cartCount);
    const [pathname, queryString = ''] = currentUrl.split('?');
    const params = new URLSearchParams(queryString);
    const activeCollection = params.get('collection');
    const isProductList = pathname === '/list';
    const isAllProductActive = isProductList && !activeCollection;
    const menuClass = (active: boolean) =>
        [
            'border-b pb-1 transition-colors',
            active
                ? 'border-[#151515]'
                : 'border-transparent hover:border-[#151515]',
        ].join(' ');

    return (
        <nav className="sticky top-0 z-50 border-b border-[#e7e2de] bg-white">
            {/* Mobile View */}
            <div className="flex h-16 w-full items-center justify-between px-4 md:hidden">
                <Link
                    href="/"
                    className="flex h-10 items-center overflow-visible"
                >
                    <AppLogo className="h-10 brightness-100 invert-0" />
                </Link>
                <div className="flex items-center gap-4 text-[#151515]">
                    {isAuthenticated ? (
                        <Link href={'/wishlist'}>
                            <Heart
                                strokeWidth={1.5}
                                size={22}
                                className="cursor-pointer"
                            />
                        </Link>
                    ) : (
                        <Link
                            href={login.url()}
                            className="group inline-flex h-9 items-center gap-2 border border-[#B98B63]/70 bg-[#fff8f2] px-3 text-[10px] font-semibold tracking-[0.14em] text-[#9A6B45] uppercase shadow-[0_8px_18px_rgba(185,139,99,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B98B63] hover:text-white hover:shadow-[0_12px_24px_rgba(185,139,99,0.24)]"
                        >
                            <span className="flex h-5 w-5 items-center justify-center bg-[#B98B63]/12 text-[#B98B63] transition-colors duration-300 group-hover:bg-white/18 group-hover:text-white">
                                <LogIn size={13} strokeWidth={1.8} />
                            </span>
                            <span>Login</span>
                        </Link>
                    )}
                </div>
            </div>

            {/* Desktop View (Keeping existing structure but restyled) */}
            <div className="hidden h-[76px] w-full items-center justify-between px-10 md:flex">
                <Link
                    href="/"
                    className="flex h-14 cursor-pointer items-center justify-center overflow-visible transition-opacity duration-300 hover:opacity-75"
                >
                    <AppLogo className="h-10 brightness-100 invert-0" />
                </Link>

                <div className="flex items-center gap-9 text-[12px] font-medium tracking-[0.12em] text-[#151515] uppercase">
                    <Link
                        href="/list"
                        className={menuClass(isAllProductActive)}
                    >
                        ALL PRODUCT
                    </Link>
                    {collections.map((collection) => {
                        const isActive =
                            isProductList &&
                            activeCollection === collection.slug;

                        return (
                            <Link
                                key={collection.id}
                                href={`/list?collection=${encodeURIComponent(collection.slug)}`}
                                className={menuClass(isActive)}
                            >
                                {collection.name.toUpperCase()}
                            </Link>
                        );
                    })}
                </div>

                <div className="flex items-center gap-6 text-[#151515]">
                    {isAuthenticated ? (
                        <>
                            <Link href="/my-profile" aria-label="Buka profil">
                                <User
                                    strokeWidth={1.4}
                                    size={20}
                                    className="cursor-pointer transition-opacity hover:opacity-60"
                                />
                            </Link>
                            <div className="relative">
                                <Link href="/my-cart" aria-label="Buka keranjang">
                                    <ShoppingBag
                                        strokeWidth={1.4}
                                        size={20}
                                        className="cursor-pointer transition-opacity hover:opacity-60"
                                    />
                                </Link>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center bg-[#B98B63] px-1 text-[9px] font-bold text-white">
                                        {cartBadge}
                                    </span>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link
                            href={login.url()}
                            className="group relative inline-flex h-10 items-center gap-2 overflow-hidden bg-[#B98B63] px-4 text-[11px] font-semibold tracking-[0.16em] text-white uppercase shadow-[0_10px_24px_rgba(185,139,99,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9A6B45] hover:shadow-[0_14px_30px_rgba(154,107,69,0.28)]"
                        >
                            <span className="absolute inset-y-0 left-0 w-1 bg-white/30 transition-all duration-300 group-hover:w-full" />
                            <span className="relative flex h-5 w-5 items-center justify-center bg-white/12 transition-colors duration-300 group-hover:bg-white/18">
                                <LogIn size={13} strokeWidth={1.8} />
                            </span>
                            <span className="relative">Login</span>
                            <span className="relative h-px w-5 bg-white/70 transition-all duration-300 group-hover:w-7 group-hover:bg-white" />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
