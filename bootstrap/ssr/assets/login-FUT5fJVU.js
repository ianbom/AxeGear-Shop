import { t as cn } from "./utils-DJjaB2Tv.js";
import { t as Button } from "./button-D_r5eKEZ.js";
import { n as queryParams } from "./wayfinder-Bgbpuenu.js";
import { a as home, l as register } from "./routes-EPw8WZ-p.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { t as PasswordInput } from "./password-input-BX5lEUa-.js";
import { t as Spinner } from "./spinner-DkICJePw.js";
import { t as TextLink } from "./text-link-Dxbs4vvP.js";
import { n as request } from "./password-Cj7-bejK.js";
import { Form, Head } from "@inertiajs/react";
import "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { CheckIcon } from "lucide-react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
//#region resources/js/components/ui/checkbox.tsx
function Checkbox({ className, ...props }) {
	return /* @__PURE__ */ jsx(CheckboxPrimitive.Root, {
		"data-slot": "checkbox",
		className: cn("peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, {
			"data-slot": "checkbox-indicator",
			className: "flex items-center justify-center text-current transition-none",
			children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5" })
		})
	});
}
//#endregion
//#region resources/js/routes/auth/google/index.ts
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::redirect
* @see app/Http/Controllers/Auth/GoogleAuthController.php:15
* @route '/auth/google'
*/
var redirect = (options) => ({
	url: redirect.url(options),
	method: "get"
});
redirect.definition = {
	methods: ["get", "head"],
	url: "/auth/google"
};
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::redirect
* @see app/Http/Controllers/Auth/GoogleAuthController.php:15
* @route '/auth/google'
*/
redirect.url = (options) => {
	return redirect.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::redirect
* @see app/Http/Controllers/Auth/GoogleAuthController.php:15
* @route '/auth/google'
*/
redirect.get = (options) => ({
	url: redirect.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::redirect
* @see app/Http/Controllers/Auth/GoogleAuthController.php:15
* @route '/auth/google'
*/
redirect.head = (options) => ({
	url: redirect.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::redirect
* @see app/Http/Controllers/Auth/GoogleAuthController.php:15
* @route '/auth/google'
*/
var redirectForm = (options) => ({
	action: redirect.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::redirect
* @see app/Http/Controllers/Auth/GoogleAuthController.php:15
* @route '/auth/google'
*/
redirectForm.get = (options) => ({
	action: redirect.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::redirect
* @see app/Http/Controllers/Auth/GoogleAuthController.php:15
* @route '/auth/google'
*/
redirectForm.head = (options) => ({
	action: redirect.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
redirect.form = redirectForm;
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::callback
* @see app/Http/Controllers/Auth/GoogleAuthController.php:20
* @route '/auth/google/callback'
*/
var callback = (options) => ({
	url: callback.url(options),
	method: "get"
});
callback.definition = {
	methods: ["get", "head"],
	url: "/auth/google/callback"
};
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::callback
* @see app/Http/Controllers/Auth/GoogleAuthController.php:20
* @route '/auth/google/callback'
*/
callback.url = (options) => {
	return callback.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::callback
* @see app/Http/Controllers/Auth/GoogleAuthController.php:20
* @route '/auth/google/callback'
*/
callback.get = (options) => ({
	url: callback.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::callback
* @see app/Http/Controllers/Auth/GoogleAuthController.php:20
* @route '/auth/google/callback'
*/
callback.head = (options) => ({
	url: callback.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::callback
* @see app/Http/Controllers/Auth/GoogleAuthController.php:20
* @route '/auth/google/callback'
*/
var callbackForm = (options) => ({
	action: callback.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::callback
* @see app/Http/Controllers/Auth/GoogleAuthController.php:20
* @route '/auth/google/callback'
*/
callbackForm.get = (options) => ({
	action: callback.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::callback
* @see app/Http/Controllers/Auth/GoogleAuthController.php:20
* @route '/auth/google/callback'
*/
callbackForm.head = (options) => ({
	action: callback.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
callback.form = callbackForm;
Object.assign(redirect, redirect), Object.assign(callback, callback);
//#endregion
//#region resources/js/routes/login/index.ts
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::store
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:58
* @route '/login'
*/
var store = (options) => ({
	url: store.url(options),
	method: "post"
});
store.definition = {
	methods: ["post"],
	url: "/login"
};
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::store
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:58
* @route '/login'
*/
store.url = (options) => {
	return store.definition.url + queryParams(options);
};
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::store
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:58
* @route '/login'
*/
store.post = (options) => ({
	url: store.url(options),
	method: "post"
});
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::store
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:58
* @route '/login'
*/
var storeForm = (options) => ({
	action: store.url(options),
	method: "post"
});
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::store
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:58
* @route '/login'
*/
storeForm.post = (options) => ({
	action: store.url(options),
	method: "post"
});
store.form = storeForm;
Object.assign(store, store);
//#endregion
//#region resources/js/pages/auth/login.tsx
function Login({ status, canResetPassword, canRegister }) {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Head, { title: "Masuk" }), /* @__PURE__ */ jsx(Form, {
		...store.form(),
		resetOnSuccess: ["password"],
		className: "flex flex-col gap-5",
		children: ({ processing, errors }) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
			status && /* @__PURE__ */ jsx("div", {
				className: "border border-[#F7B06A] bg-[#FFF3E8] px-4 py-3 text-sm font-semibold text-[#1A1A1A]",
				children: status
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [
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
								name: "email",
								required: true,
								autoFocus: true,
								tabIndex: 1,
								autoComplete: "email",
								placeholder: "Enter your email",
								className: "h-[52px] w-full border border-[#CFCFCF] bg-white px-4 text-[15px] font-medium text-[#1A1A1A] outline-none placeholder:text-[#9A9A9A] focus:border-[#1A1A1A]"
							}),
							/* @__PURE__ */ jsx(InputError, { message: errors.email })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2.5",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ jsx("label", {
									htmlFor: "password",
									className: "text-[12px] font-extrabold tracking-[0.14em] text-[#1A1A1A] uppercase",
									children: "Password"
								}), canResetPassword && /* @__PURE__ */ jsx(TextLink, {
									href: request(),
									className: "text-[11px] font-bold tracking-[0.12em] text-[#F58220] no-underline uppercase hover:text-[#E67312]",
									tabIndex: 5,
									children: "Forgot password?"
								})]
							}),
							/* @__PURE__ */ jsx(PasswordInput, {
								id: "password",
								name: "password",
								required: true,
								tabIndex: 2,
								autoComplete: "current-password",
								placeholder: "Enter your password",
								className: "h-[52px] rounded-none border-[#CFCFCF] bg-white pr-12 text-[15px] font-medium text-[#1A1A1A] placeholder:text-[#9A9A9A] focus-visible:border-[#1A1A1A] focus-visible:ring-0"
							}),
							/* @__PURE__ */ jsx(InputError, { message: errors.password })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 pt-1",
						children: [/* @__PURE__ */ jsx(Checkbox, {
							id: "remember",
							name: "remember",
							tabIndex: 3,
							className: "size-4 rounded-none border-[#1A1A1A] data-[state=checked]:border-[#F58220] data-[state=checked]:bg-[#F58220]"
						}), /* @__PURE__ */ jsx("label", {
							htmlFor: "remember",
							className: "text-sm font-medium text-[#2E2E2E]",
							children: "Remember me"
						})]
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "submit",
						className: "mt-1 h-[52px] w-full rounded-none bg-[#F58220] text-[12px] font-extrabold tracking-[0.16em] text-white uppercase shadow-none hover:bg-[#E67312] focus-visible:ring-0",
						tabIndex: 4,
						disabled: processing,
						"data-test": "login-button",
						children: [processing && /* @__PURE__ */ jsx(Spinner, {}), "Sign in"]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative py-1 text-center",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-1/2 border-t border-[#E5E5E5]" }), /* @__PURE__ */ jsx("span", {
					className: "relative bg-white px-4 text-sm font-medium text-[#707070]",
					children: "or"
				})]
			}),
			/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				className: "h-[52px] w-full rounded-none border-[#1A1A1A] bg-white text-[12px] font-extrabold tracking-[0.12em] text-[#1A1A1A] uppercase shadow-none hover:bg-[#1A1A1A] hover:text-white",
				tabIndex: 1,
				onClick: () => {
					window.location.href = redirect.url();
				},
				children: [/* @__PURE__ */ jsx("svg", {
					"aria-hidden": "true",
					className: "size-4",
					viewBox: "0 0 24 24",
					children: /* @__PURE__ */ jsx("path", {
						fill: "currentColor",
						d: "M21.35 11.1h-9.18v2.98h5.29c-.23 1.6-1.6 4.69-5.29 4.69-3.18 0-5.78-2.63-5.78-5.88S8.99 7 12.17 7c1.81 0 3.03.77 3.72 1.44l2.53-2.44c-1.62-1.51-3.72-2.44-6.25-2.44C7.01 3.56 2.82 7.74 2.82 12.9s4.19 9.34 9.35 9.34c5.39 0 8.96-3.79 8.96-9.13 0-.61-.07-1.08-.15-1.55z"
					})
				}), "Sign in with Google"]
			}),
			canRegister && /* @__PURE__ */ jsxs("p", {
				className: "text-center text-sm font-medium text-[#707070]",
				children: [
					"Don't have an account?",
					" ",
					/* @__PURE__ */ jsx(TextLink, {
						href: register(),
						tabIndex: 5,
						className: "font-bold text-[#F58220] no-underline hover:text-[#E67312]",
						children: "Create Account"
					})
				]
			})
		] })
	})] });
}
Login.layout = {
	title: "Log In",
	description: "Welcome back. Enter your details below to access your AxeGear account.",
	breadcrumbs: [
		{
			label: "Home",
			href: home()
		},
		{ label: "Account" },
		{ label: "Login" }
	],
	heroImage: {
		src: "/img/login-image.png",
		alt: "AxeGear athlete wearing mirrored performance eyewear"
	}
};
//#endregion
export { Login as default };

//# sourceMappingURL=login-FUT5fJVU.js.map