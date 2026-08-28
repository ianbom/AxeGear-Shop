import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-D4LqnWpI.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { i as PageHeader } from "./shared-BHhPoPN8.js";
import { i as textInputClass } from "./shared-CZeQyB1e.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Save } from "lucide-react";
//#region resources/js/pages/admin/customer-addresses/form.tsx
function CustomerAddressForm({ address }) {
	const { data, setData, put, processing, errors } = useForm({
		recipient_name: String(address.recipient_name ?? ""),
		recipient_phone: String(address.recipient_phone ?? ""),
		label: String(address.label ?? ""),
		province: String(address.province ?? ""),
		city: String(address.city ?? ""),
		district: String(address.district ?? ""),
		subdistrict: String(address.subdistrict ?? ""),
		postal_code: String(address.postal_code ?? ""),
		biteship_area_id: String(address.biteship_area_id ?? ""),
		latitude: String(address.latitude ?? ""),
		longitude: String(address.longitude ?? ""),
		full_address: String(address.full_address ?? ""),
		note: String(address.note ?? ""),
		is_default: Boolean(address.is_default)
	});
	const submit = (event) => {
		event.preventDefault();
		put(`/admin/customer-addresses/${address.id}`);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Edit Customer Address" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Customer Management",
			title: "Edit Customer Address",
			description: "Edit address book customer tanpa mengubah snapshot order lama."
		}), /* @__PURE__ */ jsxs(Card, {
			className: "max-w-4xl",
			children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Address Information" }) }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "grid gap-5",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [
							"recipient_name",
							"recipient_phone",
							"label",
							"province",
							"city",
							"district",
							"subdistrict",
							"postal_code",
							"biteship_area_id",
							"latitude",
							"longitude"
						].map((field) => /* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx(Label, {
									htmlFor: field,
									children: field.replaceAll("_", " ")
								}),
								/* @__PURE__ */ jsx(Input, {
									id: field,
									value: String(data[field]),
									onChange: (event) => setData(field, event.target.value)
								}),
								/* @__PURE__ */ jsx(InputError, { message: errors[field] })
							]
						}, field))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "full_address",
								children: "Full Address"
							}),
							/* @__PURE__ */ jsx("textarea", {
								id: "full_address",
								value: data.full_address,
								onChange: (event) => setData("full_address", event.target.value),
								className: `${textInputClass()} min-h-28`
							}),
							/* @__PURE__ */ jsx(InputError, { message: errors.full_address })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "note",
							children: "Note"
						}), /* @__PURE__ */ jsx("textarea", {
							id: "note",
							value: data.note,
							onChange: (event) => setData("note", event.target.value),
							className: `${textInputClass()} min-h-20`
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "flex items-start gap-3 rounded-lg border p-4 text-sm",
						children: [/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							checked: data.is_default,
							onChange: (event) => setData("is_default", event.target.checked),
							className: "mt-1"
						}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
							className: "block font-medium",
							children: "Default address"
						}), /* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "Tandai sebagai alamat utama customer."
						})] })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-end gap-3 border-t pt-5",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							type: "button",
							variant: "outline",
							children: /* @__PURE__ */ jsx(Link, {
								href: `/admin/customer-addresses/${address.id}`,
								children: "Cancel"
							})
						}), /* @__PURE__ */ jsxs(Button, {
							type: "submit",
							disabled: processing,
							children: [/* @__PURE__ */ jsx(Save, {}), " Save Address"]
						})]
					})
				]
			}) })]
		})]
	})] });
}
//#endregion
export { CustomerAddressForm as default };

//# sourceMappingURL=form-CZee06o-.js.map