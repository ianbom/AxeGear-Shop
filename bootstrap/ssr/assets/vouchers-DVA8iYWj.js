import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { a as Pagination, i as PageHeader, s as TableShell, t as ActiveBadge, u as formatPrice } from "./shared-BHhPoPN8.js";
import "./shared-CZeQyB1e.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
//#region resources/js/pages/admin/vouchers/index.tsx
function VouchersIndex({ vouchers, filters }) {
	const { data, setData, get, processing } = useForm({
		search: filters.search ?? "",
		discount_type: filters.discount_type ?? "",
		is_active: filters.is_active ?? ""
	});
	const submit = (event) => {
		event.preventDefault();
		get("/admin/vouchers", {
			preserveState: true,
			replace: true
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Vouchers" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Marketing Management",
			title: "Vouchers",
			description: "Kelola kode promo, limit penggunaan, periode aktif, dan status campaign.",
			action: /* @__PURE__ */ jsx(Button, {
				asChild: true,
				children: /* @__PURE__ */ jsxs(Link, {
					href: "/admin/vouchers/create",
					children: [/* @__PURE__ */ jsx(Plus, {}), " Create Voucher"]
				})
			})
		}), /* @__PURE__ */ jsxs(TableShell, {
			title: "Voucher List",
			description: `${vouchers.total} voucher terdaftar`,
			children: [
				/* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					className: "mb-4 grid gap-3 md:grid-cols-4",
					children: [
						/* @__PURE__ */ jsx(Input, {
							value: data.search,
							onChange: (event) => setData("search", event.target.value),
							placeholder: "Code or name..."
						}),
						/* @__PURE__ */ jsxs("select", {
							value: data.discount_type,
							onChange: (event) => setData("discount_type", event.target.value),
							className: "rounded-md border border-input bg-transparent px-3 py-2 text-sm",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "",
									children: "All discount"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "fixed",
									children: "Fixed"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "percentage",
									children: "Percentage"
								})
							]
						}),
						/* @__PURE__ */ jsxs("select", {
							value: data.is_active,
							onChange: (event) => setData("is_active", event.target.value),
							className: "rounded-md border border-input bg-transparent px-3 py-2 text-sm",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "",
									children: "All status"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "active",
									children: "Active"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "inactive",
									children: "Inactive"
								})
							]
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "submit",
							variant: "outline",
							disabled: processing,
							children: [/* @__PURE__ */ jsx(Search, {}), " Filter"]
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
							className: "border-b text-left text-muted-foreground",
							children: [
								/* @__PURE__ */ jsx("th", {
									className: "w-14 pr-4 pb-3 font-medium",
									children: "No"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Voucher"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Discount"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Usage"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Ends"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Status"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pb-3 text-right font-medium",
									children: "Action"
								})
							]
						}) }), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y",
							children: vouchers.data.map((voucher, index) => /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-muted/40",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4 text-xs font-medium text-muted-foreground",
										children: (vouchers.from ?? 1) + index
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "py-3 pr-4",
										children: [/* @__PURE__ */ jsx("div", {
											className: "font-semibold",
											children: voucher.code
										}), /* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground",
											children: voucher.name
										})]
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "py-3 pr-4",
										children: [voucher.discount_type === "percentage" ? `${voucher.discount_value}%` : formatPrice(voucher.discount_value), /* @__PURE__ */ jsxs("div", {
											className: "text-xs text-muted-foreground",
											children: [
												"Min",
												" ",
												formatPrice(voucher.min_order_amount),
												" ",
												"· Max",
												" ",
												voucher.max_discount ? formatPrice(voucher.max_discount) : "-"
											]
										})]
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "py-3 pr-4",
										children: [
											voucher.used_count,
											"/",
											voucher.usage_limit ?? "∞",
											/* @__PURE__ */ jsxs("div", {
												className: "text-xs text-muted-foreground",
												children: [voucher.paid_orders_count, " paid orders"]
											})
										]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: voucher.ends_at ?? "-"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: /* @__PURE__ */ jsx(ActiveBadge, { active: voucher.is_active })
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex justify-end gap-2",
											children: [/* @__PURE__ */ jsx(Button, {
												asChild: true,
												size: "sm",
												variant: "outline",
												children: /* @__PURE__ */ jsxs(Link, {
													href: `/admin/vouchers/${voucher.id}/edit`,
													children: [/* @__PURE__ */ jsx(Edit, {}), " Edit"]
												})
											}), /* @__PURE__ */ jsx(Button, {
												asChild: true,
												size: "sm",
												variant: "outline",
												children: /* @__PURE__ */ jsxs(Link, {
													href: `/admin/vouchers/${voucher.id}`,
													method: "delete",
													as: "button",
													children: [/* @__PURE__ */ jsx(Trash2, {}), " Delete"]
												})
											})]
										})
									})
								]
							}, voucher.id))
						})]
					})
				}),
				/* @__PURE__ */ jsx(Pagination, { paginator: vouchers })
			]
		})]
	})] });
}
//#endregion
export { VouchersIndex as default };

//# sourceMappingURL=vouchers-DVA8iYWj.js.map