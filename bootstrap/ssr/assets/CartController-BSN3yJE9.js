import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-Bgbpuenu.js";
//#region resources/js/actions/App/Http/Controllers/Customer/CartController.ts
/**
* @see \App\Http\Controllers\Customer\CartController::index
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
var index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/my-cart"
};
/**
* @see \App\Http\Controllers\Customer\CartController::index
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\CartController::index
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\CartController::index
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\CartController::index
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\CartController::index
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\CartController::index
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
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
* @see \App\Http\Controllers\Customer\CartController::addProductVariantToCart
* @see app/Http/Controllers/Customer/CartController.php:23
* @route '/product-variants/{productVariant}/add-to-cart'
*/
var addProductVariantToCart = (args, options) => ({
	url: addProductVariantToCart.url(args, options),
	method: "post"
});
addProductVariantToCart.definition = {
	methods: ["post"],
	url: "/product-variants/{productVariant}/add-to-cart"
};
/**
* @see \App\Http\Controllers\Customer\CartController::addProductVariantToCart
* @see app/Http/Controllers/Customer/CartController.php:23
* @route '/product-variants/{productVariant}/add-to-cart'
*/
addProductVariantToCart.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { productVariant: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { productVariant: args.id };
	if (Array.isArray(args)) args = { productVariant: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { productVariant: typeof args.productVariant === "object" ? args.productVariant.id : args.productVariant };
	return addProductVariantToCart.definition.url.replace("{productVariant}", parsedArgs.productVariant.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\CartController::addProductVariantToCart
* @see app/Http/Controllers/Customer/CartController.php:23
* @route '/product-variants/{productVariant}/add-to-cart'
*/
addProductVariantToCart.post = (args, options) => ({
	url: addProductVariantToCart.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\CartController::addProductVariantToCart
* @see app/Http/Controllers/Customer/CartController.php:23
* @route '/product-variants/{productVariant}/add-to-cart'
*/
var addProductVariantToCartForm = (args, options) => ({
	action: addProductVariantToCart.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\CartController::addProductVariantToCart
* @see app/Http/Controllers/Customer/CartController.php:23
* @route '/product-variants/{productVariant}/add-to-cart'
*/
addProductVariantToCartForm.post = (args, options) => ({
	action: addProductVariantToCart.url(args, options),
	method: "post"
});
addProductVariantToCart.form = addProductVariantToCartForm;
/**
* @see \App\Http\Controllers\Customer\CartController::updateCartItemQuantity
* @see app/Http/Controllers/Customer/CartController.php:37
* @route '/cart-items/{cartItem}'
*/
var updateCartItemQuantity = (args, options) => ({
	url: updateCartItemQuantity.url(args, options),
	method: "patch"
});
updateCartItemQuantity.definition = {
	methods: ["patch"],
	url: "/cart-items/{cartItem}"
};
/**
* @see \App\Http\Controllers\Customer\CartController::updateCartItemQuantity
* @see app/Http/Controllers/Customer/CartController.php:37
* @route '/cart-items/{cartItem}'
*/
updateCartItemQuantity.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { cartItem: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { cartItem: args.id };
	if (Array.isArray(args)) args = { cartItem: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { cartItem: typeof args.cartItem === "object" ? args.cartItem.id : args.cartItem };
	return updateCartItemQuantity.definition.url.replace("{cartItem}", parsedArgs.cartItem.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\CartController::updateCartItemQuantity
* @see app/Http/Controllers/Customer/CartController.php:37
* @route '/cart-items/{cartItem}'
*/
updateCartItemQuantity.patch = (args, options) => ({
	url: updateCartItemQuantity.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\Customer\CartController::updateCartItemQuantity
* @see app/Http/Controllers/Customer/CartController.php:37
* @route '/cart-items/{cartItem}'
*/
var updateCartItemQuantityForm = (args, options) => ({
	action: updateCartItemQuantity.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\CartController::updateCartItemQuantity
* @see app/Http/Controllers/Customer/CartController.php:37
* @route '/cart-items/{cartItem}'
*/
updateCartItemQuantityForm.patch = (args, options) => ({
	action: updateCartItemQuantity.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
updateCartItemQuantity.form = updateCartItemQuantityForm;
/**
* @see \App\Http\Controllers\Customer\CartController::removeCartItem
* @see app/Http/Controllers/Customer/CartController.php:51
* @route '/cart-items/{cartItem}'
*/
var removeCartItem = (args, options) => ({
	url: removeCartItem.url(args, options),
	method: "delete"
});
removeCartItem.definition = {
	methods: ["delete"],
	url: "/cart-items/{cartItem}"
};
/**
* @see \App\Http\Controllers\Customer\CartController::removeCartItem
* @see app/Http/Controllers/Customer/CartController.php:51
* @route '/cart-items/{cartItem}'
*/
removeCartItem.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { cartItem: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { cartItem: args.id };
	if (Array.isArray(args)) args = { cartItem: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { cartItem: typeof args.cartItem === "object" ? args.cartItem.id : args.cartItem };
	return removeCartItem.definition.url.replace("{cartItem}", parsedArgs.cartItem.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\CartController::removeCartItem
* @see app/Http/Controllers/Customer/CartController.php:51
* @route '/cart-items/{cartItem}'
*/
removeCartItem.delete = (args, options) => ({
	url: removeCartItem.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\Customer\CartController::removeCartItem
* @see app/Http/Controllers/Customer/CartController.php:51
* @route '/cart-items/{cartItem}'
*/
var removeCartItemForm = (args, options) => ({
	action: removeCartItem.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\CartController::removeCartItem
* @see app/Http/Controllers/Customer/CartController.php:51
* @route '/cart-items/{cartItem}'
*/
removeCartItemForm.delete = (args, options) => ({
	action: removeCartItem.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
removeCartItem.form = removeCartItemForm;
//#endregion
export { removeCartItem as n, updateCartItemQuantity as r, addProductVariantToCart as t };

//# sourceMappingURL=CartController-BSN3yJE9.js.map