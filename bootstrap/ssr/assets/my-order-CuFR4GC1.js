import { t as ProfileLayout } from "./profile-layout-CknzRhQx.js";
import { n as index, r as show } from "./OrderController-g0c5stvv.js";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Check, ChevronLeft, ChevronRight, Package, Search, ShoppingCart, Truck } from "lucide-react";
//#region resources/js/pages/customer/order/my-order.tsx
var FALLBACK_IMAGE = "/img/hasan-almasi-_X2UAmIcpko-unsplash.webp";
var formatPrice = (price) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0
	}).format(price).replace("Rp", "Rp ");
};
var labelStatus = (status) => {
	const labels = {
		pending: "Menunggu",
		pending_payment: "Menunggu Pembayaran",
		paid: "Dibayar",
		processing: "Diproses",
		ready_to_ship: "Siap Dikirim",
		shipped: "Dikirim",
		delivered: "Terkirim",
		completed: "Selesai",
		cancelled: "Dibatalkan",
		expired: "Kedaluwarsa",
		failed: "Gagal",
		created_at: "Tanggal Dibuat",
		grand_total: "Total"
	};
	if (labels[status]) return labels[status];
	return status.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};
var getStatusTextStyle = (status) => {
	switch (status) {
		case "pending":
		case "pending_payment": return "text-orange-700";
		case "paid":
		case "completed": return "text-green-700";
		case "processing":
		case "ready_to_ship": return "text-blue-700";
		case "shipped": return "text-purple-700";
		case "delivered": return "text-emerald-700";
		case "cancelled":
		case "expired":
		case "failed": return "text-red-700";
		default: return "text-gray-700";
	}
};
var cleanQuery = (filters) => {
	return Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== "" && value !== null));
};
var cleanPageLabel = (label) => {
	return label.replace("&laquo;", "").replace("&raquo;", "").trim();
};
var canBuyAgain = (status) => {
	return status === "delivered" || status === "completed";
};
function ListOrder({ orders, filters }) {
	const [form, setForm] = useState({ search: filters.search ?? "" });
	const visit = (next) => {
		router.get(index.url(), cleanQuery(next), {
			preserveScroll: true,
			preserveState: true,
			replace: true
		});
	};
	const submit = (event) => {
		event.preventDefault();
		visit(form);
	};
	return /* @__PURE__ */ jsxs(ProfileLayout, {
		title: "Pesanan Saya",
		pageTitle: "Pesanan Saya",
		subtitle: "Lacak dan kelola pembelian terbarumu.",
		activePath: "list-order",
		breadcrumbs: [
			{
				label: "Beranda",
				href: "/"
			},
			{
				label: "Akun Saya",
				href: "/my-profile"
			},
			{ label: "Pesanan Saya" }
		],
		children: [/* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			className: "mb-6 grid gap-3 lg:grid-cols-[1fr_auto]",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "relative",
				children: [/* @__PURE__ */ jsx(Search, {
					size: 18,
					className: "absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground"
				}), /* @__PURE__ */ jsx("input", {
					type: "search",
					value: form.search,
					onChange: (event) => setForm((current) => ({
						...current,
						search: event.target.value
					})),
					placeholder: "Cari nomor pesanan atau nama produk",
					className: "w-full border-b border-hairline-strong bg-transparent py-3 pr-4 pl-11 text-[13px] text-ink transition-colors focus:border-ink focus:outline-none"
				})]
			}), /* @__PURE__ */ jsx("button", {
				type: "submit",
				className: "border-b border-ink bg-transparent px-5 py-3 text-[12px] font-bold text-ink transition-colors hover:border-primary hover:text-primary",
				children: "Cari"
			})]
		}), orders.data.length === 0 ? /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col items-center justify-center border-y border-hairline-strong px-6 py-20 text-center",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-hairline-strong bg-white text-primary",
					children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-surface-soft opacity-60 blur-xl" }), /* @__PURE__ */ jsx(ShoppingCart, {
						size: 38,
						strokeWidth: 1.7,
						className: "relative z-10"
					})]
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mb-2 text-2xl text-ink",
					children: "Pesanan tidak ditemukan"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mb-8 max-w-[280px] text-[13px] text-muted-foreground",
					children: "Coba filter lain atau mulai jelajahi koleksi kami."
				}),
				/* @__PURE__ */ jsx(Link, {
					href: "/list",
					className: "border-b border-ink px-1 py-2 text-[12px] font-bold tracking-wider text-ink transition-colors hover:border-primary hover:text-primary",
					children: "Belanja Sekarang"
				})
			]
		}) : /* @__PURE__ */ jsxs("div", {
			className: "divide-y divide-hairline-strong border-y border-hairline-strong",
			children: [orders.data.map((order, idx) => /* @__PURE__ */ jsxs("article", {
				className: "py-6 transition-colors duration-300 hover:bg-white/35 md:py-7",
				style: { animationDelay: `${idx * 50}ms` },
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-4 px-1 md:grid-cols-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "col-span-2 md:col-span-1",
								children: [/* @__PURE__ */ jsxs("p", {
									className: "mb-1 text-[13px] text-ink",
									children: ["Pesanan #", order.order_number]
								}), /* @__PURE__ */ jsxs("p", {
									className: "text-[11px] text-muted-foreground",
									children: [
										order.created_date ?? "-",
										" •",
										" ",
										order.created_time ?? "-"
									]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "hidden md:block",
								children: [/* @__PURE__ */ jsx("p", {
									className: "mb-1 text-[10px] text-muted-foreground",
									children: "Pembayaran"
								}), /* @__PURE__ */ jsx("span", {
									className: `inline-block text-[10px] font-bold ${getStatusTextStyle(order.payment_status)}`,
									children: labelStatus(order.payment_status)
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "block md:hidden",
								children: [/* @__PURE__ */ jsx("p", {
									className: "mb-1 text-[10px] text-muted-foreground",
									children: "Total"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[15px] text-ink",
									children: formatPrice(order.grand_total)
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "hidden md:block",
								children: [/* @__PURE__ */ jsx("p", {
									className: "mb-1 text-[10px] text-muted-foreground",
									children: "Total"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[14px] text-ink",
									children: formatPrice(order.grand_total)
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-end justify-center text-right md:items-end md:text-right",
								children: [/* @__PURE__ */ jsx("p", {
									className: "mb-1 hidden text-[10px] text-muted-foreground md:block",
									children: "Status Pesanan"
								}), /* @__PURE__ */ jsx("span", {
									className: `inline-block text-[11px] font-bold ${getStatusTextStyle(order.order_status)}`,
									children: labelStatus(order.order_status)
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-start justify-between gap-6 px-1 pt-5 lg:flex-row lg:items-center",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "hide-scrollbar flex w-full flex-1 gap-4 overflow-x-auto pb-2 lg:pb-0",
							children: [order.items.map((item) => /* @__PURE__ */ jsxs("div", {
								className: "flex min-w-[260px] gap-4 md:min-w-0",
								children: [/* @__PURE__ */ jsx("div", {
									className: "h-[100px] w-[80px] shrink-0 overflow-hidden rounded-[8px] bg-surface-soft",
									children: /* @__PURE__ */ jsx("img", {
										src: item.image ?? FALLBACK_IMAGE,
										alt: item.title,
										className: "h-full w-full object-cover"
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "min-w-0 py-1 pr-4",
									children: [
										/* @__PURE__ */ jsx("h4", {
											className: "mb-1 line-clamp-2 max-w-[150px] text-[13px] leading-snug font-semibold text-ink md:truncate",
											children: item.title
										}),
										/* @__PURE__ */ jsxs("p", {
											className: "mb-1 text-[11px] text-muted-foreground",
											children: [
												item.color ?? "-",
												" •",
												" ",
												item.size ?? "-"
											]
										}),
										/* @__PURE__ */ jsxs("p", {
											className: "text-[11px] text-muted-foreground",
											children: ["Jml: ", item.qty]
										})
									]
								})]
							}, item.id)), order.extra_items > 0 && /* @__PURE__ */ jsxs("div", {
								className: "flex h-[100px] w-[80px] shrink-0 flex-col items-center justify-center rounded-[8px] border border-hairline-strong text-muted-foreground",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "text-lg text-ink italic",
									children: ["+", order.extra_items]
								}), /* @__PURE__ */ jsx("span", {
									className: "text-[10px]",
									children: "lagi"
								})]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "mt-4 flex w-full shrink-0 flex-row gap-3 lg:mt-0 lg:w-[200px] lg:flex-col",
							children: [
								order.order_status === "pending_payment" && /* @__PURE__ */ jsx("a", {
									href: order.payment.midtrans_redirect_url ?? "/checkout",
									target: order.payment.midtrans_redirect_url ? "_blank" : void 0,
									rel: order.payment.midtrans_redirect_url ? "noreferrer" : void 0,
									className: "flex-1 rounded-[6px] bg-primary py-2.5 text-center text-[12px] font-bold text-white transition-colors hover:bg-[#E67312] lg:w-full",
									children: "Bayar Sekarang"
								}),
								order.order_status === "shipped" && /* @__PURE__ */ jsx(Link, {
									href: show.url(order.id),
									className: "flex-1 rounded-[6px] bg-primary py-2.5 text-center text-[12px] font-bold text-white transition-colors hover:bg-[#E67312] lg:w-full",
									children: "Lacak Pesanan"
								}),
								/* @__PURE__ */ jsx(Link, {
									href: show.url(order.id),
									className: "hover:bg-primary-soft flex-1 rounded-[6px] border border-hairline-strong bg-white py-2.5 text-center text-[12px] font-bold text-primary transition-colors hover:border-primary lg:w-full",
									children: "Lihat Detail"
								}),
								canBuyAgain(order.order_status) && /* @__PURE__ */ jsx(Link, {
									href: "/list",
									className: "flex-1 rounded-[6px] bg-primary py-2.5 text-center text-[12px] font-bold text-white transition-colors hover:bg-[#E67312] lg:w-full",
									children: "Beli Lagi"
								})
							]
						})]
					}),
					order.order_status === "shipped" && /* @__PURE__ */ jsx("div", {
						className: "mt-6 hidden border-t border-hairline-strong/60 px-5 pt-5 md:block md:px-8",
						children: /* @__PURE__ */ jsxs("div", {
							className: "relative z-10 mx-auto flex max-w-[600px] items-center justify-between",
							children: [
								/* @__PURE__ */ jsx("div", { className: "absolute top-4 right-[5%] left-[5%] -z-10 h-[2px] bg-hairline-strong" }),
								/* @__PURE__ */ jsx("div", { className: "absolute top-4 left-[5%] -z-10 h-[2px] w-[60%] bg-primary" }),
								[
									{
										label: "Pesanan Dikonfirmasi",
										icon: Check,
										active: true
									},
									{
										label: "Dikemas",
										icon: Package,
										active: true
									},
									{
										label: "Dikirim",
										icon: Truck,
										active: true
									},
									{
										label: "Terkirim",
										icon: Check,
										active: false
									}
								].map((step) => {
									const Icon = step.icon;
									return /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col items-center",
										children: [/* @__PURE__ */ jsx("div", {
											className: `mb-2 flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${step.active ? "border-primary text-primary" : "border-hairline-strong text-muted-foreground"}`,
											children: /* @__PURE__ */ jsx(Icon, {
												size: 14,
												strokeWidth: 3
											})
										}), /* @__PURE__ */ jsx("p", {
											className: `mb-0.5 text-[10px] font-bold ${step.active ? "text-ink" : "text-muted-foreground"}`,
											children: step.label
										})]
									}, step.label);
								})
							]
						})
					})
				]
			}, order.id)), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-center justify-between gap-4 pt-8 pb-4 text-[12px] text-muted-foreground md:flex-row",
				children: [/* @__PURE__ */ jsxs("span", { children: [
					"Menampilkan ",
					orders.from ?? 0,
					"-",
					orders.to ?? 0,
					" dari",
					" ",
					orders.total,
					" pesanan"
				] }), /* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap justify-center gap-1",
					children: orders.links.map((link) => /* @__PURE__ */ jsx(PaginationButton, { link }, `${link.label}-${link.url ?? "disabled"}`))
				})]
			})]
		})]
	});
}
function PaginationButton({ link }) {
	const label = cleanPageLabel(link.label);
	const content = label === "Previous" ? /* @__PURE__ */ jsx(ChevronLeft, { size: 16 }) : label === "Next" ? /* @__PURE__ */ jsx(ChevronRight, { size: 16 }) : label;
	const className = `flex h-8 min-w-8 items-center justify-center border-b px-2 font-medium transition-colors ${link.active ? "border-ink text-ink" : "border-transparent text-muted-foreground hover:border-hairline-strong hover:text-ink"}`;
	if (!link.url) return /* @__PURE__ */ jsx("span", {
		className: `${className} opacity-40`,
		children: content
	});
	return /* @__PURE__ */ jsx(Link, {
		href: link.url,
		preserveScroll: true,
		preserveState: true,
		className,
		children: content
	});
}
//#endregion
export { ListOrder as default };

//# sourceMappingURL=my-order-CuFR4GC1.js.map