import { n as queryParams } from "./wayfinder-Bgbpuenu.js";
import { t as ProfileLayout } from "./profile-layout-CknzRhQx.js";
import { n as index$1, t as cancel } from "./OrderController-g0c5stvv.js";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Check, ClipboardList, CreditCard, FileText, Headphones, MapPin, Package, ReceiptText, RefreshCcw, ShieldCheck, Truck, UserRound, WalletCards } from "lucide-react";
//#region resources/js/actions/App/Http/Controllers/Customer/ProductController.ts
/**
* @see \App\Http\Controllers\Customer\ProductController::show
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
var show = (options) => ({
	url: show.url(options),
	method: "get"
});
show.definition = {
	methods: ["get", "head"],
	url: "/detail"
};
/**
* @see \App\Http\Controllers\Customer\ProductController::show
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
show.url = (options) => {
	return show.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\ProductController::show
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
show.get = (options) => ({
	url: show.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\ProductController::show
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
show.head = (options) => ({
	url: show.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\ProductController::show
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
var showForm = (options) => ({
	action: show.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\ProductController::show
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
showForm.get = (options) => ({
	action: show.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\ProductController::show
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
showForm.head = (options) => ({
	action: show.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
show.form = showForm;
/**
* @see \App\Http\Controllers\Customer\ProductController::index
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
var index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/list"
};
/**
* @see \App\Http\Controllers\Customer\ProductController::index
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\ProductController::index
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\ProductController::index
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\ProductController::index
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\ProductController::index
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\ProductController::index
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
indexForm.head = (options) => ({
	action: index.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index.form = indexForm;
//#endregion
//#region resources/js/pages/customer/order/detail-order.tsx
var FALLBACK_IMAGE = "/img/hasan-almasi-_X2UAmIcpko-unsplash.webp";
var formatPrice = (amount) => `Rp ${new Intl.NumberFormat("id-ID").format(amount)}`;
var formatDateTime = (value) => {
	if (!value) return "-";
	return new Intl.DateTimeFormat("id-ID", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	}).format(new Date(value));
};
var labelStatus = (status) => {
	if (!status) return "-";
	return status.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
};
var statusTone = (status) => {
	switch (status) {
		case "paid":
		case "delivered":
		case "completed": return "green";
		case "processing":
		case "ready_to_ship":
		case "shipped":
		case "in_transit": return "blue";
		case "pending":
		case "pending_payment":
		case "not_created":
		case "confirmed":
		case "allocated":
		case "picked": return "amber";
		case "cancelled":
		case "expired":
		case "failed":
		case "problem": return "red";
		default: return "gray";
	}
};
function StatusPill({ children, tone = "green" }) {
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${{
			amber: "bg-amber-50 text-amber-700 border border-amber-200",
			blue: "bg-blue-50  text-blue-700  border border-blue-200",
			gray: "bg-stone-100 text-stone-500 border border-stone-200",
			green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
			red: "bg-red-50   text-red-600    border border-red-200"
		}[tone]}`,
		children
	});
}
function ActionButton({ icon: Icon, label, href, onClick, disabled = false, external = false, tone = "default" }) {
	const base = "group flex w-full items-center justify-center gap-2 rounded-[8px] border px-4 py-2.5 text-[12px] font-semibold transition-all duration-150 active:scale-[0.98]";
	const toneClass = tone === "danger" ? "border-red-200 bg-red-50 text-red-700 hover:border-red-300 hover:bg-red-100" : "border-hairline-strong bg-white text-ink hover:border-primary hover:bg-primary-soft";
	if (onClick) return /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick,
		disabled,
		className: `${base} ${toneClass} ${disabled ? "cursor-not-allowed opacity-60" : ""}`,
		children: [/* @__PURE__ */ jsx(Icon, {
			size: 14,
			strokeWidth: 1.8
		}), /* @__PURE__ */ jsx("span", { children: label })]
	});
	if (!href) return /* @__PURE__ */ jsxs("button", {
		type: "button",
		disabled: true,
		className: `${base} ${toneClass} cursor-not-allowed opacity-40`,
		children: [/* @__PURE__ */ jsx(Icon, {
			size: 14,
			strokeWidth: 1.8
		}), /* @__PURE__ */ jsx("span", { children: label })]
	});
	if (external) return /* @__PURE__ */ jsxs("a", {
		href,
		target: "_blank",
		rel: "noreferrer",
		className: `${base} ${toneClass}`,
		children: [/* @__PURE__ */ jsx(Icon, {
			size: 14,
			strokeWidth: 1.8
		}), /* @__PURE__ */ jsx("span", { children: label })]
	});
	return /* @__PURE__ */ jsxs(Link, {
		href,
		className: `${base} ${toneClass}`,
		children: [/* @__PURE__ */ jsx(Icon, {
			size: 14,
			strokeWidth: 1.8
		}), /* @__PURE__ */ jsx("span", { children: label })]
	});
}
function InfoLine({ icon: Icon, label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-start gap-3 py-2.5 text-sm",
		children: [
			/* @__PURE__ */ jsx(Icon, {
				className: "mt-0.5 shrink-0 text-muted-foreground",
				size: 15,
				strokeWidth: 1.65
			}),
			/* @__PURE__ */ jsx("span", {
				className: "w-28 shrink-0 text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ jsx("span", {
				className: "min-w-0 text-sm font-medium break-words text-ink",
				children: value || "-"
			})
		]
	});
}
function SectionCard({ title, children, noPad = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "overflow-hidden rounded-[8px] border border-hairline-strong bg-white",
		children: [/* @__PURE__ */ jsx("div", {
			className: "border-b border-hairline-strong px-5 py-4 sm:px-6",
			children: /* @__PURE__ */ jsx("h2", {
				className: "text-lg text-ink sm:text-xl",
				children: title
			})
		}), /* @__PURE__ */ jsx("div", {
			className: noPad ? "" : "p-5 sm:p-6",
			children
		})]
	});
}
function MetaChip({ label, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-[10px] font-semibold tracking-widest text-muted-foreground uppercase",
			children: label
		}), /* @__PURE__ */ jsx("div", {
			className: "text-sm font-semibold text-ink",
			children
		})]
	});
}
function buildProgress(order) {
	const paidAt = order.paid_at ?? order.payment?.paid_at ?? order.payment_logs.find((log) => log.transaction_status === "settlement")?.processed_at ?? null;
	const current = order.order_status;
	const currentRank = {
		pending_payment: 0,
		paid: 1,
		processing: 2,
		ready_to_ship: 3,
		shipped: 4,
		delivered: 5,
		completed: 5
	}[current] ?? (current === "cancelled" || current === "expired" ? 0 : 1);
	return [
		{
			icon: ClipboardList,
			label: "Order Placed",
			time: formatDateTime(order.created_at),
			complete: true,
			active: false
		},
		{
			icon: Check,
			label: "Payment",
			time: formatDateTime(paidAt),
			complete: currentRank >= 1,
			active: currentRank === 1
		},
		{
			icon: ShieldCheck,
			label: "Processing",
			time: currentRank >= 2 ? labelStatus(order.order_status) : "-",
			complete: currentRank >= 2,
			active: currentRank === 2
		},
		{
			icon: Package,
			label: "Packed",
			time: currentRank >= 3 ? labelStatus(order.order_status) : "-",
			complete: currentRank >= 3,
			active: currentRank === 3
		},
		{
			icon: Truck,
			label: "Shipped",
			time: formatDateTime(order.shipment?.shipped_at ?? null),
			complete: currentRank >= 4,
			active: currentRank === 4
		},
		{
			icon: Check,
			label: "Delivered",
			time: formatDateTime(order.shipment?.delivered_at ?? order.completed_at),
			complete: currentRank >= 5,
			active: currentRank >= 5
		}
	];
}
function getBiteshipTrackingUrl(shipment) {
	const raw = shipment?.raw_order_response;
	if (!raw || typeof raw !== "object") return null;
	const courier = raw.courier;
	if (!courier || typeof courier !== "object") return null;
	const link = courier.link;
	return typeof link === "string" && link.length > 0 ? link : null;
}
function getMidtransReceiptUrl(payment) {
	if (!payment) return null;
	if (payment.midtrans_redirect_url) return payment.midtrans_redirect_url;
	if (payment.midtrans_snap_token) return `https://app.midtrans.com/snap/v2/vtweb/${payment.midtrans_snap_token}`;
	return null;
}
function DetailOrder({ order }) {
	const [isCancelling, setIsCancelling] = useState(false);
	const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
	const progressSteps = buildProgress(order);
	const courier = [order.shipment?.courier_company, order.shipment?.courier_type || order.shipment?.courier_service_name].filter(Boolean).join(" ");
	const address = order.address;
	const paymentMethod = [order.payment?.payment_provider, order.payment?.payment_method].filter(Boolean).join(" / ") || "-";
	const transactionId = order.payment?.midtrans_transaction_id ?? order.payment?.midtrans_order_id ?? "-";
	const trackingUrl = getBiteshipTrackingUrl(order.shipment);
	const paymentReceiptUrl = [
		"cancelled",
		"expired",
		"failed",
		"refunded",
		"partially_refunded"
	].includes(order.payment_status) ? null : getMidtransReceiptUrl(order.payment);
	const canPay = order.payment_status === "pending" && !!paymentReceiptUrl;
	const canCancelOrder = order.payment_status === "pending";
	const cancelOrder = () => {
		if (isCancelling) return;
		router.post(cancel.url(order.id), {}, {
			preserveScroll: true,
			onStart: () => setIsCancelling(true),
			onSuccess: () => setIsCancelModalOpen(false),
			onError: (errors) => {
				const message = Object.values(errors).join("\n");
				alert(message || "Gagal membatalkan order. Cek status pembayaran atau coba lagi.");
			},
			onFinish: () => setIsCancelling(false)
		});
	};
	return /* @__PURE__ */ jsxs(ProfileLayout, {
		title: `Pesanan ${order.order_number}`,
		pageTitle: "Detail Pesanan",
		subtitle: "Lihat informasi pesanan, progres pengiriman, dan ringkasan pembayaran.",
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
			{
				label: "Pesanan Saya",
				href: index$1.url()
			},
			{ label: order.order_number }
		],
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_300px]",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "overflow-hidden rounded-[8px] border border-hairline-strong bg-white",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "p-5 sm:p-6",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("p", {
										className: "text-[10px] font-semibold tracking-widest text-muted-foreground uppercase",
										children: "Nomor Pesanan"
									}),
									/* @__PURE__ */ jsx("h2", {
										className: "mt-1 text-2xl leading-tight text-ink sm:text-3xl",
										children: order.order_number
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: [
											order.created_date ?? "-",
											" •",
											" ",
											order.created_time ?? "-"
										]
									})
								] }), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ jsx(StatusPill, {
										tone: statusTone(order.payment_status),
										children: labelStatus(order.payment_status)
									}), /* @__PURE__ */ jsx(StatusPill, {
										tone: statusTone(order.order_status),
										children: labelStatus(order.order_status)
									})]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "mt-5 grid grid-cols-2 gap-4 border-t border-hairline-strong pt-5 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ jsx(MetaChip, {
										label: "Metode Pembayaran",
										children: paymentMethod
									}),
									/* @__PURE__ */ jsx(MetaChip, {
										label: "Estimasi Tiba",
										children: order.shipment?.estimated_delivery ?? "-"
									}),
									/* @__PURE__ */ jsx(MetaChip, {
										label: "No. Resi",
										children: order.shipment?.waybill_id ?? "-"
									})
								]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-3 border-t border-hairline-strong p-4 sm:grid-cols-4 sm:p-5",
							children: [
								/* @__PURE__ */ jsx(ActionButton, {
									href: trackingUrl,
									external: true,
									icon: Truck,
									label: "Lacak Pesanan"
								}),
								/* @__PURE__ */ jsx(ActionButton, {
									href: canCancelOrder ? void 0 : "/list",
									onClick: canCancelOrder ? () => setIsCancelModalOpen(true) : void 0,
									disabled: isCancelling,
									icon: canCancelOrder ? ClipboardList : RefreshCcw,
									tone: canCancelOrder ? "danger" : "default",
									label: isCancelling ? "Membatalkan..." : canCancelOrder ? "Batalkan Pesanan" : "Beli Lagi"
								}),
								/* @__PURE__ */ jsx(ActionButton, {
									href: paymentReceiptUrl,
									external: true,
									icon: ReceiptText,
									label: canPay ? "Bayar Sekarang" : "Bukti Pembayaran"
								}),
								/* @__PURE__ */ jsx(ActionButton, {
									href: "/notifications",
									icon: Headphones,
									label: "Dukungan"
								})
							]
						})]
					}),
					/* @__PURE__ */ jsx(SectionCard, {
						title: "Progres Pesanan",
						children: /* @__PURE__ */ jsx("div", {
							className: "hide-scrollbar overflow-x-auto pb-1",
							children: /* @__PURE__ */ jsxs("div", {
								className: "relative grid min-w-[520px] grid-cols-6",
								children: [/* @__PURE__ */ jsx("div", { className: "absolute top-[21px] right-[8%] left-[8%] h-px bg-gradient-to-r from-[#d8ae8f] to-[#e5ddd6]" }), progressSteps.map((step) => {
									const Icon = step.icon;
									return /* @__PURE__ */ jsxs("div", {
										className: "relative flex flex-col items-center px-1 text-center",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: `relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all ${step.active ? "border-ink bg-ink text-white" : step.complete ? "bg-primary-soft border-primary text-primary" : "border-hairline-strong bg-white text-muted-foreground"}`,
												children: /* @__PURE__ */ jsx(Icon, {
													size: 16,
													strokeWidth: 1.8
												})
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-3 text-[11px] leading-tight font-bold text-ink",
												children: step.label
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-0.5 text-[10px] leading-tight font-medium text-muted-foreground",
												children: step.time
											})
										]
									}, step.label);
								})]
							})
						})
					}),
					/* @__PURE__ */ jsxs(SectionCard, {
						title: "Barang Dipesan",
						noPad: true,
						children: [/* @__PURE__ */ jsx("div", {
							className: "hidden sm:block",
							children: /* @__PURE__ */ jsx("div", {
								className: "hide-scrollbar overflow-x-auto",
								children: /* @__PURE__ */ jsxs("table", {
									className: "w-full min-w-[580px] border-collapse text-left",
									children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
										className: "border-b border-hairline-strong bg-surface-soft text-[11px] tracking-wide text-muted-foreground uppercase",
										children: [
											/* @__PURE__ */ jsx("th", {
												className: "px-5 py-3 font-semibold sm:px-6",
												children: "Barang"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-3 font-semibold",
												children: "Detail"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-3 font-semibold",
												children: "Harga Satuan"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-3 text-center font-semibold",
												children: "Jumlah"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-5 py-3 text-right font-semibold sm:px-6",
												children: "Subtotal"
											})
										]
									}) }), /* @__PURE__ */ jsx("tbody", {
										className: "divide-y divide-hairline-strong",
										children: order.items.map((item) => {
											const productUrl = item.product_slug ? show.url({ query: { product: item.product_slug } }) : "#";
											return /* @__PURE__ */ jsxs("tr", {
												className: "bg-white transition-colors hover:bg-surface-soft",
												children: [
													/* @__PURE__ */ jsx("td", {
														className: "px-5 py-4 sm:px-6",
														children: /* @__PURE__ */ jsxs("div", {
															className: "flex items-center gap-3",
															children: [/* @__PURE__ */ jsx(Link, {
																href: productUrl,
																className: "h-16 w-16 shrink-0 overflow-hidden rounded-[8px] bg-surface-soft",
																children: /* @__PURE__ */ jsx("img", {
																	src: item.product_image_url ?? FALLBACK_IMAGE,
																	alt: item.product_name,
																	className: "h-full w-full object-cover object-top"
																})
															}), /* @__PURE__ */ jsxs("div", {
																className: "min-w-0",
																children: [/* @__PURE__ */ jsx(Link, {
																	href: productUrl,
																	className: "line-clamp-2 text-[13px] font-semibold text-ink transition hover:text-primary",
																	children: item.product_name
																}), /* @__PURE__ */ jsxs("p", {
																	className: "mt-0.5 text-[11px] text-muted-foreground",
																	children: [
																		"SKU:",
																		" ",
																		item.variant_sku ?? item.product_sku ?? "-"
																	]
																})]
															})]
														})
													}),
													/* @__PURE__ */ jsx("td", {
														className: "px-4 py-4",
														children: /* @__PURE__ */ jsxs("div", {
															className: "space-y-1 text-[12px] text-muted-foreground",
															children: [
																/* @__PURE__ */ jsxs("p", { children: [
																	"Warna:",
																	" ",
																	/* @__PURE__ */ jsx("span", {
																		className: "font-semibold text-ink",
																		children: item.color_name ?? "-"
																	})
																] }),
																/* @__PURE__ */ jsxs("p", { children: [
																	"Ukuran:",
																	" ",
																	/* @__PURE__ */ jsx("span", {
																		className: "font-semibold text-ink",
																		children: item.size ?? "-"
																	})
																] }),
																/* @__PURE__ */ jsxs("p", { children: [
																	"Berat:",
																	" ",
																	/* @__PURE__ */ jsx("span", {
																		className: "font-semibold text-ink",
																		children: item.weight ? `${item.weight} gr` : "-"
																	})
																] })
															]
														})
													}),
													/* @__PURE__ */ jsx("td", {
														className: "px-4 py-4 text-[13px] font-semibold text-ink",
														children: formatPrice(item.price)
													}),
													/* @__PURE__ */ jsx("td", {
														className: "px-4 py-4 text-center",
														children: /* @__PURE__ */ jsx("span", {
															className: "inline-flex h-7 w-7 items-center justify-center rounded-[6px] bg-surface-soft text-[12px] font-semibold text-ink",
															children: item.quantity
														})
													}),
													/* @__PURE__ */ jsx("td", {
														className: "px-5 py-4 text-right text-[13px] font-semibold text-ink sm:px-6",
														children: formatPrice(item.subtotal)
													})
												]
											}, item.id);
										})
									})]
								})
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-3 p-4 sm:hidden",
							children: order.items.map((item) => {
								const productUrl = item.product_slug ? show.url({ query: { product: item.product_slug } }) : "#";
								return /* @__PURE__ */ jsxs("div", {
									className: "flex gap-3 rounded-[8px] border border-hairline-strong bg-white p-3",
									children: [/* @__PURE__ */ jsx(Link, {
										href: productUrl,
										className: "h-20 w-20 shrink-0 overflow-hidden rounded-[8px] bg-surface-soft",
										children: /* @__PURE__ */ jsx("img", {
											src: item.product_image_url ?? FALLBACK_IMAGE,
											alt: item.product_name,
											className: "h-full w-full object-cover object-top"
										})
									}), /* @__PURE__ */ jsxs("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ jsx(Link, {
												href: productUrl,
												className: "line-clamp-2 text-[13px] font-semibold text-ink hover:text-primary",
												children: item.product_name
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground",
												children: [
													item.color_name && /* @__PURE__ */ jsxs("span", { children: [
														"Warna:",
														" ",
														/* @__PURE__ */ jsx("strong", {
															className: "text-ink",
															children: item.color_name
														})
													] }),
													item.size && /* @__PURE__ */ jsxs("span", { children: [
														"Ukuran:",
														" ",
														/* @__PURE__ */ jsx("strong", {
															className: "text-ink",
															children: item.size
														})
													] }),
													item.weight && /* @__PURE__ */ jsxs("span", { children: [
														"Berat:",
														" ",
														/* @__PURE__ */ jsxs("strong", {
															className: "text-ink",
															children: [item.weight, " gr"]
														})
													] })
												]
											}),
											/* @__PURE__ */ jsxs("p", {
												className: "mt-0.5 text-[11px] text-muted-foreground",
												children: [
													"SKU:",
													" ",
													item.variant_sku ?? item.product_sku ?? "-"
												]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "mt-2.5 flex items-center justify-between",
												children: [/* @__PURE__ */ jsxs("span", {
													className: "text-xs text-muted-foreground",
													children: [
														"Jumlah:",
														" ",
														/* @__PURE__ */ jsx("strong", {
															className: "text-ink",
															children: item.quantity
														})
													]
												}), /* @__PURE__ */ jsx("span", {
													className: "text-[13px] font-bold text-ink",
													children: formatPrice(item.subtotal)
												})]
											})
										]
									})]
								}, item.id);
							})
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-5 md:grid-cols-2",
						children: [/* @__PURE__ */ jsx(SectionCard, {
							title: "Info Pengiriman",
							children: /* @__PURE__ */ jsxs("div", {
								className: "divide-y divide-hairline",
								children: [
									/* @__PURE__ */ jsx(InfoLine, {
										icon: UserRound,
										label: "Penerima",
										value: address?.recipient_name ?? order.customer_name
									}),
									/* @__PURE__ */ jsx(InfoLine, {
										icon: Headphones,
										label: "Telepon",
										value: address?.recipient_phone ?? order.customer_phone
									}),
									/* @__PURE__ */ jsx(InfoLine, {
										icon: MapPin,
										label: "Alamat",
										value: address ? `${address.full_address}, ${address.district}, ${address.city}, ${address.province} ${address.postal_code}` : "-"
									}),
									/* @__PURE__ */ jsx(InfoLine, {
										icon: Truck,
										label: "Kurir",
										value: courier || "-"
									}),
									/* @__PURE__ */ jsx(InfoLine, {
										icon: ReceiptText,
										label: "No. Resi",
										value: order.shipment?.waybill_id ?? "-"
									}),
									/* @__PURE__ */ jsx(InfoLine, {
										icon: FileText,
										label: "Catatan Pengiriman",
										value: address?.note ?? "-"
									})
								]
							})
						}), /* @__PURE__ */ jsx(SectionCard, {
							title: "Info Pembayaran",
							children: /* @__PURE__ */ jsxs("div", {
								className: "divide-y divide-hairline",
								children: [
									/* @__PURE__ */ jsx(InfoLine, {
										icon: CreditCard,
										label: "Metode",
										value: paymentMethod
									}),
									/* @__PURE__ */ jsx(InfoLine, {
										icon: ReceiptText,
										label: "Transaksi",
										value: transactionId
									}),
									/* @__PURE__ */ jsx(InfoLine, {
										icon: ClipboardList,
										label: "Tanggal Pembayaran",
										value: formatDateTime(order.paid_at ?? order.payment?.paid_at ?? null)
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3 py-2.5",
										children: [
											/* @__PURE__ */ jsx(WalletCards, {
												className: "shrink-0 text-muted-foreground",
												size: 15,
												strokeWidth: 1.65
											}),
											/* @__PURE__ */ jsx("span", {
												className: "w-28 shrink-0 text-xs text-muted-foreground",
												children: "Status"
											}),
											/* @__PURE__ */ jsx(StatusPill, {
												tone: statusTone(order.payment_status),
												children: labelStatus(order.payment_status)
											})
										]
									})
								]
							})
						})]
					})
				]
			}), /* @__PURE__ */ jsxs("aside", {
				className: "space-y-5 xl:sticky xl:top-6 xl:self-start",
				children: [/* @__PURE__ */ jsxs(SectionCard, {
					title: "Ringkasan Pesanan",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-2.5",
						children: [
							/* @__PURE__ */ jsx(SummaryRow, {
								label: "Subtotal",
								value: formatPrice(order.subtotal)
							}),
							/* @__PURE__ */ jsx(SummaryRow, {
								label: "Biaya Pengiriman",
								value: formatPrice(order.shipping_cost)
							}),
							order.discount_amount > 0 && /* @__PURE__ */ jsx(SummaryRow, {
								label: "Diskon",
								value: `− ${formatPrice(order.discount_amount)}`,
								danger: true
							}),
							order.voucher_code && /* @__PURE__ */ jsx(SummaryRow, {
								label: "Voucher",
								value: order.voucher_code
							}),
							/* @__PURE__ */ jsx(SummaryRow, {
								label: "Biaya Layanan",
								value: formatPrice(order.service_fee)
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-5 rounded-[8px] bg-surface-soft px-4 py-4",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-[10px] font-semibold tracking-widest text-muted-foreground uppercase",
							children: "Total Pembayaran"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-2xl leading-none font-medium text-ink sm:text-3xl",
							children: formatPrice(order.grand_total)
						})]
					})]
				}), /* @__PURE__ */ jsx(SectionCard, {
					title: "Catatan Pesanan",
					children: /* @__PURE__ */ jsx("p", {
						className: "border-l-2 border-primary pl-3 text-sm leading-relaxed text-muted-foreground italic",
						children: order.notes ?? "Tidak ada catatan untuk pesanan ini."
					})
				})]
			})]
		}), isCancelModalOpen && /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm",
			children: /* @__PURE__ */ jsxs("div", {
				className: "w-full max-w-md overflow-hidden rounded-[8px] border border-red-100 bg-white",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "border-b border-red-100 bg-red-50 px-6 py-5",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700",
								children: /* @__PURE__ */ jsx(ClipboardList, {
									size: 22,
									strokeWidth: 1.8
								})
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-[10px] font-semibold tracking-[0.2em] text-red-500 uppercase",
								children: "Batalkan Pesanan"
							}), /* @__PURE__ */ jsx("h2", {
								className: "mt-1 text-xl leading-tight text-ink",
								children: "Batalkan order ini?"
							})] })]
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-4 px-6 py-5",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm leading-6 text-muted-foreground",
							children: "Order belum dibayar. Jika dibatalkan, transaksi pembayaran Midtrans akan dibuat tidak bisa dibayar lagi dan stok yang tertahan akan dilepaskan."
						}), /* @__PURE__ */ jsxs("div", {
							className: "rounded-[8px] border border-hairline-strong bg-surface-soft px-4 py-3",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-[10px] font-semibold tracking-widest text-muted-foreground uppercase",
								children: "Nomor Pesanan"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 font-mono text-sm font-semibold text-ink",
								children: order.order_number
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 border-t border-hairline-strong px-6 py-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setIsCancelModalOpen(false),
							disabled: isCancelling,
							className: "hover:bg-primary-soft rounded-[6px] border border-hairline-strong bg-white px-4 py-2.5 text-[12px] font-semibold text-ink transition disabled:cursor-not-allowed disabled:opacity-60",
							children: "Kembali"
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: cancelOrder,
							disabled: isCancelling,
							className: "rounded-[6px] border border-red-600 bg-red-600 px-4 py-2.5 text-[12px] font-semibold text-white transition hover:border-red-700 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60",
							children: isCancelling ? "Membatalkan..." : "Ya, batalkan order"
						})]
					})
				]
			})
		})]
	});
}
function SummaryRow({ label, value, danger = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-between gap-4 text-sm",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("span", {
			className: `${danger ? "font-semibold text-red-600" : "font-semibold text-ink"}`,
			children: value
		})]
	});
}
//#endregion
export { DetailOrder as default };

//# sourceMappingURL=detail-order-CrefcVND.js.map