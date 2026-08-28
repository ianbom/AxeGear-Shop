import { t as Button } from "./button-D_r5eKEZ.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { t as PasswordInput } from "./password-input-BX5lEUa-.js";
import { t as Spinner } from "./spinner-DkICJePw.js";
import { n as store } from "./confirm-DVUCJTS3.js";
import { Form, Head } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/pages/auth/confirm-password.tsx
function ConfirmPassword() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Konfirmasi kata sandi" }), /* @__PURE__ */ jsx(Form, {
		...store.form(),
		resetOnSuccess: ["password"],
		children: ({ processing, errors }) => /* @__PURE__ */ jsxs("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ jsx(Label, {
						htmlFor: "password",
						children: "Kata sandi"
					}),
					/* @__PURE__ */ jsx(PasswordInput, {
						id: "password",
						name: "password",
						placeholder: "Kata sandi",
						autoComplete: "current-password",
						autoFocus: true
					}),
					/* @__PURE__ */ jsx(InputError, { message: errors.password })
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "flex items-center",
				children: /* @__PURE__ */ jsxs(Button, {
					className: "w-full",
					disabled: processing,
					"data-test": "confirm-password-button",
					children: [processing && /* @__PURE__ */ jsx(Spinner, {}), "Konfirmasi kata sandi"]
				})
			})]
		})
	})] });
}
ConfirmPassword.layout = {
	title: "Konfirmasi kata sandi",
	description: "Ini area aman aplikasi. Konfirmasi kata sandi sebelum melanjutkan."
};
//#endregion
export { ConfirmPassword as default };

//# sourceMappingURL=confirm-password-BJF4RJeS.js.map