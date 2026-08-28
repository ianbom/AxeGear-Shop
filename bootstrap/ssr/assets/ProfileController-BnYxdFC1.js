import { n as queryParams } from "./wayfinder-Bgbpuenu.js";
//#region resources/js/actions/App/Http/Controllers/Settings/ProfileController.ts
/**
* @see \App\Http\Controllers\Settings\ProfileController::customerEdit
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
var customerEdit = (options) => ({
	url: customerEdit.url(options),
	method: "get"
});
customerEdit.definition = {
	methods: ["get", "head"],
	url: "/my-profile"
};
/**
* @see \App\Http\Controllers\Settings\ProfileController::customerEdit
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
customerEdit.url = (options) => {
	return customerEdit.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Settings\ProfileController::customerEdit
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
customerEdit.get = (options) => ({
	url: customerEdit.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::customerEdit
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
customerEdit.head = (options) => ({
	url: customerEdit.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::customerEdit
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
var customerEditForm = (options) => ({
	action: customerEdit.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::customerEdit
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
customerEditForm.get = (options) => ({
	action: customerEdit.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::customerEdit
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
customerEditForm.head = (options) => ({
	action: customerEdit.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
customerEdit.form = customerEditForm;
/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/my-profile'
*/
var updateb53e8092ef1bae2d9e9a636332da2f10 = (options) => ({
	url: updateb53e8092ef1bae2d9e9a636332da2f10.url(options),
	method: "patch"
});
updateb53e8092ef1bae2d9e9a636332da2f10.definition = {
	methods: ["patch"],
	url: "/my-profile"
};
/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/my-profile'
*/
updateb53e8092ef1bae2d9e9a636332da2f10.url = (options) => {
	return updateb53e8092ef1bae2d9e9a636332da2f10.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/my-profile'
*/
updateb53e8092ef1bae2d9e9a636332da2f10.patch = (options) => ({
	url: updateb53e8092ef1bae2d9e9a636332da2f10.url(options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/my-profile'
*/
var updateb53e8092ef1bae2d9e9a636332da2f10Form = (options) => ({
	action: updateb53e8092ef1bae2d9e9a636332da2f10.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/my-profile'
*/
updateb53e8092ef1bae2d9e9a636332da2f10Form.patch = (options) => ({
	action: updateb53e8092ef1bae2d9e9a636332da2f10.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
updateb53e8092ef1bae2d9e9a636332da2f10.form = updateb53e8092ef1bae2d9e9a636332da2f10Form;
/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/settings/profile'
*/
var updatefc6874003af373efc88e5e18eecd9c17 = (options) => ({
	url: updatefc6874003af373efc88e5e18eecd9c17.url(options),
	method: "patch"
});
updatefc6874003af373efc88e5e18eecd9c17.definition = {
	methods: ["patch"],
	url: "/settings/profile"
};
/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/settings/profile'
*/
updatefc6874003af373efc88e5e18eecd9c17.url = (options) => {
	return updatefc6874003af373efc88e5e18eecd9c17.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/settings/profile'
*/
updatefc6874003af373efc88e5e18eecd9c17.patch = (options) => ({
	url: updatefc6874003af373efc88e5e18eecd9c17.url(options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/settings/profile'
*/
var updatefc6874003af373efc88e5e18eecd9c17Form = (options) => ({
	action: updatefc6874003af373efc88e5e18eecd9c17.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/settings/profile'
*/
updatefc6874003af373efc88e5e18eecd9c17Form.patch = (options) => ({
	action: updatefc6874003af373efc88e5e18eecd9c17.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
updatefc6874003af373efc88e5e18eecd9c17.form = updatefc6874003af373efc88e5e18eecd9c17Form;
var update = {
	"/my-profile": updateb53e8092ef1bae2d9e9a636332da2f10,
	"/settings/profile": updatefc6874003af373efc88e5e18eecd9c17
};
/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:33
* @route '/admin/settings/profile'
*/
var edit = (options) => ({
	url: edit.url(options),
	method: "get"
});
edit.definition = {
	methods: ["get", "head"],
	url: "/admin/settings/profile"
};
/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:33
* @route '/admin/settings/profile'
*/
edit.url = (options) => {
	return edit.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:33
* @route '/admin/settings/profile'
*/
edit.get = (options) => ({
	url: edit.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:33
* @route '/admin/settings/profile'
*/
edit.head = (options) => ({
	url: edit.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:33
* @route '/admin/settings/profile'
*/
var editForm = (options) => ({
	action: edit.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:33
* @route '/admin/settings/profile'
*/
editForm.get = (options) => ({
	action: edit.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:33
* @route '/admin/settings/profile'
*/
editForm.head = (options) => ({
	action: edit.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
edit.form = editForm;
/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:54
* @route '/settings/profile'
*/
var destroy = (options) => ({
	url: destroy.url(options),
	method: "delete"
});
destroy.definition = {
	methods: ["delete"],
	url: "/settings/profile"
};
/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:54
* @route '/settings/profile'
*/
destroy.url = (options) => {
	return destroy.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:54
* @route '/settings/profile'
*/
destroy.delete = (options) => ({
	url: destroy.url(options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:54
* @route '/settings/profile'
*/
var destroyForm = (options) => ({
	action: destroy.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:54
* @route '/settings/profile'
*/
destroyForm.delete = (options) => ({
	action: destroy.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy.form = destroyForm;
var ProfileController = {
	customerEdit,
	update,
	edit,
	destroy
};
//#endregion
export { ProfileController as t };

//# sourceMappingURL=ProfileController-BnYxdFC1.js.map