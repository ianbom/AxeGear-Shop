import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-Bgbpuenu.js";
//#region resources/js/actions/App/Http/Controllers/Customer/WishlistController.ts
/**
* @see \App\Http\Controllers\Customer\WishlistController::index
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
var index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/wishlist"
};
/**
* @see \App\Http\Controllers\Customer\WishlistController::index
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\WishlistController::index
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\WishlistController::index
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\WishlistController::index
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\WishlistController::index
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\WishlistController::index
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
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
* @see \App\Http\Controllers\Customer\WishlistController::store
* @see app/Http/Controllers/Customer/WishlistController.php:29
* @route '/wishlist/{product}'
*/
var store = (args, options) => ({
	url: store.url(args, options),
	method: "post"
});
store.definition = {
	methods: ["post"],
	url: "/wishlist/{product}"
};
/**
* @see \App\Http\Controllers\Customer\WishlistController::store
* @see app/Http/Controllers/Customer/WishlistController.php:29
* @route '/wishlist/{product}'
*/
store.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { product: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { product: args.id };
	if (Array.isArray(args)) args = { product: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { product: typeof args.product === "object" ? args.product.id : args.product };
	return store.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\WishlistController::store
* @see app/Http/Controllers/Customer/WishlistController.php:29
* @route '/wishlist/{product}'
*/
store.post = (args, options) => ({
	url: store.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\WishlistController::store
* @see app/Http/Controllers/Customer/WishlistController.php:29
* @route '/wishlist/{product}'
*/
var storeForm = (args, options) => ({
	action: store.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\WishlistController::store
* @see app/Http/Controllers/Customer/WishlistController.php:29
* @route '/wishlist/{product}'
*/
storeForm.post = (args, options) => ({
	action: store.url(args, options),
	method: "post"
});
store.form = storeForm;
/**
* @see \App\Http\Controllers\Customer\WishlistController::destroyProduct
* @see app/Http/Controllers/Customer/WishlistController.php:46
* @route '/wishlist/products/{product}'
*/
var destroyProduct = (args, options) => ({
	url: destroyProduct.url(args, options),
	method: "delete"
});
destroyProduct.definition = {
	methods: ["delete"],
	url: "/wishlist/products/{product}"
};
/**
* @see \App\Http\Controllers\Customer\WishlistController::destroyProduct
* @see app/Http/Controllers/Customer/WishlistController.php:46
* @route '/wishlist/products/{product}'
*/
destroyProduct.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { product: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { product: args.id };
	if (Array.isArray(args)) args = { product: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { product: typeof args.product === "object" ? args.product.id : args.product };
	return destroyProduct.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\WishlistController::destroyProduct
* @see app/Http/Controllers/Customer/WishlistController.php:46
* @route '/wishlist/products/{product}'
*/
destroyProduct.delete = (args, options) => ({
	url: destroyProduct.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\Customer\WishlistController::destroyProduct
* @see app/Http/Controllers/Customer/WishlistController.php:46
* @route '/wishlist/products/{product}'
*/
var destroyProductForm = (args, options) => ({
	action: destroyProduct.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\WishlistController::destroyProduct
* @see app/Http/Controllers/Customer/WishlistController.php:46
* @route '/wishlist/products/{product}'
*/
destroyProductForm.delete = (args, options) => ({
	action: destroyProduct.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroyProduct.form = destroyProductForm;
/**
* @see \App\Http\Controllers\Customer\WishlistController::destroy
* @see app/Http/Controllers/Customer/WishlistController.php:22
* @route '/wishlist/{wishlist}'
*/
var destroy = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
destroy.definition = {
	methods: ["delete"],
	url: "/wishlist/{wishlist}"
};
/**
* @see \App\Http\Controllers\Customer\WishlistController::destroy
* @see app/Http/Controllers/Customer/WishlistController.php:22
* @route '/wishlist/{wishlist}'
*/
destroy.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { wishlist: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { wishlist: args.id };
	if (Array.isArray(args)) args = { wishlist: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { wishlist: typeof args.wishlist === "object" ? args.wishlist.id : args.wishlist };
	return destroy.definition.url.replace("{wishlist}", parsedArgs.wishlist.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\WishlistController::destroy
* @see app/Http/Controllers/Customer/WishlistController.php:22
* @route '/wishlist/{wishlist}'
*/
destroy.delete = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\Customer\WishlistController::destroy
* @see app/Http/Controllers/Customer/WishlistController.php:22
* @route '/wishlist/{wishlist}'
*/
var destroyForm = (args, options) => ({
	action: destroy.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\WishlistController::destroy
* @see app/Http/Controllers/Customer/WishlistController.php:22
* @route '/wishlist/{wishlist}'
*/
destroyForm.delete = (args, options) => ({
	action: destroy.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy.form = destroyForm;
//#endregion
export { destroyProduct as n, store as r, destroy as t };

//# sourceMappingURL=WishlistController-DHNxYZQ_.js.map