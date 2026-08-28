import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-Bgbpuenu.js";
import { t as ProfileLayout } from "./profile-layout-CknzRhQx.js";
import { t as ProfileController } from "./ProfileController-BnYxdFC1.js";
import { t as SecurityController } from "./SecurityController-D1wGCFsz.js";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Eye, EyeOff, Loader2, Lock, MapPin, Upload, User } from "lucide-react";
//#region resources/js/routes/admin/products/variants/index.ts
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
var index$23 = (args, options) => ({
	url: index$23.url(args, options),
	method: "get"
});
index$23.definition = {
	methods: ["get", "head"],
	url: "/admin/products/{product}/variants"
};
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
index$23.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { product: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { product: args.id };
	if (Array.isArray(args)) args = { product: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { product: typeof args.product === "object" ? args.product.id : args.product };
	return index$23.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
index$23.get = (args, options) => ({
	url: index$23.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
index$23.head = (args, options) => ({
	url: index$23.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
var indexForm$23 = (args, options) => ({
	action: index$23.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
indexForm$23.get = (args, options) => ({
	action: index$23.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
indexForm$23.head = (args, options) => ({
	action: index$23.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$23.form = indexForm$23;
var variants = { index: Object.assign(index$23, index$23) };
//#endregion
//#region resources/js/routes/admin/products/index.ts
/**
* @see \App\Http\Controllers\Admin\ProductController::index
* @see app/Http/Controllers/Admin/ProductController.php:15
* @route '/admin/products'
*/
var index$22 = (options) => ({
	url: index$22.url(options),
	method: "get"
});
index$22.definition = {
	methods: ["get", "head"],
	url: "/admin/products"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::index
* @see app/Http/Controllers/Admin/ProductController.php:15
* @route '/admin/products'
*/
index$22.url = (options) => {
	return index$22.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::index
* @see app/Http/Controllers/Admin/ProductController.php:15
* @route '/admin/products'
*/
index$22.get = (options) => ({
	url: index$22.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::index
* @see app/Http/Controllers/Admin/ProductController.php:15
* @route '/admin/products'
*/
index$22.head = (options) => ({
	url: index$22.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::index
* @see app/Http/Controllers/Admin/ProductController.php:15
* @route '/admin/products'
*/
var indexForm$22 = (options) => ({
	action: index$22.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::index
* @see app/Http/Controllers/Admin/ProductController.php:15
* @route '/admin/products'
*/
indexForm$22.get = (options) => ({
	action: index$22.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::index
* @see app/Http/Controllers/Admin/ProductController.php:15
* @route '/admin/products'
*/
indexForm$22.head = (options) => ({
	action: index$22.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$22.form = indexForm$22;
/**
* @see \App\Http\Controllers\Admin\ProductController::create
* @see app/Http/Controllers/Admin/ProductController.php:20
* @route '/admin/products/create'
*/
var create$10 = (options) => ({
	url: create$10.url(options),
	method: "get"
});
create$10.definition = {
	methods: ["get", "head"],
	url: "/admin/products/create"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::create
* @see app/Http/Controllers/Admin/ProductController.php:20
* @route '/admin/products/create'
*/
create$10.url = (options) => {
	return create$10.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::create
* @see app/Http/Controllers/Admin/ProductController.php:20
* @route '/admin/products/create'
*/
create$10.get = (options) => ({
	url: create$10.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::create
* @see app/Http/Controllers/Admin/ProductController.php:20
* @route '/admin/products/create'
*/
create$10.head = (options) => ({
	url: create$10.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::create
* @see app/Http/Controllers/Admin/ProductController.php:20
* @route '/admin/products/create'
*/
var createForm$10 = (options) => ({
	action: create$10.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::create
* @see app/Http/Controllers/Admin/ProductController.php:20
* @route '/admin/products/create'
*/
createForm$10.get = (options) => ({
	action: create$10.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::create
* @see app/Http/Controllers/Admin/ProductController.php:20
* @route '/admin/products/create'
*/
createForm$10.head = (options) => ({
	action: create$10.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
create$10.form = createForm$10;
/**
* @see \App\Http\Controllers\Admin\ProductController::store
* @see app/Http/Controllers/Admin/ProductController.php:29
* @route '/admin/products'
*/
var store$12 = (options) => ({
	url: store$12.url(options),
	method: "post"
});
store$12.definition = {
	methods: ["post"],
	url: "/admin/products"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::store
* @see app/Http/Controllers/Admin/ProductController.php:29
* @route '/admin/products'
*/
store$12.url = (options) => {
	return store$12.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::store
* @see app/Http/Controllers/Admin/ProductController.php:29
* @route '/admin/products'
*/
store$12.post = (options) => ({
	url: store$12.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::store
* @see app/Http/Controllers/Admin/ProductController.php:29
* @route '/admin/products'
*/
var storeForm$12 = (options) => ({
	action: store$12.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::store
* @see app/Http/Controllers/Admin/ProductController.php:29
* @route '/admin/products'
*/
storeForm$12.post = (options) => ({
	action: store$12.url(options),
	method: "post"
});
store$12.form = storeForm$12;
/**
* @see \App\Http\Controllers\Admin\ProductController::show
* @see app/Http/Controllers/Admin/ProductController.php:36
* @route '/admin/products/{product}'
*/
var show$7 = (args, options) => ({
	url: show$7.url(args, options),
	method: "get"
});
show$7.definition = {
	methods: ["get", "head"],
	url: "/admin/products/{product}"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::show
* @see app/Http/Controllers/Admin/ProductController.php:36
* @route '/admin/products/{product}'
*/
show$7.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { product: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { product: args.id };
	if (Array.isArray(args)) args = { product: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { product: typeof args.product === "object" ? args.product.id : args.product };
	return show$7.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::show
* @see app/Http/Controllers/Admin/ProductController.php:36
* @route '/admin/products/{product}'
*/
show$7.get = (args, options) => ({
	url: show$7.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::show
* @see app/Http/Controllers/Admin/ProductController.php:36
* @route '/admin/products/{product}'
*/
show$7.head = (args, options) => ({
	url: show$7.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::show
* @see app/Http/Controllers/Admin/ProductController.php:36
* @route '/admin/products/{product}'
*/
var showForm$7 = (args, options) => ({
	action: show$7.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::show
* @see app/Http/Controllers/Admin/ProductController.php:36
* @route '/admin/products/{product}'
*/
showForm$7.get = (args, options) => ({
	action: show$7.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::show
* @see app/Http/Controllers/Admin/ProductController.php:36
* @route '/admin/products/{product}'
*/
showForm$7.head = (args, options) => ({
	action: show$7.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
show$7.form = showForm$7;
/**
* @see \App\Http\Controllers\Admin\ProductController::edit
* @see app/Http/Controllers/Admin/ProductController.php:43
* @route '/admin/products/{product}/edit'
*/
var edit$11 = (args, options) => ({
	url: edit$11.url(args, options),
	method: "get"
});
edit$11.definition = {
	methods: ["get", "head"],
	url: "/admin/products/{product}/edit"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::edit
* @see app/Http/Controllers/Admin/ProductController.php:43
* @route '/admin/products/{product}/edit'
*/
edit$11.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { product: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { product: args.id };
	if (Array.isArray(args)) args = { product: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { product: typeof args.product === "object" ? args.product.id : args.product };
	return edit$11.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::edit
* @see app/Http/Controllers/Admin/ProductController.php:43
* @route '/admin/products/{product}/edit'
*/
edit$11.get = (args, options) => ({
	url: edit$11.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::edit
* @see app/Http/Controllers/Admin/ProductController.php:43
* @route '/admin/products/{product}/edit'
*/
edit$11.head = (args, options) => ({
	url: edit$11.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::edit
* @see app/Http/Controllers/Admin/ProductController.php:43
* @route '/admin/products/{product}/edit'
*/
var editForm$11 = (args, options) => ({
	action: edit$11.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::edit
* @see app/Http/Controllers/Admin/ProductController.php:43
* @route '/admin/products/{product}/edit'
*/
editForm$11.get = (args, options) => ({
	action: edit$11.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::edit
* @see app/Http/Controllers/Admin/ProductController.php:43
* @route '/admin/products/{product}/edit'
*/
editForm$11.head = (args, options) => ({
	action: edit$11.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
edit$11.form = editForm$11;
/**
* @see \App\Http\Controllers\Admin\ProductController::update
* @see app/Http/Controllers/Admin/ProductController.php:52
* @route '/admin/products/{product}'
*/
var update$13 = (args, options) => ({
	url: update$13.url(args, options),
	method: "put"
});
update$13.definition = {
	methods: ["put"],
	url: "/admin/products/{product}"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::update
* @see app/Http/Controllers/Admin/ProductController.php:52
* @route '/admin/products/{product}'
*/
update$13.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { product: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { product: args.id };
	if (Array.isArray(args)) args = { product: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { product: typeof args.product === "object" ? args.product.id : args.product };
	return update$13.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::update
* @see app/Http/Controllers/Admin/ProductController.php:52
* @route '/admin/products/{product}'
*/
update$13.put = (args, options) => ({
	url: update$13.url(args, options),
	method: "put"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::update
* @see app/Http/Controllers/Admin/ProductController.php:52
* @route '/admin/products/{product}'
*/
var updateForm$13 = (args, options) => ({
	action: update$13.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::update
* @see app/Http/Controllers/Admin/ProductController.php:52
* @route '/admin/products/{product}'
*/
updateForm$13.put = (args, options) => ({
	action: update$13.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$13.form = updateForm$13;
/**
* @see \App\Http\Controllers\Admin\ProductController::publish
* @see app/Http/Controllers/Admin/ProductController.php:59
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
* @see app/Http/Controllers/Admin/ProductController.php:59
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
* @see app/Http/Controllers/Admin/ProductController.php:59
* @route '/admin/products/{product}/publish'
*/
publish.post = (args, options) => ({
	url: publish.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::publish
* @see app/Http/Controllers/Admin/ProductController.php:59
* @route '/admin/products/{product}/publish'
*/
var publishForm = (args, options) => ({
	action: publish.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::publish
* @see app/Http/Controllers/Admin/ProductController.php:59
* @route '/admin/products/{product}/publish'
*/
publishForm.post = (args, options) => ({
	action: publish.url(args, options),
	method: "post"
});
publish.form = publishForm;
/**
* @see \App\Http\Controllers\Admin\ProductController::archive
* @see app/Http/Controllers/Admin/ProductController.php:66
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
* @see app/Http/Controllers/Admin/ProductController.php:66
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
* @see app/Http/Controllers/Admin/ProductController.php:66
* @route '/admin/products/{product}/archive'
*/
archive.post = (args, options) => ({
	url: archive.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::archive
* @see app/Http/Controllers/Admin/ProductController.php:66
* @route '/admin/products/{product}/archive'
*/
var archiveForm = (args, options) => ({
	action: archive.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::archive
* @see app/Http/Controllers/Admin/ProductController.php:66
* @route '/admin/products/{product}/archive'
*/
archiveForm.post = (args, options) => ({
	action: archive.url(args, options),
	method: "post"
});
archive.form = archiveForm;
/**
* @see \App\Http\Controllers\Admin\ProductController::duplicate
* @see app/Http/Controllers/Admin/ProductController.php:73
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
* @see app/Http/Controllers/Admin/ProductController.php:73
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
* @see app/Http/Controllers/Admin/ProductController.php:73
* @route '/admin/products/{product}/duplicate'
*/
duplicate.post = (args, options) => ({
	url: duplicate.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::duplicate
* @see app/Http/Controllers/Admin/ProductController.php:73
* @route '/admin/products/{product}/duplicate'
*/
var duplicateForm = (args, options) => ({
	action: duplicate.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::duplicate
* @see app/Http/Controllers/Admin/ProductController.php:73
* @route '/admin/products/{product}/duplicate'
*/
duplicateForm.post = (args, options) => ({
	action: duplicate.url(args, options),
	method: "post"
});
duplicate.form = duplicateForm;
/**
* @see \App\Http\Controllers\Admin\ProductController::destroy
* @see app/Http/Controllers/Admin/ProductController.php:80
* @route '/admin/products/{product}'
*/
var destroy$9 = (args, options) => ({
	url: destroy$9.url(args, options),
	method: "delete"
});
destroy$9.definition = {
	methods: ["delete"],
	url: "/admin/products/{product}"
};
/**
* @see \App\Http\Controllers\Admin\ProductController::destroy
* @see app/Http/Controllers/Admin/ProductController.php:80
* @route '/admin/products/{product}'
*/
destroy$9.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { product: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { product: args.id };
	if (Array.isArray(args)) args = { product: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { product: typeof args.product === "object" ? args.product.id : args.product };
	return destroy$9.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductController::destroy
* @see app/Http/Controllers/Admin/ProductController.php:80
* @route '/admin/products/{product}'
*/
destroy$9.delete = (args, options) => ({
	url: destroy$9.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::destroy
* @see app/Http/Controllers/Admin/ProductController.php:80
* @route '/admin/products/{product}'
*/
var destroyForm$9 = (args, options) => ({
	action: destroy$9.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductController::destroy
* @see app/Http/Controllers/Admin/ProductController.php:80
* @route '/admin/products/{product}'
*/
destroyForm$9.delete = (args, options) => ({
	action: destroy$9.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy$9.form = destroyForm$9;
var products = {
	index: Object.assign(index$22, index$22),
	create: Object.assign(create$10, create$10),
	store: Object.assign(store$12, store$12),
	show: Object.assign(show$7, show$7),
	edit: Object.assign(edit$11, edit$11),
	update: Object.assign(update$13, update$13),
	publish: Object.assign(publish, publish),
	archive: Object.assign(archive, archive),
	duplicate: Object.assign(duplicate, duplicate),
	destroy: Object.assign(destroy$9, destroy$9),
	variants: Object.assign(variants, variants)
};
//#endregion
//#region resources/js/routes/admin/product-variants/stock-adjustment/index.ts
/**
* @see \App\Http\Controllers\Admin\StockController::update
* @see app/Http/Controllers/Admin/StockController.php:32
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
var update$12 = (args, options) => ({
	url: update$12.url(args, options),
	method: "post"
});
update$12.definition = {
	methods: ["post"],
	url: "/admin/product-variants/{productVariant}/stock-adjustment"
};
/**
* @see \App\Http\Controllers\Admin\StockController::update
* @see app/Http/Controllers/Admin/StockController.php:32
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
update$12.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { productVariant: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { productVariant: args.id };
	if (Array.isArray(args)) args = { productVariant: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { productVariant: typeof args.productVariant === "object" ? args.productVariant.id : args.productVariant };
	return update$12.definition.url.replace("{productVariant}", parsedArgs.productVariant.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\StockController::update
* @see app/Http/Controllers/Admin/StockController.php:32
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
update$12.post = (args, options) => ({
	url: update$12.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\StockController::update
* @see app/Http/Controllers/Admin/StockController.php:32
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
var updateForm$12 = (args, options) => ({
	action: update$12.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\StockController::update
* @see app/Http/Controllers/Admin/StockController.php:32
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
updateForm$12.post = (args, options) => ({
	action: update$12.url(args, options),
	method: "post"
});
update$12.form = updateForm$12;
var stockAdjustment$1 = { update: Object.assign(update$12, update$12) };
//#endregion
//#region resources/js/routes/admin/product-variants/index.ts
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
var index$21 = (options) => ({
	url: index$21.url(options),
	method: "get"
});
index$21.definition = {
	methods: ["get", "head"],
	url: "/admin/product-variants"
};
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
index$21.url = (options) => {
	return index$21.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
index$21.get = (options) => ({
	url: index$21.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
index$21.head = (options) => ({
	url: index$21.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
var indexForm$21 = (options) => ({
	action: index$21.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
indexForm$21.get = (options) => ({
	action: index$21.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
indexForm$21.head = (options) => ({
	action: index$21.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$21.form = indexForm$21;
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::create
* @see app/Http/Controllers/Admin/ProductVariantController.php:21
* @route '/admin/product-variants/create'
*/
var create$9 = (options) => ({
	url: create$9.url(options),
	method: "get"
});
create$9.definition = {
	methods: ["get", "head"],
	url: "/admin/product-variants/create"
};
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::create
* @see app/Http/Controllers/Admin/ProductVariantController.php:21
* @route '/admin/product-variants/create'
*/
create$9.url = (options) => {
	return create$9.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::create
* @see app/Http/Controllers/Admin/ProductVariantController.php:21
* @route '/admin/product-variants/create'
*/
create$9.get = (options) => ({
	url: create$9.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::create
* @see app/Http/Controllers/Admin/ProductVariantController.php:21
* @route '/admin/product-variants/create'
*/
create$9.head = (options) => ({
	url: create$9.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::create
* @see app/Http/Controllers/Admin/ProductVariantController.php:21
* @route '/admin/product-variants/create'
*/
var createForm$9 = (options) => ({
	action: create$9.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::create
* @see app/Http/Controllers/Admin/ProductVariantController.php:21
* @route '/admin/product-variants/create'
*/
createForm$9.get = (options) => ({
	action: create$9.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::create
* @see app/Http/Controllers/Admin/ProductVariantController.php:21
* @route '/admin/product-variants/create'
*/
createForm$9.head = (options) => ({
	action: create$9.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
create$9.form = createForm$9;
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::store
* @see app/Http/Controllers/Admin/ProductVariantController.php:31
* @route '/admin/product-variants'
*/
var store$11 = (options) => ({
	url: store$11.url(options),
	method: "post"
});
store$11.definition = {
	methods: ["post"],
	url: "/admin/product-variants"
};
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::store
* @see app/Http/Controllers/Admin/ProductVariantController.php:31
* @route '/admin/product-variants'
*/
store$11.url = (options) => {
	return store$11.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::store
* @see app/Http/Controllers/Admin/ProductVariantController.php:31
* @route '/admin/product-variants'
*/
store$11.post = (options) => ({
	url: store$11.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::store
* @see app/Http/Controllers/Admin/ProductVariantController.php:31
* @route '/admin/product-variants'
*/
var storeForm$11 = (options) => ({
	action: store$11.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::store
* @see app/Http/Controllers/Admin/ProductVariantController.php:31
* @route '/admin/product-variants'
*/
storeForm$11.post = (options) => ({
	action: store$11.url(options),
	method: "post"
});
store$11.form = storeForm$11;
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::edit
* @see app/Http/Controllers/Admin/ProductVariantController.php:38
* @route '/admin/product-variants/{productVariant}/edit'
*/
var edit$10 = (args, options) => ({
	url: edit$10.url(args, options),
	method: "get"
});
edit$10.definition = {
	methods: ["get", "head"],
	url: "/admin/product-variants/{productVariant}/edit"
};
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::edit
* @see app/Http/Controllers/Admin/ProductVariantController.php:38
* @route '/admin/product-variants/{productVariant}/edit'
*/
edit$10.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { productVariant: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { productVariant: args.id };
	if (Array.isArray(args)) args = { productVariant: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { productVariant: typeof args.productVariant === "object" ? args.productVariant.id : args.productVariant };
	return edit$10.definition.url.replace("{productVariant}", parsedArgs.productVariant.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::edit
* @see app/Http/Controllers/Admin/ProductVariantController.php:38
* @route '/admin/product-variants/{productVariant}/edit'
*/
edit$10.get = (args, options) => ({
	url: edit$10.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::edit
* @see app/Http/Controllers/Admin/ProductVariantController.php:38
* @route '/admin/product-variants/{productVariant}/edit'
*/
edit$10.head = (args, options) => ({
	url: edit$10.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::edit
* @see app/Http/Controllers/Admin/ProductVariantController.php:38
* @route '/admin/product-variants/{productVariant}/edit'
*/
var editForm$10 = (args, options) => ({
	action: edit$10.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::edit
* @see app/Http/Controllers/Admin/ProductVariantController.php:38
* @route '/admin/product-variants/{productVariant}/edit'
*/
editForm$10.get = (args, options) => ({
	action: edit$10.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::edit
* @see app/Http/Controllers/Admin/ProductVariantController.php:38
* @route '/admin/product-variants/{productVariant}/edit'
*/
editForm$10.head = (args, options) => ({
	action: edit$10.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
edit$10.form = editForm$10;
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::update
* @see app/Http/Controllers/Admin/ProductVariantController.php:48
* @route '/admin/product-variants/{productVariant}'
*/
var update$11 = (args, options) => ({
	url: update$11.url(args, options),
	method: "put"
});
update$11.definition = {
	methods: ["put"],
	url: "/admin/product-variants/{productVariant}"
};
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::update
* @see app/Http/Controllers/Admin/ProductVariantController.php:48
* @route '/admin/product-variants/{productVariant}'
*/
update$11.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { productVariant: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { productVariant: args.id };
	if (Array.isArray(args)) args = { productVariant: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { productVariant: typeof args.productVariant === "object" ? args.productVariant.id : args.productVariant };
	return update$11.definition.url.replace("{productVariant}", parsedArgs.productVariant.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::update
* @see app/Http/Controllers/Admin/ProductVariantController.php:48
* @route '/admin/product-variants/{productVariant}'
*/
update$11.put = (args, options) => ({
	url: update$11.url(args, options),
	method: "put"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::update
* @see app/Http/Controllers/Admin/ProductVariantController.php:48
* @route '/admin/product-variants/{productVariant}'
*/
var updateForm$11 = (args, options) => ({
	action: update$11.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::update
* @see app/Http/Controllers/Admin/ProductVariantController.php:48
* @route '/admin/product-variants/{productVariant}'
*/
updateForm$11.put = (args, options) => ({
	action: update$11.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$11.form = updateForm$11;
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::destroy
* @see app/Http/Controllers/Admin/ProductVariantController.php:55
* @route '/admin/product-variants/{productVariant}'
*/
var destroy$8 = (args, options) => ({
	url: destroy$8.url(args, options),
	method: "delete"
});
destroy$8.definition = {
	methods: ["delete"],
	url: "/admin/product-variants/{productVariant}"
};
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::destroy
* @see app/Http/Controllers/Admin/ProductVariantController.php:55
* @route '/admin/product-variants/{productVariant}'
*/
destroy$8.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { productVariant: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { productVariant: args.id };
	if (Array.isArray(args)) args = { productVariant: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { productVariant: typeof args.productVariant === "object" ? args.productVariant.id : args.productVariant };
	return destroy$8.definition.url.replace("{productVariant}", parsedArgs.productVariant.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::destroy
* @see app/Http/Controllers/Admin/ProductVariantController.php:55
* @route '/admin/product-variants/{productVariant}'
*/
destroy$8.delete = (args, options) => ({
	url: destroy$8.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::destroy
* @see app/Http/Controllers/Admin/ProductVariantController.php:55
* @route '/admin/product-variants/{productVariant}'
*/
var destroyForm$8 = (args, options) => ({
	action: destroy$8.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::destroy
* @see app/Http/Controllers/Admin/ProductVariantController.php:55
* @route '/admin/product-variants/{productVariant}'
*/
destroyForm$8.delete = (args, options) => ({
	action: destroy$8.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy$8.form = destroyForm$8;
/**
* @see \App\Http\Controllers\Admin\StockController::stockAdjustment
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
var stockAdjustment = (args, options) => ({
	url: stockAdjustment.url(args, options),
	method: "get"
});
stockAdjustment.definition = {
	methods: ["get", "head"],
	url: "/admin/product-variants/{productVariant}/stock-adjustment"
};
/**
* @see \App\Http\Controllers\Admin\StockController::stockAdjustment
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
stockAdjustment.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { productVariant: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { productVariant: args.id };
	if (Array.isArray(args)) args = { productVariant: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { productVariant: typeof args.productVariant === "object" ? args.productVariant.id : args.productVariant };
	return stockAdjustment.definition.url.replace("{productVariant}", parsedArgs.productVariant.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\StockController::stockAdjustment
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
stockAdjustment.get = (args, options) => ({
	url: stockAdjustment.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\StockController::stockAdjustment
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
stockAdjustment.head = (args, options) => ({
	url: stockAdjustment.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\StockController::stockAdjustment
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
var stockAdjustmentForm = (args, options) => ({
	action: stockAdjustment.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\StockController::stockAdjustment
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
stockAdjustmentForm.get = (args, options) => ({
	action: stockAdjustment.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\StockController::stockAdjustment
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
stockAdjustmentForm.head = (args, options) => ({
	action: stockAdjustment.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
stockAdjustment.form = stockAdjustmentForm;
var productVariants = {
	index: Object.assign(index$21, index$21),
	create: Object.assign(create$9, create$9),
	store: Object.assign(store$11, store$11),
	edit: Object.assign(edit$10, edit$10),
	update: Object.assign(update$11, update$11),
	destroy: Object.assign(destroy$8, destroy$8),
	stockAdjustment: Object.assign(stockAdjustment, stockAdjustment$1)
};
//#endregion
//#region resources/js/routes/admin/categories/index.ts
/**
* @see \App\Http\Controllers\Admin\CategoryController::index
* @see app/Http/Controllers/Admin/CategoryController.php:15
* @route '/admin/categories'
*/
var index$20 = (options) => ({
	url: index$20.url(options),
	method: "get"
});
index$20.definition = {
	methods: ["get", "head"],
	url: "/admin/categories"
};
/**
* @see \App\Http\Controllers\Admin\CategoryController::index
* @see app/Http/Controllers/Admin/CategoryController.php:15
* @route '/admin/categories'
*/
index$20.url = (options) => {
	return index$20.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CategoryController::index
* @see app/Http/Controllers/Admin/CategoryController.php:15
* @route '/admin/categories'
*/
index$20.get = (options) => ({
	url: index$20.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::index
* @see app/Http/Controllers/Admin/CategoryController.php:15
* @route '/admin/categories'
*/
index$20.head = (options) => ({
	url: index$20.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::index
* @see app/Http/Controllers/Admin/CategoryController.php:15
* @route '/admin/categories'
*/
var indexForm$20 = (options) => ({
	action: index$20.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::index
* @see app/Http/Controllers/Admin/CategoryController.php:15
* @route '/admin/categories'
*/
indexForm$20.get = (options) => ({
	action: index$20.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::index
* @see app/Http/Controllers/Admin/CategoryController.php:15
* @route '/admin/categories'
*/
indexForm$20.head = (options) => ({
	action: index$20.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$20.form = indexForm$20;
/**
* @see \App\Http\Controllers\Admin\CategoryController::create
* @see app/Http/Controllers/Admin/CategoryController.php:20
* @route '/admin/categories/create'
*/
var create$8 = (options) => ({
	url: create$8.url(options),
	method: "get"
});
create$8.definition = {
	methods: ["get", "head"],
	url: "/admin/categories/create"
};
/**
* @see \App\Http\Controllers\Admin\CategoryController::create
* @see app/Http/Controllers/Admin/CategoryController.php:20
* @route '/admin/categories/create'
*/
create$8.url = (options) => {
	return create$8.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CategoryController::create
* @see app/Http/Controllers/Admin/CategoryController.php:20
* @route '/admin/categories/create'
*/
create$8.get = (options) => ({
	url: create$8.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::create
* @see app/Http/Controllers/Admin/CategoryController.php:20
* @route '/admin/categories/create'
*/
create$8.head = (options) => ({
	url: create$8.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::create
* @see app/Http/Controllers/Admin/CategoryController.php:20
* @route '/admin/categories/create'
*/
var createForm$8 = (options) => ({
	action: create$8.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::create
* @see app/Http/Controllers/Admin/CategoryController.php:20
* @route '/admin/categories/create'
*/
createForm$8.get = (options) => ({
	action: create$8.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::create
* @see app/Http/Controllers/Admin/CategoryController.php:20
* @route '/admin/categories/create'
*/
createForm$8.head = (options) => ({
	action: create$8.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
create$8.form = createForm$8;
/**
* @see \App\Http\Controllers\Admin\CategoryController::store
* @see app/Http/Controllers/Admin/CategoryController.php:28
* @route '/admin/categories'
*/
var store$10 = (options) => ({
	url: store$10.url(options),
	method: "post"
});
store$10.definition = {
	methods: ["post"],
	url: "/admin/categories"
};
/**
* @see \App\Http\Controllers\Admin\CategoryController::store
* @see app/Http/Controllers/Admin/CategoryController.php:28
* @route '/admin/categories'
*/
store$10.url = (options) => {
	return store$10.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CategoryController::store
* @see app/Http/Controllers/Admin/CategoryController.php:28
* @route '/admin/categories'
*/
store$10.post = (options) => ({
	url: store$10.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::store
* @see app/Http/Controllers/Admin/CategoryController.php:28
* @route '/admin/categories'
*/
var storeForm$10 = (options) => ({
	action: store$10.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::store
* @see app/Http/Controllers/Admin/CategoryController.php:28
* @route '/admin/categories'
*/
storeForm$10.post = (options) => ({
	action: store$10.url(options),
	method: "post"
});
store$10.form = storeForm$10;
/**
* @see \App\Http\Controllers\Admin\CategoryController::edit
* @see app/Http/Controllers/Admin/CategoryController.php:35
* @route '/admin/categories/{category}/edit'
*/
var edit$9 = (args, options) => ({
	url: edit$9.url(args, options),
	method: "get"
});
edit$9.definition = {
	methods: ["get", "head"],
	url: "/admin/categories/{category}/edit"
};
/**
* @see \App\Http\Controllers\Admin\CategoryController::edit
* @see app/Http/Controllers/Admin/CategoryController.php:35
* @route '/admin/categories/{category}/edit'
*/
edit$9.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { category: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { category: args.id };
	if (Array.isArray(args)) args = { category: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { category: typeof args.category === "object" ? args.category.id : args.category };
	return edit$9.definition.url.replace("{category}", parsedArgs.category.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CategoryController::edit
* @see app/Http/Controllers/Admin/CategoryController.php:35
* @route '/admin/categories/{category}/edit'
*/
edit$9.get = (args, options) => ({
	url: edit$9.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::edit
* @see app/Http/Controllers/Admin/CategoryController.php:35
* @route '/admin/categories/{category}/edit'
*/
edit$9.head = (args, options) => ({
	url: edit$9.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::edit
* @see app/Http/Controllers/Admin/CategoryController.php:35
* @route '/admin/categories/{category}/edit'
*/
var editForm$9 = (args, options) => ({
	action: edit$9.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::edit
* @see app/Http/Controllers/Admin/CategoryController.php:35
* @route '/admin/categories/{category}/edit'
*/
editForm$9.get = (args, options) => ({
	action: edit$9.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::edit
* @see app/Http/Controllers/Admin/CategoryController.php:35
* @route '/admin/categories/{category}/edit'
*/
editForm$9.head = (args, options) => ({
	action: edit$9.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
edit$9.form = editForm$9;
/**
* @see \App\Http\Controllers\Admin\CategoryController::update
* @see app/Http/Controllers/Admin/CategoryController.php:43
* @route '/admin/categories/{category}'
*/
var update$10 = (args, options) => ({
	url: update$10.url(args, options),
	method: "put"
});
update$10.definition = {
	methods: ["put"],
	url: "/admin/categories/{category}"
};
/**
* @see \App\Http\Controllers\Admin\CategoryController::update
* @see app/Http/Controllers/Admin/CategoryController.php:43
* @route '/admin/categories/{category}'
*/
update$10.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { category: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { category: args.id };
	if (Array.isArray(args)) args = { category: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { category: typeof args.category === "object" ? args.category.id : args.category };
	return update$10.definition.url.replace("{category}", parsedArgs.category.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CategoryController::update
* @see app/Http/Controllers/Admin/CategoryController.php:43
* @route '/admin/categories/{category}'
*/
update$10.put = (args, options) => ({
	url: update$10.url(args, options),
	method: "put"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::update
* @see app/Http/Controllers/Admin/CategoryController.php:43
* @route '/admin/categories/{category}'
*/
var updateForm$10 = (args, options) => ({
	action: update$10.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::update
* @see app/Http/Controllers/Admin/CategoryController.php:43
* @route '/admin/categories/{category}'
*/
updateForm$10.put = (args, options) => ({
	action: update$10.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$10.form = updateForm$10;
/**
* @see \App\Http\Controllers\Admin\CategoryController::destroy
* @see app/Http/Controllers/Admin/CategoryController.php:50
* @route '/admin/categories/{category}'
*/
var destroy$7 = (args, options) => ({
	url: destroy$7.url(args, options),
	method: "delete"
});
destroy$7.definition = {
	methods: ["delete"],
	url: "/admin/categories/{category}"
};
/**
* @see \App\Http\Controllers\Admin\CategoryController::destroy
* @see app/Http/Controllers/Admin/CategoryController.php:50
* @route '/admin/categories/{category}'
*/
destroy$7.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { category: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { category: args.id };
	if (Array.isArray(args)) args = { category: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { category: typeof args.category === "object" ? args.category.id : args.category };
	return destroy$7.definition.url.replace("{category}", parsedArgs.category.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CategoryController::destroy
* @see app/Http/Controllers/Admin/CategoryController.php:50
* @route '/admin/categories/{category}'
*/
destroy$7.delete = (args, options) => ({
	url: destroy$7.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::destroy
* @see app/Http/Controllers/Admin/CategoryController.php:50
* @route '/admin/categories/{category}'
*/
var destroyForm$7 = (args, options) => ({
	action: destroy$7.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\CategoryController::destroy
* @see app/Http/Controllers/Admin/CategoryController.php:50
* @route '/admin/categories/{category}'
*/
destroyForm$7.delete = (args, options) => ({
	action: destroy$7.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy$7.form = destroyForm$7;
var categories = {
	index: Object.assign(index$20, index$20),
	create: Object.assign(create$8, create$8),
	store: Object.assign(store$10, store$10),
	edit: Object.assign(edit$9, edit$9),
	update: Object.assign(update$10, update$10),
	destroy: Object.assign(destroy$7, destroy$7)
};
//#endregion
//#region resources/js/routes/admin/collections/index.ts
/**
* @see \App\Http\Controllers\Admin\CollectionController::index
* @see app/Http/Controllers/Admin/CollectionController.php:15
* @route '/admin/collections'
*/
var index$19 = (options) => ({
	url: index$19.url(options),
	method: "get"
});
index$19.definition = {
	methods: ["get", "head"],
	url: "/admin/collections"
};
/**
* @see \App\Http\Controllers\Admin\CollectionController::index
* @see app/Http/Controllers/Admin/CollectionController.php:15
* @route '/admin/collections'
*/
index$19.url = (options) => {
	return index$19.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CollectionController::index
* @see app/Http/Controllers/Admin/CollectionController.php:15
* @route '/admin/collections'
*/
index$19.get = (options) => ({
	url: index$19.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::index
* @see app/Http/Controllers/Admin/CollectionController.php:15
* @route '/admin/collections'
*/
index$19.head = (options) => ({
	url: index$19.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::index
* @see app/Http/Controllers/Admin/CollectionController.php:15
* @route '/admin/collections'
*/
var indexForm$19 = (options) => ({
	action: index$19.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::index
* @see app/Http/Controllers/Admin/CollectionController.php:15
* @route '/admin/collections'
*/
indexForm$19.get = (options) => ({
	action: index$19.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::index
* @see app/Http/Controllers/Admin/CollectionController.php:15
* @route '/admin/collections'
*/
indexForm$19.head = (options) => ({
	action: index$19.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$19.form = indexForm$19;
/**
* @see \App\Http\Controllers\Admin\CollectionController::create
* @see app/Http/Controllers/Admin/CollectionController.php:20
* @route '/admin/collections/create'
*/
var create$7 = (options) => ({
	url: create$7.url(options),
	method: "get"
});
create$7.definition = {
	methods: ["get", "head"],
	url: "/admin/collections/create"
};
/**
* @see \App\Http\Controllers\Admin\CollectionController::create
* @see app/Http/Controllers/Admin/CollectionController.php:20
* @route '/admin/collections/create'
*/
create$7.url = (options) => {
	return create$7.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CollectionController::create
* @see app/Http/Controllers/Admin/CollectionController.php:20
* @route '/admin/collections/create'
*/
create$7.get = (options) => ({
	url: create$7.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::create
* @see app/Http/Controllers/Admin/CollectionController.php:20
* @route '/admin/collections/create'
*/
create$7.head = (options) => ({
	url: create$7.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::create
* @see app/Http/Controllers/Admin/CollectionController.php:20
* @route '/admin/collections/create'
*/
var createForm$7 = (options) => ({
	action: create$7.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::create
* @see app/Http/Controllers/Admin/CollectionController.php:20
* @route '/admin/collections/create'
*/
createForm$7.get = (options) => ({
	action: create$7.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::create
* @see app/Http/Controllers/Admin/CollectionController.php:20
* @route '/admin/collections/create'
*/
createForm$7.head = (options) => ({
	action: create$7.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
create$7.form = createForm$7;
/**
* @see \App\Http\Controllers\Admin\CollectionController::store
* @see app/Http/Controllers/Admin/CollectionController.php:28
* @route '/admin/collections'
*/
var store$9 = (options) => ({
	url: store$9.url(options),
	method: "post"
});
store$9.definition = {
	methods: ["post"],
	url: "/admin/collections"
};
/**
* @see \App\Http\Controllers\Admin\CollectionController::store
* @see app/Http/Controllers/Admin/CollectionController.php:28
* @route '/admin/collections'
*/
store$9.url = (options) => {
	return store$9.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CollectionController::store
* @see app/Http/Controllers/Admin/CollectionController.php:28
* @route '/admin/collections'
*/
store$9.post = (options) => ({
	url: store$9.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::store
* @see app/Http/Controllers/Admin/CollectionController.php:28
* @route '/admin/collections'
*/
var storeForm$9 = (options) => ({
	action: store$9.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::store
* @see app/Http/Controllers/Admin/CollectionController.php:28
* @route '/admin/collections'
*/
storeForm$9.post = (options) => ({
	action: store$9.url(options),
	method: "post"
});
store$9.form = storeForm$9;
/**
* @see \App\Http\Controllers\Admin\CollectionController::edit
* @see app/Http/Controllers/Admin/CollectionController.php:35
* @route '/admin/collections/{collection}/edit'
*/
var edit$8 = (args, options) => ({
	url: edit$8.url(args, options),
	method: "get"
});
edit$8.definition = {
	methods: ["get", "head"],
	url: "/admin/collections/{collection}/edit"
};
/**
* @see \App\Http\Controllers\Admin\CollectionController::edit
* @see app/Http/Controllers/Admin/CollectionController.php:35
* @route '/admin/collections/{collection}/edit'
*/
edit$8.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { collection: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { collection: args.id };
	if (Array.isArray(args)) args = { collection: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { collection: typeof args.collection === "object" ? args.collection.id : args.collection };
	return edit$8.definition.url.replace("{collection}", parsedArgs.collection.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CollectionController::edit
* @see app/Http/Controllers/Admin/CollectionController.php:35
* @route '/admin/collections/{collection}/edit'
*/
edit$8.get = (args, options) => ({
	url: edit$8.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::edit
* @see app/Http/Controllers/Admin/CollectionController.php:35
* @route '/admin/collections/{collection}/edit'
*/
edit$8.head = (args, options) => ({
	url: edit$8.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::edit
* @see app/Http/Controllers/Admin/CollectionController.php:35
* @route '/admin/collections/{collection}/edit'
*/
var editForm$8 = (args, options) => ({
	action: edit$8.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::edit
* @see app/Http/Controllers/Admin/CollectionController.php:35
* @route '/admin/collections/{collection}/edit'
*/
editForm$8.get = (args, options) => ({
	action: edit$8.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::edit
* @see app/Http/Controllers/Admin/CollectionController.php:35
* @route '/admin/collections/{collection}/edit'
*/
editForm$8.head = (args, options) => ({
	action: edit$8.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
edit$8.form = editForm$8;
/**
* @see \App\Http\Controllers\Admin\CollectionController::update
* @see app/Http/Controllers/Admin/CollectionController.php:49
* @route '/admin/collections/{collection}'
*/
var update$9 = (args, options) => ({
	url: update$9.url(args, options),
	method: "put"
});
update$9.definition = {
	methods: ["put"],
	url: "/admin/collections/{collection}"
};
/**
* @see \App\Http\Controllers\Admin\CollectionController::update
* @see app/Http/Controllers/Admin/CollectionController.php:49
* @route '/admin/collections/{collection}'
*/
update$9.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { collection: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { collection: args.id };
	if (Array.isArray(args)) args = { collection: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { collection: typeof args.collection === "object" ? args.collection.id : args.collection };
	return update$9.definition.url.replace("{collection}", parsedArgs.collection.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CollectionController::update
* @see app/Http/Controllers/Admin/CollectionController.php:49
* @route '/admin/collections/{collection}'
*/
update$9.put = (args, options) => ({
	url: update$9.url(args, options),
	method: "put"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::update
* @see app/Http/Controllers/Admin/CollectionController.php:49
* @route '/admin/collections/{collection}'
*/
var updateForm$9 = (args, options) => ({
	action: update$9.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::update
* @see app/Http/Controllers/Admin/CollectionController.php:49
* @route '/admin/collections/{collection}'
*/
updateForm$9.put = (args, options) => ({
	action: update$9.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$9.form = updateForm$9;
/**
* @see \App\Http\Controllers\Admin\CollectionController::destroy
* @see app/Http/Controllers/Admin/CollectionController.php:56
* @route '/admin/collections/{collection}'
*/
var destroy$6 = (args, options) => ({
	url: destroy$6.url(args, options),
	method: "delete"
});
destroy$6.definition = {
	methods: ["delete"],
	url: "/admin/collections/{collection}"
};
/**
* @see \App\Http\Controllers\Admin\CollectionController::destroy
* @see app/Http/Controllers/Admin/CollectionController.php:56
* @route '/admin/collections/{collection}'
*/
destroy$6.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { collection: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { collection: args.id };
	if (Array.isArray(args)) args = { collection: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { collection: typeof args.collection === "object" ? args.collection.id : args.collection };
	return destroy$6.definition.url.replace("{collection}", parsedArgs.collection.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CollectionController::destroy
* @see app/Http/Controllers/Admin/CollectionController.php:56
* @route '/admin/collections/{collection}'
*/
destroy$6.delete = (args, options) => ({
	url: destroy$6.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::destroy
* @see app/Http/Controllers/Admin/CollectionController.php:56
* @route '/admin/collections/{collection}'
*/
var destroyForm$6 = (args, options) => ({
	action: destroy$6.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\CollectionController::destroy
* @see app/Http/Controllers/Admin/CollectionController.php:56
* @route '/admin/collections/{collection}'
*/
destroyForm$6.delete = (args, options) => ({
	action: destroy$6.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy$6.form = destroyForm$6;
var collections = {
	index: Object.assign(index$19, index$19),
	create: Object.assign(create$7, create$7),
	store: Object.assign(store$9, store$9),
	edit: Object.assign(edit$8, edit$8),
	update: Object.assign(update$9, update$9),
	destroy: Object.assign(destroy$6, destroy$6)
};
//#endregion
//#region resources/js/routes/admin/stock/index.ts
/**
* @see \App\Http\Controllers\Admin\StockController::index
* @see app/Http/Controllers/Admin/StockController.php:15
* @route '/admin/stock'
*/
var index$18 = (options) => ({
	url: index$18.url(options),
	method: "get"
});
index$18.definition = {
	methods: ["get", "head"],
	url: "/admin/stock"
};
/**
* @see \App\Http\Controllers\Admin\StockController::index
* @see app/Http/Controllers/Admin/StockController.php:15
* @route '/admin/stock'
*/
index$18.url = (options) => {
	return index$18.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\StockController::index
* @see app/Http/Controllers/Admin/StockController.php:15
* @route '/admin/stock'
*/
index$18.get = (options) => ({
	url: index$18.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\StockController::index
* @see app/Http/Controllers/Admin/StockController.php:15
* @route '/admin/stock'
*/
index$18.head = (options) => ({
	url: index$18.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\StockController::index
* @see app/Http/Controllers/Admin/StockController.php:15
* @route '/admin/stock'
*/
var indexForm$18 = (options) => ({
	action: index$18.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\StockController::index
* @see app/Http/Controllers/Admin/StockController.php:15
* @route '/admin/stock'
*/
indexForm$18.get = (options) => ({
	action: index$18.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\StockController::index
* @see app/Http/Controllers/Admin/StockController.php:15
* @route '/admin/stock'
*/
indexForm$18.head = (options) => ({
	action: index$18.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$18.form = indexForm$18;
/**
* @see \App\Http\Controllers\Admin\StockController::logs
* @see app/Http/Controllers/Admin/StockController.php:20
* @route '/admin/stock/logs'
*/
var logs = (options) => ({
	url: logs.url(options),
	method: "get"
});
logs.definition = {
	methods: ["get", "head"],
	url: "/admin/stock/logs"
};
/**
* @see \App\Http\Controllers\Admin\StockController::logs
* @see app/Http/Controllers/Admin/StockController.php:20
* @route '/admin/stock/logs'
*/
logs.url = (options) => {
	return logs.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\StockController::logs
* @see app/Http/Controllers/Admin/StockController.php:20
* @route '/admin/stock/logs'
*/
logs.get = (options) => ({
	url: logs.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\StockController::logs
* @see app/Http/Controllers/Admin/StockController.php:20
* @route '/admin/stock/logs'
*/
logs.head = (options) => ({
	url: logs.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\StockController::logs
* @see app/Http/Controllers/Admin/StockController.php:20
* @route '/admin/stock/logs'
*/
var logsForm = (options) => ({
	action: logs.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\StockController::logs
* @see app/Http/Controllers/Admin/StockController.php:20
* @route '/admin/stock/logs'
*/
logsForm.get = (options) => ({
	action: logs.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\StockController::logs
* @see app/Http/Controllers/Admin/StockController.php:20
* @route '/admin/stock/logs'
*/
logsForm.head = (options) => ({
	action: logs.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
logs.form = logsForm;
var stock = {
	index: Object.assign(index$18, index$18),
	logs: Object.assign(logs, logs)
};
//#endregion
//#region resources/js/routes/admin/orders/shipments/index.ts
/**
* @see \App\Http\Controllers\Admin\ShipmentController::store
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
var store$8 = (args, options) => ({
	url: store$8.url(args, options),
	method: "post"
});
store$8.definition = {
	methods: ["post"],
	url: "/admin/orders/{order}/shipments"
};
/**
* @see \App\Http\Controllers\Admin\ShipmentController::store
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
store$8.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { order: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { order: args.id };
	if (Array.isArray(args)) args = { order: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { order: typeof args.order === "object" ? args.order.id : args.order };
	return store$8.definition.url.replace("{order}", parsedArgs.order.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ShipmentController::store
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
store$8.post = (args, options) => ({
	url: store$8.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::store
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
var storeForm$8 = (args, options) => ({
	action: store$8.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::store
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
storeForm$8.post = (args, options) => ({
	action: store$8.url(args, options),
	method: "post"
});
store$8.form = storeForm$8;
var shipments$1 = { store: Object.assign(store$8, store$8) };
//#endregion
//#region resources/js/routes/admin/orders/index.ts
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
var index$17 = (options) => ({
	url: index$17.url(options),
	method: "get"
});
index$17.definition = {
	methods: ["get", "head"],
	url: "/admin/orders"
};
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
index$17.url = (options) => {
	return index$17.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
index$17.get = (options) => ({
	url: index$17.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
index$17.head = (options) => ({
	url: index$17.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
var indexForm$17 = (options) => ({
	action: index$17.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
indexForm$17.get = (options) => ({
	action: index$17.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
indexForm$17.head = (options) => ({
	action: index$17.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$17.form = indexForm$17;
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
var show$6 = (args, options) => ({
	url: show$6.url(args, options),
	method: "get"
});
show$6.definition = {
	methods: ["get", "head"],
	url: "/admin/orders/{order}"
};
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
show$6.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { order: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { order: args.id };
	if (Array.isArray(args)) args = { order: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { order: typeof args.order === "object" ? args.order.id : args.order };
	return show$6.definition.url.replace("{order}", parsedArgs.order.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
show$6.get = (args, options) => ({
	url: show$6.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
show$6.head = (args, options) => ({
	url: show$6.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
var showForm$6 = (args, options) => ({
	action: show$6.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
showForm$6.get = (args, options) => ({
	action: show$6.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
showForm$6.head = (args, options) => ({
	action: show$6.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
show$6.form = showForm$6;
/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:26
* @route '/admin/orders/{order}/status'
*/
var status$1 = (args, options) => ({
	url: status$1.url(args, options),
	method: "post"
});
status$1.definition = {
	methods: ["post"],
	url: "/admin/orders/{order}/status"
};
/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:26
* @route '/admin/orders/{order}/status'
*/
status$1.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { order: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { order: args.id };
	if (Array.isArray(args)) args = { order: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { order: typeof args.order === "object" ? args.order.id : args.order };
	return status$1.definition.url.replace("{order}", parsedArgs.order.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:26
* @route '/admin/orders/{order}/status'
*/
status$1.post = (args, options) => ({
	url: status$1.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:26
* @route '/admin/orders/{order}/status'
*/
var statusForm$1 = (args, options) => ({
	action: status$1.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:26
* @route '/admin/orders/{order}/status'
*/
statusForm$1.post = (args, options) => ({
	action: status$1.url(args, options),
	method: "post"
});
status$1.form = statusForm$1;
/**
* @see \App\Http\Controllers\Admin\OrderController::notes
* @see app/Http/Controllers/Admin/OrderController.php:33
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
* @see app/Http/Controllers/Admin/OrderController.php:33
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
* @see app/Http/Controllers/Admin/OrderController.php:33
* @route '/admin/orders/{order}/notes'
*/
notes.post = (args, options) => ({
	url: notes.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::notes
* @see app/Http/Controllers/Admin/OrderController.php:33
* @route '/admin/orders/{order}/notes'
*/
var notesForm = (args, options) => ({
	action: notes.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\OrderController::notes
* @see app/Http/Controllers/Admin/OrderController.php:33
* @route '/admin/orders/{order}/notes'
*/
notesForm.post = (args, options) => ({
	action: notes.url(args, options),
	method: "post"
});
notes.form = notesForm;
var orders = {
	index: Object.assign(index$17, index$17),
	show: Object.assign(show$6, show$6),
	status: Object.assign(status$1, status$1),
	notes: Object.assign(notes, notes),
	shipments: Object.assign(shipments$1, shipments$1)
};
//#endregion
//#region resources/js/routes/admin/payments/index.ts
/**
* @see \App\Http\Controllers\Admin\PaymentController::index
* @see app/Http/Controllers/Admin/PaymentController.php:14
* @route '/admin/payments'
*/
var index$16 = (options) => ({
	url: index$16.url(options),
	method: "get"
});
index$16.definition = {
	methods: ["get", "head"],
	url: "/admin/payments"
};
/**
* @see \App\Http\Controllers\Admin\PaymentController::index
* @see app/Http/Controllers/Admin/PaymentController.php:14
* @route '/admin/payments'
*/
index$16.url = (options) => {
	return index$16.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\PaymentController::index
* @see app/Http/Controllers/Admin/PaymentController.php:14
* @route '/admin/payments'
*/
index$16.get = (options) => ({
	url: index$16.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::index
* @see app/Http/Controllers/Admin/PaymentController.php:14
* @route '/admin/payments'
*/
index$16.head = (options) => ({
	url: index$16.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::index
* @see app/Http/Controllers/Admin/PaymentController.php:14
* @route '/admin/payments'
*/
var indexForm$16 = (options) => ({
	action: index$16.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::index
* @see app/Http/Controllers/Admin/PaymentController.php:14
* @route '/admin/payments'
*/
indexForm$16.get = (options) => ({
	action: index$16.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::index
* @see app/Http/Controllers/Admin/PaymentController.php:14
* @route '/admin/payments'
*/
indexForm$16.head = (options) => ({
	action: index$16.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$16.form = indexForm$16;
/**
* @see \App\Http\Controllers\Admin\PaymentController::show
* @see app/Http/Controllers/Admin/PaymentController.php:19
* @route '/admin/payments/{payment}'
*/
var show$5 = (args, options) => ({
	url: show$5.url(args, options),
	method: "get"
});
show$5.definition = {
	methods: ["get", "head"],
	url: "/admin/payments/{payment}"
};
/**
* @see \App\Http\Controllers\Admin\PaymentController::show
* @see app/Http/Controllers/Admin/PaymentController.php:19
* @route '/admin/payments/{payment}'
*/
show$5.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { payment: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { payment: args.id };
	if (Array.isArray(args)) args = { payment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { payment: typeof args.payment === "object" ? args.payment.id : args.payment };
	return show$5.definition.url.replace("{payment}", parsedArgs.payment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\PaymentController::show
* @see app/Http/Controllers/Admin/PaymentController.php:19
* @route '/admin/payments/{payment}'
*/
show$5.get = (args, options) => ({
	url: show$5.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::show
* @see app/Http/Controllers/Admin/PaymentController.php:19
* @route '/admin/payments/{payment}'
*/
show$5.head = (args, options) => ({
	url: show$5.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::show
* @see app/Http/Controllers/Admin/PaymentController.php:19
* @route '/admin/payments/{payment}'
*/
var showForm$5 = (args, options) => ({
	action: show$5.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::show
* @see app/Http/Controllers/Admin/PaymentController.php:19
* @route '/admin/payments/{payment}'
*/
showForm$5.get = (args, options) => ({
	action: show$5.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentController::show
* @see app/Http/Controllers/Admin/PaymentController.php:19
* @route '/admin/payments/{payment}'
*/
showForm$5.head = (args, options) => ({
	action: show$5.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
show$5.form = showForm$5;
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
	index: Object.assign(index$16, index$16),
	show: Object.assign(show$5, show$5),
	sync: Object.assign(sync, sync)
};
//#endregion
//#region resources/js/routes/admin/payment-logs/index.ts
/**
* @see \App\Http\Controllers\Admin\PaymentLogController::index
* @see app/Http/Controllers/Admin/PaymentLogController.php:13
* @route '/admin/payment-logs'
*/
var index$15 = (options) => ({
	url: index$15.url(options),
	method: "get"
});
index$15.definition = {
	methods: ["get", "head"],
	url: "/admin/payment-logs"
};
/**
* @see \App\Http\Controllers\Admin\PaymentLogController::index
* @see app/Http/Controllers/Admin/PaymentLogController.php:13
* @route '/admin/payment-logs'
*/
index$15.url = (options) => {
	return index$15.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\PaymentLogController::index
* @see app/Http/Controllers/Admin/PaymentLogController.php:13
* @route '/admin/payment-logs'
*/
index$15.get = (options) => ({
	url: index$15.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentLogController::index
* @see app/Http/Controllers/Admin/PaymentLogController.php:13
* @route '/admin/payment-logs'
*/
index$15.head = (options) => ({
	url: index$15.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\PaymentLogController::index
* @see app/Http/Controllers/Admin/PaymentLogController.php:13
* @route '/admin/payment-logs'
*/
var indexForm$15 = (options) => ({
	action: index$15.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentLogController::index
* @see app/Http/Controllers/Admin/PaymentLogController.php:13
* @route '/admin/payment-logs'
*/
indexForm$15.get = (options) => ({
	action: index$15.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentLogController::index
* @see app/Http/Controllers/Admin/PaymentLogController.php:13
* @route '/admin/payment-logs'
*/
indexForm$15.head = (options) => ({
	action: index$15.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$15.form = indexForm$15;
/**
* @see \App\Http\Controllers\Admin\PaymentLogController::show
* @see app/Http/Controllers/Admin/PaymentLogController.php:18
* @route '/admin/payment-logs/{paymentLog}'
*/
var show$4 = (args, options) => ({
	url: show$4.url(args, options),
	method: "get"
});
show$4.definition = {
	methods: ["get", "head"],
	url: "/admin/payment-logs/{paymentLog}"
};
/**
* @see \App\Http\Controllers\Admin\PaymentLogController::show
* @see app/Http/Controllers/Admin/PaymentLogController.php:18
* @route '/admin/payment-logs/{paymentLog}'
*/
show$4.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { paymentLog: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { paymentLog: args.id };
	if (Array.isArray(args)) args = { paymentLog: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { paymentLog: typeof args.paymentLog === "object" ? args.paymentLog.id : args.paymentLog };
	return show$4.definition.url.replace("{paymentLog}", parsedArgs.paymentLog.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\PaymentLogController::show
* @see app/Http/Controllers/Admin/PaymentLogController.php:18
* @route '/admin/payment-logs/{paymentLog}'
*/
show$4.get = (args, options) => ({
	url: show$4.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentLogController::show
* @see app/Http/Controllers/Admin/PaymentLogController.php:18
* @route '/admin/payment-logs/{paymentLog}'
*/
show$4.head = (args, options) => ({
	url: show$4.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\PaymentLogController::show
* @see app/Http/Controllers/Admin/PaymentLogController.php:18
* @route '/admin/payment-logs/{paymentLog}'
*/
var showForm$4 = (args, options) => ({
	action: show$4.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentLogController::show
* @see app/Http/Controllers/Admin/PaymentLogController.php:18
* @route '/admin/payment-logs/{paymentLog}'
*/
showForm$4.get = (args, options) => ({
	action: show$4.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PaymentLogController::show
* @see app/Http/Controllers/Admin/PaymentLogController.php:18
* @route '/admin/payment-logs/{paymentLog}'
*/
showForm$4.head = (args, options) => ({
	action: show$4.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
show$4.form = showForm$4;
var paymentLogs = {
	index: Object.assign(index$15, index$15),
	show: Object.assign(show$4, show$4)
};
//#endregion
//#region resources/js/routes/admin/shipments/index.ts
/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
var index$14 = (options) => ({
	url: index$14.url(options),
	method: "get"
});
index$14.definition = {
	methods: ["get", "head"],
	url: "/admin/shipments"
};
/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
index$14.url = (options) => {
	return index$14.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
index$14.get = (options) => ({
	url: index$14.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
index$14.head = (options) => ({
	url: index$14.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
var indexForm$14 = (options) => ({
	action: index$14.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
indexForm$14.get = (options) => ({
	action: index$14.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
indexForm$14.head = (options) => ({
	action: index$14.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$14.form = indexForm$14;
/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
var show$3 = (args, options) => ({
	url: show$3.url(args, options),
	method: "get"
});
show$3.definition = {
	methods: ["get", "head"],
	url: "/admin/shipments/{shipment}"
};
/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
show$3.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { shipment: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { shipment: args.id };
	if (Array.isArray(args)) args = { shipment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { shipment: typeof args.shipment === "object" ? args.shipment.id : args.shipment };
	return show$3.definition.url.replace("{shipment}", parsedArgs.shipment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
show$3.get = (args, options) => ({
	url: show$3.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
show$3.head = (args, options) => ({
	url: show$3.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
var showForm$3 = (args, options) => ({
	action: show$3.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
showForm$3.get = (args, options) => ({
	action: show$3.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
showForm$3.head = (args, options) => ({
	action: show$3.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
show$3.form = showForm$3;
/**
* @see \App\Http\Controllers\Admin\ShipmentController::status
* @see app/Http/Controllers/Admin/ShipmentController.php:44
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
* @see app/Http/Controllers/Admin/ShipmentController.php:44
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
* @see app/Http/Controllers/Admin/ShipmentController.php:44
* @route '/admin/shipments/{shipment}/status'
*/
status.post = (args, options) => ({
	url: status.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::status
* @see app/Http/Controllers/Admin/ShipmentController.php:44
* @route '/admin/shipments/{shipment}/status'
*/
var statusForm = (args, options) => ({
	action: status.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::status
* @see app/Http/Controllers/Admin/ShipmentController.php:44
* @route '/admin/shipments/{shipment}/status'
*/
statusForm.post = (args, options) => ({
	action: status.url(args, options),
	method: "post"
});
status.form = statusForm;
/**
* @see \App\Http\Controllers\Admin\ShipmentController::refreshTracking
* @see app/Http/Controllers/Admin/ShipmentController.php:51
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
* @see app/Http/Controllers/Admin/ShipmentController.php:51
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
* @see app/Http/Controllers/Admin/ShipmentController.php:51
* @route '/admin/shipments/{shipment}/refresh-tracking'
*/
refreshTracking.post = (args, options) => ({
	url: refreshTracking.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::refreshTracking
* @see app/Http/Controllers/Admin/ShipmentController.php:51
* @route '/admin/shipments/{shipment}/refresh-tracking'
*/
var refreshTrackingForm = (args, options) => ({
	action: refreshTracking.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\ShipmentController::refreshTracking
* @see app/Http/Controllers/Admin/ShipmentController.php:51
* @route '/admin/shipments/{shipment}/refresh-tracking'
*/
refreshTrackingForm.post = (args, options) => ({
	action: refreshTracking.url(args, options),
	method: "post"
});
refreshTracking.form = refreshTrackingForm;
var shipments = {
	index: Object.assign(index$14, index$14),
	show: Object.assign(show$3, show$3),
	status: Object.assign(status, status),
	refreshTracking: Object.assign(refreshTracking, refreshTracking)
};
//#endregion
//#region resources/js/routes/admin/biteship-webhook-logs/index.ts
/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::index
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:13
* @route '/admin/biteship-webhook-logs'
*/
var index$13 = (options) => ({
	url: index$13.url(options),
	method: "get"
});
index$13.definition = {
	methods: ["get", "head"],
	url: "/admin/biteship-webhook-logs"
};
/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::index
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:13
* @route '/admin/biteship-webhook-logs'
*/
index$13.url = (options) => {
	return index$13.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::index
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:13
* @route '/admin/biteship-webhook-logs'
*/
index$13.get = (options) => ({
	url: index$13.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::index
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:13
* @route '/admin/biteship-webhook-logs'
*/
index$13.head = (options) => ({
	url: index$13.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::index
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:13
* @route '/admin/biteship-webhook-logs'
*/
var indexForm$13 = (options) => ({
	action: index$13.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::index
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:13
* @route '/admin/biteship-webhook-logs'
*/
indexForm$13.get = (options) => ({
	action: index$13.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::index
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:13
* @route '/admin/biteship-webhook-logs'
*/
indexForm$13.head = (options) => ({
	action: index$13.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$13.form = indexForm$13;
/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::show
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:18
* @route '/admin/biteship-webhook-logs/{biteshipWebhookLog}'
*/
var show$2 = (args, options) => ({
	url: show$2.url(args, options),
	method: "get"
});
show$2.definition = {
	methods: ["get", "head"],
	url: "/admin/biteship-webhook-logs/{biteshipWebhookLog}"
};
/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::show
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:18
* @route '/admin/biteship-webhook-logs/{biteshipWebhookLog}'
*/
show$2.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { biteshipWebhookLog: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { biteshipWebhookLog: args.id };
	if (Array.isArray(args)) args = { biteshipWebhookLog: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { biteshipWebhookLog: typeof args.biteshipWebhookLog === "object" ? args.biteshipWebhookLog.id : args.biteshipWebhookLog };
	return show$2.definition.url.replace("{biteshipWebhookLog}", parsedArgs.biteshipWebhookLog.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::show
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:18
* @route '/admin/biteship-webhook-logs/{biteshipWebhookLog}'
*/
show$2.get = (args, options) => ({
	url: show$2.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::show
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:18
* @route '/admin/biteship-webhook-logs/{biteshipWebhookLog}'
*/
show$2.head = (args, options) => ({
	url: show$2.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::show
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:18
* @route '/admin/biteship-webhook-logs/{biteshipWebhookLog}'
*/
var showForm$2 = (args, options) => ({
	action: show$2.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::show
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:18
* @route '/admin/biteship-webhook-logs/{biteshipWebhookLog}'
*/
showForm$2.get = (args, options) => ({
	action: show$2.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::show
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:18
* @route '/admin/biteship-webhook-logs/{biteshipWebhookLog}'
*/
showForm$2.head = (args, options) => ({
	action: show$2.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
show$2.form = showForm$2;
var biteshipWebhookLogs = {
	index: Object.assign(index$13, index$13),
	show: Object.assign(show$2, show$2)
};
//#endregion
//#region resources/js/routes/admin/customers/index.ts
/**
* @see \App\Http\Controllers\Admin\CustomerController::index
* @see app/Http/Controllers/Admin/CustomerController.php:14
* @route '/admin/customers'
*/
var index$12 = (options) => ({
	url: index$12.url(options),
	method: "get"
});
index$12.definition = {
	methods: ["get", "head"],
	url: "/admin/customers"
};
/**
* @see \App\Http\Controllers\Admin\CustomerController::index
* @see app/Http/Controllers/Admin/CustomerController.php:14
* @route '/admin/customers'
*/
index$12.url = (options) => {
	return index$12.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CustomerController::index
* @see app/Http/Controllers/Admin/CustomerController.php:14
* @route '/admin/customers'
*/
index$12.get = (options) => ({
	url: index$12.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CustomerController::index
* @see app/Http/Controllers/Admin/CustomerController.php:14
* @route '/admin/customers'
*/
index$12.head = (options) => ({
	url: index$12.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\CustomerController::index
* @see app/Http/Controllers/Admin/CustomerController.php:14
* @route '/admin/customers'
*/
var indexForm$12 = (options) => ({
	action: index$12.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CustomerController::index
* @see app/Http/Controllers/Admin/CustomerController.php:14
* @route '/admin/customers'
*/
indexForm$12.get = (options) => ({
	action: index$12.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CustomerController::index
* @see app/Http/Controllers/Admin/CustomerController.php:14
* @route '/admin/customers'
*/
indexForm$12.head = (options) => ({
	action: index$12.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$12.form = indexForm$12;
/**
* @see \App\Http\Controllers\Admin\CustomerController::show
* @see app/Http/Controllers/Admin/CustomerController.php:19
* @route '/admin/customers/{customer}'
*/
var show$1 = (args, options) => ({
	url: show$1.url(args, options),
	method: "get"
});
show$1.definition = {
	methods: ["get", "head"],
	url: "/admin/customers/{customer}"
};
/**
* @see \App\Http\Controllers\Admin\CustomerController::show
* @see app/Http/Controllers/Admin/CustomerController.php:19
* @route '/admin/customers/{customer}'
*/
show$1.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { customer: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { customer: args.id };
	if (Array.isArray(args)) args = { customer: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { customer: typeof args.customer === "object" ? args.customer.id : args.customer };
	return show$1.definition.url.replace("{customer}", parsedArgs.customer.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CustomerController::show
* @see app/Http/Controllers/Admin/CustomerController.php:19
* @route '/admin/customers/{customer}'
*/
show$1.get = (args, options) => ({
	url: show$1.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CustomerController::show
* @see app/Http/Controllers/Admin/CustomerController.php:19
* @route '/admin/customers/{customer}'
*/
show$1.head = (args, options) => ({
	url: show$1.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\CustomerController::show
* @see app/Http/Controllers/Admin/CustomerController.php:19
* @route '/admin/customers/{customer}'
*/
var showForm$1 = (args, options) => ({
	action: show$1.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CustomerController::show
* @see app/Http/Controllers/Admin/CustomerController.php:19
* @route '/admin/customers/{customer}'
*/
showForm$1.get = (args, options) => ({
	action: show$1.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CustomerController::show
* @see app/Http/Controllers/Admin/CustomerController.php:19
* @route '/admin/customers/{customer}'
*/
showForm$1.head = (args, options) => ({
	action: show$1.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
show$1.form = showForm$1;
/**
* @see \App\Http\Controllers\Admin\CustomerController::toggleActive
* @see app/Http/Controllers/Admin/CustomerController.php:24
* @route '/admin/customers/{customer}/toggle-active'
*/
var toggleActive = (args, options) => ({
	url: toggleActive.url(args, options),
	method: "post"
});
toggleActive.definition = {
	methods: ["post"],
	url: "/admin/customers/{customer}/toggle-active"
};
/**
* @see \App\Http\Controllers\Admin\CustomerController::toggleActive
* @see app/Http/Controllers/Admin/CustomerController.php:24
* @route '/admin/customers/{customer}/toggle-active'
*/
toggleActive.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { customer: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { customer: args.id };
	if (Array.isArray(args)) args = { customer: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { customer: typeof args.customer === "object" ? args.customer.id : args.customer };
	return toggleActive.definition.url.replace("{customer}", parsedArgs.customer.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CustomerController::toggleActive
* @see app/Http/Controllers/Admin/CustomerController.php:24
* @route '/admin/customers/{customer}/toggle-active'
*/
toggleActive.post = (args, options) => ({
	url: toggleActive.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\CustomerController::toggleActive
* @see app/Http/Controllers/Admin/CustomerController.php:24
* @route '/admin/customers/{customer}/toggle-active'
*/
var toggleActiveForm = (args, options) => ({
	action: toggleActive.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\CustomerController::toggleActive
* @see app/Http/Controllers/Admin/CustomerController.php:24
* @route '/admin/customers/{customer}/toggle-active'
*/
toggleActiveForm.post = (args, options) => ({
	action: toggleActive.url(args, options),
	method: "post"
});
toggleActive.form = toggleActiveForm;
var customers = {
	index: Object.assign(index$12, index$12),
	show: Object.assign(show$1, show$1),
	toggleActive: Object.assign(toggleActive, toggleActive)
};
//#endregion
//#region resources/js/routes/admin/customer-addresses/index.ts
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::index
* @see app/Http/Controllers/Admin/CustomerAddressController.php:15
* @route '/admin/customer-addresses'
*/
var index$11 = (options) => ({
	url: index$11.url(options),
	method: "get"
});
index$11.definition = {
	methods: ["get", "head"],
	url: "/admin/customer-addresses"
};
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::index
* @see app/Http/Controllers/Admin/CustomerAddressController.php:15
* @route '/admin/customer-addresses'
*/
index$11.url = (options) => {
	return index$11.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::index
* @see app/Http/Controllers/Admin/CustomerAddressController.php:15
* @route '/admin/customer-addresses'
*/
index$11.get = (options) => ({
	url: index$11.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::index
* @see app/Http/Controllers/Admin/CustomerAddressController.php:15
* @route '/admin/customer-addresses'
*/
index$11.head = (options) => ({
	url: index$11.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::index
* @see app/Http/Controllers/Admin/CustomerAddressController.php:15
* @route '/admin/customer-addresses'
*/
var indexForm$11 = (options) => ({
	action: index$11.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::index
* @see app/Http/Controllers/Admin/CustomerAddressController.php:15
* @route '/admin/customer-addresses'
*/
indexForm$11.get = (options) => ({
	action: index$11.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::index
* @see app/Http/Controllers/Admin/CustomerAddressController.php:15
* @route '/admin/customer-addresses'
*/
indexForm$11.head = (options) => ({
	action: index$11.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$11.form = indexForm$11;
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::show
* @see app/Http/Controllers/Admin/CustomerAddressController.php:20
* @route '/admin/customer-addresses/{customerAddress}'
*/
var show = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
show.definition = {
	methods: ["get", "head"],
	url: "/admin/customer-addresses/{customerAddress}"
};
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::show
* @see app/Http/Controllers/Admin/CustomerAddressController.php:20
* @route '/admin/customer-addresses/{customerAddress}'
*/
show.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { customerAddress: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { customerAddress: args.id };
	if (Array.isArray(args)) args = { customerAddress: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { customerAddress: typeof args.customerAddress === "object" ? args.customerAddress.id : args.customerAddress };
	return show.definition.url.replace("{customerAddress}", parsedArgs.customerAddress.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::show
* @see app/Http/Controllers/Admin/CustomerAddressController.php:20
* @route '/admin/customer-addresses/{customerAddress}'
*/
show.get = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::show
* @see app/Http/Controllers/Admin/CustomerAddressController.php:20
* @route '/admin/customer-addresses/{customerAddress}'
*/
show.head = (args, options) => ({
	url: show.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::show
* @see app/Http/Controllers/Admin/CustomerAddressController.php:20
* @route '/admin/customer-addresses/{customerAddress}'
*/
var showForm = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::show
* @see app/Http/Controllers/Admin/CustomerAddressController.php:20
* @route '/admin/customer-addresses/{customerAddress}'
*/
showForm.get = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::show
* @see app/Http/Controllers/Admin/CustomerAddressController.php:20
* @route '/admin/customer-addresses/{customerAddress}'
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
* @see \App\Http\Controllers\Admin\CustomerAddressController::edit
* @see app/Http/Controllers/Admin/CustomerAddressController.php:25
* @route '/admin/customer-addresses/{customerAddress}/edit'
*/
var edit$7 = (args, options) => ({
	url: edit$7.url(args, options),
	method: "get"
});
edit$7.definition = {
	methods: ["get", "head"],
	url: "/admin/customer-addresses/{customerAddress}/edit"
};
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::edit
* @see app/Http/Controllers/Admin/CustomerAddressController.php:25
* @route '/admin/customer-addresses/{customerAddress}/edit'
*/
edit$7.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { customerAddress: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { customerAddress: args.id };
	if (Array.isArray(args)) args = { customerAddress: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { customerAddress: typeof args.customerAddress === "object" ? args.customerAddress.id : args.customerAddress };
	return edit$7.definition.url.replace("{customerAddress}", parsedArgs.customerAddress.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::edit
* @see app/Http/Controllers/Admin/CustomerAddressController.php:25
* @route '/admin/customer-addresses/{customerAddress}/edit'
*/
edit$7.get = (args, options) => ({
	url: edit$7.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::edit
* @see app/Http/Controllers/Admin/CustomerAddressController.php:25
* @route '/admin/customer-addresses/{customerAddress}/edit'
*/
edit$7.head = (args, options) => ({
	url: edit$7.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::edit
* @see app/Http/Controllers/Admin/CustomerAddressController.php:25
* @route '/admin/customer-addresses/{customerAddress}/edit'
*/
var editForm$7 = (args, options) => ({
	action: edit$7.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::edit
* @see app/Http/Controllers/Admin/CustomerAddressController.php:25
* @route '/admin/customer-addresses/{customerAddress}/edit'
*/
editForm$7.get = (args, options) => ({
	action: edit$7.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::edit
* @see app/Http/Controllers/Admin/CustomerAddressController.php:25
* @route '/admin/customer-addresses/{customerAddress}/edit'
*/
editForm$7.head = (args, options) => ({
	action: edit$7.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
edit$7.form = editForm$7;
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::update
* @see app/Http/Controllers/Admin/CustomerAddressController.php:30
* @route '/admin/customer-addresses/{customerAddress}'
*/
var update$8 = (args, options) => ({
	url: update$8.url(args, options),
	method: "put"
});
update$8.definition = {
	methods: ["put"],
	url: "/admin/customer-addresses/{customerAddress}"
};
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::update
* @see app/Http/Controllers/Admin/CustomerAddressController.php:30
* @route '/admin/customer-addresses/{customerAddress}'
*/
update$8.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { customerAddress: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { customerAddress: args.id };
	if (Array.isArray(args)) args = { customerAddress: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { customerAddress: typeof args.customerAddress === "object" ? args.customerAddress.id : args.customerAddress };
	return update$8.definition.url.replace("{customerAddress}", parsedArgs.customerAddress.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::update
* @see app/Http/Controllers/Admin/CustomerAddressController.php:30
* @route '/admin/customer-addresses/{customerAddress}'
*/
update$8.put = (args, options) => ({
	url: update$8.url(args, options),
	method: "put"
});
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::update
* @see app/Http/Controllers/Admin/CustomerAddressController.php:30
* @route '/admin/customer-addresses/{customerAddress}'
*/
var updateForm$8 = (args, options) => ({
	action: update$8.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::update
* @see app/Http/Controllers/Admin/CustomerAddressController.php:30
* @route '/admin/customer-addresses/{customerAddress}'
*/
updateForm$8.put = (args, options) => ({
	action: update$8.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$8.form = updateForm$8;
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::destroy
* @see app/Http/Controllers/Admin/CustomerAddressController.php:37
* @route '/admin/customer-addresses/{customerAddress}'
*/
var destroy$5 = (args, options) => ({
	url: destroy$5.url(args, options),
	method: "delete"
});
destroy$5.definition = {
	methods: ["delete"],
	url: "/admin/customer-addresses/{customerAddress}"
};
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::destroy
* @see app/Http/Controllers/Admin/CustomerAddressController.php:37
* @route '/admin/customer-addresses/{customerAddress}'
*/
destroy$5.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { customerAddress: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { customerAddress: args.id };
	if (Array.isArray(args)) args = { customerAddress: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { customerAddress: typeof args.customerAddress === "object" ? args.customerAddress.id : args.customerAddress };
	return destroy$5.definition.url.replace("{customerAddress}", parsedArgs.customerAddress.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::destroy
* @see app/Http/Controllers/Admin/CustomerAddressController.php:37
* @route '/admin/customer-addresses/{customerAddress}'
*/
destroy$5.delete = (args, options) => ({
	url: destroy$5.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::destroy
* @see app/Http/Controllers/Admin/CustomerAddressController.php:37
* @route '/admin/customer-addresses/{customerAddress}'
*/
var destroyForm$5 = (args, options) => ({
	action: destroy$5.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::destroy
* @see app/Http/Controllers/Admin/CustomerAddressController.php:37
* @route '/admin/customer-addresses/{customerAddress}'
*/
destroyForm$5.delete = (args, options) => ({
	action: destroy$5.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy$5.form = destroyForm$5;
var customerAddresses = {
	index: Object.assign(index$11, index$11),
	show: Object.assign(show, show),
	edit: Object.assign(edit$7, edit$7),
	update: Object.assign(update$8, update$8),
	destroy: Object.assign(destroy$5, destroy$5)
};
//#endregion
//#region resources/js/routes/admin/vouchers/index.ts
/**
* @see \App\Http\Controllers\Admin\VoucherController::index
* @see app/Http/Controllers/Admin/VoucherController.php:15
* @route '/admin/vouchers'
*/
var index$10 = (options) => ({
	url: index$10.url(options),
	method: "get"
});
index$10.definition = {
	methods: ["get", "head"],
	url: "/admin/vouchers"
};
/**
* @see \App\Http\Controllers\Admin\VoucherController::index
* @see app/Http/Controllers/Admin/VoucherController.php:15
* @route '/admin/vouchers'
*/
index$10.url = (options) => {
	return index$10.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\VoucherController::index
* @see app/Http/Controllers/Admin/VoucherController.php:15
* @route '/admin/vouchers'
*/
index$10.get = (options) => ({
	url: index$10.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::index
* @see app/Http/Controllers/Admin/VoucherController.php:15
* @route '/admin/vouchers'
*/
index$10.head = (options) => ({
	url: index$10.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::index
* @see app/Http/Controllers/Admin/VoucherController.php:15
* @route '/admin/vouchers'
*/
var indexForm$10 = (options) => ({
	action: index$10.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::index
* @see app/Http/Controllers/Admin/VoucherController.php:15
* @route '/admin/vouchers'
*/
indexForm$10.get = (options) => ({
	action: index$10.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::index
* @see app/Http/Controllers/Admin/VoucherController.php:15
* @route '/admin/vouchers'
*/
indexForm$10.head = (options) => ({
	action: index$10.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$10.form = indexForm$10;
/**
* @see \App\Http\Controllers\Admin\VoucherController::create
* @see app/Http/Controllers/Admin/VoucherController.php:20
* @route '/admin/vouchers/create'
*/
var create$6 = (options) => ({
	url: create$6.url(options),
	method: "get"
});
create$6.definition = {
	methods: ["get", "head"],
	url: "/admin/vouchers/create"
};
/**
* @see \App\Http\Controllers\Admin\VoucherController::create
* @see app/Http/Controllers/Admin/VoucherController.php:20
* @route '/admin/vouchers/create'
*/
create$6.url = (options) => {
	return create$6.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\VoucherController::create
* @see app/Http/Controllers/Admin/VoucherController.php:20
* @route '/admin/vouchers/create'
*/
create$6.get = (options) => ({
	url: create$6.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::create
* @see app/Http/Controllers/Admin/VoucherController.php:20
* @route '/admin/vouchers/create'
*/
create$6.head = (options) => ({
	url: create$6.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::create
* @see app/Http/Controllers/Admin/VoucherController.php:20
* @route '/admin/vouchers/create'
*/
var createForm$6 = (options) => ({
	action: create$6.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::create
* @see app/Http/Controllers/Admin/VoucherController.php:20
* @route '/admin/vouchers/create'
*/
createForm$6.get = (options) => ({
	action: create$6.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::create
* @see app/Http/Controllers/Admin/VoucherController.php:20
* @route '/admin/vouchers/create'
*/
createForm$6.head = (options) => ({
	action: create$6.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
create$6.form = createForm$6;
/**
* @see \App\Http\Controllers\Admin\VoucherController::store
* @see app/Http/Controllers/Admin/VoucherController.php:28
* @route '/admin/vouchers'
*/
var store$7 = (options) => ({
	url: store$7.url(options),
	method: "post"
});
store$7.definition = {
	methods: ["post"],
	url: "/admin/vouchers"
};
/**
* @see \App\Http\Controllers\Admin\VoucherController::store
* @see app/Http/Controllers/Admin/VoucherController.php:28
* @route '/admin/vouchers'
*/
store$7.url = (options) => {
	return store$7.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\VoucherController::store
* @see app/Http/Controllers/Admin/VoucherController.php:28
* @route '/admin/vouchers'
*/
store$7.post = (options) => ({
	url: store$7.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::store
* @see app/Http/Controllers/Admin/VoucherController.php:28
* @route '/admin/vouchers'
*/
var storeForm$7 = (options) => ({
	action: store$7.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::store
* @see app/Http/Controllers/Admin/VoucherController.php:28
* @route '/admin/vouchers'
*/
storeForm$7.post = (options) => ({
	action: store$7.url(options),
	method: "post"
});
store$7.form = storeForm$7;
/**
* @see \App\Http\Controllers\Admin\VoucherController::edit
* @see app/Http/Controllers/Admin/VoucherController.php:35
* @route '/admin/vouchers/{voucher}/edit'
*/
var edit$6 = (args, options) => ({
	url: edit$6.url(args, options),
	method: "get"
});
edit$6.definition = {
	methods: ["get", "head"],
	url: "/admin/vouchers/{voucher}/edit"
};
/**
* @see \App\Http\Controllers\Admin\VoucherController::edit
* @see app/Http/Controllers/Admin/VoucherController.php:35
* @route '/admin/vouchers/{voucher}/edit'
*/
edit$6.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { voucher: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { voucher: args.id };
	if (Array.isArray(args)) args = { voucher: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { voucher: typeof args.voucher === "object" ? args.voucher.id : args.voucher };
	return edit$6.definition.url.replace("{voucher}", parsedArgs.voucher.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\VoucherController::edit
* @see app/Http/Controllers/Admin/VoucherController.php:35
* @route '/admin/vouchers/{voucher}/edit'
*/
edit$6.get = (args, options) => ({
	url: edit$6.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::edit
* @see app/Http/Controllers/Admin/VoucherController.php:35
* @route '/admin/vouchers/{voucher}/edit'
*/
edit$6.head = (args, options) => ({
	url: edit$6.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::edit
* @see app/Http/Controllers/Admin/VoucherController.php:35
* @route '/admin/vouchers/{voucher}/edit'
*/
var editForm$6 = (args, options) => ({
	action: edit$6.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::edit
* @see app/Http/Controllers/Admin/VoucherController.php:35
* @route '/admin/vouchers/{voucher}/edit'
*/
editForm$6.get = (args, options) => ({
	action: edit$6.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::edit
* @see app/Http/Controllers/Admin/VoucherController.php:35
* @route '/admin/vouchers/{voucher}/edit'
*/
editForm$6.head = (args, options) => ({
	action: edit$6.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
edit$6.form = editForm$6;
/**
* @see \App\Http\Controllers\Admin\VoucherController::update
* @see app/Http/Controllers/Admin/VoucherController.php:43
* @route '/admin/vouchers/{voucher}'
*/
var update$7 = (args, options) => ({
	url: update$7.url(args, options),
	method: "put"
});
update$7.definition = {
	methods: ["put"],
	url: "/admin/vouchers/{voucher}"
};
/**
* @see \App\Http\Controllers\Admin\VoucherController::update
* @see app/Http/Controllers/Admin/VoucherController.php:43
* @route '/admin/vouchers/{voucher}'
*/
update$7.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { voucher: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { voucher: args.id };
	if (Array.isArray(args)) args = { voucher: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { voucher: typeof args.voucher === "object" ? args.voucher.id : args.voucher };
	return update$7.definition.url.replace("{voucher}", parsedArgs.voucher.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\VoucherController::update
* @see app/Http/Controllers/Admin/VoucherController.php:43
* @route '/admin/vouchers/{voucher}'
*/
update$7.put = (args, options) => ({
	url: update$7.url(args, options),
	method: "put"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::update
* @see app/Http/Controllers/Admin/VoucherController.php:43
* @route '/admin/vouchers/{voucher}'
*/
var updateForm$7 = (args, options) => ({
	action: update$7.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::update
* @see app/Http/Controllers/Admin/VoucherController.php:43
* @route '/admin/vouchers/{voucher}'
*/
updateForm$7.put = (args, options) => ({
	action: update$7.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$7.form = updateForm$7;
/**
* @see \App\Http\Controllers\Admin\VoucherController::destroy
* @see app/Http/Controllers/Admin/VoucherController.php:50
* @route '/admin/vouchers/{voucher}'
*/
var destroy$4 = (args, options) => ({
	url: destroy$4.url(args, options),
	method: "delete"
});
destroy$4.definition = {
	methods: ["delete"],
	url: "/admin/vouchers/{voucher}"
};
/**
* @see \App\Http\Controllers\Admin\VoucherController::destroy
* @see app/Http/Controllers/Admin/VoucherController.php:50
* @route '/admin/vouchers/{voucher}'
*/
destroy$4.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { voucher: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { voucher: args.id };
	if (Array.isArray(args)) args = { voucher: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { voucher: typeof args.voucher === "object" ? args.voucher.id : args.voucher };
	return destroy$4.definition.url.replace("{voucher}", parsedArgs.voucher.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\VoucherController::destroy
* @see app/Http/Controllers/Admin/VoucherController.php:50
* @route '/admin/vouchers/{voucher}'
*/
destroy$4.delete = (args, options) => ({
	url: destroy$4.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::destroy
* @see app/Http/Controllers/Admin/VoucherController.php:50
* @route '/admin/vouchers/{voucher}'
*/
var destroyForm$4 = (args, options) => ({
	action: destroy$4.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\VoucherController::destroy
* @see app/Http/Controllers/Admin/VoucherController.php:50
* @route '/admin/vouchers/{voucher}'
*/
destroyForm$4.delete = (args, options) => ({
	action: destroy$4.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy$4.form = destroyForm$4;
var vouchers = {
	index: Object.assign(index$10, index$10),
	create: Object.assign(create$6, create$6),
	store: Object.assign(store$7, store$7),
	edit: Object.assign(edit$6, edit$6),
	update: Object.assign(update$7, update$7),
	destroy: Object.assign(destroy$4, destroy$4)
};
//#endregion
//#region resources/js/routes/admin/notifications/index.ts
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::index
* @see app/Http/Controllers/Admin/AdminNotificationController.php:14
* @route '/admin/notifications'
*/
var index$9 = (options) => ({
	url: index$9.url(options),
	method: "get"
});
index$9.definition = {
	methods: ["get", "head"],
	url: "/admin/notifications"
};
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::index
* @see app/Http/Controllers/Admin/AdminNotificationController.php:14
* @route '/admin/notifications'
*/
index$9.url = (options) => {
	return index$9.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::index
* @see app/Http/Controllers/Admin/AdminNotificationController.php:14
* @route '/admin/notifications'
*/
index$9.get = (options) => ({
	url: index$9.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::index
* @see app/Http/Controllers/Admin/AdminNotificationController.php:14
* @route '/admin/notifications'
*/
index$9.head = (options) => ({
	url: index$9.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::index
* @see app/Http/Controllers/Admin/AdminNotificationController.php:14
* @route '/admin/notifications'
*/
var indexForm$9 = (options) => ({
	action: index$9.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::index
* @see app/Http/Controllers/Admin/AdminNotificationController.php:14
* @route '/admin/notifications'
*/
indexForm$9.get = (options) => ({
	action: index$9.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::index
* @see app/Http/Controllers/Admin/AdminNotificationController.php:14
* @route '/admin/notifications'
*/
indexForm$9.head = (options) => ({
	action: index$9.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$9.form = indexForm$9;
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::create
* @see app/Http/Controllers/Admin/AdminNotificationController.php:19
* @route '/admin/notifications/create'
*/
var create$5 = (options) => ({
	url: create$5.url(options),
	method: "get"
});
create$5.definition = {
	methods: ["get", "head"],
	url: "/admin/notifications/create"
};
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::create
* @see app/Http/Controllers/Admin/AdminNotificationController.php:19
* @route '/admin/notifications/create'
*/
create$5.url = (options) => {
	return create$5.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::create
* @see app/Http/Controllers/Admin/AdminNotificationController.php:19
* @route '/admin/notifications/create'
*/
create$5.get = (options) => ({
	url: create$5.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::create
* @see app/Http/Controllers/Admin/AdminNotificationController.php:19
* @route '/admin/notifications/create'
*/
create$5.head = (options) => ({
	url: create$5.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::create
* @see app/Http/Controllers/Admin/AdminNotificationController.php:19
* @route '/admin/notifications/create'
*/
var createForm$5 = (options) => ({
	action: create$5.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::create
* @see app/Http/Controllers/Admin/AdminNotificationController.php:19
* @route '/admin/notifications/create'
*/
createForm$5.get = (options) => ({
	action: create$5.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::create
* @see app/Http/Controllers/Admin/AdminNotificationController.php:19
* @route '/admin/notifications/create'
*/
createForm$5.head = (options) => ({
	action: create$5.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
create$5.form = createForm$5;
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::store
* @see app/Http/Controllers/Admin/AdminNotificationController.php:24
* @route '/admin/notifications'
*/
var store$6 = (options) => ({
	url: store$6.url(options),
	method: "post"
});
store$6.definition = {
	methods: ["post"],
	url: "/admin/notifications"
};
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::store
* @see app/Http/Controllers/Admin/AdminNotificationController.php:24
* @route '/admin/notifications'
*/
store$6.url = (options) => {
	return store$6.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::store
* @see app/Http/Controllers/Admin/AdminNotificationController.php:24
* @route '/admin/notifications'
*/
store$6.post = (options) => ({
	url: store$6.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::store
* @see app/Http/Controllers/Admin/AdminNotificationController.php:24
* @route '/admin/notifications'
*/
var storeForm$6 = (options) => ({
	action: store$6.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::store
* @see app/Http/Controllers/Admin/AdminNotificationController.php:24
* @route '/admin/notifications'
*/
storeForm$6.post = (options) => ({
	action: store$6.url(options),
	method: "post"
});
store$6.form = storeForm$6;
var notifications = {
	index: Object.assign(index$9, index$9),
	create: Object.assign(create$5, create$5),
	store: Object.assign(store$6, store$6)
};
//#endregion
//#region resources/js/routes/admin/wishlists/index.ts
/**
* @see \App\Http\Controllers\Admin\WishlistInsightController::index
* @see app/Http/Controllers/Admin/WishlistInsightController.php:12
* @route '/admin/wishlists'
*/
var index$8 = (options) => ({
	url: index$8.url(options),
	method: "get"
});
index$8.definition = {
	methods: ["get", "head"],
	url: "/admin/wishlists"
};
/**
* @see \App\Http\Controllers\Admin\WishlistInsightController::index
* @see app/Http/Controllers/Admin/WishlistInsightController.php:12
* @route '/admin/wishlists'
*/
index$8.url = (options) => {
	return index$8.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\WishlistInsightController::index
* @see app/Http/Controllers/Admin/WishlistInsightController.php:12
* @route '/admin/wishlists'
*/
index$8.get = (options) => ({
	url: index$8.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\WishlistInsightController::index
* @see app/Http/Controllers/Admin/WishlistInsightController.php:12
* @route '/admin/wishlists'
*/
index$8.head = (options) => ({
	url: index$8.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\WishlistInsightController::index
* @see app/Http/Controllers/Admin/WishlistInsightController.php:12
* @route '/admin/wishlists'
*/
var indexForm$8 = (options) => ({
	action: index$8.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\WishlistInsightController::index
* @see app/Http/Controllers/Admin/WishlistInsightController.php:12
* @route '/admin/wishlists'
*/
indexForm$8.get = (options) => ({
	action: index$8.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\WishlistInsightController::index
* @see app/Http/Controllers/Admin/WishlistInsightController.php:12
* @route '/admin/wishlists'
*/
indexForm$8.head = (options) => ({
	action: index$8.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$8.form = indexForm$8;
var wishlists = { index: Object.assign(index$8, index$8) };
//#endregion
//#region resources/js/routes/admin/banners/index.ts
/**
* @see \App\Http\Controllers\Admin\BannerController::index
* @see app/Http/Controllers/Admin/BannerController.php:15
* @route '/admin/banners'
*/
var index$7 = (options) => ({
	url: index$7.url(options),
	method: "get"
});
index$7.definition = {
	methods: ["get", "head"],
	url: "/admin/banners"
};
/**
* @see \App\Http\Controllers\Admin\BannerController::index
* @see app/Http/Controllers/Admin/BannerController.php:15
* @route '/admin/banners'
*/
index$7.url = (options) => {
	return index$7.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\BannerController::index
* @see app/Http/Controllers/Admin/BannerController.php:15
* @route '/admin/banners'
*/
index$7.get = (options) => ({
	url: index$7.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::index
* @see app/Http/Controllers/Admin/BannerController.php:15
* @route '/admin/banners'
*/
index$7.head = (options) => ({
	url: index$7.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::index
* @see app/Http/Controllers/Admin/BannerController.php:15
* @route '/admin/banners'
*/
var indexForm$7 = (options) => ({
	action: index$7.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::index
* @see app/Http/Controllers/Admin/BannerController.php:15
* @route '/admin/banners'
*/
indexForm$7.get = (options) => ({
	action: index$7.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::index
* @see app/Http/Controllers/Admin/BannerController.php:15
* @route '/admin/banners'
*/
indexForm$7.head = (options) => ({
	action: index$7.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$7.form = indexForm$7;
/**
* @see \App\Http\Controllers\Admin\BannerController::create
* @see app/Http/Controllers/Admin/BannerController.php:20
* @route '/admin/banners/create'
*/
var create$4 = (options) => ({
	url: create$4.url(options),
	method: "get"
});
create$4.definition = {
	methods: ["get", "head"],
	url: "/admin/banners/create"
};
/**
* @see \App\Http\Controllers\Admin\BannerController::create
* @see app/Http/Controllers/Admin/BannerController.php:20
* @route '/admin/banners/create'
*/
create$4.url = (options) => {
	return create$4.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\BannerController::create
* @see app/Http/Controllers/Admin/BannerController.php:20
* @route '/admin/banners/create'
*/
create$4.get = (options) => ({
	url: create$4.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::create
* @see app/Http/Controllers/Admin/BannerController.php:20
* @route '/admin/banners/create'
*/
create$4.head = (options) => ({
	url: create$4.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::create
* @see app/Http/Controllers/Admin/BannerController.php:20
* @route '/admin/banners/create'
*/
var createForm$4 = (options) => ({
	action: create$4.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::create
* @see app/Http/Controllers/Admin/BannerController.php:20
* @route '/admin/banners/create'
*/
createForm$4.get = (options) => ({
	action: create$4.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::create
* @see app/Http/Controllers/Admin/BannerController.php:20
* @route '/admin/banners/create'
*/
createForm$4.head = (options) => ({
	action: create$4.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
create$4.form = createForm$4;
/**
* @see \App\Http\Controllers\Admin\BannerController::store
* @see app/Http/Controllers/Admin/BannerController.php:29
* @route '/admin/banners'
*/
var store$5 = (options) => ({
	url: store$5.url(options),
	method: "post"
});
store$5.definition = {
	methods: ["post"],
	url: "/admin/banners"
};
/**
* @see \App\Http\Controllers\Admin\BannerController::store
* @see app/Http/Controllers/Admin/BannerController.php:29
* @route '/admin/banners'
*/
store$5.url = (options) => {
	return store$5.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\BannerController::store
* @see app/Http/Controllers/Admin/BannerController.php:29
* @route '/admin/banners'
*/
store$5.post = (options) => ({
	url: store$5.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::store
* @see app/Http/Controllers/Admin/BannerController.php:29
* @route '/admin/banners'
*/
var storeForm$5 = (options) => ({
	action: store$5.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::store
* @see app/Http/Controllers/Admin/BannerController.php:29
* @route '/admin/banners'
*/
storeForm$5.post = (options) => ({
	action: store$5.url(options),
	method: "post"
});
store$5.form = storeForm$5;
/**
* @see \App\Http\Controllers\Admin\BannerController::edit
* @see app/Http/Controllers/Admin/BannerController.php:36
* @route '/admin/banners/{banner}/edit'
*/
var edit$5 = (args, options) => ({
	url: edit$5.url(args, options),
	method: "get"
});
edit$5.definition = {
	methods: ["get", "head"],
	url: "/admin/banners/{banner}/edit"
};
/**
* @see \App\Http\Controllers\Admin\BannerController::edit
* @see app/Http/Controllers/Admin/BannerController.php:36
* @route '/admin/banners/{banner}/edit'
*/
edit$5.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { banner: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { banner: args.id };
	if (Array.isArray(args)) args = { banner: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { banner: typeof args.banner === "object" ? args.banner.id : args.banner };
	return edit$5.definition.url.replace("{banner}", parsedArgs.banner.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\BannerController::edit
* @see app/Http/Controllers/Admin/BannerController.php:36
* @route '/admin/banners/{banner}/edit'
*/
edit$5.get = (args, options) => ({
	url: edit$5.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::edit
* @see app/Http/Controllers/Admin/BannerController.php:36
* @route '/admin/banners/{banner}/edit'
*/
edit$5.head = (args, options) => ({
	url: edit$5.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::edit
* @see app/Http/Controllers/Admin/BannerController.php:36
* @route '/admin/banners/{banner}/edit'
*/
var editForm$5 = (args, options) => ({
	action: edit$5.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::edit
* @see app/Http/Controllers/Admin/BannerController.php:36
* @route '/admin/banners/{banner}/edit'
*/
editForm$5.get = (args, options) => ({
	action: edit$5.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::edit
* @see app/Http/Controllers/Admin/BannerController.php:36
* @route '/admin/banners/{banner}/edit'
*/
editForm$5.head = (args, options) => ({
	action: edit$5.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
edit$5.form = editForm$5;
/**
* @see \App\Http\Controllers\Admin\BannerController::update
* @see app/Http/Controllers/Admin/BannerController.php:45
* @route '/admin/banners/{banner}'
*/
var update$6 = (args, options) => ({
	url: update$6.url(args, options),
	method: "put"
});
update$6.definition = {
	methods: ["put"],
	url: "/admin/banners/{banner}"
};
/**
* @see \App\Http\Controllers\Admin\BannerController::update
* @see app/Http/Controllers/Admin/BannerController.php:45
* @route '/admin/banners/{banner}'
*/
update$6.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { banner: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { banner: args.id };
	if (Array.isArray(args)) args = { banner: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { banner: typeof args.banner === "object" ? args.banner.id : args.banner };
	return update$6.definition.url.replace("{banner}", parsedArgs.banner.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\BannerController::update
* @see app/Http/Controllers/Admin/BannerController.php:45
* @route '/admin/banners/{banner}'
*/
update$6.put = (args, options) => ({
	url: update$6.url(args, options),
	method: "put"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::update
* @see app/Http/Controllers/Admin/BannerController.php:45
* @route '/admin/banners/{banner}'
*/
var updateForm$6 = (args, options) => ({
	action: update$6.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::update
* @see app/Http/Controllers/Admin/BannerController.php:45
* @route '/admin/banners/{banner}'
*/
updateForm$6.put = (args, options) => ({
	action: update$6.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$6.form = updateForm$6;
/**
* @see \App\Http\Controllers\Admin\BannerController::destroy
* @see app/Http/Controllers/Admin/BannerController.php:52
* @route '/admin/banners/{banner}'
*/
var destroy$3 = (args, options) => ({
	url: destroy$3.url(args, options),
	method: "delete"
});
destroy$3.definition = {
	methods: ["delete"],
	url: "/admin/banners/{banner}"
};
/**
* @see \App\Http\Controllers\Admin\BannerController::destroy
* @see app/Http/Controllers/Admin/BannerController.php:52
* @route '/admin/banners/{banner}'
*/
destroy$3.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { banner: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { banner: args.id };
	if (Array.isArray(args)) args = { banner: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { banner: typeof args.banner === "object" ? args.banner.id : args.banner };
	return destroy$3.definition.url.replace("{banner}", parsedArgs.banner.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\BannerController::destroy
* @see app/Http/Controllers/Admin/BannerController.php:52
* @route '/admin/banners/{banner}'
*/
destroy$3.delete = (args, options) => ({
	url: destroy$3.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::destroy
* @see app/Http/Controllers/Admin/BannerController.php:52
* @route '/admin/banners/{banner}'
*/
var destroyForm$3 = (args, options) => ({
	action: destroy$3.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\BannerController::destroy
* @see app/Http/Controllers/Admin/BannerController.php:52
* @route '/admin/banners/{banner}'
*/
destroyForm$3.delete = (args, options) => ({
	action: destroy$3.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy$3.form = destroyForm$3;
var banners = {
	index: Object.assign(index$7, index$7),
	create: Object.assign(create$4, create$4),
	store: Object.assign(store$5, store$5),
	edit: Object.assign(edit$5, edit$5),
	update: Object.assign(update$6, update$6),
	destroy: Object.assign(destroy$3, destroy$3)
};
//#endregion
//#region resources/js/routes/admin/blogs/index.ts
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::index
* @see app/Http/Controllers/Admin/BlogArticleController.php:15
* @route '/admin/blogs'
*/
var index$6 = (options) => ({
	url: index$6.url(options),
	method: "get"
});
index$6.definition = {
	methods: ["get", "head"],
	url: "/admin/blogs"
};
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::index
* @see app/Http/Controllers/Admin/BlogArticleController.php:15
* @route '/admin/blogs'
*/
index$6.url = (options) => {
	return index$6.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::index
* @see app/Http/Controllers/Admin/BlogArticleController.php:15
* @route '/admin/blogs'
*/
index$6.get = (options) => ({
	url: index$6.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::index
* @see app/Http/Controllers/Admin/BlogArticleController.php:15
* @route '/admin/blogs'
*/
index$6.head = (options) => ({
	url: index$6.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::index
* @see app/Http/Controllers/Admin/BlogArticleController.php:15
* @route '/admin/blogs'
*/
var indexForm$6 = (options) => ({
	action: index$6.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::index
* @see app/Http/Controllers/Admin/BlogArticleController.php:15
* @route '/admin/blogs'
*/
indexForm$6.get = (options) => ({
	action: index$6.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::index
* @see app/Http/Controllers/Admin/BlogArticleController.php:15
* @route '/admin/blogs'
*/
indexForm$6.head = (options) => ({
	action: index$6.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$6.form = indexForm$6;
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::create
* @see app/Http/Controllers/Admin/BlogArticleController.php:20
* @route '/admin/blogs/create'
*/
var create$3 = (options) => ({
	url: create$3.url(options),
	method: "get"
});
create$3.definition = {
	methods: ["get", "head"],
	url: "/admin/blogs/create"
};
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::create
* @see app/Http/Controllers/Admin/BlogArticleController.php:20
* @route '/admin/blogs/create'
*/
create$3.url = (options) => {
	return create$3.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::create
* @see app/Http/Controllers/Admin/BlogArticleController.php:20
* @route '/admin/blogs/create'
*/
create$3.get = (options) => ({
	url: create$3.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::create
* @see app/Http/Controllers/Admin/BlogArticleController.php:20
* @route '/admin/blogs/create'
*/
create$3.head = (options) => ({
	url: create$3.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::create
* @see app/Http/Controllers/Admin/BlogArticleController.php:20
* @route '/admin/blogs/create'
*/
var createForm$3 = (options) => ({
	action: create$3.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::create
* @see app/Http/Controllers/Admin/BlogArticleController.php:20
* @route '/admin/blogs/create'
*/
createForm$3.get = (options) => ({
	action: create$3.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::create
* @see app/Http/Controllers/Admin/BlogArticleController.php:20
* @route '/admin/blogs/create'
*/
createForm$3.head = (options) => ({
	action: create$3.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
create$3.form = createForm$3;
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::store
* @see app/Http/Controllers/Admin/BlogArticleController.php:25
* @route '/admin/blogs'
*/
var store$4 = (options) => ({
	url: store$4.url(options),
	method: "post"
});
store$4.definition = {
	methods: ["post"],
	url: "/admin/blogs"
};
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::store
* @see app/Http/Controllers/Admin/BlogArticleController.php:25
* @route '/admin/blogs'
*/
store$4.url = (options) => {
	return store$4.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::store
* @see app/Http/Controllers/Admin/BlogArticleController.php:25
* @route '/admin/blogs'
*/
store$4.post = (options) => ({
	url: store$4.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::store
* @see app/Http/Controllers/Admin/BlogArticleController.php:25
* @route '/admin/blogs'
*/
var storeForm$4 = (options) => ({
	action: store$4.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::store
* @see app/Http/Controllers/Admin/BlogArticleController.php:25
* @route '/admin/blogs'
*/
storeForm$4.post = (options) => ({
	action: store$4.url(options),
	method: "post"
});
store$4.form = storeForm$4;
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::edit
* @see app/Http/Controllers/Admin/BlogArticleController.php:32
* @route '/admin/blogs/{blogArticle}/edit'
*/
var edit$4 = (args, options) => ({
	url: edit$4.url(args, options),
	method: "get"
});
edit$4.definition = {
	methods: ["get", "head"],
	url: "/admin/blogs/{blogArticle}/edit"
};
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::edit
* @see app/Http/Controllers/Admin/BlogArticleController.php:32
* @route '/admin/blogs/{blogArticle}/edit'
*/
edit$4.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { blogArticle: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { blogArticle: args.id };
	if (Array.isArray(args)) args = { blogArticle: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { blogArticle: typeof args.blogArticle === "object" ? args.blogArticle.id : args.blogArticle };
	return edit$4.definition.url.replace("{blogArticle}", parsedArgs.blogArticle.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::edit
* @see app/Http/Controllers/Admin/BlogArticleController.php:32
* @route '/admin/blogs/{blogArticle}/edit'
*/
edit$4.get = (args, options) => ({
	url: edit$4.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::edit
* @see app/Http/Controllers/Admin/BlogArticleController.php:32
* @route '/admin/blogs/{blogArticle}/edit'
*/
edit$4.head = (args, options) => ({
	url: edit$4.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::edit
* @see app/Http/Controllers/Admin/BlogArticleController.php:32
* @route '/admin/blogs/{blogArticle}/edit'
*/
var editForm$4 = (args, options) => ({
	action: edit$4.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::edit
* @see app/Http/Controllers/Admin/BlogArticleController.php:32
* @route '/admin/blogs/{blogArticle}/edit'
*/
editForm$4.get = (args, options) => ({
	action: edit$4.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::edit
* @see app/Http/Controllers/Admin/BlogArticleController.php:32
* @route '/admin/blogs/{blogArticle}/edit'
*/
editForm$4.head = (args, options) => ({
	action: edit$4.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
edit$4.form = editForm$4;
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::update
* @see app/Http/Controllers/Admin/BlogArticleController.php:37
* @route '/admin/blogs/{blogArticle}'
*/
var update$5 = (args, options) => ({
	url: update$5.url(args, options),
	method: "put"
});
update$5.definition = {
	methods: ["put"],
	url: "/admin/blogs/{blogArticle}"
};
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::update
* @see app/Http/Controllers/Admin/BlogArticleController.php:37
* @route '/admin/blogs/{blogArticle}'
*/
update$5.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { blogArticle: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { blogArticle: args.id };
	if (Array.isArray(args)) args = { blogArticle: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { blogArticle: typeof args.blogArticle === "object" ? args.blogArticle.id : args.blogArticle };
	return update$5.definition.url.replace("{blogArticle}", parsedArgs.blogArticle.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::update
* @see app/Http/Controllers/Admin/BlogArticleController.php:37
* @route '/admin/blogs/{blogArticle}'
*/
update$5.put = (args, options) => ({
	url: update$5.url(args, options),
	method: "put"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::update
* @see app/Http/Controllers/Admin/BlogArticleController.php:37
* @route '/admin/blogs/{blogArticle}'
*/
var updateForm$5 = (args, options) => ({
	action: update$5.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::update
* @see app/Http/Controllers/Admin/BlogArticleController.php:37
* @route '/admin/blogs/{blogArticle}'
*/
updateForm$5.put = (args, options) => ({
	action: update$5.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$5.form = updateForm$5;
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::destroy
* @see app/Http/Controllers/Admin/BlogArticleController.php:44
* @route '/admin/blogs/{blogArticle}'
*/
var destroy$2 = (args, options) => ({
	url: destroy$2.url(args, options),
	method: "delete"
});
destroy$2.definition = {
	methods: ["delete"],
	url: "/admin/blogs/{blogArticle}"
};
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::destroy
* @see app/Http/Controllers/Admin/BlogArticleController.php:44
* @route '/admin/blogs/{blogArticle}'
*/
destroy$2.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { blogArticle: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { blogArticle: args.id };
	if (Array.isArray(args)) args = { blogArticle: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { blogArticle: typeof args.blogArticle === "object" ? args.blogArticle.id : args.blogArticle };
	return destroy$2.definition.url.replace("{blogArticle}", parsedArgs.blogArticle.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::destroy
* @see app/Http/Controllers/Admin/BlogArticleController.php:44
* @route '/admin/blogs/{blogArticle}'
*/
destroy$2.delete = (args, options) => ({
	url: destroy$2.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::destroy
* @see app/Http/Controllers/Admin/BlogArticleController.php:44
* @route '/admin/blogs/{blogArticle}'
*/
var destroyForm$2 = (args, options) => ({
	action: destroy$2.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::destroy
* @see app/Http/Controllers/Admin/BlogArticleController.php:44
* @route '/admin/blogs/{blogArticle}'
*/
destroyForm$2.delete = (args, options) => ({
	action: destroy$2.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy$2.form = destroyForm$2;
var blogs = {
	index: Object.assign(index$6, index$6),
	create: Object.assign(create$3, create$3),
	store: Object.assign(store$4, store$4),
	edit: Object.assign(edit$4, edit$4),
	update: Object.assign(update$5, update$5),
	destroy: Object.assign(destroy$2, destroy$2)
};
//#endregion
//#region resources/js/routes/admin/gallery/index.ts
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::index
* @see app/Http/Controllers/Admin/GalleryImageController.php:15
* @route '/admin/gallery'
*/
var index$5 = (options) => ({
	url: index$5.url(options),
	method: "get"
});
index$5.definition = {
	methods: ["get", "head"],
	url: "/admin/gallery"
};
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::index
* @see app/Http/Controllers/Admin/GalleryImageController.php:15
* @route '/admin/gallery'
*/
index$5.url = (options) => {
	return index$5.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::index
* @see app/Http/Controllers/Admin/GalleryImageController.php:15
* @route '/admin/gallery'
*/
index$5.get = (options) => ({
	url: index$5.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::index
* @see app/Http/Controllers/Admin/GalleryImageController.php:15
* @route '/admin/gallery'
*/
index$5.head = (options) => ({
	url: index$5.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::index
* @see app/Http/Controllers/Admin/GalleryImageController.php:15
* @route '/admin/gallery'
*/
var indexForm$5 = (options) => ({
	action: index$5.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::index
* @see app/Http/Controllers/Admin/GalleryImageController.php:15
* @route '/admin/gallery'
*/
indexForm$5.get = (options) => ({
	action: index$5.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::index
* @see app/Http/Controllers/Admin/GalleryImageController.php:15
* @route '/admin/gallery'
*/
indexForm$5.head = (options) => ({
	action: index$5.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$5.form = indexForm$5;
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::create
* @see app/Http/Controllers/Admin/GalleryImageController.php:20
* @route '/admin/gallery/create'
*/
var create$2 = (options) => ({
	url: create$2.url(options),
	method: "get"
});
create$2.definition = {
	methods: ["get", "head"],
	url: "/admin/gallery/create"
};
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::create
* @see app/Http/Controllers/Admin/GalleryImageController.php:20
* @route '/admin/gallery/create'
*/
create$2.url = (options) => {
	return create$2.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::create
* @see app/Http/Controllers/Admin/GalleryImageController.php:20
* @route '/admin/gallery/create'
*/
create$2.get = (options) => ({
	url: create$2.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::create
* @see app/Http/Controllers/Admin/GalleryImageController.php:20
* @route '/admin/gallery/create'
*/
create$2.head = (options) => ({
	url: create$2.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::create
* @see app/Http/Controllers/Admin/GalleryImageController.php:20
* @route '/admin/gallery/create'
*/
var createForm$2 = (options) => ({
	action: create$2.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::create
* @see app/Http/Controllers/Admin/GalleryImageController.php:20
* @route '/admin/gallery/create'
*/
createForm$2.get = (options) => ({
	action: create$2.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::create
* @see app/Http/Controllers/Admin/GalleryImageController.php:20
* @route '/admin/gallery/create'
*/
createForm$2.head = (options) => ({
	action: create$2.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
create$2.form = createForm$2;
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::store
* @see app/Http/Controllers/Admin/GalleryImageController.php:29
* @route '/admin/gallery'
*/
var store$3 = (options) => ({
	url: store$3.url(options),
	method: "post"
});
store$3.definition = {
	methods: ["post"],
	url: "/admin/gallery"
};
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::store
* @see app/Http/Controllers/Admin/GalleryImageController.php:29
* @route '/admin/gallery'
*/
store$3.url = (options) => {
	return store$3.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::store
* @see app/Http/Controllers/Admin/GalleryImageController.php:29
* @route '/admin/gallery'
*/
store$3.post = (options) => ({
	url: store$3.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::store
* @see app/Http/Controllers/Admin/GalleryImageController.php:29
* @route '/admin/gallery'
*/
var storeForm$3 = (options) => ({
	action: store$3.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::store
* @see app/Http/Controllers/Admin/GalleryImageController.php:29
* @route '/admin/gallery'
*/
storeForm$3.post = (options) => ({
	action: store$3.url(options),
	method: "post"
});
store$3.form = storeForm$3;
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::edit
* @see app/Http/Controllers/Admin/GalleryImageController.php:36
* @route '/admin/gallery/{galleryImage}/edit'
*/
var edit$3 = (args, options) => ({
	url: edit$3.url(args, options),
	method: "get"
});
edit$3.definition = {
	methods: ["get", "head"],
	url: "/admin/gallery/{galleryImage}/edit"
};
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::edit
* @see app/Http/Controllers/Admin/GalleryImageController.php:36
* @route '/admin/gallery/{galleryImage}/edit'
*/
edit$3.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { galleryImage: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { galleryImage: args.id };
	if (Array.isArray(args)) args = { galleryImage: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { galleryImage: typeof args.galleryImage === "object" ? args.galleryImage.id : args.galleryImage };
	return edit$3.definition.url.replace("{galleryImage}", parsedArgs.galleryImage.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::edit
* @see app/Http/Controllers/Admin/GalleryImageController.php:36
* @route '/admin/gallery/{galleryImage}/edit'
*/
edit$3.get = (args, options) => ({
	url: edit$3.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::edit
* @see app/Http/Controllers/Admin/GalleryImageController.php:36
* @route '/admin/gallery/{galleryImage}/edit'
*/
edit$3.head = (args, options) => ({
	url: edit$3.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::edit
* @see app/Http/Controllers/Admin/GalleryImageController.php:36
* @route '/admin/gallery/{galleryImage}/edit'
*/
var editForm$3 = (args, options) => ({
	action: edit$3.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::edit
* @see app/Http/Controllers/Admin/GalleryImageController.php:36
* @route '/admin/gallery/{galleryImage}/edit'
*/
editForm$3.get = (args, options) => ({
	action: edit$3.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::edit
* @see app/Http/Controllers/Admin/GalleryImageController.php:36
* @route '/admin/gallery/{galleryImage}/edit'
*/
editForm$3.head = (args, options) => ({
	action: edit$3.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
edit$3.form = editForm$3;
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::update
* @see app/Http/Controllers/Admin/GalleryImageController.php:47
* @route '/admin/gallery/{galleryImage}'
*/
var update$4 = (args, options) => ({
	url: update$4.url(args, options),
	method: "put"
});
update$4.definition = {
	methods: ["put"],
	url: "/admin/gallery/{galleryImage}"
};
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::update
* @see app/Http/Controllers/Admin/GalleryImageController.php:47
* @route '/admin/gallery/{galleryImage}'
*/
update$4.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { galleryImage: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { galleryImage: args.id };
	if (Array.isArray(args)) args = { galleryImage: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { galleryImage: typeof args.galleryImage === "object" ? args.galleryImage.id : args.galleryImage };
	return update$4.definition.url.replace("{galleryImage}", parsedArgs.galleryImage.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::update
* @see app/Http/Controllers/Admin/GalleryImageController.php:47
* @route '/admin/gallery/{galleryImage}'
*/
update$4.put = (args, options) => ({
	url: update$4.url(args, options),
	method: "put"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::update
* @see app/Http/Controllers/Admin/GalleryImageController.php:47
* @route '/admin/gallery/{galleryImage}'
*/
var updateForm$4 = (args, options) => ({
	action: update$4.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::update
* @see app/Http/Controllers/Admin/GalleryImageController.php:47
* @route '/admin/gallery/{galleryImage}'
*/
updateForm$4.put = (args, options) => ({
	action: update$4.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$4.form = updateForm$4;
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::destroy
* @see app/Http/Controllers/Admin/GalleryImageController.php:54
* @route '/admin/gallery/{galleryImage}'
*/
var destroy$1 = (args, options) => ({
	url: destroy$1.url(args, options),
	method: "delete"
});
destroy$1.definition = {
	methods: ["delete"],
	url: "/admin/gallery/{galleryImage}"
};
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::destroy
* @see app/Http/Controllers/Admin/GalleryImageController.php:54
* @route '/admin/gallery/{galleryImage}'
*/
destroy$1.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { galleryImage: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { galleryImage: args.id };
	if (Array.isArray(args)) args = { galleryImage: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { galleryImage: typeof args.galleryImage === "object" ? args.galleryImage.id : args.galleryImage };
	return destroy$1.definition.url.replace("{galleryImage}", parsedArgs.galleryImage.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::destroy
* @see app/Http/Controllers/Admin/GalleryImageController.php:54
* @route '/admin/gallery/{galleryImage}'
*/
destroy$1.delete = (args, options) => ({
	url: destroy$1.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::destroy
* @see app/Http/Controllers/Admin/GalleryImageController.php:54
* @route '/admin/gallery/{galleryImage}'
*/
var destroyForm$1 = (args, options) => ({
	action: destroy$1.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::destroy
* @see app/Http/Controllers/Admin/GalleryImageController.php:54
* @route '/admin/gallery/{galleryImage}'
*/
destroyForm$1.delete = (args, options) => ({
	action: destroy$1.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy$1.form = destroyForm$1;
var gallery = {
	index: Object.assign(index$5, index$5),
	create: Object.assign(create$2, create$2),
	store: Object.assign(store$3, store$3),
	edit: Object.assign(edit$3, edit$3),
	update: Object.assign(update$4, update$4),
	destroy: Object.assign(destroy$1, destroy$1)
};
//#endregion
//#region resources/js/routes/admin/pages/index.ts
/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
var index$4 = (options) => ({
	url: index$4.url(options),
	method: "get"
});
index$4.definition = {
	methods: ["get", "head"],
	url: "/admin/pages"
};
/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
index$4.url = (options) => {
	return index$4.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
index$4.get = (options) => ({
	url: index$4.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
index$4.head = (options) => ({
	url: index$4.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
var indexForm$4 = (options) => ({
	action: index$4.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
indexForm$4.get = (options) => ({
	action: index$4.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
indexForm$4.head = (options) => ({
	action: index$4.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$4.form = indexForm$4;
/**
* @see \App\Http\Controllers\Admin\PageController::create
* @see app/Http/Controllers/Admin/PageController.php:20
* @route '/admin/pages/create'
*/
var create$1 = (options) => ({
	url: create$1.url(options),
	method: "get"
});
create$1.definition = {
	methods: ["get", "head"],
	url: "/admin/pages/create"
};
/**
* @see \App\Http\Controllers\Admin\PageController::create
* @see app/Http/Controllers/Admin/PageController.php:20
* @route '/admin/pages/create'
*/
create$1.url = (options) => {
	return create$1.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\PageController::create
* @see app/Http/Controllers/Admin/PageController.php:20
* @route '/admin/pages/create'
*/
create$1.get = (options) => ({
	url: create$1.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PageController::create
* @see app/Http/Controllers/Admin/PageController.php:20
* @route '/admin/pages/create'
*/
create$1.head = (options) => ({
	url: create$1.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\PageController::create
* @see app/Http/Controllers/Admin/PageController.php:20
* @route '/admin/pages/create'
*/
var createForm$1 = (options) => ({
	action: create$1.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PageController::create
* @see app/Http/Controllers/Admin/PageController.php:20
* @route '/admin/pages/create'
*/
createForm$1.get = (options) => ({
	action: create$1.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PageController::create
* @see app/Http/Controllers/Admin/PageController.php:20
* @route '/admin/pages/create'
*/
createForm$1.head = (options) => ({
	action: create$1.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
create$1.form = createForm$1;
/**
* @see \App\Http\Controllers\Admin\PageController::store
* @see app/Http/Controllers/Admin/PageController.php:29
* @route '/admin/pages'
*/
var store$2 = (options) => ({
	url: store$2.url(options),
	method: "post"
});
store$2.definition = {
	methods: ["post"],
	url: "/admin/pages"
};
/**
* @see \App\Http\Controllers\Admin\PageController::store
* @see app/Http/Controllers/Admin/PageController.php:29
* @route '/admin/pages'
*/
store$2.url = (options) => {
	return store$2.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\PageController::store
* @see app/Http/Controllers/Admin/PageController.php:29
* @route '/admin/pages'
*/
store$2.post = (options) => ({
	url: store$2.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\PageController::store
* @see app/Http/Controllers/Admin/PageController.php:29
* @route '/admin/pages'
*/
var storeForm$2 = (options) => ({
	action: store$2.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\PageController::store
* @see app/Http/Controllers/Admin/PageController.php:29
* @route '/admin/pages'
*/
storeForm$2.post = (options) => ({
	action: store$2.url(options),
	method: "post"
});
store$2.form = storeForm$2;
/**
* @see \App\Http\Controllers\Admin\PageController::edit
* @see app/Http/Controllers/Admin/PageController.php:36
* @route '/admin/pages/{page}/edit'
*/
var edit$2 = (args, options) => ({
	url: edit$2.url(args, options),
	method: "get"
});
edit$2.definition = {
	methods: ["get", "head"],
	url: "/admin/pages/{page}/edit"
};
/**
* @see \App\Http\Controllers\Admin\PageController::edit
* @see app/Http/Controllers/Admin/PageController.php:36
* @route '/admin/pages/{page}/edit'
*/
edit$2.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { page: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { page: args.id };
	if (Array.isArray(args)) args = { page: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { page: typeof args.page === "object" ? args.page.id : args.page };
	return edit$2.definition.url.replace("{page}", parsedArgs.page.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\PageController::edit
* @see app/Http/Controllers/Admin/PageController.php:36
* @route '/admin/pages/{page}/edit'
*/
edit$2.get = (args, options) => ({
	url: edit$2.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PageController::edit
* @see app/Http/Controllers/Admin/PageController.php:36
* @route '/admin/pages/{page}/edit'
*/
edit$2.head = (args, options) => ({
	url: edit$2.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\PageController::edit
* @see app/Http/Controllers/Admin/PageController.php:36
* @route '/admin/pages/{page}/edit'
*/
var editForm$2 = (args, options) => ({
	action: edit$2.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PageController::edit
* @see app/Http/Controllers/Admin/PageController.php:36
* @route '/admin/pages/{page}/edit'
*/
editForm$2.get = (args, options) => ({
	action: edit$2.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\PageController::edit
* @see app/Http/Controllers/Admin/PageController.php:36
* @route '/admin/pages/{page}/edit'
*/
editForm$2.head = (args, options) => ({
	action: edit$2.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
edit$2.form = editForm$2;
/**
* @see \App\Http\Controllers\Admin\PageController::update
* @see app/Http/Controllers/Admin/PageController.php:45
* @route '/admin/pages/{page}'
*/
var update$3 = (args, options) => ({
	url: update$3.url(args, options),
	method: "put"
});
update$3.definition = {
	methods: ["put"],
	url: "/admin/pages/{page}"
};
/**
* @see \App\Http\Controllers\Admin\PageController::update
* @see app/Http/Controllers/Admin/PageController.php:45
* @route '/admin/pages/{page}'
*/
update$3.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { page: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { page: args.id };
	if (Array.isArray(args)) args = { page: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { page: typeof args.page === "object" ? args.page.id : args.page };
	return update$3.definition.url.replace("{page}", parsedArgs.page.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\PageController::update
* @see app/Http/Controllers/Admin/PageController.php:45
* @route '/admin/pages/{page}'
*/
update$3.put = (args, options) => ({
	url: update$3.url(args, options),
	method: "put"
});
/**
* @see \App\Http\Controllers\Admin\PageController::update
* @see app/Http/Controllers/Admin/PageController.php:45
* @route '/admin/pages/{page}'
*/
var updateForm$3 = (args, options) => ({
	action: update$3.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\PageController::update
* @see app/Http/Controllers/Admin/PageController.php:45
* @route '/admin/pages/{page}'
*/
updateForm$3.put = (args, options) => ({
	action: update$3.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$3.form = updateForm$3;
/**
* @see \App\Http\Controllers\Admin\PageController::destroy
* @see app/Http/Controllers/Admin/PageController.php:52
* @route '/admin/pages/{page}'
*/
var destroy = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
destroy.definition = {
	methods: ["delete"],
	url: "/admin/pages/{page}"
};
/**
* @see \App\Http\Controllers\Admin\PageController::destroy
* @see app/Http/Controllers/Admin/PageController.php:52
* @route '/admin/pages/{page}'
*/
destroy.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { page: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { page: args.id };
	if (Array.isArray(args)) args = { page: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { page: typeof args.page === "object" ? args.page.id : args.page };
	return destroy.definition.url.replace("{page}", parsedArgs.page.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\PageController::destroy
* @see app/Http/Controllers/Admin/PageController.php:52
* @route '/admin/pages/{page}'
*/
destroy.delete = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\Admin\PageController::destroy
* @see app/Http/Controllers/Admin/PageController.php:52
* @route '/admin/pages/{page}'
*/
var destroyForm = (args, options) => ({
	action: destroy.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\PageController::destroy
* @see app/Http/Controllers/Admin/PageController.php:52
* @route '/admin/pages/{page}'
*/
destroyForm.delete = (args, options) => ({
	action: destroy.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy.form = destroyForm;
var pages = {
	index: Object.assign(index$4, index$4),
	create: Object.assign(create$1, create$1),
	store: Object.assign(store$2, store$2),
	edit: Object.assign(edit$2, edit$2),
	update: Object.assign(update$3, update$3),
	destroy: Object.assign(destroy, destroy)
};
//#endregion
//#region resources/js/routes/admin/new-product/index.ts
/**
* @see \App\Http\Controllers\Admin\NewProductPageController::edit
* @see app/Http/Controllers/Admin/NewProductPageController.php:13
* @route '/admin/new-product'
*/
var edit$1 = (options) => ({
	url: edit$1.url(options),
	method: "get"
});
edit$1.definition = {
	methods: ["get", "head"],
	url: "/admin/new-product"
};
/**
* @see \App\Http\Controllers\Admin\NewProductPageController::edit
* @see app/Http/Controllers/Admin/NewProductPageController.php:13
* @route '/admin/new-product'
*/
edit$1.url = (options) => {
	return edit$1.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\NewProductPageController::edit
* @see app/Http/Controllers/Admin/NewProductPageController.php:13
* @route '/admin/new-product'
*/
edit$1.get = (options) => ({
	url: edit$1.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\NewProductPageController::edit
* @see app/Http/Controllers/Admin/NewProductPageController.php:13
* @route '/admin/new-product'
*/
edit$1.head = (options) => ({
	url: edit$1.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\NewProductPageController::edit
* @see app/Http/Controllers/Admin/NewProductPageController.php:13
* @route '/admin/new-product'
*/
var editForm$1 = (options) => ({
	action: edit$1.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\NewProductPageController::edit
* @see app/Http/Controllers/Admin/NewProductPageController.php:13
* @route '/admin/new-product'
*/
editForm$1.get = (options) => ({
	action: edit$1.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\NewProductPageController::edit
* @see app/Http/Controllers/Admin/NewProductPageController.php:13
* @route '/admin/new-product'
*/
editForm$1.head = (options) => ({
	action: edit$1.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
edit$1.form = editForm$1;
/**
* @see \App\Http\Controllers\Admin\NewProductPageController::update
* @see app/Http/Controllers/Admin/NewProductPageController.php:18
* @route '/admin/new-product'
*/
var update$2 = (options) => ({
	url: update$2.url(options),
	method: "put"
});
update$2.definition = {
	methods: ["put"],
	url: "/admin/new-product"
};
/**
* @see \App\Http\Controllers\Admin\NewProductPageController::update
* @see app/Http/Controllers/Admin/NewProductPageController.php:18
* @route '/admin/new-product'
*/
update$2.url = (options) => {
	return update$2.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\NewProductPageController::update
* @see app/Http/Controllers/Admin/NewProductPageController.php:18
* @route '/admin/new-product'
*/
update$2.put = (options) => ({
	url: update$2.url(options),
	method: "put"
});
/**
* @see \App\Http\Controllers\Admin\NewProductPageController::update
* @see app/Http/Controllers/Admin/NewProductPageController.php:18
* @route '/admin/new-product'
*/
var updateForm$2 = (options) => ({
	action: update$2.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\NewProductPageController::update
* @see app/Http/Controllers/Admin/NewProductPageController.php:18
* @route '/admin/new-product'
*/
updateForm$2.put = (options) => ({
	action: update$2.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$2.form = updateForm$2;
var newProduct = {
	edit: Object.assign(edit$1, edit$1),
	update: Object.assign(update$2, update$2)
};
//#endregion
//#region resources/js/routes/admin/settings/index.ts
/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
var index$3 = (options) => ({
	url: index$3.url(options),
	method: "get"
});
index$3.definition = {
	methods: ["get", "head"],
	url: "/admin/settings"
};
/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
index$3.url = (options) => {
	return index$3.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
index$3.get = (options) => ({
	url: index$3.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
index$3.head = (options) => ({
	url: index$3.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
var indexForm$3 = (options) => ({
	action: index$3.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
indexForm$3.get = (options) => ({
	action: index$3.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
indexForm$3.head = (options) => ({
	action: index$3.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$3.form = indexForm$3;
/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:19
* @route '/admin/settings'
*/
var update$1 = (options) => ({
	url: update$1.url(options),
	method: "put"
});
update$1.definition = {
	methods: ["put"],
	url: "/admin/settings"
};
/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:19
* @route '/admin/settings'
*/
update$1.url = (options) => {
	return update$1.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:19
* @route '/admin/settings'
*/
update$1.put = (options) => ({
	url: update$1.url(options),
	method: "put"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:19
* @route '/admin/settings'
*/
var updateForm$1 = (options) => ({
	action: update$1.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:19
* @route '/admin/settings'
*/
updateForm$1.put = (options) => ({
	action: update$1.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$1.form = updateForm$1;
/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
var store$1 = (options) => ({
	url: store$1.url(options),
	method: "get"
});
store$1.definition = {
	methods: ["get", "head"],
	url: "/admin/settings/store"
};
/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
store$1.url = (options) => {
	return store$1.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
store$1.get = (options) => ({
	url: store$1.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
store$1.head = (options) => ({
	url: store$1.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
var storeForm$1 = (options) => ({
	action: store$1.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
storeForm$1.get = (options) => ({
	action: store$1.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
storeForm$1.head = (options) => ({
	action: store$1.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
store$1.form = storeForm$1;
/**
* @see \App\Http\Controllers\Admin\SettingController::contact
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
var contact = (options) => ({
	url: contact.url(options),
	method: "get"
});
contact.definition = {
	methods: ["get", "head"],
	url: "/admin/settings/contact"
};
/**
* @see \App\Http\Controllers\Admin\SettingController::contact
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
contact.url = (options) => {
	return contact.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\SettingController::contact
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
contact.get = (options) => ({
	url: contact.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::contact
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
contact.head = (options) => ({
	url: contact.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::contact
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
var contactForm = (options) => ({
	action: contact.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::contact
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
contactForm.get = (options) => ({
	action: contact.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::contact
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
contactForm.head = (options) => ({
	action: contact.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
contact.form = contactForm;
/**
* @see \App\Http\Controllers\Admin\SettingController::payment
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
var payment = (options) => ({
	url: payment.url(options),
	method: "get"
});
payment.definition = {
	methods: ["get", "head"],
	url: "/admin/settings/payment"
};
/**
* @see \App\Http\Controllers\Admin\SettingController::payment
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
payment.url = (options) => {
	return payment.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\SettingController::payment
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
payment.get = (options) => ({
	url: payment.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::payment
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
payment.head = (options) => ({
	url: payment.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::payment
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
var paymentForm = (options) => ({
	action: payment.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::payment
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
paymentForm.get = (options) => ({
	action: payment.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::payment
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
paymentForm.head = (options) => ({
	action: payment.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
payment.form = paymentForm;
/**
* @see \App\Http\Controllers\Admin\SettingController::shipping
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
var shipping = (options) => ({
	url: shipping.url(options),
	method: "get"
});
shipping.definition = {
	methods: ["get", "head"],
	url: "/admin/settings/shipping"
};
/**
* @see \App\Http\Controllers\Admin\SettingController::shipping
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
shipping.url = (options) => {
	return shipping.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\SettingController::shipping
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
shipping.get = (options) => ({
	url: shipping.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::shipping
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
shipping.head = (options) => ({
	url: shipping.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::shipping
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
var shippingForm = (options) => ({
	action: shipping.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::shipping
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
shippingForm.get = (options) => ({
	action: shipping.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\SettingController::shipping
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
shippingForm.head = (options) => ({
	action: shipping.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
shipping.form = shippingForm;
var settings = {
	index: Object.assign(index$3, index$3),
	update: Object.assign(update$1, update$1),
	store: Object.assign(store$1, store$1),
	contact: Object.assign(contact, contact),
	payment: Object.assign(payment, payment),
	shipping: Object.assign(shipping, shipping)
};
//#endregion
//#region resources/js/routes/admin/admin-users/index.ts
/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
* @see app/Http/Controllers/Admin/AdminUserController.php:16
* @route '/admin/admin-users'
*/
var index$2 = (options) => ({
	url: index$2.url(options),
	method: "get"
});
index$2.definition = {
	methods: ["get", "head"],
	url: "/admin/admin-users"
};
/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
* @see app/Http/Controllers/Admin/AdminUserController.php:16
* @route '/admin/admin-users'
*/
index$2.url = (options) => {
	return index$2.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
* @see app/Http/Controllers/Admin/AdminUserController.php:16
* @route '/admin/admin-users'
*/
index$2.get = (options) => ({
	url: index$2.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
* @see app/Http/Controllers/Admin/AdminUserController.php:16
* @route '/admin/admin-users'
*/
index$2.head = (options) => ({
	url: index$2.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
* @see app/Http/Controllers/Admin/AdminUserController.php:16
* @route '/admin/admin-users'
*/
var indexForm$2 = (options) => ({
	action: index$2.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
* @see app/Http/Controllers/Admin/AdminUserController.php:16
* @route '/admin/admin-users'
*/
indexForm$2.get = (options) => ({
	action: index$2.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
* @see app/Http/Controllers/Admin/AdminUserController.php:16
* @route '/admin/admin-users'
*/
indexForm$2.head = (options) => ({
	action: index$2.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$2.form = indexForm$2;
/**
* @see \App\Http\Controllers\Admin\AdminUserController::create
* @see app/Http/Controllers/Admin/AdminUserController.php:21
* @route '/admin/admin-users/create'
*/
var create = (options) => ({
	url: create.url(options),
	method: "get"
});
create.definition = {
	methods: ["get", "head"],
	url: "/admin/admin-users/create"
};
/**
* @see \App\Http\Controllers\Admin\AdminUserController::create
* @see app/Http/Controllers/Admin/AdminUserController.php:21
* @route '/admin/admin-users/create'
*/
create.url = (options) => {
	return create.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\AdminUserController::create
* @see app/Http/Controllers/Admin/AdminUserController.php:21
* @route '/admin/admin-users/create'
*/
create.get = (options) => ({
	url: create.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AdminUserController::create
* @see app/Http/Controllers/Admin/AdminUserController.php:21
* @route '/admin/admin-users/create'
*/
create.head = (options) => ({
	url: create.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\AdminUserController::create
* @see app/Http/Controllers/Admin/AdminUserController.php:21
* @route '/admin/admin-users/create'
*/
var createForm = (options) => ({
	action: create.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AdminUserController::create
* @see app/Http/Controllers/Admin/AdminUserController.php:21
* @route '/admin/admin-users/create'
*/
createForm.get = (options) => ({
	action: create.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AdminUserController::create
* @see app/Http/Controllers/Admin/AdminUserController.php:21
* @route '/admin/admin-users/create'
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
* @see \App\Http\Controllers\Admin\AdminUserController::store
* @see app/Http/Controllers/Admin/AdminUserController.php:29
* @route '/admin/admin-users'
*/
var store = (options) => ({
	url: store.url(options),
	method: "post"
});
store.definition = {
	methods: ["post"],
	url: "/admin/admin-users"
};
/**
* @see \App\Http\Controllers\Admin\AdminUserController::store
* @see app/Http/Controllers/Admin/AdminUserController.php:29
* @route '/admin/admin-users'
*/
store.url = (options) => {
	return store.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\AdminUserController::store
* @see app/Http/Controllers/Admin/AdminUserController.php:29
* @route '/admin/admin-users'
*/
store.post = (options) => ({
	url: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\AdminUserController::store
* @see app/Http/Controllers/Admin/AdminUserController.php:29
* @route '/admin/admin-users'
*/
var storeForm = (options) => ({
	action: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\AdminUserController::store
* @see app/Http/Controllers/Admin/AdminUserController.php:29
* @route '/admin/admin-users'
*/
storeForm.post = (options) => ({
	action: store.url(options),
	method: "post"
});
store.form = storeForm;
/**
* @see \App\Http\Controllers\Admin\AdminUserController::edit
* @see app/Http/Controllers/Admin/AdminUserController.php:38
* @route '/admin/admin-users/{adminUser}/edit'
*/
var edit = (args, options) => ({
	url: edit.url(args, options),
	method: "get"
});
edit.definition = {
	methods: ["get", "head"],
	url: "/admin/admin-users/{adminUser}/edit"
};
/**
* @see \App\Http\Controllers\Admin\AdminUserController::edit
* @see app/Http/Controllers/Admin/AdminUserController.php:38
* @route '/admin/admin-users/{adminUser}/edit'
*/
edit.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { adminUser: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { adminUser: args.id };
	if (Array.isArray(args)) args = { adminUser: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { adminUser: typeof args.adminUser === "object" ? args.adminUser.id : args.adminUser };
	return edit.definition.url.replace("{adminUser}", parsedArgs.adminUser.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\AdminUserController::edit
* @see app/Http/Controllers/Admin/AdminUserController.php:38
* @route '/admin/admin-users/{adminUser}/edit'
*/
edit.get = (args, options) => ({
	url: edit.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AdminUserController::edit
* @see app/Http/Controllers/Admin/AdminUserController.php:38
* @route '/admin/admin-users/{adminUser}/edit'
*/
edit.head = (args, options) => ({
	url: edit.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\AdminUserController::edit
* @see app/Http/Controllers/Admin/AdminUserController.php:38
* @route '/admin/admin-users/{adminUser}/edit'
*/
var editForm = (args, options) => ({
	action: edit.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AdminUserController::edit
* @see app/Http/Controllers/Admin/AdminUserController.php:38
* @route '/admin/admin-users/{adminUser}/edit'
*/
editForm.get = (args, options) => ({
	action: edit.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AdminUserController::edit
* @see app/Http/Controllers/Admin/AdminUserController.php:38
* @route '/admin/admin-users/{adminUser}/edit'
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
* @see \App\Http\Controllers\Admin\AdminUserController::update
* @see app/Http/Controllers/Admin/AdminUserController.php:46
* @route '/admin/admin-users/{adminUser}'
*/
var update = (args, options) => ({
	url: update.url(args, options),
	method: "put"
});
update.definition = {
	methods: ["put"],
	url: "/admin/admin-users/{adminUser}"
};
/**
* @see \App\Http\Controllers\Admin\AdminUserController::update
* @see app/Http/Controllers/Admin/AdminUserController.php:46
* @route '/admin/admin-users/{adminUser}'
*/
update.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { adminUser: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { adminUser: args.id };
	if (Array.isArray(args)) args = { adminUser: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { adminUser: typeof args.adminUser === "object" ? args.adminUser.id : args.adminUser };
	return update.definition.url.replace("{adminUser}", parsedArgs.adminUser.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\AdminUserController::update
* @see app/Http/Controllers/Admin/AdminUserController.php:46
* @route '/admin/admin-users/{adminUser}'
*/
update.put = (args, options) => ({
	url: update.url(args, options),
	method: "put"
});
/**
* @see \App\Http\Controllers\Admin\AdminUserController::update
* @see app/Http/Controllers/Admin/AdminUserController.php:46
* @route '/admin/admin-users/{adminUser}'
*/
var updateForm = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\AdminUserController::update
* @see app/Http/Controllers/Admin/AdminUserController.php:46
* @route '/admin/admin-users/{adminUser}'
*/
updateForm.put = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update.form = updateForm;
var adminUsers = {
	index: Object.assign(index$2, index$2),
	create: Object.assign(create, create),
	store: Object.assign(store, store),
	edit: Object.assign(edit, edit),
	update: Object.assign(update, update)
};
//#endregion
//#region resources/js/routes/admin/reports/index.ts
/**
* @see \App\Http\Controllers\Admin\ReportController::index
* @see app/Http/Controllers/Admin/ReportController.php:13
* @route '/admin/reports/{type}'
*/
var index$1 = (args, options) => ({
	url: index$1.url(args, options),
	method: "get"
});
index$1.definition = {
	methods: ["get", "head"],
	url: "/admin/reports/{type}"
};
/**
* @see \App\Http\Controllers\Admin\ReportController::index
* @see app/Http/Controllers/Admin/ReportController.php:13
* @route '/admin/reports/{type}'
*/
index$1.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { type: args };
	if (Array.isArray(args)) args = { type: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { type: args.type };
	return index$1.definition.url.replace("{type}", parsedArgs.type.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ReportController::index
* @see app/Http/Controllers/Admin/ReportController.php:13
* @route '/admin/reports/{type}'
*/
index$1.get = (args, options) => ({
	url: index$1.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ReportController::index
* @see app/Http/Controllers/Admin/ReportController.php:13
* @route '/admin/reports/{type}'
*/
index$1.head = (args, options) => ({
	url: index$1.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ReportController::index
* @see app/Http/Controllers/Admin/ReportController.php:13
* @route '/admin/reports/{type}'
*/
var indexForm$1 = (args, options) => ({
	action: index$1.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ReportController::index
* @see app/Http/Controllers/Admin/ReportController.php:13
* @route '/admin/reports/{type}'
*/
indexForm$1.get = (args, options) => ({
	action: index$1.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ReportController::index
* @see app/Http/Controllers/Admin/ReportController.php:13
* @route '/admin/reports/{type}'
*/
indexForm$1.head = (args, options) => ({
	action: index$1.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index$1.form = indexForm$1;
/**
* @see \App\Http\Controllers\Admin\ReportController::exportMethod
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/{type}/export'
*/
var exportMethod = (args, options) => ({
	url: exportMethod.url(args, options),
	method: "get"
});
exportMethod.definition = {
	methods: ["get", "head"],
	url: "/admin/reports/{type}/export"
};
/**
* @see \App\Http\Controllers\Admin\ReportController::exportMethod
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/{type}/export'
*/
exportMethod.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { type: args };
	if (Array.isArray(args)) args = { type: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { type: args.type };
	return exportMethod.definition.url.replace("{type}", parsedArgs.type.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\ReportController::exportMethod
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/{type}/export'
*/
exportMethod.get = (args, options) => ({
	url: exportMethod.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ReportController::exportMethod
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/{type}/export'
*/
exportMethod.head = (args, options) => ({
	url: exportMethod.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\ReportController::exportMethod
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/{type}/export'
*/
var exportMethodForm = (args, options) => ({
	action: exportMethod.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ReportController::exportMethod
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/{type}/export'
*/
exportMethodForm.get = (args, options) => ({
	action: exportMethod.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\ReportController::exportMethod
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/{type}/export'
*/
exportMethodForm.head = (args, options) => ({
	action: exportMethod.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
exportMethod.form = exportMethodForm;
var reports = {
	index: Object.assign(index$1, index$1),
	export: Object.assign(exportMethod, exportMethod)
};
//#endregion
//#region resources/js/routes/admin/audit-logs/index.ts
/**
* @see \App\Http\Controllers\Admin\AuditLogController::index
* @see app/Http/Controllers/Admin/AuditLogController.php:12
* @route '/admin/audit-logs'
*/
var index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/admin/audit-logs"
};
/**
* @see \App\Http\Controllers\Admin\AuditLogController::index
* @see app/Http/Controllers/Admin/AuditLogController.php:12
* @route '/admin/audit-logs'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\AuditLogController::index
* @see app/Http/Controllers/Admin/AuditLogController.php:12
* @route '/admin/audit-logs'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AuditLogController::index
* @see app/Http/Controllers/Admin/AuditLogController.php:12
* @route '/admin/audit-logs'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\AuditLogController::index
* @see app/Http/Controllers/Admin/AuditLogController.php:12
* @route '/admin/audit-logs'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AuditLogController::index
* @see app/Http/Controllers/Admin/AuditLogController.php:12
* @route '/admin/audit-logs'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\AuditLogController::index
* @see app/Http/Controllers/Admin/AuditLogController.php:12
* @route '/admin/audit-logs'
*/
indexForm.head = (options) => ({
	action: index.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index.form = indexForm;
var auditLogs = { index: Object.assign(index, index) };
//#endregion
//#region resources/js/routes/admin/index.ts
/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:12
* @route '/admin/dashboard'
*/
var dashboard = (options) => ({
	url: dashboard.url(options),
	method: "get"
});
dashboard.definition = {
	methods: ["get", "head"],
	url: "/admin/dashboard"
};
/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:12
* @route '/admin/dashboard'
*/
dashboard.url = (options) => {
	return dashboard.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:12
* @route '/admin/dashboard'
*/
dashboard.get = (options) => ({
	url: dashboard.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:12
* @route '/admin/dashboard'
*/
dashboard.head = (options) => ({
	url: dashboard.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:12
* @route '/admin/dashboard'
*/
var dashboardForm = (options) => ({
	action: dashboard.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:12
* @route '/admin/dashboard'
*/
dashboardForm.get = (options) => ({
	action: dashboard.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:12
* @route '/admin/dashboard'
*/
dashboardForm.head = (options) => ({
	action: dashboard.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
dashboard.form = dashboardForm;
Object.assign(dashboard, dashboard), Object.assign(products, products), Object.assign(productVariants, productVariants), Object.assign(categories, categories), Object.assign(collections, collections), Object.assign(stock, stock), Object.assign(orders, orders), Object.assign(payments, payments), Object.assign(paymentLogs, paymentLogs), Object.assign(shipments, shipments), Object.assign(biteshipWebhookLogs, biteshipWebhookLogs), Object.assign(customers, customers), Object.assign(customerAddresses, customerAddresses), Object.assign(vouchers, vouchers), Object.assign(notifications, notifications), Object.assign(wishlists, wishlists), Object.assign(banners, banners), Object.assign(blogs, blogs), Object.assign(gallery, gallery), Object.assign(pages, pages), Object.assign(newProduct, newProduct), Object.assign(settings, settings), Object.assign(adminUsers, adminUsers), Object.assign(reports, reports), Object.assign(auditLogs, auditLogs);
//#endregion
//#region resources/js/pages/customer/profile/my-profile.tsx
function MyProfile() {
	const { defaultAddress, user } = usePage().props;
	const avatarInputRef = useRef(null);
	const [avatarPreview, setAvatarPreview] = useState(null);
	const [profileClientErrors, setProfileClientErrors] = useState({});
	const isAdmin = user.role.toLowerCase() === "admin";
	const profileForm = useForm({
		name: user.name ?? "",
		email: user.email ?? "",
		phone: user.phone ?? "",
		avatar_url: null
	});
	const submitProfile = (event) => {
		event.preventDefault();
		const nextErrors = {};
		if (profileForm.data.name.trim() === "") nextErrors.name = "Nama lengkap wajib diisi.";
		if (profileForm.data.phone.trim() !== "" && !/^[0-9]+$/.test(profileForm.data.phone)) nextErrors.phone = "Nomor telepon hanya boleh berisi angka.";
		setProfileClientErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;
		profileForm.transform((data) => ({
			...data,
			_method: "patch"
		}));
		profileForm.post(ProfileController.update["/my-profile"].url(), {
			forceFormData: true,
			preserveScroll: true,
			onSuccess: () => {
				selectAvatar(null);
				if (avatarInputRef.current) avatarInputRef.current.value = "";
			}
		});
	};
	const selectAvatar = (file) => {
		profileForm.setData("avatar_url", file);
		if (avatarPreview) URL.revokeObjectURL(avatarPreview);
		setAvatarPreview(file ? URL.createObjectURL(file) : null);
	};
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [showPassword3, setShowPassword3] = useState(false);
	const [passwordClientErrors, setPasswordClientErrors] = useState({});
	const passwordForm = useForm({
		current_password: "",
		password: "",
		password_confirmation: ""
	});
	const submitPassword = (event) => {
		event.preventDefault();
		const nextErrors = {};
		if (passwordForm.data.current_password.trim() === "") nextErrors.current_password = "Kata sandi saat ini wajib diisi.";
		if (passwordForm.data.password.trim() === "") nextErrors.password = "Kata sandi baru wajib diisi.";
		if (passwordForm.data.password_confirmation.trim() === "") nextErrors.password_confirmation = "Konfirmasi kata sandi wajib diisi.";
		setPasswordClientErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;
		passwordForm.put(SecurityController.update.url(), {
			preserveScroll: true,
			onSuccess: () => passwordForm.reset(),
			onError: () => passwordForm.reset("password", "password_confirmation")
		});
	};
	useEffect(() => {
		return () => {
			if (avatarPreview) URL.revokeObjectURL(avatarPreview);
		};
	}, [avatarPreview]);
	const avatarSrc = avatarPreview || user.avatar_url;
	const nameError = profileClientErrors.name ?? profileForm.errors.name;
	const phoneError = profileClientErrors.phone ?? profileForm.errors.phone;
	return /* @__PURE__ */ jsxs(ProfileLayout, {
		title: "Pengaturan Profil",
		pageTitle: "Pengaturan Profil",
		subtitle: "Kelola informasi pribadi dan preferensi akunmu.",
		activePath: "my-profile",
		breadcrumbs: [
			{
				label: "Beranda",
				href: "/"
			},
			{
				label: "Akun Saya",
				href: "/my-profile"
			},
			{ label: "Pengaturan Profil" }
		],
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-5 flex flex-col gap-5 border-b border-[#D8D8D8] pb-5 md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-8",
				children: [/* @__PURE__ */ jsx(AvatarFrame, {
					avatarSrc,
					name: user.name
				}), /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-[30px] leading-none font-black tracking-normal text-[#1A1A1A]",
						children: user.name
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-base font-medium text-[#1A1A1A]",
						children: user.email
					}),
					user.member_since && /* @__PURE__ */ jsxs("p", {
						className: "mt-2 text-sm font-medium text-[#707070]",
						children: ["Member sejak ", user.member_since]
					})
				] })]
			}), isAdmin && /* @__PURE__ */ jsx(Link, {
				href: dashboard(),
				className: "inline-flex h-10 items-center justify-center border border-[#1A1A1A] px-5 text-sm font-black uppercase hover:bg-[#1A1A1A] hover:text-white",
				children: "Dashboard"
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-7 xl:grid-cols-[1fr_1fr]",
			children: [/* @__PURE__ */ jsx(ProfileInfoCard, {
				profileForm,
				avatarInputRef,
				avatarSrc,
				nameError,
				phoneError,
				setProfileClientErrors,
				selectAvatar,
				submitProfile
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid gap-5",
				children: [/* @__PURE__ */ jsx(PasswordCard, {
					passwordForm,
					passwordClientErrors,
					setPasswordClientErrors,
					submitPassword,
					showPassword1,
					showPassword2,
					showPassword3,
					setShowPassword1,
					setShowPassword2,
					setShowPassword3
				}), /* @__PURE__ */ jsx(AddressCard, { defaultAddress })]
			})]
		})]
	});
}
function AvatarFrame({ avatarSrc, name }) {
	return /* @__PURE__ */ jsx("div", {
		className: "flex h-24 w-24 items-center justify-center rounded-full border border-[#CFCFCF] bg-[#F8F8F8] text-[#1A1A1A]",
		children: avatarSrc ? /* @__PURE__ */ jsx("img", {
			src: avatarSrc,
			alt: name,
			className: "h-full w-full rounded-full object-cover"
		}) : /* @__PURE__ */ jsx(User, {
			size: 48,
			strokeWidth: 1.5
		})
	});
}
function ProfileInfoCard({ profileForm, avatarInputRef, avatarSrc, nameError, phoneError, setProfileClientErrors, selectAvatar, submitProfile }) {
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: submitProfile,
		className: "border border-[#D8D8D8] bg-white px-8 py-6",
		children: [/* @__PURE__ */ jsx(SectionTitle, {
			icon: User,
			title: "Informasi Pribadi"
		}), /* @__PURE__ */ jsxs("div", {
			className: "mt-5 grid gap-4",
			children: [
				/* @__PURE__ */ jsx(TextField, {
					label: "Nama Lengkap",
					value: profileForm.data.name,
					onChange: (value) => {
						profileForm.setData("name", value);
						setProfileClientErrors((current) => ({
							...current,
							name: void 0
						}));
					},
					error: nameError
				}),
				/* @__PURE__ */ jsx(TextField, {
					label: "Alamat Email",
					type: "email",
					value: profileForm.data.email,
					onChange: (value) => profileForm.setData("email", value),
					error: profileForm.errors.email
				}),
				/* @__PURE__ */ jsx(TextField, {
					label: "Nomor Telepon",
					type: "tel",
					value: profileForm.data.phone,
					onChange: (value) => {
						profileForm.setData("phone", value.replace(/\D/g, ""));
						setProfileClientErrors((current) => ({
							...current,
							phone: void 0
						}));
					},
					error: phoneError,
					inputMode: "numeric",
					placeholder: "0812-3456-7890"
				}),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("label", {
						className: "mb-2 block text-sm font-black",
						children: [
							"Foto Avatar",
							" ",
							/* @__PURE__ */ jsx("span", {
								className: "font-medium",
								children: "(opsional)"
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: " sm:items-center",
						children: /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => avatarInputRef.current?.click(),
							className: "grid min-h-[76px] place-items-center border border-dashed border-[#1A1A1A] bg-white px-5 text-center transition-colors hover:border-[#F58220] hover:text-[#F58220]",
							children: /* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-3 text-sm font-black",
								children: [/* @__PURE__ */ jsx(Upload, {
									size: 24,
									strokeWidth: 1.7
								}), "Klik untuk mengunggah"]
							})
						})
					}),
					/* @__PURE__ */ jsx("input", {
						ref: avatarInputRef,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						onChange: (event) => selectAvatar(event.target.files?.[0] ?? null),
						className: "sr-only"
					}),
					profileForm.errors.avatar_url && /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-xs font-bold text-[#C81E1E]",
						children: profileForm.errors.avatar_url
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm font-medium text-[#707070]",
						children: "JPG, PNG, atau WEBP. Maks 2MB."
					})
				] }),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-3 grid gap-4 sm:grid-cols-[1fr_0.82fr]",
					children: [/* @__PURE__ */ jsxs("button", {
						type: "submit",
						disabled: profileForm.processing,
						className: "inline-flex h-12 items-center justify-center gap-2 bg-[#F58220] px-6 text-sm font-black text-white transition-colors hover:bg-[#E67312] disabled:bg-[#CFCFCF] disabled:text-[#707070]",
						children: [profileForm.processing && /* @__PURE__ */ jsx(Loader2, {
							size: 16,
							className: "animate-spin"
						}), "Simpan Perubahan"]
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => profileForm.reset(),
						className: "h-12 border border-[#1A1A1A] bg-white px-6 text-sm font-black hover:bg-[#1A1A1A] hover:text-white",
						children: "Batal"
					})]
				})
			]
		})]
	});
}
function PasswordCard({ passwordForm, passwordClientErrors, setPasswordClientErrors, submitPassword, showPassword1, showPassword2, showPassword3, setShowPassword1, setShowPassword2, setShowPassword3 }) {
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: submitPassword,
		className: "border border-[#D8D8D8] bg-white px-8 py-6",
		children: [/* @__PURE__ */ jsx(SectionTitle, {
			icon: Lock,
			title: "Ubah Kata Sandi"
		}), /* @__PURE__ */ jsxs("div", {
			className: "mt-5 grid gap-4",
			children: [
				/* @__PURE__ */ jsx(PasswordField, {
					label: "Kata Sandi Saat Ini",
					show: showPassword1,
					onToggle: () => setShowPassword1((current) => !current),
					value: passwordForm.data.current_password,
					onChange: (value) => {
						passwordForm.setData("current_password", value);
						setPasswordClientErrors((current) => ({
							...current,
							current_password: void 0
						}));
					},
					error: passwordClientErrors.current_password ?? passwordForm.errors.current_password,
					autoComplete: "current-password"
				}),
				/* @__PURE__ */ jsx(PasswordField, {
					label: "Kata Sandi Baru",
					show: showPassword2,
					onToggle: () => setShowPassword2((current) => !current),
					value: passwordForm.data.password,
					onChange: (value) => {
						passwordForm.setData("password", value);
						setPasswordClientErrors((current) => ({
							...current,
							password: void 0
						}));
					},
					error: passwordClientErrors.password ?? passwordForm.errors.password,
					autoComplete: "new-password"
				}),
				/* @__PURE__ */ jsx(PasswordField, {
					label: "Konfirmasi Kata Sandi Baru",
					show: showPassword3,
					onToggle: () => setShowPassword3((current) => !current),
					value: passwordForm.data.password_confirmation,
					onChange: (value) => {
						passwordForm.setData("password_confirmation", value);
						setPasswordClientErrors((current) => ({
							...current,
							password_confirmation: void 0
						}));
					},
					error: passwordClientErrors.password_confirmation ?? passwordForm.errors.password_confirmation,
					autoComplete: "new-password"
				}),
				/* @__PURE__ */ jsxs("button", {
					type: "submit",
					disabled: passwordForm.processing,
					className: "mt-1 inline-flex h-12 items-center justify-center gap-2 bg-[#F58220] px-6 text-sm font-black text-white transition-colors hover:bg-[#E67312] disabled:bg-[#CFCFCF] disabled:text-[#707070]",
					children: [passwordForm.processing && /* @__PURE__ */ jsx(Loader2, {
						size: 16,
						className: "animate-spin"
					}), "Perbarui Kata Sandi"]
				})
			]
		})]
	});
}
function AddressCard({ defaultAddress }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "border border-[#D8D8D8] bg-white px-8 py-6",
		children: [/* @__PURE__ */ jsx(SectionTitle, {
			icon: MapPin,
			title: "Alamat Utama"
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-4 sm:items-center",
			children: /* @__PURE__ */ jsxs("div", { children: [defaultAddress ? /* @__PURE__ */ jsxs("div", {
				className: "text-sm font-medium text-[#2E2E2E]",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "font-black text-[#1A1A1A]",
						children: defaultAddress.recipient_name
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1",
						children: defaultAddress.recipient_phone
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 leading-6",
						children: defaultAddress.full_address
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1",
						children: [
							defaultAddress.district,
							defaultAddress.city,
							defaultAddress.province,
							defaultAddress.postal_code
						].filter(Boolean).join(", ")
					})
				]
			}) : /* @__PURE__ */ jsx("p", {
				className: "text-sm leading-6 font-medium text-[#707070]",
				children: "Belum ada alamat utama. Tambahkan alamat untuk checkout lebih cepat."
			}), /* @__PURE__ */ jsx(Link, {
				href: "/address",
				className: "mt-4 inline-flex h-10 min-w-[160px] items-center justify-center border border-[#1A1A1A] bg-white px-5 text-sm font-black transition-colors hover:bg-[#1A1A1A] hover:text-white",
				children: defaultAddress ? "Kelola Alamat" : "Tambah Alamat"
			})] })
		})]
	});
}
function SectionTitle({ icon: Icon, title }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-4",
		children: [/* @__PURE__ */ jsx(Icon, {
			size: 27,
			strokeWidth: 1.7
		}), /* @__PURE__ */ jsx("h3", {
			className: "text-2xl font-black tracking-normal text-[#1A1A1A]",
			children: title
		})]
	});
}
function TextField({ label, value, onChange, error, type = "text", inputMode, placeholder }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-2 sm:grid-cols-[120px_1fr] sm:items-center",
		children: [/* @__PURE__ */ jsx("label", {
			className: "text-sm font-black text-[#1A1A1A]",
			children: label
		}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("input", {
			type,
			inputMode,
			value,
			onChange: (event) => onChange(event.target.value),
			placeholder,
			className: `h-10 w-full border bg-white px-4 text-sm font-medium text-[#1A1A1A] transition-colors outline-none focus:border-[#1A1A1A] ${error ? "border-[#C81E1E]" : "border-[#9A9A9A]"}`
		}), error && /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-xs font-bold text-[#C81E1E]",
			children: error
		})] })]
	});
}
function PasswordField({ label, show, onToggle, value, onChange, error, autoComplete }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-2 sm:grid-cols-[140px_1fr] sm:items-center",
		children: [/* @__PURE__ */ jsx("label", {
			className: "text-sm font-black text-[#1A1A1A]",
			children: label
		}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
			className: "relative",
			children: [/* @__PURE__ */ jsx("input", {
				type: show ? "text" : "password",
				value,
				onChange: (event) => onChange(event.target.value),
				autoComplete,
				className: `h-10 w-full border bg-white px-4 pr-11 text-sm font-medium text-[#1A1A1A] transition-colors outline-none focus:border-[#1A1A1A] ${error ? "border-[#C81E1E]" : "border-[#9A9A9A]"}`
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onToggle,
				className: "absolute top-1/2 right-3 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-[#1A1A1A] transition-colors hover:text-[#F58220]",
				"aria-label": show ? "Hide password" : "Show password",
				children: show ? /* @__PURE__ */ jsx(EyeOff, { size: 18 }) : /* @__PURE__ */ jsx(Eye, { size: 18 })
			})]
		}), error && /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-xs font-bold text-[#C81E1E]",
			children: error
		})] })]
	});
}
//#endregion
export { MyProfile as default };

//# sourceMappingURL=my-profile-Du_SM1WA.js.map