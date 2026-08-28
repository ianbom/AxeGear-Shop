import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { i as PageHeader } from "./shared-BHhPoPN8.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Save } from "lucide-react";
//#region resources/js/pages/admin/stock/adjustment.tsx
function StockAdjustment({ variant }) {
	const { data, setData, post, processing, errors } = useForm({
		type: "in",
		quantity: 1,
		note: ""
	});
	const submit = (event) => {
		event.preventDefault();
		post(`/admin/product-variants/${variant.id}/stock-adjustment`);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Stock Adjustment" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Catalog Management",
			title: "Stock Adjustment",
			description: "Setiap adjustment akan dicatat ke stock_logs dengan stock before dan stock after."
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]",
			children: [/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: /* @__PURE__ */ jsx(Link, {
				href: variant.product_id ? `/admin/products/${variant.product_id}` : "#",
				className: "rounded-md transition-colors hover:text-[#151515] focus-visible:ring-2 focus-visible:ring-[#151515]/30 focus-visible:outline-none",
				"aria-disabled": !variant.product_id,
				children: variant.sku
			}) }), /* @__PURE__ */ jsx(CardDescription, { children: variant.product_id ? /* @__PURE__ */ jsx(Link, {
				href: `/admin/products/${variant.product_id}`,
				className: "underline-offset-4 hover:text-[#151515] hover:underline",
				children: variant.product ?? "-"
			}) : variant.product ?? "-" })] }), /* @__PURE__ */ jsxs(CardContent, {
				className: "grid gap-3 text-sm",
				children: [
					/* @__PURE__ */ jsx(Metric, {
						label: "Stock",
						value: variant.stock
					}),
					/* @__PURE__ */ jsx(Metric, {
						label: "Reserved",
						value: variant.reserved_stock
					}),
					/* @__PURE__ */ jsx(Metric, {
						label: "Available",
						value: variant.available_stock
					})
				]
			})] }), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Adjustment Form" }), /* @__PURE__ */ jsx(CardDescription, { children: "Type out otomatis mengurangi stok jika quantity positif." })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "flex flex-col gap-5",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-5 md:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx(Label, {
									htmlFor: "type",
									children: "Type"
								}),
								/* @__PURE__ */ jsxs("select", {
									id: "type",
									value: data.type,
									onChange: (event) => setData("type", event.target.value),
									className: "h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm",
									children: [
										/* @__PURE__ */ jsx("option", {
											value: "in",
											children: "In"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "out",
											children: "Out"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "adjustment",
											children: "Adjustment"
										})
									]
								}),
								/* @__PURE__ */ jsx(InputError, { message: errors.type })
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx(Label, {
									htmlFor: "quantity",
									children: "Quantity"
								}),
								/* @__PURE__ */ jsx(Input, {
									id: "quantity",
									type: "number",
									value: data.quantity,
									onChange: (event) => setData("quantity", Number(event.target.value))
								}),
								/* @__PURE__ */ jsx(InputError, { message: errors.quantity })
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "note",
								children: "Note"
							}),
							/* @__PURE__ */ jsx("textarea", {
								id: "note",
								value: data.note,
								onChange: (event) => setData("note", event.target.value),
								className: "min-h-28 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
							}),
							/* @__PURE__ */ jsx(InputError, { message: errors.note })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-end gap-3 border-t pt-5",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							type: "button",
							variant: "outline",
							children: /* @__PURE__ */ jsx(Link, {
								href: "/admin/stock",
								children: "Cancel"
							})
						}), /* @__PURE__ */ jsxs(Button, {
							type: "submit",
							disabled: processing,
							children: [/* @__PURE__ */ jsx(Save, {}), "Save Adjustment"]
						})]
					})
				]
			}) })] })]
		})]
	})] });
}
function Metric({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-between rounded-lg border p-3",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("span", {
			className: "font-semibold",
			children: value
		})]
	});
}
//#endregion
export { StockAdjustment as default };

//# sourceMappingURL=adjustment-C-3rdGhg.js.map