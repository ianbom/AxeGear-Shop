import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { i as PageHeader } from "./shared-BHhPoPN8.js";
import { i as textInputClass } from "./shared-CZeQyB1e.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Save } from "lucide-react";
//#region resources/js/pages/admin/vouchers/form.tsx
function VoucherForm({ mode, voucher }) {
	const isEdit = mode === "edit" && voucher !== null;
	const { data, setData, post, processing, errors } = useForm({
		_method: isEdit ? "PUT" : "POST",
		code: String(voucher?.code ?? ""),
		name: String(voucher?.name ?? ""),
		description: String(voucher?.description ?? ""),
		discount_type: String(voucher?.discount_type ?? "fixed"),
		discount_value: String(voucher?.discount_value ?? ""),
		max_discount: String(voucher?.max_discount ?? ""),
		min_order_amount: String(voucher?.min_order_amount ?? ""),
		usage_limit: String(voucher?.usage_limit ?? ""),
		starts_at: String(voucher?.starts_at ?? ""),
		ends_at: String(voucher?.ends_at ?? ""),
		is_active: Boolean(voucher?.is_active ?? true)
	});
	const submit = (event) => {
		event.preventDefault();
		post(isEdit ? `/admin/vouchers/${voucher.id}` : "/admin/vouchers");
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: isEdit ? "Edit Voucher" : "Create Voucher" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Marketing Management",
			title: isEdit ? "Edit Voucher" : "Create Voucher",
			description: "Atur kode promo yang valid untuk checkout customer."
		}), /* @__PURE__ */ jsxs(Card, {
			className: "max-w-4xl",
			children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Voucher Information" }), /* @__PURE__ */ jsx(CardDescription, { children: "Percentage discount dibatasi maksimal 100%." })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "grid gap-5",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [
							/* @__PURE__ */ jsx(Field, {
								label: "Code",
								value: data.code,
								onChange: (value) => setData("code", value.toUpperCase()),
								error: errors.code
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Name",
								value: data.name,
								onChange: (value) => setData("name", value),
								error: errors.name
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ jsx(Label, { children: "Discount Type" }),
									/* @__PURE__ */ jsxs("select", {
										value: data.discount_type,
										onChange: (event) => setData("discount_type", event.target.value),
										className: textInputClass(),
										children: [/* @__PURE__ */ jsx("option", {
											value: "fixed",
											children: "fixed"
										}), /* @__PURE__ */ jsx("option", {
											value: "percentage",
											children: "percentage"
										})]
									}),
									/* @__PURE__ */ jsx(InputError, { message: errors.discount_type })
								]
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Discount Value",
								value: data.discount_value,
								onChange: (value) => setData("discount_value", value),
								error: errors.discount_value
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Max Discount",
								value: data.max_discount,
								onChange: (value) => setData("max_discount", value),
								error: errors.max_discount
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Minimum Order Amount",
								value: data.min_order_amount,
								onChange: (value) => setData("min_order_amount", value),
								error: errors.min_order_amount
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Usage Limit",
								value: data.usage_limit,
								onChange: (value) => setData("usage_limit", value),
								error: errors.usage_limit
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Starts At",
								type: "datetime-local",
								value: data.starts_at,
								onChange: (value) => setData("starts_at", value),
								error: errors.starts_at
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Ends At",
								type: "datetime-local",
								value: data.ends_at,
								onChange: (value) => setData("ends_at", value),
								error: errors.ends_at
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Description" }), /* @__PURE__ */ jsx("textarea", {
							value: data.description,
							onChange: (event) => setData("description", event.target.value),
							className: `${textInputClass()} min-h-24`
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "flex items-start gap-3 rounded-lg border p-4 text-sm",
						children: [/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							checked: data.is_active,
							onChange: (event) => setData("is_active", event.target.checked),
							className: "mt-1"
						}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
							className: "block font-medium",
							children: "Active voucher"
						}), /* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "Voucher inactive tidak bisa dipakai checkout."
						})] })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-end gap-3 border-t pt-5",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							type: "button",
							variant: "outline",
							children: /* @__PURE__ */ jsx(Link, {
								href: "/admin/vouchers",
								children: "Cancel"
							})
						}), /* @__PURE__ */ jsxs(Button, {
							type: "submit",
							disabled: processing,
							children: [/* @__PURE__ */ jsx(Save, {}), " Save Voucher"]
						})]
					})
				]
			}) })]
		})]
	})] });
}
function Field({ label, value, onChange, error, type = "text" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ jsx(Label, { children: label }),
			/* @__PURE__ */ jsx(Input, {
				type,
				value,
				onChange: (event) => onChange(event.target.value)
			}),
			/* @__PURE__ */ jsx(InputError, { message: error })
		]
	});
}
//#endregion
export { VoucherForm as default };

//# sourceMappingURL=form-BkBa69fX.js.map