import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-Bgbpuenu.js";
import { t as shipments } from "./shipments-dh7lLV49.js";
//#region resources/js/routes/admin/orders/index.ts
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:17
* @route '/admin/orders'
*/
var index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/admin/orders"
};
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:17
* @route '/admin/orders'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:17
* @route '/admin/orders'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:17
* @route '/admin/orders'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:17
* @route '/admin/orders'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:17
* @route '/admin/orders'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:17
* @route '/admin/orders'
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
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:22
* @route '/admin/orders/{order}'
*/
var show = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
show.definition = {
	methods: ["get", "head"],
	url: "/admin/orders/{order}"
};
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:22
* @route '/admin/orders/{order}'
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
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:22
* @route '/admin/orders/{order}'
*/
show.get = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:22
* @route '/admin/orders/{order}'
*/
show.head = (args, options) => ({
	url: show.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:22
* @route '/admin/orders/{order}'
*/
var showForm = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:22
* @route '/admin/orders/{order}'
*/
showForm.get = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:22
* @route '/admin/orders/{order}'
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
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:35
* @route '/admin/orders/{order}/status'
*/
var status = (args, options) => ({
	url: status.url(args, options),
	method: "post"
});
status.definition = {
	methods: ["post"],
	url: "/admin/orders/{order}/status"
};
/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:35
* @route '/admin/orders/{order}/status'
*/
status.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { order: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { order: args.id };
	if (Array.isArray(args)) args = { order: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { order: typeof args.order === "object" ? args.order.id : args.order };
	return status.definition.url.replace("{order}", parsedArgs.order.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:35
* @route '/admin/orders/{order}/status'
*/
status.post = (args, options) => ({
	url: status.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:35
* @route '/admin/orders/{order}/status'
*/
var statusForm = (args, options) => ({
	action: status.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:35
* @route '/admin/orders/{order}/status'
*/
statusForm.post = (args, options) => ({
	action: status.url(args, options),
	method: "post"
});
status.form = statusForm;
/**
* @see \App\Http\Controllers\Admin\OrderController::notes
* @see app/Http/Controllers/Admin/OrderController.php:42
* @route '/admin/orders/{order}/notes'
*/
var notes = (args, options) => ({
	url: notes.url(args, options),
	method: "post"
});
notes.definition = {
	methods: ["post"],
	url: "/admin/orders/{order}/notes"
};
/**
* @see \App\Http\Controllers\Admin\OrderController::notes
* @see app/Http/Controllers/Admin/OrderController.php:42
* @route '/admin/orders/{order}/notes'
*/
notes.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { order: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { order: args.id };
	if (Array.isArray(args)) args = { order: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { order: typeof args.order === "object" ? args.order.id : args.order };
	return notes.definition.url.replace("{order}", parsedArgs.order.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\OrderController::notes
* @see app/Http/Controllers/Admin/OrderController.php:42
* @route '/admin/orders/{order}/notes'
*/
notes.post = (args, options) => ({
	url: notes.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::notes
* @see app/Http/Controllers/Admin/OrderController.php:42
* @route '/admin/orders/{order}/notes'
*/
var notesForm = (args, options) => ({
	action: notes.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::notes
* @see app/Http/Controllers/Admin/OrderController.php:42
* @route '/admin/orders/{order}/notes'
*/
notesForm.post = (args, options) => ({
	action: notes.url(args, options),
	method: "post"
});
notes.form = notesForm;
var orders = {
	index: Object.assign(index, index),
	show: Object.assign(show, show),
	status: Object.assign(status, status),
	notes: Object.assign(notes, notes),
	shipments: Object.assign(shipments, shipments)
};
//#endregion
export { show as n, orders as t };

//# sourceMappingURL=orders-CldERAHy.js.map