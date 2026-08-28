import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { t as PasswordInput } from "./password-input-BX5lEUa-.js";
import { t as Spinner } from "./spinner-DkICJePw.js";
import { r as update } from "./password-Cj7-bejK.js";
import { Form, Head } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/pages/auth/reset-password.tsx
function ResetPassword({ token, email }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Reset kata sandi" }),
		/* @__PURE__ */ jsxs("div", {
			className: "mb-6 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm leading-6 text-muted-foreground",
			children: [/* @__PURE__ */ jsx("p", {
				className: "font-medium text-foreground",
				children: "Buat kata sandi baru untuk akun ini."
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1",
				children: "Gunakan kata sandi yang belum pernah dipakai. Setelah reset selesai, masuk dengan kata sandi baru."
			})]
		}),
		/* @__PURE__ */ jsx(Form, {
			...update.form(),
			transform: (data) => ({
				...data,
				token,
				email
			}),
			resetOnSuccess: ["password", "password_confirmation"],
			children: ({ processing, errors }) => /* @__PURE__ */ jsxs("div", {
				className: "grid gap-6",
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
								type: "email",
								name: "email",
								autoComplete: "email",
								value: email,
								className: "mt-1 block w-full",
								readOnly: true
							}),
							/* @__PURE__ */ jsx(InputError, {
								message: errors.email,
								className: "mt-2"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs leading-5 text-muted-foreground",
								children: "Email ini berasal dari tautan reset dan tidak bisa diubah di sini."
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "password",
								children: "Kata sandi"
							}),
							/* @__PURE__ */ jsx(PasswordInput, {
								id: "password",
								name: "password",
								autoComplete: "new-password",
								className: "mt-1 block w-full",
								autoFocus: true,
								placeholder: "Kata sandi"
							}),
							/* @__PURE__ */ jsx(InputError, { message: errors.password }),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs leading-5 text-muted-foreground",
								children: "Gunakan minimal 8 karakter dengan kombinasi huruf, angka, atau simbol."
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "password_confirmation",
								children: "Konfirmasi kata sandi"
							}),
							/* @__PURE__ */ jsx(PasswordInput, {
								id: "password_confirmation",
								name: "password_confirmation",
								autoComplete: "new-password",
								className: "mt-1 block w-full",
								placeholder: "Konfirmasi kata sandi"
							}),
							/* @__PURE__ */ jsx(InputError, {
								message: errors.password_confirmation,
								className: "mt-2"
							})
						]
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "submit",
						className: "mt-4 w-full",
						disabled: processing,
						"data-test": "reset-password-button",
						children: [processing && /* @__PURE__ */ jsx(Spinner, {}), processing ? "Mereset kata sandi..." : "Reset kata sandi"]
					})
				]
			})
		})
	] });
}
ResetPassword.layout = {
	title: "Reset kata sandi",
	description: "Masukkan dan konfirmasi kata sandi baru untuk mengakses kembali akunmu."
};
//#endregion
export { ResetPassword as default };

//# sourceMappingURL=reset-password-5wjZrbRD.js.map