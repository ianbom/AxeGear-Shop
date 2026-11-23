import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\NewProductPageController::edit
* @see app/Http/Controllers/Admin/NewProductPageController.php:13
* @route '/admin/new-product'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/new-product',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NewProductPageController::edit
* @see app/Http/Controllers/Admin/NewProductPageController.php:13
* @route '/admin/new-product'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NewProductPageController::edit
* @see app/Http/Controllers/Admin/NewProductPageController.php:13
* @route '/admin/new-product'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NewProductPageController::edit
* @see app/Http/Controllers/Admin/NewProductPageController.php:13
* @route '/admin/new-product'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\NewProductPageController::edit
* @see app/Http/Controllers/Admin/NewProductPageController.php:13
* @route '/admin/new-product'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NewProductPageController::edit
* @see app/Http/Controllers/Admin/NewProductPageController.php:13
* @route '/admin/new-product'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NewProductPageController::edit
* @see app/Http/Controllers/Admin/NewProductPageController.php:13
* @route '/admin/new-product'
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
* @see \App\Http\Controllers\Admin\NewProductPageController::update
* @see app/Http/Controllers/Admin/NewProductPageController.php:18
* @route '/admin/new-product'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/new-product',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\NewProductPageController::update
* @see app/Http/Controllers/Admin/NewProductPageController.php:18
* @route '/admin/new-product'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NewProductPageController::update
* @see app/Http/Controllers/Admin/NewProductPageController.php:18
* @route '/admin/new-product'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\NewProductPageController::update
* @see app/Http/Controllers/Admin/NewProductPageController.php:18
* @route '/admin/new-product'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\NewProductPageController::update
* @see app/Http/Controllers/Admin/NewProductPageController.php:18
* @route '/admin/new-product'
*/
updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const NewProductPageController = { edit, update }

export default NewProductPageController