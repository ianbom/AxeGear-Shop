import { i as detail, o as list } from "./routes-EPw8WZ-p.js";
import { t as ProfileLayout } from "./profile-layout-CknzRhQx.js";
import { t as destroy } from "./WishlistController-DHNxYZQ_.js";
import { Link, router } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Heart } from "lucide-react";
//#region resources/js/pages/customer/wishlist/my-wishlist.tsx
var fallbackImages = [
	"/img/abdul-raheem-kannath-aNWfK46QWto-unsplash.webp",
	"/img/ainur-iman-qcNmigFPTQM-unsplash.webp",
	"/img/atiyeh-fathi-CvdzGjVX9DA-unsplash.webp",
	"/img/hasan-almasi-_X2UAmIcpko-unsplash.webp",
	"/img/ike-ellyana-2F70bGqQVa4-unsplash.webp"
];
var formatPrice = (value) => new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
	maximumFractionDigits: 0
}).format(value).replace("IDR", "Rp").trim();
function MyWishlist({ wishlistItems, summary }) {
	const visibleWishlistItems = wishlistItems.filter((item) => item.is_available);
	return /* @__PURE__ */ jsx(ProfileLayout, {
		title: "Wishlist Saya",
		pageTitle: "Wishlist Saya",
		subtitle: "Simpan item favoritmu sebelum kehabisan.",
		activePath: "wishlist",
		breadcrumbs: [
			{
				label: "Beranda",
				href: "/"
			},
			{
				label: "Akun Saya",
				href: "/my-profile"
			},
			{ label: "Wishlist Saya" }
		],
		children: /* @__PURE__ */ jsxs("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-6 flex items-end justify-between border-b border-hairline-strong pb-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "mb-1 text-[10px] font-semibold tracking-[0.24em] text-muted-foreground uppercase",
					children: "Item Tersimpan"
				}), /* @__PURE__ */ jsx("h2", {
					className: "text-[17px] font-semibold tracking-wide text-ink uppercase",
					children: "Koleksi Wishlist"
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "text-right text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase",
					children: [summary.item_count, " produk tersimpan"]
				})]
			}), visibleWishlistItems.length > 0 ? /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-5 md:gap-y-10 xl:grid-cols-4",
				children: visibleWishlistItems.map((item, index) => /* @__PURE__ */ jsx(WishlistTile, {
					item,
					index
				}, item.id))
			}) : /* @__PURE__ */ jsxs("div", {
				className: "flex min-h-[360px] flex-col items-center justify-center border border-hairline-strong bg-white px-6 text-center",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-sm font-semibold text-ink uppercase",
						children: "Wishlist masih kosong"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 max-w-sm text-[12px] leading-6 text-muted-foreground",
						children: "Simpan produk favorit dari katalog agar mudah ditemukan kembali."
					}),
					/* @__PURE__ */ jsx(Link, {
						href: list.url(),
						className: "mt-5 inline-flex h-10 items-center justify-center bg-primary px-5 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition hover:bg-[#E67312]",
						children: "Lihat Produk"
					})
				]
			})]
		})
	});
}
function WishlistTile({ item, index }) {
	const productHref = detail.url({ query: { product: item.slug } });
	const removeItem = (event) => {
		event.preventDefault();
		event.stopPropagation();
		router.delete(destroy.url(item.id), { preserveScroll: true });
	};
	return /* @__PURE__ */ jsxs(Link, {
		href: productHref,
		className: "group flex h-full flex-col",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "relative aspect-square overflow-hidden border border-hairline bg-white p-5 sm:p-6",
				children: [
					/* @__PURE__ */ jsx("img", {
						src: item.image ?? fallbackImages[index % fallbackImages.length],
						alt: item.title,
						loading: "lazy",
						decoding: "async",
						className: "h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
					}),
					item.badge && /* @__PURE__ */ jsx("div", {
						className: "absolute top-0 left-0 z-10 flex min-h-24 w-9 items-center justify-center bg-primary px-1 py-2 text-[10px] font-semibold tracking-[0.08em] text-white uppercase [writing-mode:vertical-rl] [text-orientation:mixed] [transform:rotate(180deg)] sm:w-10 sm:text-[11px]",
						children: item.badge
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-label": "Hapus dari wishlist",
						onClick: removeItem,
						className: "absolute top-3 right-3 z-10 grid size-9 place-items-center border border-hairline-strong bg-white text-ink transition hover:border-ink hover:text-primary",
						children: /* @__PURE__ */ jsx(Heart, {
							size: 18,
							fill: "currentColor",
							strokeWidth: 1.8
						})
					})
				]
			}),
			item.colors.length > 0 && /* @__PURE__ */ jsx("div", {
				className: "mt-2 flex flex-wrap gap-1.5",
				children: item.colors.map((color) => /* @__PURE__ */ jsx("span", {
					className: "size-4 border border-hairline-strong",
					style: { backgroundColor: color.hex },
					title: color.name
				}, color.hex))
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 text-[9px] font-semibold tracking-[0.18em] text-muted-foreground uppercase",
				children: item.category
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "mt-1 text-[11px] leading-[1.4] font-semibold text-ink uppercase transition-colors group-hover:text-primary",
				children: item.title
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-2 flex flex-wrap items-center gap-2 text-[11px] text-body",
				children: [/* @__PURE__ */ jsx("span", { children: formatPrice(item.sale_price ?? item.price) }), item.sale_price !== null && /* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground line-through",
					children: formatPrice(item.price)
				})]
			})
		]
	});
}
//#endregion
export { MyWishlist as default };

//# sourceMappingURL=my-wishlist-aPj3qHyG.js.map