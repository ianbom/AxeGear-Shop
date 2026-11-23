import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { a as update, i as store, r as index } from "./EmailNotificationController-BOlFisr5.js";
import { t as InputError } from "./input-error-BDqmjkOe.js";
import { t as Label } from "./label-CffNwx8n.js";
import { i as PageHeader, s as TableShell } from "./shared-BJCPnCKB.js";
import { t as Checkbox } from "./checkbox-CNWcydbC.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/pages/admin/email-notifications/form.tsx
function RecipientForm({ recipient, onSuccess, onCancel }) {
	const form = useForm({
		email: recipient?.email ?? "",
		is_active: recipient?.is_active ?? true
	});
	function submit(event) {
		event.preventDefault();
		form.submit(recipient ? update(recipient.id) : store(), {
			preserveScroll: true,
			onSuccess
		});
	}
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: submit,
		className: "space-y-5",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ jsx(Label, {
						htmlFor: "email",
						children: "Email"
					}),
					/* @__PURE__ */ jsx(Input, {
						id: "email",
						name: "email",
						type: "email",
						autoComplete: "email",
						required: true,
						maxLength: 254,
						value: form.data.email,
						onChange: (event) => form.setData("email", event.target.value),
						"aria-invalid": Boolean(form.errors.email),
						"aria-describedby": form.errors.email ? "email-error" : void 0
					}),
					/* @__PURE__ */ jsx(InputError, {
						id: "email-error",
						message: form.errors.email
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx(Checkbox, {
							id: "is_active",
							checked: form.data.is_active,
							onCheckedChange: (checked) => form.setData("is_active", checked === true),
							"aria-invalid": Boolean(form.errors.is_active),
							"aria-describedby": "active-description"
						}), /* @__PURE__ */ jsx(Label, {
							htmlFor: "is_active",
							children: "Aktif menerima notifikasi"
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						id: "active-description",
						className: "text-sm text-muted-foreground",
						children: "Nonaktifkan untuk menghentikan notifikasi tanpa menghapus alamat email."
					}),
					/* @__PURE__ */ jsx(InputError, { message: form.errors.is_active })
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap justify-end gap-3 border-t pt-5",
				children: [onCancel ? /* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					onClick: onCancel,
					children: "Batal"
				}) : /* @__PURE__ */ jsx(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ jsx(Link, {
						href: index(),
						children: "Batal"
					})
				}), /* @__PURE__ */ jsx(Button, {
					type: "submit",
					disabled: form.processing,
					className: "bg-foreground text-background hover:bg-foreground/90",
					children: form.processing ? "Menyimpan…" : "Simpan penerima"
				})]
			})
		]
	});
}
function EmailNotificationForm({ recipient }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Edit penerima email" }), /* @__PURE__ */ jsxs("div", {
		className: "space-y-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Email Notifikasi Pembelian",
			title: "Edit penerima email",
			description: "Email ini akan menerima ringkasan pesanan yang sudah dibayar."
		}), /* @__PURE__ */ jsx("div", {
			className: "max-w-xl",
			children: /* @__PURE__ */ jsx(TableShell, {
				title: "Data penerima",
				description: "Penerima tidak harus memiliki akun admin.",
				children: /* @__PURE__ */ jsx(RecipientForm, { recipient })
			})
		})]
	})] });
}
//#endregion
export { RecipientForm as n, EmailNotificationForm as t };

//# sourceMappingURL=form-CHr8wrK_.js.map