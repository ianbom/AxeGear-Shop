import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-Bgbpuenu.js";
//#region resources/js/routes/admin/payments/index.ts
/**
* @see \App\Http\Controllers\Admin\PaymentController::index
* @see app/Http/Controllers/Admin/PaymentController.php:14
* @route '/admin/payments'
*/
var index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/admin/payments"
};
/**
* @see \App\Http\Controllers\Admin\PaymentController::index
* @see app/Http/Controllers/Admin/PaymentController.php:14
* @route '/admin/payments'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\PaymentController::index
* @see app/Http/Controllers/Admin/PaymentController.php:14
* @route '/admin/payments'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::index
* @see app/Http/Controllers/Admin/PaymentController.php:14
* @route '/admin/payments'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::index
* @see app/Http/Controllers/Admin/PaymentController.php:14
* @route '/admin/payments'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::index
* @see app/Http/Controllers/Admin/PaymentController.php:14
* @route '/admin/payments'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::index
* @see app/Http/Controllers/Admin/PaymentController.php:14
* @route '/admin/payments'
*/
indexForm.head = (options) => ({
	action: index.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index.form = indexForm;
/**
* @see \App\Http\Controllers\Admin\PaymentController::show
* @see app/Http/Controllers/Admin/PaymentController.php:19
* @route '/admin/payments/{payment}'
*/
var show = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
show.definition = {
	methods: ["get", "head"],
	url: "/admin/payments/{payment}"
};
/**
* @see \App\Http\Controllers\Admin\PaymentController::show
* @see app/Http/Controllers/Admin/PaymentController.php:19
* @route '/admin/payments/{payment}'
*/
show.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { payment: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { payment: args.id };
	if (Array.isArray(args)) args = { payment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { payment: typeof args.payment === "object" ? args.payment.id : args.payment };
	return show.definition.url.replace("{payment}", parsedArgs.payment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\PaymentController::show
* @see app/Http/Controllers/Admin/PaymentController.php:19
* @route '/admin/payments/{payment}'
*/
show.get = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::show
* @see app/Http/Controllers/Admin/PaymentController.php:19
* @route '/admin/payments/{payment}'
*/
show.head = (args, options) => ({
	url: show.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::show
* @see app/Http/Controllers/Admin/PaymentController.php:19
* @route '/admin/payments/{payment}'
*/
var showForm = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::show
* @see app/Http/Controllers/Admin/PaymentController.php:19
* @route '/admin/payments/{payment}'
*/
showForm.get = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::show
* @see app/Http/Controllers/Admin/PaymentController.php:19
* @route '/admin/payments/{payment}'
*/
showForm.head = (args, options) => ({
	action: show.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
show.form = showForm;
/**
* @see \App\Http\Controllers\Admin\PaymentController::sync
* @see app/Http/Controllers/Admin/PaymentController.php:24
* @route '/admin/payments/{payment}/sync'
*/
var sync = (args, options) => ({
	url: sync.url(args, options),
	method: "post"
});
sync.definition = {
	methods: ["post"],
	url: "/admin/payments/{payment}/sync"
};
/**
* @see \App\Http\Controllers\Admin\PaymentController::sync
* @see app/Http/Controllers/Admin/PaymentController.php:24
* @route '/admin/payments/{payment}/sync'
*/
sync.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { payment: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { payment: args.id };
	if (Array.isArray(args)) args = { payment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { payment: typeof args.payment === "object" ? args.payment.id : args.payment };
	return sync.definition.url.replace("{payment}", parsedArgs.payment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\PaymentController::sync
* @see app/Http/Controllers/Admin/PaymentController.php:24
* @route '/admin/payments/{payment}/sync'
*/
sync.post = (args, options) => ({
	url: sync.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::sync
* @see app/Http/Controllers/Admin/PaymentController.php:24
* @route '/admin/payments/{payment}/sync'
*/
var syncForm = (args, options) => ({
	action: sync.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::sync
* @see app/Http/Controllers/Admin/PaymentController.php:24
* @route '/admin/payments/{payment}/sync'
*/
syncForm.post = (args, options) => ({
	action: sync.url(args, options),
	method: "post"
});
sync.form = syncForm;
var payments = {
	index: Object.assign(index, index),
	show: Object.assign(show, show),
	sync: Object.assign(sync, sync)
};
//#endregion
export { show as n, sync as r, payments as t };

//# sourceMappingURL=payments-BVs7ru9w.js.map