import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Save } from "lucide-react";
//#region resources/js/pages/admin/admin-users/form.tsx
function AdminUserForm({ mode, adminUser }) {
	const isEdit = mode === "edit" && adminUser !== null;
	const { data, setData, post, put, processing, errors, reset } = useForm({
		name: adminUser?.name ?? "",
		email: adminUser?.email ?? "",
		phone: adminUser?.phone ?? "",
		avatar_url: adminUser?.avatar_url ?? "",
		password: "",
		password_confirmation: "",
		is_active: adminUser?.is_active ?? true
	});
	const submit = (event) => {
		event.preventDefault();
		if (isEdit) {
			put(`/admin/admin-users/${adminUser.id}`, { onSuccess: () => reset("password", "password_confirmation") });
			return;
		}
		post("/admin/admin-users", { onSuccess: () => reset("password", "password_confirmation") });
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: isEdit ? "Edit Admin User" : "Create Admin User" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-sm font-medium text-muted-foreground",
				children: "Settings"
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: isEdit ? "Edit Admin User" : "Create Admin User"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 max-w-2xl text-sm text-muted-foreground",
				children: "Role akan otomatis diset sebagai admin. Password minimal 8 karakter."
			})
		] }), /* @__PURE__ */ jsxs(Card, {
			className: "max-w-3xl",
			children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Account Information" }), /* @__PURE__ */ jsx(CardDescription, { children: "Isi data admin internal yang dapat mengakses dashboard." })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "space-y-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-5 md:grid-cols-2",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ jsx(Label, {
										htmlFor: "name",
										children: "Name"
									}),
									/* @__PURE__ */ jsx(Input, {
										id: "name",
										value: data.name,
										onChange: (event) => setData("name", event.target.value)
									}),
									/* @__PURE__ */ jsx(InputError, { message: errors.name })
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ jsx(Label, {
										htmlFor: "email",
										children: "Email"
									}),
									/* @__PURE__ */ jsx(Input, {
										id: "email",
										type: "email",
										value: data.email,
										onChange: (event) => setData("email", event.target.value)
									}),
									/* @__PURE__ */ jsx(InputError, { message: errors.email })
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ jsx(Label, {
										htmlFor: "phone",
										children: "Phone"
									}),
									/* @__PURE__ */ jsx(Input, {
										id: "phone",
										value: data.phone,
										onChange: (event) => setData("phone", event.target.value)
									}),
									/* @__PURE__ */ jsx(InputError, { message: errors.phone })
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ jsx(Label, {
										htmlFor: "avatar_url",
										children: "Avatar URL"
									}),
									/* @__PURE__ */ jsx(Input, {
										id: "avatar_url",
										type: "url",
										value: data.avatar_url,
										onChange: (event) => setData("avatar_url", event.target.value)
									}),
									/* @__PURE__ */ jsx(InputError, { message: errors.avatar_url })
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ jsx(Label, {
										htmlFor: "password",
										children: isEdit ? "New Password" : "Password"
									}),
									/* @__PURE__ */ jsx(Input, {
										id: "password",
										type: "password",
										value: data.password,
										onChange: (event) => setData("password", event.target.value),
										autoComplete: "new-password"
									}),
									/* @__PURE__ */ jsx(InputError, { message: errors.password })
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "password_confirmation",
									children: "Confirm Password"
								}), /* @__PURE__ */ jsx(Input, {
									id: "password_confirmation",
									type: "password",
									value: data.password_confirmation,
									onChange: (event) => setData("password_confirmation", event.target.value),
									autoComplete: "new-password"
								})]
							})
						]
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
							children: "Active admin"
						}), /* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "Admin aktif dapat login ke dashboard."
						})] })]
					}),
					/* @__PURE__ */ jsx(InputError, { message: errors.is_active }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-end gap-3 border-t pt-6",
						children: [/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ jsx(Link, {
								href: "/admin/admin-users",
								children: "Cancel"
							})
						}), /* @__PURE__ */ jsxs(Button, {
							type: "submit",
							disabled: processing,
							children: [/* @__PURE__ */ jsx(Save, {}), processing ? "Saving..." : "Save Admin"]
						})]
					})
				]
			}) })]
		})]
	})] });
}
//#endregion
export { AdminUserForm as default };

//# sourceMappingURL=form-BbWhCnw4.js.map