import { t as Button } from "./button-D_r5eKEZ.js";
import { n as queryParams } from "./wayfinder-Bgbpuenu.js";
import { a as home, s as login } from "./routes-EPw8WZ-p.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { t as PasswordInput } from "./password-input-BX5lEUa-.js";
import { t as Spinner } from "./spinner-DkICJePw.js";
import { t as TextLink } from "./text-link-Dxbs4vvP.js";
import { Form, Head } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/routes/register/index.ts
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::store
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:53
* @route '/register'
*/
var store = (options) => ({
	url: store.url(options),
	method: "post"
});
store.definition = {
	methods: ["post"],
	url: "/register"
};
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::store
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:53
* @route '/register'
*/
store.url = (options) => {
	return store.definition.url + queryParams(options);
};
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::store
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:53
* @route '/register'
*/
store.post = (options) => ({
	url: store.url(options),
	method: "post"
});
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::store
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:53
* @route '/register'
*/
var storeForm = (options) => ({
	action: store.url(options),
	method: "post"
});
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::store
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:53
* @route '/register'
*/
storeForm.post = (options) => ({
	action: store.url(options),
	method: "post"
});
store.form = storeForm;
Object.assign(store, store);
//#endregion
//#region resources/js/pages/auth/register.tsx
function Register() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Daftar" }), /* @__PURE__ */ jsx(Form, {
		...store.form(),
		resetOnSuccess: ["password", "password_confirmation"],
		disableWhileProcessing: true,
		className: "flex flex-col gap-5",
		children: ({ processing, errors }) => /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-2.5",
					children: [
						/* @__PURE__ */ jsx("label", {
							htmlFor: "name",
							className: "text-[12px] font-extrabold tracking-[0.14em] text-[#1A1A1A] uppercase",
							children: "Full name"
						}),
						/* @__PURE__ */ jsx("input", {
							id: "name",
							type: "text",
							required: true,
							autoFocus: true,
							tabIndex: 1,
							autoComplete: "name",
							name: "name",
							placeholder: "Enter your full name",
							className: "h-[52px] w-full border border-[#CFCFCF] bg-white px-4 text-[15px] font-medium text-[#1A1A1A] outline-none placeholder:text-[#9A9A9A] focus:border-[#1A1A1A]"
						}),
						/* @__PURE__ */ jsx(InputError, {
							message: errors.name,
							className: "mt-0"
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-2.5",
					children: [
						/* @__PURE__ */ jsx("label", {
							htmlFor: "email",
							className: "text-[12px] font-extrabold tracking-[0.14em] text-[#1A1A1A] uppercase",
							children: "Email address"
						}),
						/* @__PURE__ */ jsx("input", {
							id: "email",
							type: "email",
							required: true,
							tabIndex: 2,
							autoComplete: "email",
							name: "email",
							placeholder: "Enter your email",
							className: "h-[52px] w-full border border-[#CFCFCF] bg-white px-4 text-[15px] font-medium text-[#1A1A1A] outline-none placeholder:text-[#9A9A9A] focus:border-[#1A1A1A]"
						}),
						/* @__PURE__ */ jsx(InputError, { message: errors.email })
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-2.5",
					children: [
						/* @__PURE__ */ jsx("label", {
							htmlFor: "password",
							className: "text-[12px] font-extrabold tracking-[0.14em] text-[#1A1A1A] uppercase",
							children: "Password"
						}),
						/* @__PURE__ */ jsx(PasswordInput, {
							id: "password",
							required: true,
							tabIndex: 3,
							autoComplete: "new-password",
							name: "password",
							placeholder: "Create your password",
							className: "h-[52px] rounded-none border-[#CFCFCF] bg-white pr-12 text-[15px] font-medium text-[#1A1A1A] placeholder:text-[#9A9A9A] focus-visible:border-[#1A1A1A] focus-visible:ring-0"
						}),
						/* @__PURE__ */ jsx(InputError, { message: errors.password })
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-2.5",
					children: [
						/* @__PURE__ */ jsx("label", {
							htmlFor: "password_confirmation",
							className: "text-[12px] font-extrabold tracking-[0.14em] text-[#1A1A1A] uppercase",
							children: "Confirm password"
						}),
						/* @__PURE__ */ jsx(PasswordInput, {
							id: "password_confirmation",
							required: true,
							tabIndex: 4,
							autoComplete: "new-password",
							name: "password_confirmation",
							placeholder: "Confirm your password",
							className: "h-[52px] rounded-none border-[#CFCFCF] bg-white pr-12 text-[15px] font-medium text-[#1A1A1A] placeholder:text-[#9A9A9A] focus-visible:border-[#1A1A1A] focus-visible:ring-0"
						}),
						/* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation })
					]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "submit",
					className: "mt-1 h-[52px] w-full rounded-none bg-[#F58220] text-[12px] font-extrabold tracking-[0.16em] text-white uppercase shadow-none hover:bg-[#E67312] focus-visible:ring-0",
					tabIndex: 5,
					disabled: processing,
					"data-test": "register-user-button",
					children: [processing && /* @__PURE__ */ jsx(Spinner, {}), "Create account"]
				})
			]
		}), /* @__PURE__ */ jsxs("p", {
			className: "text-center text-sm font-medium text-[#707070]",
			children: [
				"Already have an account?",
				" ",
				/* @__PURE__ */ jsx(TextLink, {
					href: login(),
					tabIndex: 6,
					className: "font-bold text-[#F58220] no-underline hover:text-[#E67312]",
					children: "Log In"
				})
			]
		})] })
	})] });
}
Register.layout = {
	title: "Create Account",
	description: "Set up your AxeGear account with your details below.",
	breadcrumbs: [
		{
			label: "Home",
			href: home()
		},
		{ label: "Account" },
		{ label: "Register" }
	],
	heroImage: {
		src: "/img/login-image.png",
		alt: "AxeGear athlete wearing mirrored performance eyewear"
	}
};
//#endregion
export { Register as default };

//# sourceMappingURL=register-QKAhYFMY.js.map