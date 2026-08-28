import { t as Button } from "./button-D_r5eKEZ.js";
import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-Bgbpuenu.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CtTsjyTX.js";
import { Head, Link, router } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Box, CalendarDays, Check, ChevronDown, FileDown, Mail, MapPin, Save, UserRound } from "lucide-react";
//#region resources/js/actions/App/Http/Controllers/Admin/OrderController.ts
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
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
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
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
* @see app/Http/Controllers/Admin/OrderController.php:21
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
* @see app/Http/Controllers/Admin/OrderController.php:21
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
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
show.get = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
show.head = (args, options) => ({
	url: show.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
var showForm = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
showForm.get = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
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
* @see app/Http/Controllers/Admin/OrderController.php:26
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
* @see app/Http/Controllers/Admin/OrderController.php:26
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
* @see app/Http/Controllers/Admin/OrderController.php:26
* @route '/admin/orders/{order}/status'
*/
updateStatus.post = (args, options) => ({
	url: updateStatus.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::updateStatus
* @see app/Http/Controllers/Admin/OrderController.php:26
* @route '/admin/orders/{order}/status'
*/
var updateStatusForm = (args, options) => ({
	action: updateStatus.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::updateStatus
* @see app/Http/Controllers/Admin/OrderController.php:26
* @route '/admin/orders/{order}/status'
*/
updateStatusForm.post = (args, options) => ({
	action: updateStatus.url(args, options),
	method: "post"
});
updateStatus.form = updateStatusForm;
/**
* @see \App\Http\Controllers\Admin\OrderController::updateNotes
* @see app/Http/Controllers/Admin/OrderController.php:33
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
* @see app/Http/Controllers/Admin/OrderController.php:33
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
* @see app/Http/Controllers/Admin/OrderController.php:33
* @route '/admin/orders/{order}/notes'
*/
updateNotes.post = (args, options) => ({
	url: updateNotes.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::updateNotes
* @see app/Http/Controllers/Admin/OrderController.php:33
* @route '/admin/orders/{order}/notes'
*/
var updateNotesForm = (args, options) => ({
	action: updateNotes.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::updateNotes
* @see app/Http/Controllers/Admin/OrderController.php:33
* @route '/admin/orders/{order}/notes'
*/
updateNotesForm.post = (args, options) => ({
	action: updateNotes.url(args, options),
	method: "post"
});
updateNotes.form = updateNotesForm;
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
	},
	{
		value: "activity",
		label: "Activity"
	}
];
var statusTransitions = {
	paid: ["processing"],
	processing: ["ready_to_ship"],
	delivered: ["completed"],
	pending_payment: ["cancelled"]
};
var money = (value) => new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
	maximumFractionDigits: 0
}).format(Number(value ?? 0));
var date = (value) => {
	if (!value) return "—";
	return new Intl.DateTimeFormat("id-ID", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	}).format(new Date(value));
};
var label = (value) => value ? value.replaceAll("_", " ") : "—";
function OrderShow({ order }) {
	const [tab, setTab] = useState("overview");
	const [status, setStatus] = useState("");
	const [processing, setProcessing] = useState(false);
	const availableStatuses = statusTransitions[order.order_status] ?? [];
	const activities = useMemo(() => [
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
	const saveStatus = () => {
		if (!status) return;
		setProcessing(true);
		router.post(updateStatus.url(order.id), { status }, {
			preserveScroll: true,
			onSuccess: () => setStatus(""),
			onFinish: () => setProcessing(false)
		});
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Head, { title: `Order Detail - ${order.order_number}` }), /* @__PURE__ */ jsx("main", {
		className: "min-h-full bg-[#fafafa] px-4 py-5 text-[#171717] sm:px-6 lg:px-7",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex max-w-[1440px] flex-col gap-5",
			children: [
				/* @__PURE__ */ jsx(PageHeader, {
					availableStatuses,
					processing,
					onStatusChange: (nextStatus) => {
						setProcessing(true);
						router.post(updateStatus.url(order.id), { status: nextStatus }, {
							preserveScroll: true,
							onFinish: () => setProcessing(false)
						});
					}
				}),
				/* @__PURE__ */ jsx(OrderBanner, { order }),
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
					status,
					setStatus,
					saveStatus,
					processing,
					availableStatuses,
					activities
				}),
				tab === "products" && /* @__PURE__ */ jsx(Products, { order }),
				tab === "customer" && /* @__PURE__ */ jsx(Customer, { order }),
				tab === "payment" && /* @__PURE__ */ jsx(PaymentTab, { order }),
				tab === "shipping" && /* @__PURE__ */ jsx(ShippingTab, { order }),
				tab === "activity" && /* @__PURE__ */ jsx(ActivityList, {
					activities,
					expanded: true
				})
			]
		})
	})] });
}
function PageHeader({ availableStatuses, processing, onStatusChange }) {
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
				/* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => window.print(),
					className: "inline-flex h-10 items-center gap-2 rounded-md border border-[#d8d8d8] bg-white px-5 text-sm font-medium shadow-sm transition hover:bg-[#f5f5f5]",
					children: [/* @__PURE__ */ jsx(FileDown, { className: "size-4" }), " Export"]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [/* @__PURE__ */ jsxs("select", {
						"aria-label": "Update order status",
						value: "",
						disabled: processing,
						onChange: (event) => {
							if (event.target.value) onStatusChange(event.target.value);
						},
						className: "h-10 cursor-pointer appearance-none rounded-md bg-[#f0440b] py-0 pr-10 pl-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#d93a08] focus:ring-2 focus:ring-[#f0440b]/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60",
						children: [/* @__PURE__ */ jsx("option", {
							value: "",
							className: "bg-white text-[#171717]",
							children: "Update Order"
						}), [
							"cancelled",
							"ready_to_ship",
							"completed"
						].map((value) => /* @__PURE__ */ jsx("option", {
							value,
							disabled: !availableStatuses.includes(value),
							className: "bg-white text-[#171717] disabled:text-[#999]",
							children: label(value)
						}, value))]
					}), /* @__PURE__ */ jsx(ChevronDown, { className: "pointer-events-none absolute top-3 right-3 size-4 text-white" })]
				})
			]
		})]
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
				value: order.shipping_status
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
function BannerStatus({ title, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center justify-center border-b border-[#e4e4e4] px-4 py-5 lg:border-r lg:border-b-0",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-xs font-medium",
			children: title
		}), /* @__PURE__ */ jsx(StatusBadge, { value })]
	});
}
function StatusBadge({ value }) {
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
		"deny"
	].includes(value);
	return /* @__PURE__ */ jsxs("span", {
		className: `mt-3 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium capitalize ${positive ? "border-[#c8ebce] bg-[#edfaef] text-[#167329]" : negative ? "border-red-200 bg-red-50 text-red-700" : "border-amber-200 bg-amber-50 text-amber-700"}`,
		children: [/* @__PURE__ */ jsx("span", { className: `size-2 rounded-full ${positive ? "bg-[#2ba33d]" : negative ? "bg-red-500" : "bg-amber-500"}` }), label(value)]
	});
}
function Overview({ order, status, setStatus, saveStatus, processing, availableStatuses, activities }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid items-start gap-5 xl:grid-cols-[minmax(0,1.75fr)_minmax(320px,0.95fr)]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid gap-4",
			children: [
				/* @__PURE__ */ jsx(Panel, { children: /* @__PURE__ */ jsxs("div", {
					className: "grid lg:grid-cols-[1fr_1.15fr]",
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
						id: "update-status",
						className: "scroll-mt-5 p-5",
						children: [/* @__PURE__ */ jsx(PanelTitle, { children: "Update Status" }), /* @__PURE__ */ jsxs("div", {
							className: "mt-5 grid gap-3",
							children: [
								/* @__PURE__ */ jsx(StatusField, {
									label: "Payment Status",
									value: order.payment_status
								}),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "mb-1.5 block text-sm",
									children: "Order Status"
								}), availableStatuses.length ? /* @__PURE__ */ jsxs(Select, {
									value: status,
									onValueChange: setStatus,
									children: [/* @__PURE__ */ jsx(SelectTrigger, {
										className: "h-10 border-[#d8d8d8] bg-white",
										children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select next status" })
									}), /* @__PURE__ */ jsx(SelectContent, { children: availableStatuses.map((value) => /* @__PURE__ */ jsx(SelectItem, {
										value,
										children: label(value)
									}, value)) })]
								}) : /* @__PURE__ */ jsx("p", {
									className: "rounded-md border border-[#dedede] bg-[#fafafa] px-3 py-2.5 text-sm text-[#666]",
									children: "No status change available."
								})] }),
								/* @__PURE__ */ jsx(StatusField, {
									label: "Shipping Status",
									value: order.shipping_status
								}),
								availableStatuses.length > 0 && /* @__PURE__ */ jsxs(Button, {
									type: "button",
									onClick: saveStatus,
									disabled: processing || !status,
									className: "mt-1 w-fit bg-[#f0440b] px-6 text-white hover:bg-[#d93a08]",
									children: [/* @__PURE__ */ jsx(Save, { className: "size-4" }), " Save Changes"]
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
						/* @__PURE__ */ jsx("div", { className: "my-4 border-t border-[#e2e2e2]" }),
						/* @__PURE__ */ jsx(PanelTitle, { children: "Return & Refund Agreement" }),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 text-sm",
							children: order.no_return_refund_agreed ? "No Return & Refund" : "Agreement not recorded"
						})
					]
				}),
				/* @__PURE__ */ jsx(ActivityList, { activities: activities.slice(0, 5) })
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
		children: [
			/* @__PURE__ */ jsx(PanelTitle, { children: "Customer & Shipping Address" }),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-5 flex items-start gap-3",
				children: [/* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 size-5 shrink-0" }), /* @__PURE__ */ jsxs("div", {
					className: "text-sm leading-6",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "mb-3 text-xs text-[#555]",
							children: "Shipping Address"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "font-medium",
							children: address?.recipient_name ?? order.customer_name
						}),
						/* @__PURE__ */ jsx("p", { children: address?.full_address ?? "Address unavailable" }),
						/* @__PURE__ */ jsx("p", { children: [
							address?.city,
							address?.province,
							address?.postal_code
						].filter(Boolean).join(", ") }),
						/* @__PURE__ */ jsx("p", { children: order.customer_phone })
					]
				})]
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "mt-4 h-9 rounded-md border border-[#d8d8d8] bg-white px-5 text-xs font-medium hover:bg-[#f5f5f5]",
				children: "View Full Address"
			})
		]
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
		className: "overflow-x-auto",
		children: /* @__PURE__ */ jsxs("table", {
			className: "w-full min-w-[760px] text-sm",
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
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-5 lg:grid-cols-[1.2fr_0.8fr]",
		children: [/* @__PURE__ */ jsxs(Panel, {
			className: "p-5",
			children: [/* @__PURE__ */ jsx(PanelTitle, { children: "Payment Information" }), payment ? /* @__PURE__ */ jsxs("div", {
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
			}) : /* @__PURE__ */ jsx(Empty, { text: "Payment record unavailable." })]
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
function ShippingTab({ order }) {
	const shipment = order.shipment;
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-5 lg:grid-cols-[1.2fr_0.8fr]",
		children: [/* @__PURE__ */ jsxs(Panel, {
			className: "p-5",
			children: [/* @__PURE__ */ jsx(PanelTitle, { children: "Shipping Information" }), shipment ? /* @__PURE__ */ jsxs("div", {
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
			}) : /* @__PURE__ */ jsx(Empty, { text: "Shipment has not been created." })]
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
function ActivityList({ activities, expanded = false, embedded = false }) {
	const content = activities.length ? /* @__PURE__ */ jsx("div", {
		className: "grid gap-0",
		children: activities.map((item, index) => /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-[20px_minmax(0,1fr)_auto] gap-3 text-sm",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center",
					children: [/* @__PURE__ */ jsx("span", {
						className: "mt-0.5 flex size-4 items-center justify-center rounded-full bg-[#24953a] text-white",
						children: /* @__PURE__ */ jsx(Check, { className: "size-2.5" })
					}), index < activities.length - 1 && /* @__PURE__ */ jsx("span", { className: "h-7 w-px border-l border-dashed border-[#bdbdbd]" })]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "pb-4",
					children: item.title
				}),
				/* @__PURE__ */ jsx("time", {
					className: "pb-4 text-xs text-[#777]",
					children: date(item.time)
				})
			]
		}, item.id))
	}) : /* @__PURE__ */ jsx(Empty, { text: "No activity recorded." });
	if (embedded) return content;
	return /* @__PURE__ */ jsxs(Panel, {
		className: "p-5",
		children: [
			/* @__PURE__ */ jsxs(PanelTitle, { children: ["Order Activity ", expanded ? "" : "(Latest)"] }),
			/* @__PURE__ */ jsx("div", {
				className: "mt-5",
				children: content
			}),
			!expanded && /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "mt-1 h-9 rounded-md border border-[#d8d8d8] bg-white px-8 text-xs font-medium hover:bg-[#f5f5f5]",
				children: "View All Activity"
			})
		]
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
		children: [/* @__PURE__ */ jsx("span", { children: title }), /* @__PURE__ */ jsx("span", {
			className: `${danger ? "text-red-600" : ""} ${strong ? "font-mono text-lg" : ""}`,
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

//# sourceMappingURL=show-DlFUeOoY.js.map