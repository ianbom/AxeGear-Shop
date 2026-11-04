import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-Bgbpuenu.js";
//#region resources/js/routes/admin/shipments/index.ts
/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
var index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/admin/shipments"
};
/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
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
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
var show = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
show.definition = {
	methods: ["get", "head"],
	url: "/admin/shipments/{shipment}"
};
/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
show.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { shipment: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { shipment: args.id };
	if (Array.isArray(args)) args = { shipment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { shipment: typeof args.shipment === "object" ? args.shipment.id : args.shipment };
	return show.definition.url.replace("{shipment}", parsedArgs.shipment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
show.get = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
show.head = (args, options) => ({
	url: show.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
var showForm = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
showForm.get = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
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
* @see \App\Http\Controllers\Admin\ShipmentController::status
* @see app/Http/Controllers/Admin/ShipmentController.php:48
* @route '/admin/shipments/{shipment}/status'
*/
var status = (args, options) => ({
	url: status.url(args, options),
	method: "post"
});
status.definition = {
	methods: ["post"],
	url: "/admin/shipments/{shipment}/status"
};
/**
* @see \App\Http\Controllers\Admin\ShipmentController::status
* @see app/Http/Controllers/Admin/ShipmentController.php:48
* @route '/admin/shipments/{shipment}/status'
*/
status.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { shipment: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { shipment: args.id };
	if (Array.isArray(args)) args = { shipment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { shipment: typeof args.shipment === "object" ? args.shipment.id : args.shipment };
	return status.definition.url.replace("{shipment}", parsedArgs.shipment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ShipmentController::status
* @see app/Http/Controllers/Admin/ShipmentController.php:48
* @route '/admin/shipments/{shipment}/status'
*/
status.post = (args, options) => ({
	url: status.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::status
* @see app/Http/Controllers/Admin/ShipmentController.php:48
* @route '/admin/shipments/{shipment}/status'
*/
var statusForm = (args, options) => ({
	action: status.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::status
* @see app/Http/Controllers/Admin/ShipmentController.php:48
* @route '/admin/shipments/{shipment}/status'
*/
statusForm.post = (args, options) => ({
	action: status.url(args, options),
	method: "post"
});
status.form = statusForm;
/**
* @see \App\Http\Controllers\Admin\ShipmentController::refreshTracking
* @see app/Http/Controllers/Admin/ShipmentController.php:55
* @route '/admin/shipments/{shipment}/refresh-tracking'
*/
var refreshTracking = (args, options) => ({
	url: refreshTracking.url(args, options),
	method: "post"
});
refreshTracking.definition = {
	methods: ["post"],
	url: "/admin/shipments/{shipment}/refresh-tracking"
};
/**
* @see \App\Http\Controllers\Admin\ShipmentController::refreshTracking
* @see app/Http/Controllers/Admin/ShipmentController.php:55
* @route '/admin/shipments/{shipment}/refresh-tracking'
*/
refreshTracking.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { shipment: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { shipment: args.id };
	if (Array.isArray(args)) args = { shipment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { shipment: typeof args.shipment === "object" ? args.shipment.id : args.shipment };
	return refreshTracking.definition.url.replace("{shipment}", parsedArgs.shipment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ShipmentController::refreshTracking
* @see app/Http/Controllers/Admin/ShipmentController.php:55
* @route '/admin/shipments/{shipment}/refresh-tracking'
*/
refreshTracking.post = (args, options) => ({
	url: refreshTracking.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::refreshTracking
* @see app/Http/Controllers/Admin/ShipmentController.php:55
* @route '/admin/shipments/{shipment}/refresh-tracking'
*/
var refreshTrackingForm = (args, options) => ({
	action: refreshTracking.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::refreshTracking
* @see app/Http/Controllers/Admin/ShipmentController.php:55
* @route '/admin/shipments/{shipment}/refresh-tracking'
*/
refreshTrackingForm.post = (args, options) => ({
	action: refreshTracking.url(args, options),
	method: "post"
});
refreshTracking.form = refreshTrackingForm;
var shipments = {
	index: Object.assign(index, index),
	show: Object.assign(show, show),
	status: Object.assign(status, status),
	refreshTracking: Object.assign(refreshTracking, refreshTracking)
};
//#endregion
export { status as i, shipments as n, show as r, refreshTracking as t };

//# sourceMappingURL=shipments-KqkAnATK.js.map