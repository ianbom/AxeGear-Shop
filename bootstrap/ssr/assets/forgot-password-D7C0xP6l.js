import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { s as login } from "./routes-EPw8WZ-p.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { t as TextLink } from "./text-link-Dxbs4vvP.js";
import { t as email } from "./password-Cj7-bejK.js";
import { Form, Head } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { LoaderCircle } from "lucide-react";
//#region resources/js/pages/auth/forgot-password.tsx
function ForgotPassword({ status }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Lupa kata sandi" }),
		status && /* @__PURE__ */ jsx("div", {
			className: "mb-4 text-center text-sm font-medium text-green-600",
			children: status
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ jsx(Form, {
				...email.form(),
				children: ({ processing, errors }) => /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
					className: "grid gap-2",
					children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "email",
							children: "Alamat email"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "email",
							type: "email",
							name: "email",
							autoComplete: "off",
							autoFocus: true,
							placeholder: "email@example.com"
						}),
						/* @__PURE__ */ jsx(InputError, { message: errors.email })
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "my-6 flex items-center justify-start",
					children: /* @__PURE__ */ jsxs(Button, {
						className: "w-full",
						disabled: processing,
						"data-test": "email-password-reset-link-button",
						children: [processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Kirim tautan reset kata sandi"]
					})
				})] })
			}), /* @__PURE__ */ jsxs("div", {
				className: "space-x-1 text-center text-sm text-muted-foreground",
				children: [/* @__PURE__ */ jsx("span", { children: "Atau, kembali ke" }), /* @__PURE__ */ jsx(TextLink, {
					href: login(),
					children: "masuk"
				})]
			})]
		})
	] });
}
ForgotPassword.layout = {
	title: "Lupa kata sandi",
	description: "Masukkan email untuk menerima tautan reset kata sandi"
};
//#endregion
export { ForgotPassword as default };

//# sourceMappingURL=forgot-password-D7C0xP6l.js.map