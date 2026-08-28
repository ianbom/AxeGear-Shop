import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { i as DropdownMenuItem, n as DropdownMenuContent, s as DropdownMenuTrigger, t as DropdownMenu } from "./dropdown-menu-DttT2oSg.js";
import { t as Badge } from "./badge-CJFf2u6W.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CtTsjyTX.js";
import { t as PerPageSelect } from "./pagination-e7PNUKKI.js";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Archive, ArrowDown, ArrowUp, ArrowUpDown, Ban, ChevronLeft, ChevronRight, Download, Eye, FileText, MoreVertical, Package, Pencil, Plus, RotateCcw, Search, ShoppingBag, Sparkles, Star, Trash2, TrendingDown } from "lucide-react";
//#region resources/js/pages/admin/products/index.tsx
var fmt = (v) => new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
	minimumFractionDigits: 0
}).format(v).replace("Rp", "Rp ");
var visibilityFor = (p) => {
	if (p.is_featured) return {
		label: "Featured",
		cls: "text-amber-700 border-amber-200 bg-amber-50"
	};
	if (p.is_new_arrival) return {
		label: "New Arrival",
		cls: "text-blue-700 border-blue-200 bg-blue-50"
	};
	if (p.is_best_seller) return {
		label: "Best Seller",
		cls: "text-purple-700 border-purple-200 bg-purple-50"
	};
	return {
		label: "Standard",
		cls: "text-zinc-500 border-zinc-200 bg-zinc-50"
	};
};
var statusConfig = {
	published: {
		label: "Published",
		dot: "bg-emerald-400",
		text: "text-emerald-700",
		bg: "bg-emerald-50 border-emerald-100"
	},
	draft: {
		label: "Draft",
		dot: "bg-zinc-400",
		text: "text-zinc-600",
		bg: "bg-zinc-50 border-zinc-200"
	},
	archived: {
		label: "Archived",
		dot: "bg-zinc-300",
		text: "text-zinc-500",
		bg: "bg-zinc-50 border-zinc-200"
	}
};
function ProductsIndex({ products, filters, options, stats: totals }) {
	const [search, setSearch] = useState(filters.search ?? "");
	const applyFilter = (key, value) => router.get("/admin/products", {
		...filters,
		[key]: value,
		page: 1
	}, {
		preserveState: true,
		replace: true
	});
	const applySort = (key) => {
		const nextDirection = filters.sort === key && filters.direction === "asc" ? "desc" : "asc";
		router.get("/admin/products", {
			...filters,
			sort: key,
			direction: nextDirection,
			page: 1
		}, {
			preserveState: true,
			replace: true
		});
	};
	const resetFilters = () => router.get("/admin/products", {}, { preserveState: false });
	const handleSearch = (e) => {
		e.preventDefault();
		applyFilter("search", search);
	};
	const doAction = (url, method = "post") => router[method](url, {}, { preserveScroll: true });
	const stats = [
		{
			title: "Total Products",
			val: totals.total,
			sub: "in catalog",
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
			title: "Published",
			val: totals.published,
			sub: "live on store",
			icon: Eye,
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
			title: "Draft",
			val: totals.draft,
			sub: "unpublished",
			icon: FileText,
			iconBg: "bg-zinc-100",
			iconColor: "text-zinc-500",
			cardBg: "bg-white",
			subColor: "text-zinc-400",
			valColor: "text-zinc-800",
			titleColor: "text-zinc-700",
			accent: "",
			featured: false
		},
		{
			title: "Archived",
			val: totals.archived,
			sub: "hidden from store",
			icon: Archive,
			iconBg: "bg-zinc-100",
			iconColor: "text-zinc-400",
			cardBg: "bg-white",
			subColor: "text-zinc-400",
			valColor: "text-zinc-500",
			titleColor: "text-zinc-600",
			accent: "",
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
			title: "Out of Stock",
			val: totals.out_of_stock,
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
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Head, { title: "Products" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-start justify-between gap-4 md:flex-row md:items-end",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "mb-1 text-[11px] font-bold tracking-widest text-[#151515]/50 uppercase",
							children: "Catalog Management"
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "font-serif text-3xl leading-tight text-zinc-900",
							children: "Products"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm text-zinc-400",
							children: "Manage your modest fashion catalog, inventory, pricing & visibility."
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex w-full flex-wrap items-center gap-2 md:w-auto md:shrink-0",
					children: /* @__PURE__ */ jsx(Link, {
						href: "/admin/products/create",
						className: "w-full md:w-auto",
						children: /* @__PURE__ */ jsxs(Button, {
							size: "sm",
							className: "h-9 w-full gap-1.5 bg-primary text-white shadow-sm hover:bg-primary/90 md:w-auto",
							children: [/* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" }), " Add Product"]
						})
					})
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-6",
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
						className: "grid gap-3 border-b border-zinc-100 bg-zinc-50/40 px-4 py-4 sm:px-5 md:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_repeat(5,max-content)_auto] xl:items-end",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "relative min-w-0 md:col-span-2 xl:col-span-1",
								children: [/* @__PURE__ */ jsx(Search, { className: "absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" }), /* @__PURE__ */ jsx(Input, {
									value: search,
									onChange: (e) => setSearch(e.target.value),
									placeholder: "Search name, SKU...",
									className: "h-9 rounded-lg border-zinc-200 bg-white pl-9 text-sm shadow-sm"
								})]
							}),
							/* @__PURE__ */ jsxs(FilterSelect, {
								label: "Category",
								value: filters.category_id || "all",
								onChange: (v) => applyFilter("category_id", v === "all" ? "" : v),
								children: [/* @__PURE__ */ jsx(SelectItem, {
									value: "all",
									children: "All Categories"
								}), options.categories.map((c) => /* @__PURE__ */ jsx(SelectItem, {
									value: String(c.id),
									children: c.name
								}, c.id))]
							}),
							/* @__PURE__ */ jsxs(FilterSelect, {
								label: "Collection",
								value: filters.collection_id || "all",
								onChange: (v) => applyFilter("collection_id", v === "all" ? "" : v),
								children: [/* @__PURE__ */ jsx(SelectItem, {
									value: "all",
									children: "All Collections"
								}), options.collections.map((c) => /* @__PURE__ */ jsx(SelectItem, {
									value: String(c.id),
									children: c.name
								}, c.id))]
							}),
							/* @__PURE__ */ jsxs(FilterSelect, {
								label: "Status",
								value: filters.status || "all",
								onChange: (v) => applyFilter("status", v === "all" ? "" : v),
								children: [/* @__PURE__ */ jsx(SelectItem, {
									value: "all",
									children: "All Status"
								}), options.statuses.map((s) => /* @__PURE__ */ jsx(SelectItem, {
									value: s,
									className: "capitalize",
									children: s
								}, s))]
							}),
							/* @__PURE__ */ jsxs(FilterSelect, {
								label: "Stock",
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
										value: "out_of_stock",
										children: "Out of Stock"
									})
								]
							}),
							/* @__PURE__ */ jsxs(FilterSelect, {
								label: "Tag",
								value: filters.is_featured === "1" ? "featured" : filters.is_new_arrival === "1" ? "new_arrival" : filters.is_best_seller === "1" ? "best_seller" : "all",
								onChange: (v) => {
									const map = {
										featured: {
											is_featured: "1",
											is_new_arrival: "",
											is_best_seller: ""
										},
										new_arrival: {
											is_featured: "",
											is_new_arrival: "1",
											is_best_seller: ""
										},
										best_seller: {
											is_featured: "",
											is_new_arrival: "",
											is_best_seller: "1"
										},
										all: {
											is_featured: "",
											is_new_arrival: "",
											is_best_seller: ""
										}
									};
									router.get("/admin/products", {
										...filters,
										...map[v] ?? map.all,
										page: 1
									}, {
										preserveState: true,
										replace: true
									});
								},
								children: [
									/* @__PURE__ */ jsx(SelectItem, {
										value: "all",
										children: "All Tags"
									}),
									/* @__PURE__ */ jsx(SelectItem, {
										value: "featured",
										children: "Featured"
									}),
									/* @__PURE__ */ jsx(SelectItem, {
										value: "new_arrival",
										children: "New Arrival"
									}),
									/* @__PURE__ */ jsx(SelectItem, {
										value: "best_seller",
										children: "Best Seller"
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex gap-2 md:col-span-2 xl:col-span-1 xl:ml-auto",
								children: [/* @__PURE__ */ jsxs(Button, {
									type: "submit",
									size: "sm",
									className: "h-9 flex-1 gap-1.5 bg-primary text-white hover:bg-primary/90 sm:flex-none",
									children: [/* @__PURE__ */ jsx(Search, { className: "h-3.5 w-3.5" }), " Search"]
								}), /* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									className: "h-9 flex-1 gap-1.5 text-zinc-500 hover:text-zinc-700 sm:flex-none",
									onClick: resetFilters,
									children: [/* @__PURE__ */ jsx(RotateCcw, { className: "h-3.5 w-3.5" }), " Reset"]
								})]
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ jsxs("table", {
							className: "w-full min-w-[1120px] text-left text-sm",
							children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
								className: "border-b border-zinc-100 bg-zinc-50/60",
								children: [
									/* @__PURE__ */ jsx("th", {
										className: "w-14 px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "No"
									}),
									/* @__PURE__ */ jsx(SortableTh, {
										label: "Product",
										sortKey: "product",
										activeSort: filters.sort,
										direction: filters.direction,
										onSort: applySort
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "SKU"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Category"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Collection"
									}),
									/* @__PURE__ */ jsx(SortableTh, {
										label: "Price",
										sortKey: "price",
										activeSort: filters.sort,
										direction: filters.direction,
										onSort: applySort
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-center text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Variants"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Stock"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Status"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Tag"
									}),
									/* @__PURE__ */ jsx(SortableTh, {
										label: "Created",
										sortKey: "created",
										activeSort: filters.sort,
										direction: filters.direction,
										onSort: applySort
									}),
									/* @__PURE__ */ jsx("th", { className: "w-10 px-4 py-3" })
								]
							}) }), /* @__PURE__ */ jsxs("tbody", {
								className: "divide-y divide-zinc-50",
								children: [products.data.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
									colSpan: 12,
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col items-center justify-center gap-3 py-20",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100",
												children: /* @__PURE__ */ jsx(ShoppingBag, { className: "h-5 w-5 text-zinc-400" })
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-sm text-zinc-400",
												children: "No products found. Try adjusting your filters."
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
								}) }), products.data.map((p, index) => {
									const vis = visibilityFor(p);
									const isLowStock = p.total_stock > 0 && p.total_stock <= 5;
									const isOutOfStock = p.total_stock === 0;
									const discount = p.sale_price && p.regular_price > 0 ? Math.round((1 - p.sale_price / p.regular_price) * 100) : null;
									const sc = statusConfig[p.status] ?? statusConfig.draft;
									return /* @__PURE__ */ jsxs("tr", {
										className: "transition-colors hover:bg-zinc-50/70",
										children: [
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5 text-xs font-medium text-zinc-400",
												children: (products.from ?? 1) + index
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-3",
													children: [/* @__PURE__ */ jsx("div", {
														className: "h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50",
														children: p.thumbnail ? /* @__PURE__ */ jsx("img", {
															src: p.thumbnail,
															alt: p.name,
															className: "h-full w-full object-cover"
														}) : /* @__PURE__ */ jsx("div", {
															className: "flex h-full w-full items-center justify-center",
															children: /* @__PURE__ */ jsx(ShoppingBag, { className: "h-4 w-4 text-zinc-300" })
														})
													}), /* @__PURE__ */ jsxs("div", {
														className: "min-w-[160px]",
														children: [/* @__PURE__ */ jsx(Link, {
															href: "/admin/products/" + p.id,
															className: "line-clamp-1 font-semibold text-zinc-900 transition-colors hover:text-[#151515]",
															children: p.name
														}), p.is_featured && /* @__PURE__ */ jsxs("span", {
															className: "mt-0.5 inline-flex items-center gap-0.5 text-[10px] font-medium text-amber-600",
															children: [
																/* @__PURE__ */ jsx(Star, { className: "h-2.5 w-2.5 fill-amber-400 text-amber-400" }),
																" ",
																"Featured"
															]
														})]
													})]
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ jsx("span", {
													className: "rounded-md bg-zinc-100 font-mono text-xs text-zinc-500",
													children: p.sku ?? "-"
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5 text-sm text-zinc-600",
												children: p.category ?? /* @__PURE__ */ jsx("span", {
													className: "text-zinc-300",
													children: "-"
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5 text-sm text-zinc-600",
												children: p.collection ?? /* @__PURE__ */ jsx("span", {
													className: "text-zinc-300",
													children: "-"
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: p.sale_price ? /* @__PURE__ */ jsxs("div", {
													className: "flex flex-col gap-0",
													children: [
														/* @__PURE__ */ jsx("span", {
															className: "text-sm font-semibold text-zinc-900",
															children: fmt(p.sale_price)
														}),
														/* @__PURE__ */ jsx("span", {
															className: "text-xs text-zinc-400 line-through",
															children: fmt(p.regular_price)
														}),
														discount && /* @__PURE__ */ jsxs("span", {
															className: "text-[10px] font-semibold text-red-500",
															children: [
																"-",
																discount,
																"%"
															]
														})
													]
												}) : /* @__PURE__ */ jsx("span", {
													className: "text-sm font-semibold text-zinc-900",
													children: fmt(p.regular_price)
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5 text-center",
												children: /* @__PURE__ */ jsx("span", {
													className: "inline-flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-xs font-semibold text-zinc-700",
													children: p.variants_count
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-1.5",
													children: [
														/* @__PURE__ */ jsx("span", {
															className: "text-sm font-semibold " + (isOutOfStock ? "text-red-500" : isLowStock ? "text-amber-600" : "text-zinc-800"),
															children: p.total_stock
														}),
														isOutOfStock && /* @__PURE__ */ jsx("span", {
															className: "text-[10px] font-medium text-red-400",
															children: "OOS"
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
												children: /* @__PURE__ */ jsx(Badge, {
													variant: "outline",
													className: "px-2 py-0.5 text-xs " + vis.cls,
													children: vis.label
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ jsx("span", {
													className: "text-xs whitespace-nowrap text-zinc-400",
													children: p.created_at ? new Date(p.created_at).toLocaleDateString("id-ID", {
														day: "2-digit",
														month: "short",
														year: "numeric"
													}) : "-"
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
													asChild: true,
													children: /* @__PURE__ */ jsx(Button, {
														variant: "ghost",
														size: "icon",
														className: "h-8 w-8 rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600",
														children: /* @__PURE__ */ jsx(MoreVertical, { className: "h-4 w-4" })
													})
												}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
													align: "end",
													className: "w-48",
													children: [
														/* @__PURE__ */ jsx(DropdownMenuItem, {
															asChild: true,
															children: /* @__PURE__ */ jsxs(Link, {
																href: "/admin/products/" + p.id,
																className: "flex w-full items-center gap-2",
																children: [
																	/* @__PURE__ */ jsx(Eye, { className: "h-3.5 w-3.5" }),
																	" ",
																	"View"
																]
															})
														}),
														/* @__PURE__ */ jsx(DropdownMenuItem, {
															asChild: true,
															children: /* @__PURE__ */ jsxs(Link, {
																href: "/admin/products/" + p.id + "/edit",
																className: "flex w-full items-center gap-2",
																children: [
																	/* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5" }),
																	" ",
																	"Edit"
																]
															})
														}),
														/* @__PURE__ */ jsx(DropdownMenuItem, {
															asChild: true,
															children: /* @__PURE__ */ jsxs(Link, {
																href: "/admin/products/" + p.id + "/variants",
																className: "flex w-full items-center gap-2",
																children: [
																	/* @__PURE__ */ jsx(Package, { className: "h-3.5 w-3.5" }),
																	" ",
																	"Manage Variants"
																]
															})
														}),
														p.status !== "published" && /* @__PURE__ */ jsxs(DropdownMenuItem, {
															onClick: () => doAction("/admin/products/" + p.id + "/publish"),
															className: "gap-2 text-emerald-600 focus:bg-emerald-50 focus:text-emerald-600",
															children: [
																/* @__PURE__ */ jsx(Eye, { className: "h-3.5 w-3.5" }),
																" ",
																"Publish"
															]
														}),
														p.status !== "archived" && /* @__PURE__ */ jsxs(DropdownMenuItem, {
															onClick: () => doAction("/admin/products/" + p.id + "/archive"),
															className: "gap-2",
															children: [
																/* @__PURE__ */ jsx(Archive, { className: "h-3.5 w-3.5" }),
																" ",
																"Archive"
															]
														}),
														/* @__PURE__ */ jsxs(DropdownMenuItem, {
															onClick: () => doAction("/admin/products/" + p.id + "/duplicate"),
															className: "gap-2",
															children: [
																/* @__PURE__ */ jsx(Download, { className: "h-3.5 w-3.5" }),
																" ",
																"Duplicate"
															]
														}),
														/* @__PURE__ */ jsxs(DropdownMenuItem, {
															onClick: () => {
																if (confirm("Delete " + p.name + "?")) doAction("/admin/products/" + p.id, "delete");
															},
															className: "gap-2 text-red-600 focus:bg-red-50 focus:text-red-600",
															children: [
																/* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" }),
																" ",
																"Delete"
															]
														})
													]
												})] })
											})
										]
									}, p.id);
								})]
							})]
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-3 border-t border-zinc-100 bg-zinc-50/40 px-4 py-3.5 sm:px-5 lg:flex-row lg:items-center lg:justify-between",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs text-zinc-400",
							children: products.from && products.to ? "Showing " + products.from + "-" + products.to + " of " + products.total + " products" : "No products"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center gap-1",
							children: [products.links.map((link, i) => {
								const isChevronLeft = link.label.includes("Previous") || link.label.includes("&laquo;");
								const isChevronRight = link.label.includes("Next") || link.label.includes("&raquo;");
								const label = isChevronLeft ? /* @__PURE__ */ jsx(ChevronLeft, { className: "h-3.5 w-3.5" }) : isChevronRight ? /* @__PURE__ */ jsx(ChevronRight, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: link.label } });
								return /* @__PURE__ */ jsx("button", {
									disabled: !link.url,
									onClick: () => link.url && router.get(link.url),
									className: ["h-8 min-w-8 rounded-lg px-2.5 text-xs font-medium transition-colors", link.active ? "bg-primary text-white shadow-sm" : !link.url ? "cursor-not-allowed text-zinc-300" : "text-zinc-500 hover:bg-zinc-100"].join(" "),
									children: label
								}, i);
							}), /* @__PURE__ */ jsx(PerPageSelect, { paginator: products })]
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
		className: "flex min-w-0 flex-col gap-1",
		children: [/* @__PURE__ */ jsx("span", {
			className: "px-0.5 text-[10px] font-semibold tracking-wider text-zinc-400 uppercase",
			children: label
		}), /* @__PURE__ */ jsxs(Select, {
			value,
			onValueChange: onChange,
			children: [/* @__PURE__ */ jsx(SelectTrigger, {
				className: "h-9 w-full rounded-lg border-zinc-200 bg-white text-xs shadow-sm xl:w-[130px]",
				children: /* @__PURE__ */ jsx(SelectValue, {})
			}), /* @__PURE__ */ jsx(SelectContent, { children })]
		})]
	});
}
//#endregion
export { ProductsIndex as default };

//# sourceMappingURL=products-CfyEy2p7.js.map