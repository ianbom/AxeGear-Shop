import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CtTsjyTX.js";
import { t as PerPageSelect } from "./pagination-e7PNUKKI.js";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ArrowDownRight, ArrowUpRight, Ban, ChevronLeft, ChevronRight, History, RefreshCw, RotateCcw, Search, ShoppingCart } from "lucide-react";
//#region resources/js/pages/admin/stock/logs.tsx
var typeConfig = {
	in: {
		label: "Stock In",
		icon: ArrowDownRight,
		cls: "text-emerald-700",
		bg: "bg-emerald-50 border-emerald-100"
	},
	out: {
		label: "Stock Out",
		icon: ArrowUpRight,
		cls: "text-rose-700",
		bg: "bg-rose-50 border-rose-100"
	},
	adjustment: {
		label: "Adjustment",
		icon: RefreshCw,
		cls: "text-amber-700",
		bg: "bg-amber-50 border-amber-100"
	},
	order: {
		label: "Order",
		icon: ShoppingCart,
		cls: "text-blue-700",
		bg: "bg-blue-50 border-blue-100"
	},
	cancellation: {
		label: "Cancellation",
		icon: Ban,
		cls: "text-purple-700",
		bg: "bg-purple-50 border-purple-100"
	}
};
function StockLogs({ logs, filters }) {
	const [search, setSearch] = useState(filters.search ?? "");
	const applyFilter = (key, value) => router.get("/admin/stock/logs", {
		...filters,
		[key]: value,
		page: 1
	}, {
		preserveState: true,
		replace: true
	});
	const resetFilters = () => router.get("/admin/stock/logs", {}, { preserveState: false });
	const handleSearch = (e) => {
		e.preventDefault();
		applyFilter("search", search);
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Head, { title: "Stock Logs" }), /* @__PURE__ */ jsxs("div", {
		className: "mx-auto flex w-full flex-col gap-6 p-6",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex flex-col items-start justify-between gap-4 md:flex-row md:items-end",
			children: /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "mb-1 text-[11px] font-bold tracking-widest text-[#151515]/50 uppercase",
					children: "Catalog Management"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "font-serif text-3xl leading-tight text-zinc-900",
					children: "Stock Logs"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-zinc-400",
					children: "Audit stock changes, including before/after values, references, and notes."
				})
			] })
		}), /* @__PURE__ */ jsxs("div", {
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
								placeholder: "Search variant SKU...",
								className: "h-9 rounded-lg border-zinc-200 bg-white pl-9 text-sm shadow-sm"
							})]
						}),
						/* @__PURE__ */ jsxs(FilterSelect, {
							label: "Movement Type",
							value: filters.type || "all",
							onChange: (v) => applyFilter("type", v === "all" ? "" : v),
							children: [
								/* @__PURE__ */ jsx(SelectItem, {
									value: "all",
									children: "All Types"
								}),
								/* @__PURE__ */ jsx(SelectItem, {
									value: "in",
									children: "In"
								}),
								/* @__PURE__ */ jsx(SelectItem, {
									value: "out",
									children: "Out"
								}),
								/* @__PURE__ */ jsx(SelectItem, {
									value: "adjustment",
									children: "Adjustment"
								}),
								/* @__PURE__ */ jsx(SelectItem, {
									value: "order",
									children: "Order"
								}),
								/* @__PURE__ */ jsx(SelectItem, {
									value: "cancellation",
									children: "Cancellation"
								})
							]
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
									className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
									children: "Variant / SKU"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
									children: "Type"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-center text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
									children: "Quantity"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-center text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
									children: "Before"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-center text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
									children: "After"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
									children: "Reference / Admin"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
									children: "Date"
								})
							]
						}) }), /* @__PURE__ */ jsxs("tbody", {
							className: "divide-y divide-zinc-50",
							children: [logs.data.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
								colSpan: 7,
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col items-center justify-center gap-3 py-20",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100",
											children: /* @__PURE__ */ jsx(History, { className: "h-5 w-5 text-zinc-400" })
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm text-zinc-400",
											children: "No stock logs found. Try adjusting your filters."
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
							}) }), logs.data.map((log) => {
								const tc = typeConfig[log.type] ?? {
									label: log.type,
									icon: History,
									cls: "text-zinc-700",
									bg: "bg-zinc-50 border-zinc-200"
								};
								const TypeIcon = tc.icon;
								const isPositive = log.quantity > 0;
								return /* @__PURE__ */ jsxs("tr", {
									className: "transition-colors hover:bg-zinc-50/70",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3.5",
											children: /* @__PURE__ */ jsxs(Link, {
												href: log.product_id ? `/admin/products/${log.product_id}` : "#",
												className: "flex flex-col rounded-md transition-colors hover:text-[#151515] focus-visible:ring-2 focus-visible:ring-[#151515]/30 focus-visible:outline-none",
												"aria-disabled": !log.product_id,
												children: [/* @__PURE__ */ jsx("span", {
													className: "font-semibold text-zinc-900",
													children: log.variant ?? "-"
												}), /* @__PURE__ */ jsx("span", {
													className: "text-xs text-zinc-400",
													children: log.product ?? "-"
												})]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3.5",
											children: /* @__PURE__ */ jsxs("span", {
												className: "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold " + tc.cls + " " + tc.bg,
												children: [/* @__PURE__ */ jsx(TypeIcon, { className: "h-3.5 w-3.5" }), tc.label]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3.5 text-center",
											children: /* @__PURE__ */ jsxs("span", {
												className: "font-semibold " + (isPositive ? "text-emerald-600" : log.quantity < 0 ? "text-red-500" : "text-zinc-600"),
												children: [isPositive ? "+" : "", log.quantity]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3.5 text-center font-medium text-zinc-500",
											children: log.stock_before
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3.5 text-center font-bold text-zinc-900",
											children: log.stock_after
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3.5",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex flex-col",
												children: [
													/* @__PURE__ */ jsx("span", {
														className: "text-sm text-zinc-700",
														children: log.reference
													}),
													log.admin && /* @__PURE__ */ jsxs("span", {
														className: "text-xs text-zinc-400",
														children: ["by ", log.admin]
													}),
													log.note && /* @__PURE__ */ jsx("span", {
														className: "mt-0.5 max-w-[200px] truncate text-xs text-zinc-400",
														title: log.note,
														children: log.note
													})
												]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3.5",
											children: /* @__PURE__ */ jsx("span", {
												className: "text-xs whitespace-nowrap text-zinc-400",
												children: log.created_at ? new Date(log.created_at).toLocaleString("id-ID", {
													day: "2-digit",
													month: "short",
													year: "numeric",
													hour: "2-digit",
													minute: "2-digit"
												}) : "-"
											})
										})
									]
								}, log.id);
							})]
						})]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between border-t border-zinc-100 bg-zinc-50/40 px-5 py-3.5",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-xs text-zinc-400",
						children: logs.from && logs.to ? "Showing " + logs.from + "-" + logs.to + " of " + logs.total + " logs" : "No logs"
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1",
						children: [logs.links.map((link, i) => {
							const isChevronLeft = link.label.includes("Previous") || link.label.includes("&laquo;");
							const isChevronRight = link.label.includes("Next") || link.label.includes("&raquo;");
							const label = isChevronLeft ? /* @__PURE__ */ jsx(ChevronLeft, { className: "h-3.5 w-3.5" }) : isChevronRight ? /* @__PURE__ */ jsx(ChevronRight, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: link.label } });
							return /* @__PURE__ */ jsx("button", {
								disabled: !link.url,
								onClick: () => link.url && router.get(link.url),
								className: ["h-8 min-w-8 rounded-lg px-2.5 text-xs font-medium transition-colors", link.active ? "bg-primary text-white shadow-sm" : !link.url ? "cursor-not-allowed text-zinc-300" : "text-zinc-500 hover:bg-zinc-100"].join(" "),
								children: label
							}, i);
						}), /* @__PURE__ */ jsx(PerPageSelect, { paginator: logs })]
					})]
				})
			]
		})]
	})] });
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
				className: "h-9 w-[130px] rounded-lg border-zinc-200 bg-white text-xs shadow-sm",
				children: /* @__PURE__ */ jsx(SelectValue, {})
			}), /* @__PURE__ */ jsx(SelectContent, { children })]
		})]
	});
}
//#endregion
export { StockLogs as default };

//# sourceMappingURL=logs-H-Fa7wJL.js.map