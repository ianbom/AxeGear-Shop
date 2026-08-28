import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { i as PageHeader } from "./shared-BHhPoPN8.js";
import { i as textInputClass } from "./shared-CZeQyB1e.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Send } from "lucide-react";
//#region resources/js/pages/admin/notifications/form.tsx
function NotificationForm({ customers, types }) {
	const { data, setData, post, processing, errors } = useForm({
		target: "one",
		user_id: "",
		title: "",
		message: "",
		type: "system",
		reference_type: "",
		reference_id: ""
	});
	const submit = (event) => {
		event.preventDefault();
		post("/admin/notifications");
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Send Notification" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Customer Management",
			title: "Send Notification",
			description: "Kirim notifikasi manual ke satu customer, semua customer, atau segment customer aktif."
		}), /* @__PURE__ */ jsxs(Card, {
			className: "max-w-4xl",
			children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Notification Message" }), /* @__PURE__ */ jsx(CardDescription, { children: "Notifikasi masuk ke halaman customer notifications." })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "grid gap-5",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ jsx(Label, { children: "Target" }),
									/* @__PURE__ */ jsxs("select", {
										value: data.target,
										onChange: (event) => setData("target", event.target.value),
										className: textInputClass(),
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "one",
												children: "One customer"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "active",
												children: "Active customers"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "all",
												children: "All customers"
											})
										]
									}),
									/* @__PURE__ */ jsx(InputError, { message: errors.target })
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ jsx(Label, { children: "Customer" }),
									/* @__PURE__ */ jsxs("select", {
										value: data.user_id,
										onChange: (event) => setData("user_id", event.target.value),
										disabled: data.target !== "one",
										className: textInputClass(),
										children: [/* @__PURE__ */ jsx("option", {
											value: "",
											children: "Select customer"
										}), customers.map((customer) => /* @__PURE__ */ jsxs("option", {
											value: customer.id,
											children: [
												customer.name,
												" ·",
												" ",
												customer.email,
												customer.is_active ? "" : " (inactive)"
											]
										}, customer.id))]
									}),
									/* @__PURE__ */ jsx(InputError, { message: errors.user_id })
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ jsx(Label, { children: "Type" }),
									/* @__PURE__ */ jsx("select", {
										value: data.type,
										onChange: (event) => setData("type", event.target.value),
										className: textInputClass(),
										children: types.map((type) => /* @__PURE__ */ jsx("option", {
											value: type,
											children: type
										}, type))
									}),
									/* @__PURE__ */ jsx(InputError, { message: errors.type })
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Reference Type" }), /* @__PURE__ */ jsx(Input, {
									value: data.reference_type,
									onChange: (event) => setData("reference_type", event.target.value),
									placeholder: "order, promo, system..."
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-2 md:col-span-2",
								children: [
									/* @__PURE__ */ jsx(Label, { children: "Title" }),
									/* @__PURE__ */ jsx(Input, {
										value: data.title,
										onChange: (event) => setData("title", event.target.value)
									}),
									/* @__PURE__ */ jsx(InputError, { message: errors.title })
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ jsx(Label, { children: "Message" }),
							/* @__PURE__ */ jsx("textarea", {
								value: data.message,
								onChange: (event) => setData("message", event.target.value),
								className: `${textInputClass()} min-h-32`
							}),
							/* @__PURE__ */ jsx(InputError, { message: errors.message })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Reference ID" }), /* @__PURE__ */ jsx(Input, {
							value: data.reference_id,
							onChange: (event) => setData("reference_id", event.target.value)
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-end gap-3 border-t pt-5",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							type: "button",
							variant: "outline",
							children: /* @__PURE__ */ jsx(Link, {
								href: "/admin/notifications",
								children: "Cancel"
							})
						}), /* @__PURE__ */ jsxs(Button, {
							type: "submit",
							disabled: processing,
							children: [/* @__PURE__ */ jsx(Send, {}), " Send Notification"]
						})]
					})
				]
			}) })]
		})]
	})] });
}
//#endregion
export { NotificationForm as default };

//# sourceMappingURL=form-DKLWZ70K.js.map