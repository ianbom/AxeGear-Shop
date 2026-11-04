import { t as Button } from "./button-D_r5eKEZ.js";
import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-Bgbpuenu.js";
import { a as DialogFooter, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-BdySv4Wj.js";
import { n as store } from "./shipments-dh7lLV49.js";
import { n as show$1, r as sync } from "./payments-BVs7ru9w.js";
import { r as show$2, t as refreshTracking } from "./shipments-KqkAnATK.js";
import { Head, Link, router } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Box, CalendarDays, Check, Mail, MapPin, PackagePlus, RefreshCw, TriangleAlert, UserRound } from "lucide-react";
//#region resources/js/actions/App/Http/Controllers/Admin/OrderController.ts
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:17
* @route '/admin/orders'
*/
var index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/admin/orders"
};
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:17
* @route '/admin/orders'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:17
* @route '/admin/orders'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:17
* @route '/admin/orders'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:17
* @route '/admin/orders'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:17
* @route '/admin/orders'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:17
* @route '/admin/orders'
*/
indexForm.head = (options) => ({
	action: index.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index.form = indexForm;
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:22
* @route '/admin/orders/{order}'
*/
var show = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
show.definition = {
	methods: ["get", "head"],
	url: "/admin/orders/{order}"
};
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:22
* @route '/admin/orders/{order}'
*/
show.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { order: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { order: args.id };
	if (Array.isArray(args)) args = { order: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { order: typeof args.order === "object" ? args.order.id : args.order };
	return show.definition.url.replace("{order}", parsedArgs.order.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:22
* @route '/admin/orders/{order}'
*/
show.get = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:22
* @route '/admin/orders/{order}'
*/
show.head = (args, options) => ({
	url: show.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:22
* @route '/admin/orders/{order}'
*/
var showForm = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:22
* @route '/admin/orders/{order}'
*/
showForm.get = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:22
* @route '/admin/orders/{order}'
*/
showForm.head = (args, options) => ({
	action: show.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
show.form = showForm;
/**
* @see \App\Http\Controllers\Admin\OrderController::updateStatus
* @see app/Http/Controllers/Admin/OrderController.php:35
* @route '/admin/orders/{order}/status'
*/
var updateStatus = (args, options) => ({
	url: updateStatus.url(args, options),
	method: "post"
});
updateStatus.definition = {
	methods: ["post"],
	url: "/admin/orders/{order}/status"
};
/**
* @see \App\Http\Controllers\Admin\OrderController::updateStatus
* @see app/Http/Controllers/Admin/OrderController.php:35
* @route '/admin/orders/{order}/status'
*/
updateStatus.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { order: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { order: args.id };
	if (Array.isArray(args)) args = { order: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { order: typeof args.order === "object" ? args.order.id : args.order };
	return updateStatus.definition.url.replace("{order}", parsedArgs.order.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\OrderController::updateStatus
* @see app/Http/Controllers/Admin/OrderController.php:35
* @route '/admin/orders/{order}/status'
*/
updateStatus.post = (args, options) => ({
	url: updateStatus.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::updateStatus
* @see app/Http/Controllers/Admin/OrderController.php:35
* @route '/admin/orders/{order}/status'
*/
var updateStatusForm = (args, options) => ({
	action: updateStatus.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::updateStatus
* @see app/Http/Controllers/Admin/OrderController.php:35
* @route '/admin/orders/{order}/status'
*/
updateStatusForm.post = (args, options) => ({
	action: updateStatus.url(args, options),
	method: "post"
});
updateStatus.form = updateStatusForm;
/**
* @see \App\Http\Controllers\Admin\OrderController::updateNotes
* @see app/Http/Controllers/Admin/OrderController.php:42
* @route '/admin/orders/{order}/notes'
*/
var updateNotes = (args, options) => ({
	url: updateNotes.url(args, options),
	method: "post"
});
updateNotes.definition = {
	methods: ["post"],
	url: "/admin/orders/{order}/notes"
};
/**
* @see \App\Http\Controllers\Admin\OrderController::updateNotes
* @see app/Http/Controllers/Admin/OrderController.php:42
* @route '/admin/orders/{order}/notes'
*/
updateNotes.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { order: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { order: args.id };
	if (Array.isArray(args)) args = { order: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { order: typeof args.order === "object" ? args.order.id : args.order };
	return updateNotes.definition.url.replace("{order}", parsedArgs.order.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\OrderController::updateNotes
* @see app/Http/Controllers/Admin/OrderController.php:42
* @route '/admin/orders/{order}/notes'
*/
updateNotes.post = (args, options) => ({
	url: updateNotes.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::updateNotes
* @see app/Http/Controllers/Admin/OrderController.php:42
* @route '/admin/orders/{order}/notes'
*/
var updateNotesForm = (args, options) => ({
	action: updateNotes.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::updateNotes
* @see app/Http/Controllers/Admin/OrderController.php:42
* @route '/admin/orders/{order}/notes'
*/
updateNotesForm.post = (args, options) => ({
	action: updateNotes.url(args, options),
	method: "post"
});
updateNotes.form = updateNotesForm;
//#endregion
//#region resources/js/lib/order-workflow.ts
var orderSteps = {
	pending_payment: 0,
	paid: 1,
	processing: 2,
	ready_to_ship: 3,
	shipment_created: 3,
	shipped: 4,
	delivered: 5,
	completed: 6
};
var shippingSteps = {
	confirmed: 3,
	allocated: 3,
	picked: 4,
	in_transit: 4,
	delivered: 5
};
var orderIssues = {
	cancelled: "Pesanan dibatalkan.",
	payment_failed: "Pembayaran gagal. Periksa pembayaran sebelum memproses pesanan.",
	payment_expired: "Batas waktu pembayaran telah habis.",
	shipment_failed: "Pengiriman gagal. Periksa hasil booking dan status kurir.",
	shipment_problem: "Pengiriman bermasalah. Periksa tracking dan konfirmasi kepada kurir.",
	lost: "Paket dilaporkan hilang. Tindak lanjuti dengan kurir.",
	returned: "Paket dikembalikan. Periksa alasan pengembalian.",
	refunded: "Pembayaran telah dikembalikan."
};
var paymentIssues = {
	failed: orderIssues.payment_failed,
	expired: orderIssues.payment_expired,
	cancelled: "Pembayaran dibatalkan.",
	manual_review: "Pembayaran memerlukan pemeriksaan sebelum pesanan diproses.",
	refunded: orderIssues.refunded,
	partially_refunded: "Pembayaran dikembalikan sebagian. Periksa detail pembayaran."
};
var shippingIssues = {
	failed: orderIssues.shipment_failed,
	problem: orderIssues.shipment_problem,
	lost: orderIssues.lost,
	returned: orderIssues.returned,
	cancelled: "Booking pengiriman dibatalkan, bukan pembatalan pesanan. Periksa pengiriman."
};
function getOrderWorkflow(order) {
	const shippingStatus = order.shipment?.shipping_status ?? order.shipping_status;
	return {
		currentStep: Math.min(order.shipping_issue ? 4 : 6, Math.max(orderSteps[order.order_status] ?? 0, order.paid_at || order.payment_status === "paid" ? 1 : 0, shippingSteps[shippingStatus] ?? 0, order.shipment?.shipped_at ? 4 : 0, order.shipment?.delivered_at ? 5 : 0, ...(order.status_history ?? []).map(({ status }) => Math.min(orderSteps[status ?? ""] ?? 0, 5)), ...(order.trackings ?? []).map(({ status }) => shippingSteps[status] ?? 0))),
		completed: order.order_status === "completed" && !order.shipping_issue,
		issue: order.shipping_issue?.description ?? orderIssues[order.order_status] ?? paymentIssues[order.payment_status] ?? shippingIssues[shippingStatus] ?? null
	};
}
//#endregion
//#region resources/js/pages/admin/orders/show.tsx
var tabs = [
	{
		value: "overview",
		label: "Overview"
	},
	{
		value: "products",
		label: "Products"
	},
	{
		value: "customer",
		label: "Customer"
	},
	{
		value: "payment",
		label: "Payment"
	},
	{
		value: "shipping",
		label: "Shipping"
	}
];
var actionLabels = {
	shipment_failed: "Tandai Gagal Dikirim",
	processing: "Mulai proses pesanan",
	ready_to_ship: "Selesai packing: siap dikirim",
	completed: "Selesaikan pesanan"
};
var money = (value) => new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
	maximumFractionDigits: 0
}).format(Number(value ?? 0));
var date = (value) => {
	if (!value) return "—";
	const timestamp = new Date(value);
	if (Number.isNaN(timestamp.getTime())) return "—";
	return `${new Intl.DateTimeFormat("id-ID", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23",
		timeZone: "Asia/Jakarta"
	}).format(timestamp)} WIB`;
};
var label = (value) => value === "shipment_failed" ? "Pesanan gagal dikirim" : value ? value.replaceAll("_", " ") : "—";
function OrderShow({ order }) {
	const [tab, setTab] = useState("overview");
	const [processing, setProcessing] = useState(false);
	const [statusError, setStatusError] = useState("");
	const [failureOpen, setFailureOpen] = useState(false);
	const [failureReason, setFailureReason] = useState("");
	const [bookingOpen, setBookingOpen] = useState(false);
	const [shipmentProcessing, setShipmentProcessing] = useState(false);
	const [shipmentError, setShipmentError] = useState("");
	const availableStatuses = order.allowedStatuses;
	const changeStatus = (nextStatus, reason) => {
		if (processing || shipmentProcessing) return;
		if (nextStatus === "shipment_failed" && !reason?.trim()) {
			setStatusError("Tuliskan alasan pesanan ditandai gagal dikirim.");
			return;
		}
		setProcessing(true);
		setStatusError("");
		router.post(updateStatus.url(order.id), {
			status: nextStatus,
			...reason ? { reason: reason.trim() } : {}
		}, {
			preserveScroll: true,
			onSuccess: () => setFailureOpen(false),
			onError: (errors) => setStatusError(errors.reason ?? errors.status ?? "Perubahan status gagal."),
			onFinish: () => setProcessing(false)
		});
	};
	const openBooking = () => {
		setShipmentError("");
		setBookingOpen(true);
	};
	const confirmBooking = () => {
		if (processing || shipmentProcessing || !order.can_create_shipment) return;
		setShipmentProcessing(true);
		setShipmentError("");
		router.post(store.url(order.id), { source: "order_detail" }, {
			preserveScroll: true,
			onSuccess: () => setBookingOpen(false),
			onError: (errors) => setShipmentError(errors.shipment ?? errors.biteship ?? Object.values(errors)[0] ?? "Booking Biteship gagal."),
			onFinish: () => setShipmentProcessing(false)
		});
	};
	const syncTracking = () => {
		if (processing || shipmentProcessing || !order.shipment?.id || !order.shipment.biteship_order_id) return;
		setShipmentProcessing(true);
		setShipmentError("");
		router.post(refreshTracking.url(order.shipment.id), {}, {
			preserveScroll: true,
			onError: (errors) => setShipmentError(errors.shipment ?? errors.biteship ?? Object.values(errors)[0] ?? "Sinkronisasi tracking gagal."),
			onFinish: () => setShipmentProcessing(false)
		});
	};
	const activities = useMemo(() => [
		...order.status_history.map((item) => ({
			id: `order-${item.id}`,
			title: `${label(item.status)} - ${item.actor}`,
			time: item.created_at
		})),
		...order.trackings.map((item) => ({
			id: `shipping-${item.id}`,
			title: item.description ?? `Shipping ${label(item.status)}`,
			time: item.happened_at
		})),
		...order.payment_logs.map((item) => ({
			id: `payment-${item.id}`,
			title: item.event_type ? label(item.event_type) : `Payment ${label(item.transaction_status)}`,
			time: item.processed_at ?? item.created_at ?? null
		})),
		{
			id: "created",
			title: "Order created",
			time: order.created_at
		}
	].sort((a, b) => String(b.time ?? "").localeCompare(String(a.time ?? ""))), [order]);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(Head, { title: `Order Detail - ${order.order_number}` }),
		/* @__PURE__ */ jsx("main", {
			className: "min-w-0 flex-1 bg-[#fafafa] px-4 py-5 text-[#171717] sm:px-6 lg:px-7",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-[1440px] flex-col gap-5",
				children: [
					/* @__PURE__ */ jsx(PageHeader, {
						order,
						availableStatuses,
						processing: processing || shipmentProcessing,
						onBookShipment: openBooking,
						onRefreshTracking: syncTracking,
						onStatusChange: (nextStatus) => {
							if (nextStatus === "shipment_failed") {
								setFailureReason("");
								setStatusError("");
								setFailureOpen(true);
							} else changeStatus(nextStatus);
						}
					}),
					statusError && !failureOpen && /* @__PURE__ */ jsx("p", {
						role: "alert",
						className: "text-sm text-destructive",
						children: statusError
					}),
					shipmentError && !bookingOpen && /* @__PURE__ */ jsx("p", {
						role: "alert",
						className: "text-sm text-destructive",
						children: shipmentError
					}),
					order.booking_uncertain && /* @__PURE__ */ jsx("p", {
						role: "alert",
						className: "rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900",
						children: "Hasil booking belum pasti. Periksa dashboard Biteship sebelum mencoba kembali agar tidak membuat pengiriman ganda."
					}),
					/* @__PURE__ */ jsx(OrderBanner, { order }),
					order.shipping_issue && /* @__PURE__ */ jsxs("section", {
						"aria-label": "Kendala pengiriman",
						className: "space-y-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-950",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "font-semibold",
								children: order.shipping_issue.label
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm leading-relaxed",
								children: order.shipping_issue.description
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-xs break-words",
								children: ["Status dari kurir: ", order.shipping_issue.status]
							}),
							order.shipping_issue.reason && /* @__PURE__ */ jsxs("p", {
								className: "text-sm break-words",
								children: [
									"Keterangan kurir:",
									" ",
									order.shipping_issue.reason
								]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-xs",
								children: [
									"Pembaruan terakhir:",
									" ",
									date(order.trackings[0]?.happened_at)
								]
							}),
							order.order_status === "shipment_failed" && /* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium",
								children: "Pesanan ditandai gagal dikirim. Pembayaran dan riwayat shipment tetap dipertahankan."
							})
						]
					}),
					/* @__PURE__ */ jsx(OrderWorkflow, { order }),
					/* @__PURE__ */ jsx("nav", {
						className: "flex overflow-x-auto border-b border-[#dedede]",
						"aria-label": "Order detail sections",
						children: tabs.map((item) => /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => setTab(item.value),
							className: `relative min-w-28 px-5 py-3 text-sm transition-colors ${tab === item.value ? "font-semibold text-[#111]" : "text-[#4f4f4f] hover:text-[#111]"}`,
							children: [item.label, tab === item.value && /* @__PURE__ */ jsx("span", { className: "absolute inset-x-0 bottom-0 h-0.5 bg-[#f0440b]" })]
						}, item.value))
					}),
					tab === "overview" && /* @__PURE__ */ jsx(Overview, {
						order,
						activities
					}),
					tab === "products" && /* @__PURE__ */ jsx(Products, { order }),
					tab === "customer" && /* @__PURE__ */ jsx(Customer, { order }),
					tab === "payment" && /* @__PURE__ */ jsx(PaymentTab, { order }),
					tab === "shipping" && /* @__PURE__ */ jsx(ShippingTab, {
						order,
						processing: processing || shipmentProcessing,
						onBookShipment: openBooking,
						onRefreshTracking: syncTracking
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(BookingConfirmation, {
			order,
			open: bookingOpen,
			processing: shipmentProcessing,
			error: shipmentError,
			onOpenChange: (open) => {
				if (!shipmentProcessing) setBookingOpen(open);
			},
			onConfirm: confirmBooking
		}),
		/* @__PURE__ */ jsx(Dialog, {
			open: failureOpen,
			onOpenChange: (open) => {
				if (!processing) setFailureOpen(open);
			},
			children: /* @__PURE__ */ jsxs(DialogContent, {
				className: "max-h-[85vh] overflow-y-auto sm:max-w-lg",
				children: [
					/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Tandai pesanan gagal dikirim?" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Pastikan kurir telah mengonfirmasi bahwa paket tidak akan sampai ke customer." })] }),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-3 text-sm",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "font-semibold",
								children: order.order_number
							}),
							/* @__PURE__ */ jsx("p", { children: order.shipping_issue?.label }),
							/* @__PURE__ */ jsxs("p", { children: [
								"Pembayaran tetap ",
								label(order.payment_status),
								" ",
								"sebesar ",
								money(order.grand_total),
								". Tindakan ini tidak melakukan refund, membatalkan booking kurir, mengembalikan stok, atau mengembalikan pemakaian voucher."
							] }),
							/* @__PURE__ */ jsx("label", {
								htmlFor: "shipping-failure-reason",
								className: "block font-medium",
								children: "Alasan gagal kirim"
							}),
							/* @__PURE__ */ jsx("textarea", {
								id: "shipping-failure-reason",
								rows: 4,
								maxLength: 1e3,
								required: true,
								value: failureReason,
								disabled: processing,
								onChange: (event) => setFailureReason(event.target.value),
								"aria-invalid": Boolean(statusError),
								"aria-describedby": statusError ? "shipping-failure-error" : void 0,
								className: "w-full rounded-md border border-input bg-background p-3 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
							}),
							statusError && /* @__PURE__ */ jsx("p", {
								id: "shipping-failure-error",
								role: "alert",
								className: "text-destructive",
								children: statusError
							})
						]
					}),
					/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						disabled: processing,
						onClick: () => setFailureOpen(false),
						children: "Kembali"
					}), /* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "destructive",
						disabled: processing || shipmentProcessing || !availableStatuses.includes("shipment_failed"),
						onClick: () => changeStatus("shipment_failed", failureReason),
						children: processing ? "Menyimpan..." : "Ya, tandai gagal dikirim"
					})] })
				]
			})
		})
	] });
}
function PageHeader({ order, availableStatuses, processing, onStatusChange, onBookShipment, onRefreshTracking }) {
	const nextStatus = availableStatuses[0];
	return /* @__PURE__ */ jsxs("header", {
		className: "flex flex-col justify-between gap-4 md:flex-row md:items-end",
		children: [/* @__PURE__ */ jsxs("div", { children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 text-xs font-medium text-[#484848] uppercase",
				children: [
					/* @__PURE__ */ jsxs(Link, {
						href: index.url(),
						className: "inline-flex items-center gap-1 hover:text-[#f0440b]",
						children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "size-3" }), " Sales Management"]
					}),
					/* @__PURE__ */ jsx("span", { children: "/" }),
					/* @__PURE__ */ jsx("span", { children: "Orders" }),
					/* @__PURE__ */ jsx("span", { children: "/" }),
					/* @__PURE__ */ jsx("span", {
						className: "font-semibold text-[#171717]",
						children: "Order Detail"
					})
				]
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "mt-3 text-2xl font-bold tracking-tight",
				children: "Order Detail"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-sm text-[#555]",
				children: "Review complete customer order, payment, fulfillment, shipping and transaction information."
			})
		] }), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-wrap gap-3",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					href: index.url(),
					className: "inline-flex h-10 items-center gap-2 rounded-md border border-[#d8d8d8] bg-white px-5 text-sm font-medium shadow-sm transition hover:bg-[#f5f5f5]",
					children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }), " Back to Orders"]
				}),
				nextStatus && /* @__PURE__ */ jsx(Button, {
					type: "button",
					disabled: processing,
					onClick: () => onStatusChange(nextStatus),
					className: "h-auto min-h-10 bg-[#d93a08] whitespace-normal text-white hover:bg-[#b83007]",
					children: processing ? "Menyimpan..." : actionLabels[nextStatus] ?? label(nextStatus)
				}),
				!nextStatus && order.payment && ["pending", "manual_review"].includes(order.payment_status) && /* @__PURE__ */ jsx(Button, {
					asChild: true,
					children: /* @__PURE__ */ jsx(Link, {
						href: show$1.url(order.payment.id),
						children: "Periksa pembayaran"
					})
				}),
				/* @__PURE__ */ jsx(ShippingActions, {
					order,
					processing,
					onBookShipment,
					onRefreshTracking
				})
			]
		})]
	});
}
function ShippingActions({ order, processing, onBookShipment, onRefreshTracking }) {
	if (order.payment_status !== "paid" || [
		"completed",
		"cancelled",
		"refunded"
	].includes(order.order_status)) return null;
	if (order.can_create_shipment) return /* @__PURE__ */ jsxs(Button, {
		type: "button",
		disabled: processing,
		onClick: onBookShipment,
		className: "h-auto min-h-10 whitespace-normal",
		children: [/* @__PURE__ */ jsx(PackagePlus, { className: "size-4" }), " Buat Order Biteship"]
	});
	if (order.shipment?.id && order.shipment.biteship_order_id) return /* @__PURE__ */ jsxs(Button, {
		type: "button",
		variant: "outline",
		disabled: processing,
		onClick: onRefreshTracking,
		className: "h-auto min-h-10 whitespace-normal",
		children: [/* @__PURE__ */ jsx(RefreshCw, { className: processing ? "size-4 animate-spin" : "size-4" }), processing ? "Memproses..." : "Perbarui Tracking"]
	});
	return null;
}
function BookingConfirmation({ order, open, processing, error, onOpenChange, onConfirm }) {
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "flex max-h-[85dvh] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl",
			children: [
				/* @__PURE__ */ jsxs(DialogHeader, {
					className: "shrink-0 border-b p-5 pr-12",
					children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Buat Order Biteship" }), /* @__PURE__ */ jsxs(DialogDescription, { children: [
						"Pesanan ",
						order.order_number,
						". Konfirmasi ini membuat booking nyata di Biteship menggunakan kurir pilihan customer."
					] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "min-h-0 overflow-y-auto p-5",
					children: [
						/* @__PURE__ */ jsx("ul", {
							className: "divide-y",
							children: order.items.map((item) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-start gap-3 py-3 first:pt-0",
								children: [
									item.product_image_url && /* @__PURE__ */ jsx("img", {
										src: item.product_image_url,
										alt: "",
										className: "size-10 shrink-0 rounded-md object-cover"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ jsx("p", {
												className: "text-sm font-medium [overflow-wrap:anywhere]",
												children: item.product_name
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-xs text-muted-foreground",
												children: [item.color_name, item.size].filter(Boolean).join(" / ")
											}),
											/* @__PURE__ */ jsxs("p", {
												className: "mt-1 text-xs text-muted-foreground",
												children: [money(item.price), " / produk"]
											})
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "shrink-0 text-right text-sm",
										children: [/* @__PURE__ */ jsxs("p", { children: ["Qty: ", item.quantity] }), /* @__PURE__ */ jsx("p", {
											className: "mt-1 font-medium",
											children: money(item.subtotal)
										})]
									})
								]
							}, item.id))
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-4 grid gap-3 border-t pt-4 text-sm",
							children: [
								/* @__PURE__ */ jsx(SummaryRow, {
									label: "Kurir",
									value: [order.shipment?.courier_company?.toUpperCase(), order.shipment?.courier_type?.toUpperCase()].filter(Boolean).join(" ")
								}),
								/* @__PURE__ */ jsx(SummaryRow, {
									label: "Layanan",
									value: order.shipment?.courier_service_name ?? "—"
								}),
								/* @__PURE__ */ jsx(SummaryRow, {
									label: "Voucher",
									value: order.voucher_code ?? "Tidak menggunakan voucher"
								}),
								/* @__PURE__ */ jsx(SummaryRow, {
									label: "Subtotal produk",
									value: money(order.subtotal)
								}),
								/* @__PURE__ */ jsx(SummaryRow, {
									label: "Diskon",
									value: "- " + money(order.discount_amount),
									danger: true
								}),
								/* @__PURE__ */ jsx(SummaryRow, {
									label: "Ongkir",
									value: money(order.shipping_cost)
								}),
								/* @__PURE__ */ jsx(SummaryRow, {
									label: "Biaya layanan",
									value: money(order.service_fee)
								}),
								/* @__PURE__ */ jsx("div", {
									className: "border-t pt-3",
									children: /* @__PURE__ */ jsx(SummaryRow, {
										label: "Total pembayaran",
										value: money(order.grand_total),
										strong: true
									})
								})
							]
						}),
						error && /* @__PURE__ */ jsx("p", {
							role: "alert",
							className: "mt-4 text-sm text-destructive",
							children: error
						}),
						order.booking_uncertain && /* @__PURE__ */ jsx("p", {
							role: "alert",
							className: "mt-4 text-sm text-amber-900",
							children: "Hasil booking belum pasti. Periksa dashboard Biteship sebelum mencoba kembali."
						})
					]
				}),
				/* @__PURE__ */ jsxs(DialogFooter, {
					className: "shrink-0 border-t p-5",
					children: [/* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						disabled: processing,
						onClick: () => onOpenChange(false),
						children: "Batal"
					}), /* @__PURE__ */ jsx(Button, {
						type: "button",
						disabled: processing || !order.can_create_shipment,
						onClick: onConfirm,
						children: processing ? "Membuat order..." : "Ya, Buat Order"
					})]
				})
			]
		})
	});
}
function OrderWorkflow({ order }) {
	const steps = [
		{
			title: "Dipesan",
			description: "Pesanan dibuat pelanggan"
		},
		{
			title: "Dibayar",
			description: "Pembayaran terkonfirmasi"
		},
		{
			title: "Diproses",
			description: "Pengecekan dan packing"
		},
		{
			title: "Siap Dikirim",
			description: "Packing selesai, booking kurir"
		},
		{
			title: "Dikirim",
			description: "Barang dibawa kurir"
		},
		{
			title: "Diterima Pelanggan",
			description: "Kurir mengonfirmasi penerimaan"
		},
		{
			title: "Selesai",
			description: "Pesanan ditutup oleh admin"
		}
	];
	const { currentStep, completed, issue } = getOrderWorkflow(order);
	return /* @__PURE__ */ jsxs("section", {
		"aria-labelledby": "order-workflow-title",
		className: "@container min-w-0 rounded-xl border border-[#dedede] bg-white p-4 sm:p-5",
		children: [
			/* @__PURE__ */ jsx("h2", {
				id: "order-workflow-title",
				className: "text-base font-bold",
				children: "Alur Pesanan"
			}),
			/* @__PURE__ */ jsx("p", {
				role: "status",
				className: "mt-1 text-sm text-[#555]",
				children: issue ? "Alur memerlukan pemeriksaan; progres terakhir ditampilkan di bawah." : completed ? "Seluruh tahap pesanan selesai." : `Tahap saat ini: ${steps[currentStep].title}.`
			}),
			issue && /* @__PURE__ */ jsxs("p", {
				className: "mt-3 flex items-start gap-2 rounded-md border border-[#f58220] bg-[#fff7ed] p-3 text-sm text-[#1a1a1a]",
				children: [/* @__PURE__ */ jsx(TriangleAlert, {
					"aria-hidden": "true",
					className: "mt-0.5 size-4 shrink-0"
				}), issue]
			}),
			/* @__PURE__ */ jsx("ol", {
				"aria-label": "Workflow pesanan",
				className: "mt-5 grid grid-cols-1 @min-[900px]:grid-cols-7",
				children: steps.map((step, index) => {
					const isCurrent = index === currentStep && !completed;
					const isDone = index < currentStep || completed;
					return /* @__PURE__ */ jsxs("li", {
						"aria-current": isCurrent ? "step" : void 0,
						className: "relative flex min-w-0 items-start gap-3 pb-6 last:pb-0 @min-[900px]:flex-col @min-[900px]:items-center @min-[900px]:px-2 @min-[900px]:pb-0 @min-[900px]:text-center",
						children: [
							index < steps.length - 1 && /* @__PURE__ */ jsx("span", {
								"aria-hidden": "true",
								className: `absolute top-9 bottom-0 left-[17px] w-px @min-[900px]:top-[17px] @min-[900px]:bottom-auto @min-[900px]:left-[calc(50%+18px)] @min-[900px]:h-px @min-[900px]:w-[calc(100%-36px)] ${index < currentStep ? "bg-[#1a1a1a]" : "bg-[#dedede]"}`
							}),
							/* @__PURE__ */ jsx("span", {
								"aria-hidden": "true",
								className: `relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${isDone ? "border-[#1a1a1a] bg-[#1a1a1a] text-white" : isCurrent ? "border-[#f58220] bg-[#f58220] text-[#1a1a1a]" : "border-[#dedede] bg-white text-[#555]"}`,
								children: isDone ? /* @__PURE__ */ jsx(Check, { className: "size-4" }) : isCurrent && issue ? /* @__PURE__ */ jsx(TriangleAlert, { className: "size-4" }) : index + 1
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ jsx("h3", {
										className: "text-sm font-semibold text-[#1a1a1a]",
										children: step.title
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-1 text-xs leading-5 text-[#555]",
										children: step.description
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-1 text-xs font-medium text-[#555]",
										children: isDone ? "Selesai" : isCurrent ? issue ? "Perlu diperiksa" : "Saat ini" : "Belum"
									})
								]
							})
						]
					}, step.title);
				})
			})
		]
	});
}
function OrderBanner({ order }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "grid overflow-hidden rounded-xl border border-[#dedede] bg-white shadow-[0_3px_14px_rgba(0,0,0,0.06)] lg:grid-cols-[1.7fr_repeat(3,0.72fr)_1.05fr]",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "border-b border-[#e4e4e4] px-6 py-5 lg:border-r lg:border-b-0",
				children: [/* @__PURE__ */ jsxs("h2", {
					className: "font-mono text-xl font-bold",
					children: ["Order #", order.order_number]
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-3 grid gap-2 text-sm text-[#4a4a4a]",
					children: [
						/* @__PURE__ */ jsxs("p", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ jsx(CalendarDays, { className: "size-4" }),
								" Placed on",
								" ",
								date(order.created_at)
							]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ jsx(UserRound, { className: "size-4" }),
								" Customer:",
								" ",
								order.customer_name
							]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ jsx(Mail, { className: "size-4" }),
								" Email:",
								" ",
								order.customer_email
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx(BannerStatus, {
				title: "Payment",
				value: order.payment_status
			}),
			/* @__PURE__ */ jsx(BannerStatus, {
				title: "Order Status",
				value: order.order_status
			}),
			/* @__PURE__ */ jsx(BannerStatus, {
				title: "Shipping",
				value: order.shipping_issue?.status ?? order.shipping_status,
				display: order.shipping_issue?.label
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col justify-center px-7 py-5",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm font-semibold",
					children: "Total"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-2 font-mono text-2xl font-bold",
					children: money(order.grand_total)
				})]
			})
		]
	});
}
function BannerStatus({ title, value, display }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center justify-center border-b border-[#e4e4e4] px-4 py-5 lg:border-r lg:border-b-0",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-xs font-medium",
			children: title
		}), /* @__PURE__ */ jsx(StatusBadge, {
			value,
			display
		})]
	});
}
function StatusBadge({ value, display }) {
	const positive = [
		"paid",
		"completed",
		"delivered",
		"settlement",
		"capture"
	].includes(value);
	const negative = [
		"failed",
		"cancelled",
		"expired",
		"deny",
		"problem",
		"lost",
		"returned",
		"shipment_failed",
		"shipment_problem",
		"disposed",
		"damaged",
		"rejected"
	].includes(value);
	return /* @__PURE__ */ jsxs("span", {
		className: `mt-3 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium capitalize ${positive ? "border-[#c8ebce] bg-[#edfaef] text-[#167329]" : negative ? "border-red-200 bg-red-50 text-red-700" : "border-amber-200 bg-amber-50 text-amber-700"}`,
		children: [/* @__PURE__ */ jsx("span", { className: `size-2 rounded-full ${positive ? "bg-[#2ba33d]" : negative ? "bg-red-500" : "bg-amber-500"}` }), display ?? label(value)]
	});
}
function Overview({ order, activities }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid items-start gap-5 xl:grid-cols-[minmax(0,1.75fr)_minmax(320px,0.95fr)]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid gap-4",
			children: [
				/* @__PURE__ */ jsx(Panel, { children: /* @__PURE__ */ jsxs("div", {
					className: "grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "border-b border-[#e1e1e1] p-5 lg:border-r lg:border-b-0",
						children: [/* @__PURE__ */ jsx(PanelTitle, { children: "Order Information" }), /* @__PURE__ */ jsxs("dl", {
							className: "mt-5 grid gap-3",
							children: [
								/* @__PURE__ */ jsx(Detail, {
									label: "Order Number",
									children: /* @__PURE__ */ jsx("span", {
										className: "font-mono",
										children: order.order_number
									})
								}),
								/* @__PURE__ */ jsx(Detail, {
									label: "Order Date",
									children: date(order.created_at)
								}),
								/* @__PURE__ */ jsx(Detail, {
									label: "Payment Status",
									children: /* @__PURE__ */ jsx(InlineStatus, { value: order.payment_status })
								}),
								/* @__PURE__ */ jsx(Detail, {
									label: "Order Status",
									children: /* @__PURE__ */ jsx(InlineStatus, { value: order.order_status })
								}),
								/* @__PURE__ */ jsx(Detail, {
									label: "Shipping Status",
									children: /* @__PURE__ */ jsx(InlineStatus, { value: order.shipping_status })
								}),
								/* @__PURE__ */ jsx(Detail, {
									label: "Paid At",
									children: date(order.paid_at)
								}),
								/* @__PURE__ */ jsx(Detail, {
									label: "Completed At",
									children: date(order.completed_at)
								})
							]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-5",
						children: [/* @__PURE__ */ jsx(PanelTitle, { children: "Panduan Pemenuhan Pesanan" }), /* @__PURE__ */ jsxs("div", {
							className: "mt-5 grid gap-3",
							children: [
								/* @__PURE__ */ jsx(StatusField, {
									label: "Payment Status",
									value: order.payment_status
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-[#555]",
									children: "Periksa pembayaran, produk, alamat, dan catatan pelanggan. Mulai proses melalui tombol di atas; tandai siap dikirim setelah packing selesai."
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-[#555]",
									children: "Pembayaran mengikuti Midtrans, pengiriman mengikuti Biteship. Pesanan hanya dapat diselesaikan setelah pembayaran lunas dan barang terkirim."
								}),
								/* @__PURE__ */ jsx(StatusField, {
									label: "Shipping Status",
									value: order.shipping_status
								}),
								order.shipment?.id && /* @__PURE__ */ jsx(Link, {
									href: show$2.url(order.shipment.id),
									className: "text-sm font-medium text-[#d93a08] underline",
									children: "Buka pengiriman dan booking kurir"
								})
							]
						})]
					})]
				}) }),
				/* @__PURE__ */ jsxs(Panel, {
					className: "p-5",
					children: [
						/* @__PURE__ */ jsx(PanelTitle, { children: "Customer Notes" }),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 text-sm text-[#4a4a4a]",
							children: order.notes || "Customer did not leave a note."
						}),
						/* @__PURE__ */ jsx("div", { className: "my-4 border-t border-[#e2e2e2]" })
					]
				}),
				/* @__PURE__ */ jsx(ActivityList, { activities })
			]
		}), /* @__PURE__ */ jsxs("aside", {
			className: "grid gap-4",
			children: [/* @__PURE__ */ jsx(Summary, { order }), /* @__PURE__ */ jsx(AddressCard, { order })]
		})]
	});
}
function StatusField({ label: title, value }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
		className: "mb-1.5 block text-sm",
		children: title
	}), /* @__PURE__ */ jsx("div", {
		className: "rounded-md border border-[#dedede] bg-[#fafafa] px-3 py-2.5 text-sm text-[#555] capitalize",
		children: label(value)
	})] });
}
function Summary({ order }) {
	return /* @__PURE__ */ jsxs(Panel, {
		className: "p-5",
		children: [/* @__PURE__ */ jsx(PanelTitle, { children: "Order Summary" }), /* @__PURE__ */ jsxs("div", {
			className: "mt-5 grid gap-3 text-sm",
			children: [
				/* @__PURE__ */ jsx(SummaryRow, {
					label: "Subtotal",
					value: money(order.subtotal)
				}),
				/* @__PURE__ */ jsx(SummaryRow, {
					label: "Discount",
					value: `- ${money(order.discount_amount)}`,
					danger: true
				}),
				/* @__PURE__ */ jsx(SummaryRow, {
					label: "Shipping Cost",
					value: money(order.shipping_cost)
				}),
				/* @__PURE__ */ jsx(SummaryRow, {
					label: "Service Fee",
					value: money(order.service_fee)
				}),
				/* @__PURE__ */ jsx("div", {
					className: "border-t border-[#dedede] pt-3",
					children: /* @__PURE__ */ jsx(SummaryRow, {
						label: "Total",
						value: money(order.grand_total),
						strong: true
					})
				}),
				/* @__PURE__ */ jsx(SummaryRow, {
					label: "Voucher",
					value: order.voucher_code ?? "—"
				})
			]
		})]
	});
}
function AddressCard({ order }) {
	const address = order.address;
	return /* @__PURE__ */ jsxs(Panel, {
		className: "p-5",
		children: [/* @__PURE__ */ jsx(PanelTitle, { children: "Customer & Shipping Address" }), /* @__PURE__ */ jsxs("div", {
			className: "mt-5 flex items-start gap-3",
			children: [/* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 size-5 shrink-0" }), /* @__PURE__ */ jsxs("div", {
				className: "min-w-0 text-sm leading-6 wrap-anywhere",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "mb-3 text-xs text-[#555]",
						children: "Shipping Address"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "font-medium",
						children: address?.recipient_name || order.customer_name || "—"
					}),
					/* @__PURE__ */ jsx("p", { children: address?.full_address || "—" }),
					/* @__PURE__ */ jsxs("p", { children: ["Kelurahan/Desa: ", address?.subdistrict || "—"] }),
					/* @__PURE__ */ jsxs("p", { children: ["Kecamatan: ", address?.district || "—"] }),
					/* @__PURE__ */ jsx("p", { children: [
						address?.city,
						address?.province,
						address?.postal_code
					].filter(Boolean).join(", ") || "—" }),
					/* @__PURE__ */ jsx("p", { children: address?.recipient_phone || order.customer_phone || "—" }),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-3 border-t border-[#e2e2e2] pt-3",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs text-[#555]",
							children: "Catatan Alamat"
						}), /* @__PURE__ */ jsx("p", {
							className: "whitespace-pre-wrap",
							children: address?.note || "—"
						})]
					})
				]
			})]
		})]
	});
}
function Products({ order }) {
	return /* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsxs("div", {
		className: "border-b border-[#e1e1e1] p-5",
		children: [/* @__PURE__ */ jsx(PanelTitle, { children: "Products Purchased" }), /* @__PURE__ */ jsxs("p", {
			className: "mt-1 text-sm text-[#666]",
			children: [order.items.length, " product lines in this order."]
		})]
	}), /* @__PURE__ */ jsx("div", {
		className: "max-w-full min-w-0 overflow-x-auto",
		children: /* @__PURE__ */ jsxs("table", {
			className: "w-full min-w-[960px] text-sm",
			children: [/* @__PURE__ */ jsx("thead", {
				className: "border-b bg-[#fafafa] text-left text-xs text-[#555]",
				children: /* @__PURE__ */ jsxs("tr", { children: [
					/* @__PURE__ */ jsx("th", {
						className: "px-5 py-3",
						children: "Product"
					}),
					/* @__PURE__ */ jsx("th", {
						className: "px-5 py-3",
						children: "Variant"
					}),
					/* @__PURE__ */ jsx("th", {
						className: "px-5 py-3 text-right",
						children: "Price"
					}),
					/* @__PURE__ */ jsx("th", {
						className: "px-5 py-3 text-center",
						children: "Qty"
					}),
					/* @__PURE__ */ jsx("th", {
						className: "px-5 py-3 text-center",
						children: "Stock Before"
					}),
					/* @__PURE__ */ jsx("th", {
						className: "px-5 py-3 text-center",
						children: "Stock After"
					}),
					/* @__PURE__ */ jsx("th", {
						className: "px-5 py-3 text-right",
						children: "Subtotal"
					})
				] })
			}), /* @__PURE__ */ jsx("tbody", {
				className: "divide-y divide-[#e8e8e8]",
				children: order.items.map((item) => /* @__PURE__ */ jsxs("tr", { children: [
					/* @__PURE__ */ jsx("td", {
						className: "px-5 py-4",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [item.product_image_url ? /* @__PURE__ */ jsx("img", {
								src: item.product_image_url,
								alt: item.product_name,
								className: "size-12 rounded-md border object-cover"
							}) : /* @__PURE__ */ jsx("div", {
								className: "flex size-12 items-center justify-center rounded-md border bg-[#f5f5f5]",
								children: /* @__PURE__ */ jsx(Box, { className: "size-5 text-[#888]" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "font-semibold",
								children: item.product_name
							}), /* @__PURE__ */ jsx("p", {
								className: "font-mono text-xs text-[#666]",
								children: item.product_sku ?? "—"
							})] })]
						})
					}),
					/* @__PURE__ */ jsx("td", {
						className: "px-5 py-4 text-[#555]",
						children: [
							item.variant_sku,
							item.color_name,
							item.size
						].filter(Boolean).join(" · ") || "—"
					}),
					/* @__PURE__ */ jsx("td", {
						className: "px-5 py-4 text-right font-mono",
						children: money(item.price)
					}),
					/* @__PURE__ */ jsx("td", {
						className: "px-5 py-4 text-center font-mono",
						children: item.quantity
					}),
					["stock_before", "stock_after"].map((field) => /* @__PURE__ */ jsx("td", {
						className: "px-5 py-4 text-center",
						children: item.stock_movements.length ? /* @__PURE__ */ jsx("div", {
							className: "grid gap-3",
							children: item.stock_movements.map((movement) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "font-mono",
								children: movement[field]
							}), /* @__PURE__ */ jsx("time", {
								className: "text-xs whitespace-nowrap text-[#666]",
								children: date(movement.created_at)
							})] }, movement.id))
						}) : "—"
					}, field)),
					/* @__PURE__ */ jsx("td", {
						className: "px-5 py-4 text-right font-mono font-semibold",
						children: money(item.subtotal)
					})
				] }, item.id))
			})]
		})
	})] });
}
function Customer({ order }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-5 lg:grid-cols-2",
		children: [/* @__PURE__ */ jsxs(Panel, {
			className: "p-5",
			children: [/* @__PURE__ */ jsx(PanelTitle, { children: "Customer Information" }), /* @__PURE__ */ jsxs("div", {
				className: "mt-5 grid gap-4",
				children: [
					/* @__PURE__ */ jsx(Detail, {
						label: "Name",
						children: order.customer_name
					}),
					/* @__PURE__ */ jsx(Detail, {
						label: "Email",
						children: order.customer_email
					}),
					/* @__PURE__ */ jsx(Detail, {
						label: "Phone",
						children: order.customer_phone
					})
				]
			})]
		}), /* @__PURE__ */ jsx(AddressCard, { order })]
	});
}
function PaymentTab({ order }) {
	const payment = order.payment;
	const [syncing, setSyncing] = useState(false);
	const [syncError, setSyncError] = useState("");
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]",
		children: [/* @__PURE__ */ jsxs(Panel, {
			className: "p-5",
			children: [
				/* @__PURE__ */ jsx(PanelTitle, { children: "Payment Information" }),
				payment && /* @__PURE__ */ jsxs("div", {
					className: "mt-4 flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ jsx(Link, {
							href: show$1.url(payment.id),
							className: "text-sm font-medium underline",
							children: "Detail pembayaran"
						}),
						/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							disabled: syncing,
							onClick: () => {
								setSyncing(true);
								setSyncError("");
								router.post(sync.url(payment.id), {}, {
									preserveScroll: true,
									onError: (errors) => setSyncError(Object.values(errors).join(" ")),
									onFinish: () => setSyncing(false)
								});
							},
							children: syncing ? "Menyinkronkan..." : "Sinkronkan Midtrans"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "w-full text-sm text-[#555]",
							children: "Pembatalan dan refund diproses melalui Midtrans, lalu sinkronkan status di sini."
						}),
						syncError && /* @__PURE__ */ jsx("p", {
							role: "alert",
							className: "text-sm text-destructive",
							children: syncError
						})
					]
				}),
				payment ? /* @__PURE__ */ jsxs("div", {
					className: "mt-5 grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ jsx(Detail, {
							label: "Provider",
							children: payment.payment_provider ?? "—"
						}),
						/* @__PURE__ */ jsx(Detail, {
							label: "Method",
							children: payment.payment_method ?? "—"
						}),
						/* @__PURE__ */ jsx(Detail, {
							label: "Transaction Status",
							children: /* @__PURE__ */ jsx(InlineStatus, { value: payment.transaction_status ?? "unknown" })
						}),
						/* @__PURE__ */ jsx(Detail, {
							label: "Fraud Status",
							children: payment.fraud_status ?? "—"
						}),
						/* @__PURE__ */ jsx(Detail, {
							label: "Gross Amount",
							children: money(payment.gross_amount)
						}),
						/* @__PURE__ */ jsx(Detail, {
							label: "Paid At",
							children: date(payment.paid_at)
						}),
						/* @__PURE__ */ jsx(Detail, {
							label: "Midtrans Order ID",
							children: payment.midtrans_order_id ?? "—"
						}),
						/* @__PURE__ */ jsx(Detail, {
							label: "Transaction ID",
							children: payment.midtrans_transaction_id ?? "—"
						})
					]
				}) : /* @__PURE__ */ jsx(Empty, { text: "Payment record unavailable." })
			]
		}), /* @__PURE__ */ jsxs(Panel, {
			className: "p-5",
			children: [/* @__PURE__ */ jsx(PanelTitle, { children: "Payment Activity" }), /* @__PURE__ */ jsx("div", {
				className: "mt-5",
				children: /* @__PURE__ */ jsx(ActivityList, {
					activities: order.payment_logs.map((item) => ({
						id: String(item.id),
						title: label(item.event_type),
						time: item.processed_at ?? item.created_at ?? null
					})),
					embedded: true
				})
			})]
		})]
	});
}
function ShippingTab({ order, processing, onBookShipment, onRefreshTracking }) {
	const shipment = order.shipment;
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]",
		children: [/* @__PURE__ */ jsxs(Panel, {
			className: "p-5",
			children: [
				/* @__PURE__ */ jsx(PanelTitle, { children: "Shipping Information" }),
				/* @__PURE__ */ jsx("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: /* @__PURE__ */ jsx(ShippingActions, {
						order,
						processing,
						onBookShipment,
						onRefreshTracking
					})
				}),
				shipment?.id && /* @__PURE__ */ jsx(Link, {
					href: show$2.url(shipment.id),
					className: "mt-4 inline-flex text-sm font-medium text-[#d93a08] underline",
					children: "Label dan pengelolaan lanjutan"
				}),
				shipment ? /* @__PURE__ */ jsxs("div", {
					className: "mt-5 grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ jsx(Detail, {
							label: "Courier",
							children: [shipment.courier_company, shipment.courier_type].filter(Boolean).join(" ") || "—"
						}),
						/* @__PURE__ */ jsx(Detail, {
							label: "Service",
							children: shipment.courier_service_name ?? "—"
						}),
						/* @__PURE__ */ jsx(Detail, {
							label: "Waybill ID",
							children: shipment.waybill_id ?? "—"
						}),
						/* @__PURE__ */ jsx(Detail, {
							label: "Status",
							children: /* @__PURE__ */ jsx(InlineStatus, { value: shipment.shipping_status ?? order.shipping_status })
						}),
						/* @__PURE__ */ jsx(Detail, {
							label: "Shipping Cost",
							children: money(shipment.shipping_cost)
						}),
						/* @__PURE__ */ jsx(Detail, {
							label: "Estimated Delivery",
							children: shipment.estimated_delivery ?? "—"
						})
					]
				}) : /* @__PURE__ */ jsx(Empty, { text: "Shipment has not been created." })
			]
		}), /* @__PURE__ */ jsxs(Panel, {
			className: "p-5",
			children: [/* @__PURE__ */ jsx(PanelTitle, { children: "Tracking History" }), /* @__PURE__ */ jsx("div", {
				className: "mt-5",
				children: /* @__PURE__ */ jsx(ActivityList, {
					activities: order.trackings.map((item) => ({
						id: String(item.id),
						title: item.description ?? `Shipping ${label(item.status)}`,
						time: item.happened_at
					})),
					embedded: true
				})
			})]
		})]
	});
}
function ActivityList({ activities, embedded = false }) {
	const content = activities.length ? /* @__PURE__ */ jsx("div", {
		className: "grid gap-0",
		children: activities.map((item, index) => /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-[20px_minmax(0,1fr)] gap-x-3 text-sm sm:grid-cols-[20px_minmax(0,1fr)_auto]",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "row-span-2 flex flex-col items-center sm:row-span-1",
					children: [/* @__PURE__ */ jsx("span", {
						className: "mt-0.5 flex size-4 items-center justify-center rounded-full bg-[#24953a] text-white",
						children: /* @__PURE__ */ jsx(Check, { className: "size-2.5" })
					}), index < activities.length - 1 && /* @__PURE__ */ jsx("span", { className: "h-7 w-px border-l border-dashed border-[#bdbdbd]" })]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "min-w-0 pb-1 break-words sm:pb-4",
					children: item.title
				}),
				/* @__PURE__ */ jsx("time", {
					className: "col-start-2 pb-4 text-xs text-[#555] sm:col-start-auto",
					children: date(item.time)
				})
			]
		}, item.id))
	}) : /* @__PURE__ */ jsx(Empty, { text: "No activity recorded." });
	if (embedded) return content;
	return /* @__PURE__ */ jsxs(Panel, {
		className: "p-5",
		children: [/* @__PURE__ */ jsx(PanelTitle, { children: "Order Activity" }), /* @__PURE__ */ jsx("div", {
			className: "mt-5",
			children: content
		})]
	});
}
function Panel({ children, className = "" }) {
	return /* @__PURE__ */ jsx("section", {
		className: `overflow-hidden rounded-xl border border-[#dedede] bg-white shadow-[0_3px_14px_rgba(0,0,0,0.055)] ${className}`,
		children
	});
}
function PanelTitle({ children }) {
	return /* @__PURE__ */ jsx("h2", {
		className: "text-base font-bold",
		children
	});
}
function Detail({ label: title, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid grid-cols-[140px_minmax(0,1fr)] gap-4 text-sm",
		children: [/* @__PURE__ */ jsx("dt", {
			className: "text-[#454545]",
			children: title
		}), /* @__PURE__ */ jsx("dd", {
			className: "min-w-0 font-medium break-words",
			children
		})]
	});
}
function InlineStatus({ value }) {
	return /* @__PURE__ */ jsxs("span", {
		className: "inline-flex items-center gap-2 capitalize",
		children: [/* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-[#2ba33d]" }), label(value)]
	});
}
function SummaryRow({ label: title, value, danger = false, strong = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `flex items-center justify-between gap-4 ${strong ? "text-base font-bold" : ""}`,
		children: [/* @__PURE__ */ jsx("span", {
			className: "shrink-0",
			children: title
		}), /* @__PURE__ */ jsx("span", {
			className: `min-w-0 text-right [overflow-wrap:anywhere] ${danger ? "text-red-600" : ""} ${strong ? "font-mono text-lg" : ""}`,
			children: value
		})]
	});
}
function Empty({ text }) {
	return /* @__PURE__ */ jsx("div", {
		className: "mt-5 flex min-h-40 items-center justify-center rounded-lg border border-dashed border-[#ccc] bg-[#fafafa] text-sm text-[#666]",
		children: text
	});
}
//#endregion
export { OrderShow as default };

//# sourceMappingURL=show-DUZAIffK.js.map