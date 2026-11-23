import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-CYR_hMAD.js";
//#region resources/js/actions/App/Http/Controllers/Admin/EmailNotificationController.ts
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::index
* @see app/Http/Controllers/Admin/EmailNotificationController.php:17
* @route '/admin/email-notifications'
*/
var index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/admin/email-notifications"
};
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::index
* @see app/Http/Controllers/Admin/EmailNotificationController.php:17
* @route '/admin/email-notifications'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::index
* @see app/Http/Controllers/Admin/EmailNotificationController.php:17
* @route '/admin/email-notifications'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::index
* @see app/Http/Controllers/Admin/EmailNotificationController.php:17
* @route '/admin/email-notifications'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::index
* @see app/Http/Controllers/Admin/EmailNotificationController.php:17
* @route '/admin/email-notifications'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::index
* @see app/Http/Controllers/Admin/EmailNotificationController.php:17
* @route '/admin/email-notifications'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::index
* @see app/Http/Controllers/Admin/EmailNotificationController.php:17
* @route '/admin/email-notifications'
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
* @see \App\Http\Controllers\Admin\EmailNotificationController::create
* @see app/Http/Controllers/Admin/EmailNotificationController.php:29
* @route '/admin/email-notifications/create'
*/
var create = (options) => ({
	url: create.url(options),
	method: "get"
});
create.definition = {
	methods: ["get", "head"],
	url: "/admin/email-notifications/create"
};
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::create
* @see app/Http/Controllers/Admin/EmailNotificationController.php:29
* @route '/admin/email-notifications/create'
*/
create.url = (options) => {
	return create.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::create
* @see app/Http/Controllers/Admin/EmailNotificationController.php:29
* @route '/admin/email-notifications/create'
*/
create.get = (options) => ({
	url: create.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::create
* @see app/Http/Controllers/Admin/EmailNotificationController.php:29
* @route '/admin/email-notifications/create'
*/
create.head = (options) => ({
	url: create.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::create
* @see app/Http/Controllers/Admin/EmailNotificationController.php:29
* @route '/admin/email-notifications/create'
*/
var createForm = (options) => ({
	action: create.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::create
* @see app/Http/Controllers/Admin/EmailNotificationController.php:29
* @route '/admin/email-notifications/create'
*/
createForm.get = (options) => ({
	action: create.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::create
* @see app/Http/Controllers/Admin/EmailNotificationController.php:29
* @route '/admin/email-notifications/create'
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
* @see \App\Http\Controllers\Admin\EmailNotificationController::store
* @see app/Http/Controllers/Admin/EmailNotificationController.php:34
* @route '/admin/email-notifications'
*/
var store = (options) => ({
	url: store.url(options),
	method: "post"
});
store.definition = {
	methods: ["post"],
	url: "/admin/email-notifications"
};
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::store
* @see app/Http/Controllers/Admin/EmailNotificationController.php:34
* @route '/admin/email-notifications'
*/
store.url = (options) => {
	return store.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::store
* @see app/Http/Controllers/Admin/EmailNotificationController.php:34
* @route '/admin/email-notifications'
*/
store.post = (options) => ({
	url: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::store
* @see app/Http/Controllers/Admin/EmailNotificationController.php:34
* @route '/admin/email-notifications'
*/
var storeForm = (options) => ({
	action: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::store
* @see app/Http/Controllers/Admin/EmailNotificationController.php:34
* @route '/admin/email-notifications'
*/
storeForm.post = (options) => ({
	action: store.url(options),
	method: "post"
});
store.form = storeForm;
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::edit
* @see app/Http/Controllers/Admin/EmailNotificationController.php:41
* @route '/admin/email-notifications/{emailNotification}/edit'
*/
var edit = (args, options) => ({
	url: edit.url(args, options),
	method: "get"
});
edit.definition = {
	methods: ["get", "head"],
	url: "/admin/email-notifications/{emailNotification}/edit"
};
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::edit
* @see app/Http/Controllers/Admin/EmailNotificationController.php:41
* @route '/admin/email-notifications/{emailNotification}/edit'
*/
edit.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { emailNotification: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { emailNotification: args.id };
	if (Array.isArray(args)) args = { emailNotification: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { emailNotification: typeof args.emailNotification === "object" ? args.emailNotification.id : args.emailNotification };
	return edit.definition.url.replace("{emailNotification}", parsedArgs.emailNotification.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::edit
* @see app/Http/Controllers/Admin/EmailNotificationController.php:41
* @route '/admin/email-notifications/{emailNotification}/edit'
*/
edit.get = (args, options) => ({
	url: edit.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::edit
* @see app/Http/Controllers/Admin/EmailNotificationController.php:41
* @route '/admin/email-notifications/{emailNotification}/edit'
*/
edit.head = (args, options) => ({
	url: edit.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::edit
* @see app/Http/Controllers/Admin/EmailNotificationController.php:41
* @route '/admin/email-notifications/{emailNotification}/edit'
*/
var editForm = (args, options) => ({
	action: edit.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::edit
* @see app/Http/Controllers/Admin/EmailNotificationController.php:41
* @route '/admin/email-notifications/{emailNotification}/edit'
*/
editForm.get = (args, options) => ({
	action: edit.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::edit
* @see app/Http/Controllers/Admin/EmailNotificationController.php:41
* @route '/admin/email-notifications/{emailNotification}/edit'
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
* @see \App\Http\Controllers\Admin\EmailNotificationController::update
* @see app/Http/Controllers/Admin/EmailNotificationController.php:46
* @route '/admin/email-notifications/{emailNotification}'
*/
var update = (args, options) => ({
	url: update.url(args, options),
	method: "put"
});
update.definition = {
	methods: ["put", "patch"],
	url: "/admin/email-notifications/{emailNotification}"
};
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::update
* @see app/Http/Controllers/Admin/EmailNotificationController.php:46
* @route '/admin/email-notifications/{emailNotification}'
*/
update.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { emailNotification: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { emailNotification: args.id };
	if (Array.isArray(args)) args = { emailNotification: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { emailNotification: typeof args.emailNotification === "object" ? args.emailNotification.id : args.emailNotification };
	return update.definition.url.replace("{emailNotification}", parsedArgs.emailNotification.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::update
* @see app/Http/Controllers/Admin/EmailNotificationController.php:46
* @route '/admin/email-notifications/{emailNotification}'
*/
update.put = (args, options) => ({
	url: update.url(args, options),
	method: "put"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::update
* @see app/Http/Controllers/Admin/EmailNotificationController.php:46
* @route '/admin/email-notifications/{emailNotification}'
*/
update.patch = (args, options) => ({
	url: update.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::update
* @see app/Http/Controllers/Admin/EmailNotificationController.php:46
* @route '/admin/email-notifications/{emailNotification}'
*/
var updateForm = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::update
* @see app/Http/Controllers/Admin/EmailNotificationController.php:46
* @route '/admin/email-notifications/{emailNotification}'
*/
updateForm.put = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::update
* @see app/Http/Controllers/Admin/EmailNotificationController.php:46
* @route '/admin/email-notifications/{emailNotification}'
*/
updateForm.patch = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update.form = updateForm;
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::destroy
* @see app/Http/Controllers/Admin/EmailNotificationController.php:53
* @route '/admin/email-notifications/{emailNotification}'
*/
var destroy = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
destroy.definition = {
	methods: ["delete"],
	url: "/admin/email-notifications/{emailNotification}"
};
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::destroy
* @see app/Http/Controllers/Admin/EmailNotificationController.php:53
* @route '/admin/email-notifications/{emailNotification}'
*/
destroy.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { emailNotification: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { emailNotification: args.id };
	if (Array.isArray(args)) args = { emailNotification: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { emailNotification: typeof args.emailNotification === "object" ? args.emailNotification.id : args.emailNotification };
	return destroy.definition.url.replace("{emailNotification}", parsedArgs.emailNotification.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::destroy
* @see app/Http/Controllers/Admin/EmailNotificationController.php:53
* @route '/admin/email-notifications/{emailNotification}'
*/
destroy.delete = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::destroy
* @see app/Http/Controllers/Admin/EmailNotificationController.php:53
* @route '/admin/email-notifications/{emailNotification}'
*/
var destroyForm = (args, options) => ({
	action: destroy.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::destroy
* @see app/Http/Controllers/Admin/EmailNotificationController.php:53
* @route '/admin/email-notifications/{emailNotification}'
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
export { update as a, store as i, edit as n, index as r, destroy as t };

//# sourceMappingURL=EmailNotificationController-BOlFisr5.js.map