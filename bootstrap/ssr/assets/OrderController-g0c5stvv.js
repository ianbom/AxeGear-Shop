import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-Bgbpuenu.js";
//#region resources/js/actions/App/Http/Controllers/Customer/OrderController.ts
/**
* @see \App\Http\Controllers\Customer\OrderController::index
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
var index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/my-order"
};
/**
* @see \App\Http\Controllers\Customer\OrderController::index
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\OrderController::index
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\OrderController::index
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\OrderController::index
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\OrderController::index
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\OrderController::index
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
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
* @see \App\Http\Controllers\Customer\OrderController::show
* @see app/Http/Controllers/Customer/OrderController.php:20
* @route '/my-order/{order}'
*/
var show = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
show.definition = {
	methods: ["get", "head"],
	url: "/my-order/{order}"
};
/**
* @see \App\Http\Controllers\Customer\OrderController::show
* @see app/Http/Controllers/Customer/OrderController.php:20
* @route '/my-order/{order}'
*/
show.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { order: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { order: args.id };
	if (Array.isArray(args)) args = { order: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { order: typeof args.order === "object" ? args.order.id : args.order };
	return show.definition.url.replace("{order}", parsedArgs.order.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\OrderController::show
* @see app/Http/Controllers/Customer/OrderController.php:20
* @route '/my-order/{order}'
*/
show.get = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\OrderController::show
* @see app/Http/Controllers/Customer/OrderController.php:20
* @route '/my-order/{order}'
*/
show.head = (args, options) => ({
	url: show.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\OrderController::show
* @see app/Http/Controllers/Customer/OrderController.php:20
* @route '/my-order/{order}'
*/
var showForm = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\OrderController::show
* @see app/Http/Controllers/Customer/OrderController.php:20
* @route '/my-order/{order}'
*/
showForm.get = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\OrderController::show
* @see app/Http/Controllers/Customer/OrderController.php:20
* @route '/my-order/{order}'
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
* @see \App\Http\Controllers\Customer\OrderController::cancel
* @see app/Http/Controllers/Customer/OrderController.php:25
* @route '/my-order/{order}/cancel'
*/
var cancel = (args, options) => ({
	url: cancel.url(args, options),
	method: "post"
});
cancel.definition = {
	methods: ["post"],
	url: "/my-order/{order}/cancel"
};
/**
* @see \App\Http\Controllers\Customer\OrderController::cancel
* @see app/Http/Controllers/Customer/OrderController.php:25
* @route '/my-order/{order}/cancel'
*/
cancel.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { order: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { order: args.id };
	if (Array.isArray(args)) args = { order: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { order: typeof args.order === "object" ? args.order.id : args.order };
	return cancel.definition.url.replace("{order}", parsedArgs.order.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\OrderController::cancel
* @see app/Http/Controllers/Customer/OrderController.php:25
* @route '/my-order/{order}/cancel'
*/
cancel.post = (args, options) => ({
	url: cancel.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\OrderController::cancel
* @see app/Http/Controllers/Customer/OrderController.php:25
* @route '/my-order/{order}/cancel'
*/
var cancelForm = (args, options) => ({
	action: cancel.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\OrderController::cancel
* @see app/Http/Controllers/Customer/OrderController.php:25
* @route '/my-order/{order}/cancel'
*/
cancelForm.post = (args, options) => ({
	action: cancel.url(args, options),
	method: "post"
});
cancel.form = cancelForm;
//#endregion
export { index as n, show as r, cancel as t };

//# sourceMappingURL=OrderController-g0c5stvv.js.map