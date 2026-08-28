import { n as queryParams } from "./wayfinder-Bgbpuenu.js";
import { t as Heading } from "./heading-COoAH6p0.js";
import { Head } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/routes/appearance/index.ts
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/settings/appearance'
*/
var edit = (options) => ({
	url: edit.url(options),
	method: "get"
});
edit.definition = {
	methods: ["get", "head"],
	url: "/settings/appearance"
};
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/settings/appearance'
*/
edit.url = (options) => {
	return edit.definition.url + queryParams(options);
};
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/settings/appearance'
*/
edit.get = (options) => ({
	url: edit.url(options),
	method: "get"
});
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/settings/appearance'
*/
edit.head = (options) => ({
	url: edit.url(options),
	method: "head"
});
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/settings/appearance'
*/
var editForm = (options) => ({
	action: edit.url(options),
	method: "get"
});
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/settings/appearance'
*/
editForm.get = (options) => ({
	action: edit.url(options),
	method: "get"
});
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/settings/appearance'
*/
editForm.head = (options) => ({
	action: edit.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
edit.form = editForm;
Object.assign(edit, edit);
//#endregion
//#region resources/js/pages/settings/appearance.tsx
function Appearance() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Pengaturan tampilan" }),
		/* @__PURE__ */ jsx("h1", {
			className: "sr-only",
			children: "Pengaturan tampilan"
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ jsx(Heading, {
				variant: "small",
				title: "Pengaturan tampilan",
				description: "Tampilan dikunci ke mode terang untuk seluruh situs"
			}), /* @__PURE__ */ jsx("div", {
				className: "rounded-xl border border-[#e7e2de] bg-[#F8F0E5] p-4 text-sm leading-relaxed text-[#6f6f6f]",
				children: "Situs ini sekarang hanya memakai mode terang. Mode gelap dan pengalihan tema sistem telah dinonaktifkan secara global."
			})]
		})
	] });
}
Appearance.layout = { breadcrumbs: [{
	title: "Pengaturan tampilan",
	href: edit()
}] };
//#endregion
export { Appearance as default };

//# sourceMappingURL=appearance-BTBhwzQK.js.map