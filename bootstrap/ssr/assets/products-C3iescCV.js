import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-Bgbpuenu.js";
//#region resources/js/routes/admin/products/variants/index.ts
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
var index$1 = (args, options) => ({
	url: index$1.url(args, options),
	method: "get"
});
index$1.definition = {
	methods: ["get", "head"],
	url: "/admin/products/{product}/variants"
};
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
index$1.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { product: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { product: args.id };
	if (Array.isArray(args)) args = { product: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { product: typeof args.product === "object" ? args.product.id : args.product };
	return index$1.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
index$1.get = (args, options) => ({
	url: index$1.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
index$1.head = (args, options) => ({
	url: index$1.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
var indexForm$1 = (args, options) => ({
	action: index$1.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
indexForm$1.get = (args, options) => ({
	action: index$1.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
indexForm$1.head = (args, options) => ({
	action: index$1.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$1.form = indexForm$1;
var variants = { index: Object.assign(index$1, index$1) };
//#endregion
//#region resources/js/routes/admin/products/index.ts
/**
* @see \App\Http\Controllers\Admin\ProductController::index
* @see app/Http/Controllers/Admin/ProductController.php:28
* @route '/admin/products'
*/
var index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/admin/products"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::index
* @see app/Http/Controllers/Admin/ProductController.php:28
* @route '/admin/products'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::index
* @see app/Http/Controllers/Admin/ProductController.php:28
* @route '/admin/products'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::index
* @see app/Http/Controllers/Admin/ProductController.php:28
* @route '/admin/products'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::index
* @see app/Http/Controllers/Admin/ProductController.php:28
* @route '/admin/products'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::index
* @see app/Http/Controllers/Admin/ProductController.php:28
* @route '/admin/products'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::index
* @see app/Http/Controllers/Admin/ProductController.php:28
* @route '/admin/products'
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
* @see \App\Http\Controllers\Admin\ProductController::create
* @see app/Http/Controllers/Admin/ProductController.php:33
* @route '/admin/products/create'
*/
var create = (options) => ({
	url: create.url(options),
	method: "get"
});
create.definition = {
	methods: ["get", "head"],
	url: "/admin/products/create"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::create
* @see app/Http/Controllers/Admin/ProductController.php:33
* @route '/admin/products/create'
*/
create.url = (options) => {
	return create.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::create
* @see app/Http/Controllers/Admin/ProductController.php:33
* @route '/admin/products/create'
*/
create.get = (options) => ({
	url: create.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::create
* @see app/Http/Controllers/Admin/ProductController.php:33
* @route '/admin/products/create'
*/
create.head = (options) => ({
	url: create.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::create
* @see app/Http/Controllers/Admin/ProductController.php:33
* @route '/admin/products/create'
*/
var createForm = (options) => ({
	action: create.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::create
* @see app/Http/Controllers/Admin/ProductController.php:33
* @route '/admin/products/create'
*/
createForm.get = (options) => ({
	action: create.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::create
* @see app/Http/Controllers/Admin/ProductController.php:33
* @route '/admin/products/create'
*/
createForm.head = (options) => ({
	action: create.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
create.form = createForm;
/**
* @see \App\Http\Controllers\Admin\ProductController::shippingEstimate
* @see app/Http/Controllers/Admin/ProductController.php:19
* @route '/admin/products/shipping-estimate'
*/
var shippingEstimate = (options) => ({
	url: shippingEstimate.url(options),
	method: "post"
});
shippingEstimate.definition = {
	methods: ["post"],
	url: "/admin/products/shipping-estimate"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::shippingEstimate
* @see app/Http/Controllers/Admin/ProductController.php:19
* @route '/admin/products/shipping-estimate'
*/
shippingEstimate.url = (options) => {
	return shippingEstimate.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::shippingEstimate
* @see app/Http/Controllers/Admin/ProductController.php:19
* @route '/admin/products/shipping-estimate'
*/
shippingEstimate.post = (options) => ({
	url: shippingEstimate.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::shippingEstimate
* @see app/Http/Controllers/Admin/ProductController.php:19
* @route '/admin/products/shipping-estimate'
*/
var shippingEstimateForm = (options) => ({
	action: shippingEstimate.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::shippingEstimate
* @see app/Http/Controllers/Admin/ProductController.php:19
* @route '/admin/products/shipping-estimate'
*/
shippingEstimateForm.post = (options) => ({
	action: shippingEstimate.url(options),
	method: "post"
});
shippingEstimate.form = shippingEstimateForm;
/**
* @see \App\Http\Controllers\Admin\ProductController::store
* @see app/Http/Controllers/Admin/ProductController.php:42
* @route '/admin/products'
*/
var store = (options) => ({
	url: store.url(options),
	method: "post"
});
store.definition = {
	methods: ["post"],
	url: "/admin/products"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::store
* @see app/Http/Controllers/Admin/ProductController.php:42
* @route '/admin/products'
*/
store.url = (options) => {
	return store.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::store
* @see app/Http/Controllers/Admin/ProductController.php:42
* @route '/admin/products'
*/
store.post = (options) => ({
	url: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::store
* @see app/Http/Controllers/Admin/ProductController.php:42
* @route '/admin/products'
*/
var storeForm = (options) => ({
	action: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::store
* @see app/Http/Controllers/Admin/ProductController.php:42
* @route '/admin/products'
*/
storeForm.post = (options) => ({
	action: store.url(options),
	method: "post"
});
store.form = storeForm;
/**
* @see \App\Http\Controllers\Admin\ProductController::show
* @see app/Http/Controllers/Admin/ProductController.php:49
* @route '/admin/products/{product}'
*/
var show = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
show.definition = {
	methods: ["get", "head"],
	url: "/admin/products/{product}"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::show
* @see app/Http/Controllers/Admin/ProductController.php:49
* @route '/admin/products/{product}'
*/
show.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { product: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { product: args.id };
	if (Array.isArray(args)) args = { product: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { product: typeof args.product === "object" ? args.product.id : args.product };
	return show.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::show
* @see app/Http/Controllers/Admin/ProductController.php:49
* @route '/admin/products/{product}'
*/
show.get = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::show
* @see app/Http/Controllers/Admin/ProductController.php:49
* @route '/admin/products/{product}'
*/
show.head = (args, options) => ({
	url: show.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::show
* @see app/Http/Controllers/Admin/ProductController.php:49
* @route '/admin/products/{product}'
*/
var showForm = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::show
* @see app/Http/Controllers/Admin/ProductController.php:49
* @route '/admin/products/{product}'
*/
showForm.get = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::show
* @see app/Http/Controllers/Admin/ProductController.php:49
* @route '/admin/products/{product}'
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
* @see \App\Http\Controllers\Admin\ProductController::edit
* @see app/Http/Controllers/Admin/ProductController.php:56
* @route '/admin/products/{product}/edit'
*/
var edit = (args, options) => ({
	url: edit.url(args, options),
	method: "get"
});
edit.definition = {
	methods: ["get", "head"],
	url: "/admin/products/{product}/edit"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::edit
* @see app/Http/Controllers/Admin/ProductController.php:56
* @route '/admin/products/{product}/edit'
*/
edit.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { product: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { product: args.id };
	if (Array.isArray(args)) args = { product: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { product: typeof args.product === "object" ? args.product.id : args.product };
	return edit.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::edit
* @see app/Http/Controllers/Admin/ProductController.php:56
* @route '/admin/products/{product}/edit'
*/
edit.get = (args, options) => ({
	url: edit.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::edit
* @see app/Http/Controllers/Admin/ProductController.php:56
* @route '/admin/products/{product}/edit'
*/
edit.head = (args, options) => ({
	url: edit.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::edit
* @see app/Http/Controllers/Admin/ProductController.php:56
* @route '/admin/products/{product}/edit'
*/
var editForm = (args, options) => ({
	action: edit.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::edit
* @see app/Http/Controllers/Admin/ProductController.php:56
* @route '/admin/products/{product}/edit'
*/
editForm.get = (args, options) => ({
	action: edit.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::edit
* @see app/Http/Controllers/Admin/ProductController.php:56
* @route '/admin/products/{product}/edit'
*/
editForm.head = (args, options) => ({
	action: edit.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
edit.form = editForm;
/**
* @see \App\Http\Controllers\Admin\ProductController::update
* @see app/Http/Controllers/Admin/ProductController.php:65
* @route '/admin/products/{product}'
*/
var update = (args, options) => ({
	url: update.url(args, options),
	method: "put"
});
update.definition = {
	methods: ["put"],
	url: "/admin/products/{product}"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::update
* @see app/Http/Controllers/Admin/ProductController.php:65
* @route '/admin/products/{product}'
*/
update.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { product: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { product: args.id };
	if (Array.isArray(args)) args = { product: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { product: typeof args.product === "object" ? args.product.id : args.product };
	return update.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::update
* @see app/Http/Controllers/Admin/ProductController.php:65
* @route '/admin/products/{product}'
*/
update.put = (args, options) => ({
	url: update.url(args, options),
	method: "put"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::update
* @see app/Http/Controllers/Admin/ProductController.php:65
* @route '/admin/products/{product}'
*/
var updateForm = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::update
* @see app/Http/Controllers/Admin/ProductController.php:65
* @route '/admin/products/{product}'
*/
updateForm.put = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update.form = updateForm;
/**
* @see \App\Http\Controllers\Admin\ProductController::publish
* @see app/Http/Controllers/Admin/ProductController.php:72
* @route '/admin/products/{product}/publish'
*/
var publish = (args, options) => ({
	url: publish.url(args, options),
	method: "post"
});
publish.definition = {
	methods: ["post"],
	url: "/admin/products/{product}/publish"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::publish
* @see app/Http/Controllers/Admin/ProductController.php:72
* @route '/admin/products/{product}/publish'
*/
publish.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { product: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { product: args.id };
	if (Array.isArray(args)) args = { product: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { product: typeof args.product === "object" ? args.product.id : args.product };
	return publish.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::publish
* @see app/Http/Controllers/Admin/ProductController.php:72
* @route '/admin/products/{product}/publish'
*/
publish.post = (args, options) => ({
	url: publish.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::publish
* @see app/Http/Controllers/Admin/ProductController.php:72
* @route '/admin/products/{product}/publish'
*/
var publishForm = (args, options) => ({
	action: publish.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::publish
* @see app/Http/Controllers/Admin/ProductController.php:72
* @route '/admin/products/{product}/publish'
*/
publishForm.post = (args, options) => ({
	action: publish.url(args, options),
	method: "post"
});
publish.form = publishForm;
/**
* @see \App\Http\Controllers\Admin\ProductController::archive
* @see app/Http/Controllers/Admin/ProductController.php:79
* @route '/admin/products/{product}/archive'
*/
var archive = (args, options) => ({
	url: archive.url(args, options),
	method: "post"
});
archive.definition = {
	methods: ["post"],
	url: "/admin/products/{product}/archive"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::archive
* @see app/Http/Controllers/Admin/ProductController.php:79
* @route '/admin/products/{product}/archive'
*/
archive.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { product: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { product: args.id };
	if (Array.isArray(args)) args = { product: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { product: typeof args.product === "object" ? args.product.id : args.product };
	return archive.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::archive
* @see app/Http/Controllers/Admin/ProductController.php:79
* @route '/admin/products/{product}/archive'
*/
archive.post = (args, options) => ({
	url: archive.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::archive
* @see app/Http/Controllers/Admin/ProductController.php:79
* @route '/admin/products/{product}/archive'
*/
var archiveForm = (args, options) => ({
	action: archive.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::archive
* @see app/Http/Controllers/Admin/ProductController.php:79
* @route '/admin/products/{product}/archive'
*/
archiveForm.post = (args, options) => ({
	action: archive.url(args, options),
	method: "post"
});
archive.form = archiveForm;
/**
* @see \App\Http\Controllers\Admin\ProductController::duplicate
* @see app/Http/Controllers/Admin/ProductController.php:86
* @route '/admin/products/{product}/duplicate'
*/
var duplicate = (args, options) => ({
	url: duplicate.url(args, options),
	method: "post"
});
duplicate.definition = {
	methods: ["post"],
	url: "/admin/products/{product}/duplicate"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::duplicate
* @see app/Http/Controllers/Admin/ProductController.php:86
* @route '/admin/products/{product}/duplicate'
*/
duplicate.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { product: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { product: args.id };
	if (Array.isArray(args)) args = { product: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { product: typeof args.product === "object" ? args.product.id : args.product };
	return duplicate.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::duplicate
* @see app/Http/Controllers/Admin/ProductController.php:86
* @route '/admin/products/{product}/duplicate'
*/
duplicate.post = (args, options) => ({
	url: duplicate.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::duplicate
* @see app/Http/Controllers/Admin/ProductController.php:86
* @route '/admin/products/{product}/duplicate'
*/
var duplicateForm = (args, options) => ({
	action: duplicate.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::duplicate
* @see app/Http/Controllers/Admin/ProductController.php:86
* @route '/admin/products/{product}/duplicate'
*/
duplicateForm.post = (args, options) => ({
	action: duplicate.url(args, options),
	method: "post"
});
duplicate.form = duplicateForm;
/**
* @see \App\Http\Controllers\Admin\ProductController::destroy
* @see app/Http/Controllers/Admin/ProductController.php:93
* @route '/admin/products/{product}'
*/
var destroy = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
destroy.definition = {
	methods: ["delete"],
	url: "/admin/products/{product}"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::destroy
* @see app/Http/Controllers/Admin/ProductController.php:93
* @route '/admin/products/{product}'
*/
destroy.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { product: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { product: args.id };
	if (Array.isArray(args)) args = { product: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { product: typeof args.product === "object" ? args.product.id : args.product };
	return destroy.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::destroy
* @see app/Http/Controllers/Admin/ProductController.php:93
* @route '/admin/products/{product}'
*/
destroy.delete = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::destroy
* @see app/Http/Controllers/Admin/ProductController.php:93
* @route '/admin/products/{product}'
*/
var destroyForm = (args, options) => ({
	action: destroy.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::destroy
* @see app/Http/Controllers/Admin/ProductController.php:93
* @route '/admin/products/{product}'
*/
destroyForm.delete = (args, options) => ({
	action: destroy.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy.form = destroyForm;
var products = {
	index: Object.assign(index, index),
	create: Object.assign(create, create),
	shippingEstimate: Object.assign(shippingEstimate, shippingEstimate),
	store: Object.assign(store, store),
	show: Object.assign(show, show),
	edit: Object.assign(edit, edit),
	update: Object.assign(update, update),
	publish: Object.assign(publish, publish),
	archive: Object.assign(archive, archive),
	duplicate: Object.assign(duplicate, duplicate),
	destroy: Object.assign(destroy, destroy),
	variants: Object.assign(variants, variants)
};
//#endregion
export { update as i, shippingEstimate as n, store as r, products as t };

//# sourceMappingURL=products-C3iescCV.js.map