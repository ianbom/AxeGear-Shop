import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { i as DropdownMenuItem, n as DropdownMenuContent, s as DropdownMenuTrigger, t as DropdownMenu } from "./dropdown-menu-DttT2oSg.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CtTsjyTX.js";
import { t as PerPageSelect } from "./pagination-e7PNUKKI.js";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Archive, ChevronLeft, ChevronRight, Eye, MoreVertical, Pencil, Plus, RotateCcw, Search, Sparkles, Tags, Trash2 } from "lucide-react";
//#region resources/js/pages/admin/categories/index.tsx
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
function CategoriesIndex({ categories, filters, stats: totals }) {
	const [search, setSearch] = useState(filters.search ?? "");
	const applyFilter = (key, value) => router.get("/admin/categories", {
		...filters,
		[key]: value,
		page: 1
	}, {
		preserveState: true,
		replace: true
	});
	const resetFilters = () => router.get("/admin/categories", {}, { preserveState: false });
	const handleSearch = (e) => {
		e.preventDefault();
		applyFilter("search", search);
	};
	const doAction = (url, method = "post") => router[method](url, {}, { preserveScroll: true });
	const stats = [
		{
			title: "Total Categories",
			val: totals.total,
			sub: "in catalog",
			icon: Tags,
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
			title: "Active",
			val: totals.active,
			sub: "visible categories",
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
			title: "Inactive",
			val: totals.inactive,
			sub: "hidden categories",
			icon: Archive,
			iconBg: "bg-zinc-100",
			iconColor: "text-zinc-500",
			cardBg: "bg-white",
			subColor: "text-zinc-400",
			valColor: "text-zinc-800",
			titleColor: "text-zinc-700",
			accent: "",
			featured: false
		}
	];
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Head, { title: "Categories" }), /* @__PURE__ */ jsxs("div", {
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
						children: "Categories"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-zinc-400",
						children: "Manage your product categories and visibility."
					})
				] }), /* @__PURE__ */ jsx("div", {
					className: "flex shrink-0 items-center gap-2",
					children: /* @__PURE__ */ jsx(Link, {
						href: "/admin/categories/create",
						children: /* @__PURE__ */ jsxs(Button, {
							size: "sm",
							className: "h-9 gap-1.5 bg-primary text-white shadow-sm hover:bg-primary/90",
							children: [/* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" }), " Add Category"]
						})
					})
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-3",
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
									placeholder: "Search categories...",
									className: "h-9 rounded-lg border-zinc-200 bg-white pl-9 text-sm shadow-sm"
								})]
							}),
							/* @__PURE__ */ jsxs(FilterSelect, {
								label: "Status",
								value: filters.status || "all",
								onChange: (v) => applyFilter("status", v === "all" ? "" : v),
								children: [
									/* @__PURE__ */ jsx(SelectItem, {
										value: "all",
										children: "All Status"
									}),
									/* @__PURE__ */ jsx(SelectItem, {
										value: "1",
										children: "Active"
									}),
									/* @__PURE__ */ jsx(SelectItem, {
										value: "0",
										children: "Inactive"
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
										children: "Category"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-center text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Products"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Status"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",
										children: "Created"
									}),
									/* @__PURE__ */ jsx("th", { className: "w-10 px-4 py-3" })
								]
							}) }), /* @__PURE__ */ jsxs("tbody", {
								className: "divide-y divide-zinc-50",
								children: [categories.data.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
									colSpan: 6,
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col items-center justify-center gap-3 py-20",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100",
												children: /* @__PURE__ */ jsx(Tags, { className: "h-5 w-5 text-zinc-400" })
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-sm text-zinc-400",
												children: "No categories found. Try adjusting your filters."
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
								}) }), categories.data.map((c, index) => {
									const sc = statusConfig[c.is_active ? "active" : "inactive"];
									return /* @__PURE__ */ jsxs("tr", {
										className: "transition-colors hover:bg-zinc-50/70",
										children: [
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5 text-xs font-medium text-zinc-400",
												children: (categories.from ?? 1) + index
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5",
												children: /* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-3",
													children: [/* @__PURE__ */ jsx("div", {
														className: "h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50",
														children: c.image_url ? /* @__PURE__ */ jsx("img", {
															src: c.image_url,
															alt: c.name,
															className: "h-full w-full object-cover"
														}) : /* @__PURE__ */ jsx("div", {
															className: "flex h-full w-full items-center justify-center",
															children: /* @__PURE__ */ jsx(Tags, { className: "h-4 w-4 text-zinc-300" })
														})
													}), /* @__PURE__ */ jsxs("div", {
														className: "min-w-[160px]",
														children: [/* @__PURE__ */ jsx(Link, {
															href: "/admin/categories/" + c.id + "/edit",
															className: "line-clamp-1 font-semibold text-zinc-900 transition-colors hover:text-[#151515]",
															children: c.name
														}), /* @__PURE__ */ jsx("span", {
															className: "mt-0.5 block text-xs text-zinc-400",
															children: c.slug
														})]
													})]
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-4 py-3.5 text-center",
												children: /* @__PURE__ */ jsx("span", {
													className: "inline-flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-xs font-semibold text-zinc-700",
													children: c.products_count
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
												children: /* @__PURE__ */ jsx("span", {
													className: "text-xs whitespace-nowrap text-zinc-400",
													children: c.created_at ? new Date(c.created_at).toLocaleDateString("id-ID", {
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
													children: [/* @__PURE__ */ jsx(DropdownMenuItem, {
														asChild: true,
														children: /* @__PURE__ */ jsxs(Link, {
															href: "/admin/categories/" + c.id + "/edit",
															className: "flex w-full items-center gap-2",
															children: [
																/* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5" }),
																" ",
																"Edit"
															]
														})
													}), /* @__PURE__ */ jsxs(DropdownMenuItem, {
														onClick: () => {
															if (confirm("Delete " + c.name + "?")) doAction("/admin/categories/" + c.id, "delete");
														},
														className: "gap-2 text-red-600 focus:bg-red-50 focus:text-red-600",
														children: [
															/* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" }),
															" ",
															"Delete"
														]
													})]
												})] })
											})
										]
									}, c.id);
								})]
							})]
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between border-t border-zinc-100 bg-zinc-50/40 px-5 py-3.5",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs text-zinc-400",
							children: categories.from && categories.to ? "Showing " + categories.from + "-" + categories.to + " of " + categories.total + " categories" : "No categories"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-1",
							children: [categories.links.map((link, i) => {
								const isChevronLeft = link.label.includes("Previous") || link.label.includes("&laquo;");
								const isChevronRight = link.label.includes("Next") || link.label.includes("&raquo;");
								const label = isChevronLeft ? /* @__PURE__ */ jsx(ChevronLeft, { className: "h-3.5 w-3.5" }) : isChevronRight ? /* @__PURE__ */ jsx(ChevronRight, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: link.label } });
								return /* @__PURE__ */ jsx("button", {
									disabled: !link.url,
									onClick: () => link.url && router.get(link.url),
									className: ["h-8 min-w-8 rounded-lg px-2.5 text-xs font-medium transition-colors", link.active ? "bg-primary text-white shadow-sm" : !link.url ? "cursor-not-allowed text-zinc-300" : "text-zinc-500 hover:bg-zinc-100"].join(" "),
									children: label
								}, i);
							}), /* @__PURE__ */ jsx(PerPageSelect, { paginator: categories })]
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
export { CategoriesIndex as default };

//# sourceMappingURL=categories-DG7pvzuk.js.map