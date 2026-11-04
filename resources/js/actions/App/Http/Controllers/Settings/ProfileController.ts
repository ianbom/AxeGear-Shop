import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\ProfileController::customerEdit
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
export const customerEdit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: customerEdit.url(options),
    method: 'get',
})

customerEdit.definition = {
    methods: ["get","head"],
    url: '/my-profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::customerEdit
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
customerEdit.url = (options?: RouteQueryOptions) => {
    return customerEdit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::customerEdit
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
customerEdit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: customerEdit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::customerEdit
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
customerEdit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: customerEdit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::customerEdit
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
const customerEditForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: customerEdit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::customerEdit
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
customerEditForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: customerEdit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::customerEdit
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
customerEditForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: customerEdit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

customerEdit.form = customerEditForm

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/my-profile'
*/
const updateb53e8092ef1bae2d9e9a636332da2f10 = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateb53e8092ef1bae2d9e9a636332da2f10.url(options),
    method: 'patch',
})

updateb53e8092ef1bae2d9e9a636332da2f10.definition = {
    methods: ["patch"],
    url: '/my-profile',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/my-profile'
*/
updateb53e8092ef1bae2d9e9a636332da2f10.url = (options?: RouteQueryOptions) => {
    return updateb53e8092ef1bae2d9e9a636332da2f10.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/my-profile'
*/
updateb53e8092ef1bae2d9e9a636332da2f10.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateb53e8092ef1bae2d9e9a636332da2f10.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/my-profile'
*/
const updateb53e8092ef1bae2d9e9a636332da2f10Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateb53e8092ef1bae2d9e9a636332da2f10.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/my-profile'
*/
updateb53e8092ef1bae2d9e9a636332da2f10Form.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateb53e8092ef1bae2d9e9a636332da2f10.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateb53e8092ef1bae2d9e9a636332da2f10.form = updateb53e8092ef1bae2d9e9a636332da2f10Form
/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/settings/profile'
*/
const updatefc6874003af373efc88e5e18eecd9c17 = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatefc6874003af373efc88e5e18eecd9c17.url(options),
    method: 'patch',
})

updatefc6874003af373efc88e5e18eecd9c17.definition = {
    methods: ["patch"],
    url: '/settings/profile',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/settings/profile'
*/
updatefc6874003af373efc88e5e18eecd9c17.url = (options?: RouteQueryOptions) => {
    return updatefc6874003af373efc88e5e18eecd9c17.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/settings/profile'
*/
updatefc6874003af373efc88e5e18eecd9c17.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatefc6874003af373efc88e5e18eecd9c17.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/settings/profile'
*/
const updatefc6874003af373efc88e5e18eecd9c17Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatefc6874003af373efc88e5e18eecd9c17.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:41
* @route '/settings/profile'
*/
updatefc6874003af373efc88e5e18eecd9c17Form.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatefc6874003af373efc88e5e18eecd9c17.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatefc6874003af373efc88e5e18eecd9c17.form = updatefc6874003af373efc88e5e18eecd9c17Form

export const update = {
    '/my-profile': updateb53e8092ef1bae2d9e9a636332da2f10,
    '/settings/profile': updatefc6874003af373efc88e5e18eecd9c17,
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:33
* @route '/admin/settings/profile'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/settings/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:33
* @route '/admin/settings/profile'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:33
* @route '/admin/settings/profile'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:33
* @route '/admin/settings/profile'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:33
* @route '/admin/settings/profile'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:33
* @route '/admin/settings/profile'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:33
* @route '/admin/settings/profile'
*/
editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:54
* @route '/settings/profile'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/settings/profile',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:54
* @route '/settings/profile'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:54
* @route '/settings/profile'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:54
* @route '/settings/profile'
*/
const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:54
* @route '/settings/profile'
*/
destroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const ProfileController = { customerEdit, update, edit, destroy }

export default ProfileController