import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { i as DropdownMenuItem, n as DropdownMenuContent, s as DropdownMenuTrigger, t as DropdownMenu } from "./dropdown-menu-DttT2oSg.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CtTsjyTX.js";
import { t as PerPageSelect } from "./pagination-e7PNUKKI.js";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ArrowDown, ArrowUp, ArrowUpDown, Ban, CheckCircle2, ChevronLeft, ChevronRight, Clock, Download, Eye, MoreVertical, Package, RotateCcw, Search, ShoppingBag, Truck } from "lucide-react";
//#region resources/js/pages/admin/orders/index.tsx
var fmt = (v) => new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
	minimumFractionDigits: 0
}).format(Number(v)).replace("Rp", "Rp ");
var getStatusConfig = (status) => {
	const s = status.toLowerCase();
	if ([
		"paid",
		"completed",
		"settlement",
		"capture",
		"accept",
		"delivered"
	].includes(s)) return {
		label: status.replace(/_/g, " "),
		dot: "bg-emerald-400",
		text: "text-emerald-700",
		bg: "bg-emerald-50 border-emerald-100"
	};
	if ([
		"pending",
		"processing",
		"ready_to_ship"
	].includes(s)) return {
		label: status.replace(/_/g, " "),
		dot: "bg-amber-400",
		text: "text-amber-700",
		bg: "bg-amber-50 border-amber-100"
	};
	if (["shipped", "shipping"].includes(s)) return {
		label: status.replace(/_/g, " "),
		dot: "bg-blue-400",
		text: "text-blue-700",
		bg: "bg-blue-50 border-blue-100"
	};
	if ([
		"cancelled",
		"failed",
		"expired",
		"deny"
	].includes(s)) return {
		label: status.replace(/_/g, " "),
		dot: "bg-rose-400",
		text: "text-rose-700",
		bg: "bg-rose-50 border-rose-100"
	};
	return {
		label: status.replace(/_/g, " "),
		dot: "bg-zinc-400",
		text: "text-zinc-600",
		bg: "bg-zinc-50 border-zinc-200"
	};
};
function OrdersIndex({ orders, filters, options, stats: totals }) {
	const [search, setSearch] = useState(filters.search ?? "");
	const applyFilter = (key, value) => router.get("/admin/orders", {
		...filters,
		[key]: value,
		page: 1
	}, {
		preserveState: true,
		replace: true
	});
	const applySort = (key) => {
		const nextDirection = filters.sort === key && filters.direction === "asc" ? "desc" : "asc";
		router.get("/admin/orders", {
			...filters,
			sort: key,
			direction: nextDirection,
			page: 1
		}, {
			preserveState: true,
			replace: true
		});
	};
	const resetFilters = () => router.get("/admin/orders", {}, { preserveState: false });
	const handleSearch = (e) => {
		e.preventDefault();
		applyFilter("search", search);
	};
	const stats = [
		{
			title: "Total Orders",
			val: totals.total,
			sub: "all time",
			icon: Package,
			iconBg: "bg-white/20",
			iconColor: "text-white",
			cardBg: "bg-gradient-to-br from-[#151515] to-[#9A6B45]",
			subColor: "text-white/60",
			valColor: "text-white",
			titleColor: "text-white/80",
			accent: "",
			featured: true
		},
		{
			title: "New Orders",
			val: totals.new_orders,
			sub: "needs attention",
			icon: Clock,
			iconBg: "bg-amber-100",
			iconColor: "text-amber-600",
			cardBg: "bg-white",
			subColor: "text-zinc-400",
			valColor: "text-amber-600",
			titleColor: "text-zinc-700",
			accent: "from-amber-400 to-amber-600",
			featured: false
		},
		{
			title: "Processing",
			val: totals.processing,
			sub: "being prepared",
			icon: Package,
			iconBg: "bg-blue-100",
			iconColor: "text-blue-500",
			cardBg: "bg-white",
			subColor: "text-zinc-400",
			valColor: "text-blue-500",
			titleColor: "text-zinc-700",
			accent: "",
			featured: false
		},
		{
			title: "Shipped",
			val: totals.shipped,
			sub: "on the way",
			icon: Truck,
			iconBg: "bg-purple-100",
			iconColor: "text-purple-500",
			cardBg: "bg-white",
			subColor: "text-zinc-400",
			valColor: "text-purple-500",
			titleColor: "text-zinc-700",
			accent: "",
			featured: false
		},
		{
			title: "Completed",
			val: totals.completed,
			sub: "delivered",
			icon: CheckCircle2,
			iconBg: "bg-emerald-100",
			iconColor: "text-emerald-600",
			cardBg: "bg-white",
			subColor: "text-zinc-400",
			valColor: "text-emerald-600",
			titleColor: "text-zinc-700",
			accent: "from-emerald-400 to-emerald-600",
			featured: false
		},
		{
			title: "Cancelled",
			val: totals.cancelled,
			sub: "failed/refunded",
			icon: Ban,
			iconBg: "bg-red-50",
			iconColor: "text-red-500",
			cardBg: "bg-white",
			subColor: "text-zinc-400",
			valColor: "text-red-500",
			titleColor: "text-zinc-700",
			accent: "from-red-400 to-rose-500",
			featured: false
		}
	];
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Head, { title: "Orders" }), /* @__PURE__ */ jsxs("div", {
		className: "mx-auto flex max-w-7xl flex-col gap-6 p-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-start justify-between gap-4 md:flex-row md:items-end",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("p", {
						className: "mb-1 text-[11px] font-bold tracking-widest text-[#151515]/50 uppercase",
						children: "Sales Management"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "font-serif text-3xl leading-tight text-zinc-900",
						children: "Orders"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-zinc-400",
						children: "Pantau pesanan customer, status pembayaran, order flow, pengiriman, dan voucher."
					})
				] }), /* @__PURE__ */ jsx("div", {
					className: "flex shrink-0 items-center gap-2",
					children: /* @__PURE__ */ jsxs(Button, {
						variant: "outline",
						size: "sm",
						className: "h-9 gap-1.5 border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50",
						children: [/* @__PURE__ */ jsx(Download, { className: "h-3.5 w-3.5" }), " Export"]
					})
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6",
				children: stats.map((m, i) => /* @__PURE__ */ jsxs("div", {
					className: [
						"relative overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-0.5",
						m.featured ? "border-transparent shadow-lg shadow-[#151515]/20" : "border-zinc-100 shadow-sm hover:shadow-md",
						m.cardBg
					].join(" "),
					children: [
						!m.featured && m.accent && /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r " + m.accent }),
						m.featured && /* @__PURE__ */ jsx("div", { className: "absolute -top-5 -right-5 h-20 w-20 rounded-full bg-white/10" }),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-3 p-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex items-center justify-between",
								children: /* @__PURE__ */ jsx("div", {
									className: "flex h-8 w-8 items-center justify-center rounded-xl " + m.iconBg,
									children: /* @__PURE__ */ jsx(m.icon, { className: "h-4 w-4 " + m.iconColor })
								})
							}), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("div", {
									className: "text-2xl leading-none font-bold tracking-tight " + m.valColor,
									children: m.val
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-1.5 text-[11px] font-semibold " + m.titleColor,
									children: m.title
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-0.5 text-[10px] " + m.subColor,
									children: m.sub
								})
							] })]
						})
					]
				}, i))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm",
				children: [
					/* @__PURE__ */ jsxs("form", {
						onSubmit: handleSearch,
						className: "flex flex-wrap items-end gap-3 border-b border-zinc-100 bg-zinc-50/40 px-5 py-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "relative min-w-[200px] flex-1",
								children: [/* @__PURE__ */ jsx(Search, { className: "absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" }), /* @__PURE__ */ jsx(Input, {
									value: search,
									onChange: (e) => setSearch(e.target.value),
									placeholder: "Search order/customer...",
									className: "h-9 rounded-lg border-zinc-200 bg-white pl-9 text-sm shadow-sm"
								})]
							}),
							/* @__PURE__ */ jsxs(FilterSelect, {
								label: "Payment",
								value: filters.payment_status || "all",
								onChange: (v) => applyFilter("payment_status", v === "all" ? "" : v),
								children: [/* @__PURE__ */ jsx(SelectItem, {
									value: "all",
									children: "All Payment Status"
								}), options.paymentStatuses.map((s) => /* @__PURE__ */ jsx(SelectItem, {
									value: s,
									className: "capitalize",
									children: s.replace(/_/g, " ")
								}, s))]
							}),
							/* @__PURE__ */ jsxs(FilterSelect, {
								label: "Order",
								value: filters.order_status || "all",
								onChange: (v) => applyFilter("order_status", v === "all" ? "" : v),
								children: [/* @__PURE__ */ jsx(SelectItem, {
									value: "all",
									children: "All Order Status"
								}), options.orderStatuses.map((s) => /* @__PURE__ */ jsx(SelectItem, {
									value: s,
									className: "capitalize",
									children: s.replace(/_/g, " ")
								}, s))]
							}),
							/* @__PURE__ */ jsxs(FilterSelect, {
								label: "Shipping",
								value: filters.shipping_status || "all",
								onChange: (v) => applyFilter("shipping_status", v === "all" ? "" : v),
								children: [/* @__PURE__ */ jsx(SelectItem, {
									value: "all",
									children: "All Shipping Status"
								}), options.shippingStatuses.map((s) => /* @__PURE__ */ jsx(SelectItem, {
									value: s,
									className: "capitalize",
									children: s.replace(/_/g, " ")
								}, s))]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ jsx("span", {
									className: "px-0.5 text-[10px] font-semibold tracking-wider text-zinc-400 uppercase",
									children: "Dates"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ jsxs("label", {
										className: "flex flex-col gap-1",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-[10px] font-medium text-zinc-400",
											children: "From"
										}), /* @__PURE__ */ jsx(Input, {
											type: "date",
											value: filters.date_from || "",
											onChange: (e) => applyFilter("date_from", e.target.value),
											className: "h-10 min-w-[160px] cursor-pointer rounded-lg border-zinc-200 bg-white text-sm shadow-sm"
										})]
									}), /* @__PURE__ */ jsxs("label", {
										className: "flex flex-col gap-1",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-[10px] font-medium text-zinc-400",
											children: "To"
										}), /* @__PURE__ */ jsx(Input, {
											type: "date",
											value: filters.date_to || "",
											onChange: (e) => applyFilter("date_to", e.target.value),
											className: "h-10 min-w-[160px] cursor-pointer rounded-lg border-zinc-200 bg-white text-sm shadow-sm"
										})]
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "ml-auto flex gap-2",
								children: [/* @__PURE__ */ jsxs(Button, {
									type: "submit",
									size: "sm",
									className: "h-9 gap-1.5 bg-primary text-white hover:bg-primary/90",
									children: [/* @__PURE__ */ jsx(Search, { className: "h-3.5 w-3.5" }), " Search"]
								}), /* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									className: "h-9 gap-1.5 text-zinc-500 hover:text-zinc-700",
									onClick: resetFilters,
									children: [/* @__PURE__ */ jsx(RotateCcw, { className: "h-3.5 w-3.5" }), " Reset"]
								})]
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ jsxs("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
								className: "border-b border-zinc-100 bg-zinc-50/60",
								children: [
									/* @__PURE__ */ jsx("th", {
										className: "w-14 px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "No"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Order"
									}),
									/* @__PURE__ */ jsx(SortableTh, {
										label: "Customer",
										sortKey: "customer",
										activeSort: filters.sort,
										direction: filters.direction,
										onSort: applySort
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Total"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Payment"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Order Status"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Shipping"
									}),
									/* @__PURE__ */ jsx(SortableTh, {
										label: "Date",
										sortKey: "date",
										activeSort: filters.sort,
										direction: filters.direction,
										onSort: applySort
									}),
									/* @__PURE__ */ jsx("th", { className: "w-10 px-4 py-3" })
								]
							}) }), /* @__PURE__ */ jsxs("tbody", {
								className: "divide-y divide-zinc-50",
								children: [orders.data.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
									colSpan: 9,
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col items-center justify-center gap-3 py-20",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100",
												children: /* @__PURE__ */ jsx(ShoppingBag, { className: "h-5 w-5 text-zinc-400" })
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-sm text-zinc-400",
												children: "No orders found. Try adjusting your filters."
											}),
											/* @__PURE__ */ jsxs(Button, {
												size: "sm",
												variant: "outline",
												className: "h-8 text-xs",
												onClick: resetFilters,
												children: [
													/* @__PURE__ */ jsx(RotateCcw, { className: "mr-1 h-3 w-3" }),
													" ",
													"Clear Filters"
												]
											})
										]
									})
								}) }), orders.data.map((o, index) => {
									const payConfig = getStatusConfig(o.payment_status);
									const ordConfig = getStatusConfig(o.order_status);
									const shipConfig = getStatusConfig(o.shipping_status);
									return /* @__PURE__ */ jsxs("tr", {
										className: "transition-colors hover:bg-zinc-50/70",
										children: [
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5 text-xs font-medium text-zinc-400",
												children: (orders.from ?? 1) + index
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ jsx(Link, {
													href: "/admin/orders/" + o.id,
													className: "font-medium text-zinc-900 transition-colors hover:text-[#151515]",
													children: o.order_number
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ jsxs("div", {
													className: "flex flex-col",
													children: [/* @__PURE__ */ jsx("span", {
														className: "font-medium text-zinc-900",
														children: o.customer_name
													}), /* @__PURE__ */ jsx("span", {
														className: "text-xs text-zinc-500",
														children: o.customer_email
													})]
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5 font-semibold text-zinc-900",
												children: fmt(o.grand_total)
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ jsxs("span", {
													className: "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize " + payConfig.text + " " + payConfig.bg,
													children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full " + payConfig.dot }), payConfig.label]
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ jsxs("span", {
													className: "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize " + ordConfig.text + " " + ordConfig.bg,
													children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full " + ordConfig.dot }), ordConfig.label]
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ jsxs("div", {
													className: "flex flex-col gap-1",
													children: [/* @__PURE__ */ jsxs("span", {
														className: "inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize " + shipConfig.text + " " + shipConfig.bg,
														children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full " + shipConfig.dot }), shipConfig.label]
													}), (o.waybill_id || o.courier) && /* @__PURE__ */ jsxs("span", {
														className: "text-xs text-zinc-500",
														children: [
															o.courier ? o.courier.toUpperCase() : "",
															" ",
															o.waybill_id
														]
													})]
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ jsx("span", {
													className: "text-xs whitespace-nowrap text-zinc-500",
													children: o.created_at ? new Date(o.created_at).toLocaleDateString("id-ID", {
														day: "2-digit",
														month: "short",
														year: "numeric"
													}) : "-"
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5 text-right",
												children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
													asChild: true,
													children: /* @__PURE__ */ jsx(Button, {
														variant: "ghost",
														size: "icon",
														className: "h-8 w-8 rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600",
														children: /* @__PURE__ */ jsx(MoreVertical, { className: "h-4 w-4" })
													})
												}), /* @__PURE__ */ jsx(DropdownMenuContent, {
													align: "end",
													className: "w-48",
													children: /* @__PURE__ */ jsx(DropdownMenuItem, {
														asChild: true,
														children: /* @__PURE__ */ jsxs(Link, {
															href: "/admin/orders/" + o.id,
															className: "flex w-full items-center gap-2",
															children: [
																/* @__PURE__ */ jsx(Eye, { className: "h-3.5 w-3.5" }),
																" ",
																"View Details"
															]
														})
													})
												})] })
											})
										]
									}, o.id);
								})]
							})]
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between border-t border-zinc-100 bg-zinc-50/40 px-5 py-3.5",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs text-zinc-400",
							children: orders.from && orders.to ? "Showing " + orders.from + "-" + orders.to + " of " + orders.total + " orders" : "No orders"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-1",
							children: [orders.links.map((link, i) => {
								const isChevronLeft = link.label.includes("Previous") || link.label.includes("&laquo;");
								const isChevronRight = link.label.includes("Next") || link.label.includes("&raquo;");
								const label = isChevronLeft ? /* @__PURE__ */ jsx(ChevronLeft, { className: "h-3.5 w-3.5" }) : isChevronRight ? /* @__PURE__ */ jsx(ChevronRight, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: link.label } });
								return /* @__PURE__ */ jsx("button", {
									disabled: !link.url,
									onClick: () => link.url && router.get(link.url),
									className: ["h-8 min-w-8 rounded-lg px-2.5 text-xs font-medium transition-colors", link.active ? "bg-primary text-white shadow-sm" : !link.url ? "cursor-not-allowed text-zinc-300" : "text-zinc-500 hover:bg-zinc-100"].join(" "),
									children: label
								}, i);
							}), /* @__PURE__ */ jsx(PerPageSelect, { paginator: orders })]
						})]
					})
				]
			})
		]
	})] });
}
function SortableTh({ label, sortKey, activeSort, direction, onSort }) {
	const active = activeSort === sortKey;
	const Icon = active ? direction === "asc" ? ArrowUp : ArrowDown : ArrowUpDown;
	return /* @__PURE__ */ jsx("th", {
		className: "px-4 py-3 text-left",
		children: /* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: () => onSort(sortKey),
			className: ["inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase transition-colors", active ? "text-zinc-800" : "text-zinc-400 hover:text-zinc-700"].join(" "),
			children: [label, /* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5" })]
		})
	});
}
function FilterSelect({ label, value, onChange, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ jsx("span", {
			className: "px-0.5 text-[10px] font-semibold tracking-wider text-zinc-400 uppercase",
			children: label
		}), /* @__PURE__ */ jsxs(Select, {
			value,
			onValueChange: onChange,
			children: [/* @__PURE__ */ jsx(SelectTrigger, {
				className: "h-9 w-[150px] rounded-lg border-zinc-200 bg-white text-xs shadow-sm",
				children: /* @__PURE__ */ jsx(SelectValue, {})
			}), /* @__PURE__ */ jsx(SelectContent, { children })]
		})]
	});
}
//#endregion
export { OrdersIndex as default };

//# sourceMappingURL=orders-wcC18ddp.js.map