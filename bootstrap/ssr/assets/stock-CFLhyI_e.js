import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CtTsjyTX.js";
import { t as PerPageSelect } from "./pagination-e7PNUKKI.js";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Ban, CheckCircle2, ChevronLeft, ChevronRight, History, Package, RotateCcw, Search, SlidersHorizontal, Sparkles, TrendingDown } from "lucide-react";
//#region resources/js/pages/admin/stock/index.tsx
var statusConfig = {
	active: {
		label: "Active",
		dot: "bg-emerald-400",
		text: "text-emerald-700",
		bg: "bg-emerald-50 border-emerald-100"
	},
	inactive: {
		label: "Inactive",
		dot: "bg-zinc-400",
		text: "text-zinc-600",
		bg: "bg-zinc-50 border-zinc-200"
	}
};
function StockIndex({ variants, filters, stats: totals }) {
	const [search, setSearch] = useState(filters.search ?? "");
	const applyFilter = (key, value) => router.get("/admin/stock", {
		...filters,
		[key]: value,
		page: 1
	}, {
		preserveState: true,
		replace: true
	});
	const resetFilters = () => router.get("/admin/stock", {}, { preserveState: false });
	const handleSearch = (e) => {
		e.preventDefault();
		applyFilter("search", search);
	};
	const stats = [
		{
			title: "Total Variants",
			val: totals.total,
			sub: "in inventory",
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
			title: "In Stock",
			val: totals.in_stock,
			sub: "healthy levels",
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
			title: "Low Stock",
			val: totals.low_stock,
			sub: "need restocking",
			icon: TrendingDown,
			iconBg: "bg-amber-50",
			iconColor: "text-amber-600",
			cardBg: "bg-white",
			subColor: "text-zinc-400",
			valColor: "text-amber-600",
			titleColor: "text-zinc-700",
			accent: "from-amber-400 to-orange-400",
			featured: false
		},
		{
			title: "Sold Out",
			val: totals.sold_out,
			sub: "unavailable",
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
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Head, { title: "Stock Monitor" }), /* @__PURE__ */ jsxs("div", {
		className: "mx-auto flex w-full flex-col gap-6 p-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-start justify-between gap-4 md:flex-row md:items-end",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("p", {
						className: "mb-1 text-[11px] font-bold tracking-widest text-[#151515]/50 uppercase",
						children: "Catalog Management"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "font-serif text-3xl leading-tight text-zinc-900",
						children: "Stock Monitor"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-zinc-400",
						children: "Monitor variant stock, reserved items, and perform manual adjustments."
					})
				] }), /* @__PURE__ */ jsx("div", {
					className: "flex shrink-0 items-center gap-2",
					children: /* @__PURE__ */ jsx(Link, {
						href: "/admin/stock/logs",
						children: /* @__PURE__ */ jsxs(Button, {
							size: "sm",
							variant: "outline",
							className: "h-9 gap-1.5 border-zinc-200 bg-white text-zinc-600 shadow-sm hover:bg-zinc-50",
							children: [/* @__PURE__ */ jsx(History, { className: "h-3.5 w-3.5" }), " Stock Logs"]
						})
					})
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4",
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
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsx("div", {
									className: "flex h-8 w-8 items-center justify-center rounded-xl " + m.iconBg,
									children: /* @__PURE__ */ jsx(m.icon, { className: "h-4 w-4 " + m.iconColor })
								}), m.featured && /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5 text-white/30" })]
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
									placeholder: "Search SKU or product...",
									className: "h-9 rounded-lg border-zinc-200 bg-white pl-9 text-sm shadow-sm"
								})]
							}),
							/* @__PURE__ */ jsxs(FilterSelect, {
								label: "Stock Status",
								value: filters.availability || "all",
								onChange: (v) => applyFilter("availability", v === "all" ? "" : v),
								children: [
									/* @__PURE__ */ jsx(SelectItem, {
										value: "all",
										children: "All Stock"
									}),
									/* @__PURE__ */ jsx(SelectItem, {
										value: "in_stock",
										children: "In Stock"
									}),
									/* @__PURE__ */ jsx(SelectItem, {
										value: "low_stock",
										children: "Low Stock"
									}),
									/* @__PURE__ */ jsx(SelectItem, {
										value: "sold_out",
										children: "Sold Out"
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
										className: "w-14 px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "No"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Variant / SKU"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Color / Size"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Stock"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Reserved"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Available"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Status"
									}),
									/* @__PURE__ */ jsx("th", { className: "w-10 px-4 py-3" })
								]
							}) }), /* @__PURE__ */ jsxs("tbody", {
								className: "divide-y divide-zinc-50",
								children: [variants.data.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
									colSpan: 8,
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col items-center justify-center gap-3 py-20",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100",
												children: /* @__PURE__ */ jsx(Package, { className: "h-5 w-5 text-zinc-400" })
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-sm text-zinc-400",
												children: "No variants found. Try adjusting your filters."
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
								}) }), variants.data.map((v, index) => {
									const sc = statusConfig[v.is_active ? "active" : "inactive"];
									const isLowStock = v.available_stock > 0 && v.available_stock <= 5;
									const isOutOfStock = v.available_stock === 0;
									return /* @__PURE__ */ jsxs("tr", {
										className: "transition-colors hover:bg-zinc-50/70",
										children: [
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5 text-xs font-medium text-zinc-400",
												children: (variants.from ?? 1) + index
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ jsxs(Link, {
													href: v.product_id ? `/admin/products/${v.product_id}` : "#",
													className: "flex flex-col rounded-md transition-colors hover:text-[#151515] focus-visible:ring-2 focus-visible:ring-[#151515]/30 focus-visible:outline-none",
													"aria-disabled": !v.product_id,
													children: [/* @__PURE__ */ jsx("span", {
														className: "font-semibold text-zinc-900",
														children: v.sku
													}), /* @__PURE__ */ jsx("span", {
														className: "text-xs text-zinc-400",
														children: v.product ?? "-"
													})]
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ jsxs("span", {
													className: "text-sm text-zinc-600",
													children: [
														v.color_name ?? "-",
														" /",
														" ",
														v.size ?? "-"
													]
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5 text-zinc-600",
												children: v.stock
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5 text-zinc-600",
												children: v.reserved_stock
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-1.5",
													children: [
														/* @__PURE__ */ jsx("span", {
															className: "text-sm font-semibold " + (isOutOfStock ? "text-red-500" : isLowStock ? "text-amber-600" : "text-zinc-800"),
															children: v.available_stock
														}),
														isOutOfStock && /* @__PURE__ */ jsx("span", {
															className: "text-[10px] font-medium text-red-400",
															children: "Sold Out"
														}),
														isLowStock && /* @__PURE__ */ jsx("span", {
															className: "text-[10px] font-medium text-amber-500",
															children: "Low"
														})
													]
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ jsxs("span", {
													className: "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold " + sc.text + " " + sc.bg,
													children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full " + sc.dot }), sc.label]
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ jsx(Button, {
													asChild: true,
													variant: "ghost",
													size: "icon",
													className: "h-8 w-8 rounded-lg text-zinc-400 hover:bg-[#fdfaf8] hover:text-[#151515]",
													children: /* @__PURE__ */ jsx(Link, {
														href: "/admin/product-variants/" + v.id + "/stock-adjustment",
														title: "Adjust Stock",
														children: /* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-4 w-4" })
													})
												})
											})
										]
									}, v.id);
								})]
							})]
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between border-t border-zinc-100 bg-zinc-50/40 px-5 py-3.5",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs text-zinc-400",
							children: variants.from && variants.to ? "Showing " + variants.from + "-" + variants.to + " of " + variants.total + " variants" : "No variants"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-1",
							children: [variants.links.map((link, i) => {
								const isChevronLeft = link.label.includes("Previous") || link.label.includes("&laquo;");
								const isChevronRight = link.label.includes("Next") || link.label.includes("&raquo;");
								const label = isChevronLeft ? /* @__PURE__ */ jsx(ChevronLeft, { className: "h-3.5 w-3.5" }) : isChevronRight ? /* @__PURE__ */ jsx(ChevronRight, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: link.label } });
								return /* @__PURE__ */ jsx("button", {
									disabled: !link.url,
									onClick: () => link.url && router.get(link.url),
									className: ["h-8 min-w-8 rounded-lg px-2.5 text-xs font-medium transition-colors", link.active ? "bg-primary text-white shadow-sm" : !link.url ? "cursor-not-allowed text-zinc-300" : "text-zinc-500 hover:bg-zinc-100"].join(" "),
									children: label
								}, i);
							}), /* @__PURE__ */ jsx(PerPageSelect, { paginator: variants })]
						})]
					})
				]
			})
		]
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
export { StockIndex as default };

//# sourceMappingURL=stock-CFLhyI_e.js.map