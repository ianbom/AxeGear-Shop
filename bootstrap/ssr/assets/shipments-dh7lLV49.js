import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-Bgbpuenu.js";
//#region resources/js/routes/admin/orders/shipments/index.ts
/**
* @see \App\Http\Controllers\Admin\ShipmentController::store
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
var store = (args, options) => ({
	url: store.url(args, options),
	method: "post"
});
store.definition = {
	methods: ["post"],
	url: "/admin/orders/{order}/shipments"
};
/**
* @see \App\Http\Controllers\Admin\ShipmentController::store
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
store.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { order: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { order: args.id };
	if (Array.isArray(args)) args = { order: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { order: typeof args.order === "object" ? args.order.id : args.order };
	return store.definition.url.replace("{order}", parsedArgs.order.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ShipmentController::store
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
store.post = (args, options) => ({
	url: store.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::store
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
var storeForm = (args, options) => ({
	action: store.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::store
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
storeForm.post = (args, options) => ({
	action: store.url(args, options),
	method: "post"
});
store.form = storeForm;
var shipments = { store: Object.assign(store, store) };
//#endregion
export { store as n, shipments as t };

//# sourceMappingURL=shipments-dh7lLV49.js.map