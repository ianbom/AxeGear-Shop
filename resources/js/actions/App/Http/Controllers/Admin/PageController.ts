import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/pages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Admin\PageController::create
* @see app/Http/Controllers/Admin/PageController.php:20
* @route '/admin/pages/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/pages/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PageController::create
* @see app/Http/Controllers/Admin/PageController.php:20
* @route '/admin/pages/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PageController::create
* @see app/Http/Controllers/Admin/PageController.php:20
* @route '/admin/pages/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PageController::create
* @see app/Http/Controllers/Admin/PageController.php:20
* @route '/admin/pages/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PageController::create
* @see app/Http/Controllers/Admin/PageController.php:20
* @route '/admin/pages/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PageController::create
* @see app/Http/Controllers/Admin/PageController.php:20
* @route '/admin/pages/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PageController::create
* @see app/Http/Controllers/Admin/PageController.php:20
* @route '/admin/pages/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\Admin\PageController::store
* @see app/Http/Controllers/Admin/PageController.php:29
* @route '/admin/pages'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/pages',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PageController::store
* @see app/Http/Controllers/Admin/PageController.php:29
* @route '/admin/pages'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PageController::store
* @see app/Http/Controllers/Admin/PageController.php:29
* @route '/admin/pages'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PageController::store
* @see app/Http/Controllers/Admin/PageController.php:29
* @route '/admin/pages'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PageController::store
* @see app/Http/Controllers/Admin/PageController.php:29
* @route '/admin/pages'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\PageController::edit
* @see app/Http/Controllers/Admin/PageController.php:36
* @route '/admin/pages/{page}/edit'
*/
export const edit = (args: { page: string | number | { id: string | number } } | [page: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/pages/{page}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PageController::edit
* @see app/Http/Controllers/Admin/PageController.php:36
* @route '/admin/pages/{page}/edit'
*/
edit.url = (args: { page: string | number | { id: string | number } } | [page: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { page: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { page: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            page: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        page: typeof args.page === 'object'
        ? args.page.id
        : args.page,
    }

    return edit.definition.url
            .replace('{page}', parsedArgs.page.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PageController::edit
* @see app/Http/Controllers/Admin/PageController.php:36
* @route '/admin/pages/{page}/edit'
*/
edit.get = (args: { page: string | number | { id: string | number } } | [page: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PageController::edit
* @see app/Http/Controllers/Admin/PageController.php:36
* @route '/admin/pages/{page}/edit'
*/
edit.head = (args: { page: string | number | { id: string | number } } | [page: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PageController::edit
* @see app/Http/Controllers/Admin/PageController.php:36
* @route '/admin/pages/{page}/edit'
*/
const editForm = (args: { page: string | number | { id: string | number } } | [page: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PageController::edit
* @see app/Http/Controllers/Admin/PageController.php:36
* @route '/admin/pages/{page}/edit'
*/
editForm.get = (args: { page: string | number | { id: string | number } } | [page: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PageController::edit
* @see app/Http/Controllers/Admin/PageController.php:36
* @route '/admin/pages/{page}/edit'
*/
editForm.head = (args: { page: string | number | { id: string | number } } | [page: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Admin\PageController::update
* @see app/Http/Controllers/Admin/PageController.php:45
* @route '/admin/pages/{page}'
*/
export const update = (args: { page: string | number | { id: string | number } } | [page: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/pages/{page}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\PageController::update
* @see app/Http/Controllers/Admin/PageController.php:45
* @route '/admin/pages/{page}'
*/
update.url = (args: { page: string | number | { id: string | number } } | [page: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { page: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { page: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            page: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        page: typeof args.page === 'object'
        ? args.page.id
        : args.page,
    }

    return update.definition.url
            .replace('{page}', parsedArgs.page.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PageController::update
* @see app/Http/Controllers/Admin/PageController.php:45
* @route '/admin/pages/{page}'
*/
update.put = (args: { page: string | number | { id: string | number } } | [page: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\PageController::update
* @see app/Http/Controllers/Admin/PageController.php:45
* @route '/admin/pages/{page}'
*/
const updateForm = (args: { page: string | number | { id: string | number } } | [page: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PageController::update
* @see app/Http/Controllers/Admin/PageController.php:45
* @route '/admin/pages/{page}'
*/
updateForm.put = (args: { page: string | number | { id: string | number } } | [page: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Admin\PageController::destroy
* @see app/Http/Controllers/Admin/PageController.php:52
* @route '/admin/pages/{page}'
*/
export const destroy = (args: { page: string | number | { id: string | number } } | [page: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/pages/{page}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PageController::destroy
* @see app/Http/Controllers/Admin/PageController.php:52
* @route '/admin/pages/{page}'
*/
destroy.url = (args: { page: string | number | { id: string | number } } | [page: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { page: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { page: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            page: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        page: typeof args.page === 'object'
        ? args.page.id
        : args.page,
    }

    return destroy.definition.url
            .replace('{page}', parsedArgs.page.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PageController::destroy
* @see app/Http/Controllers/Admin/PageController.php:52
* @route '/admin/pages/{page}'
*/
destroy.delete = (args: { page: string | number | { id: string | number } } | [page: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\PageController::destroy
* @see app/Http/Controllers/Admin/PageController.php:52
* @route '/admin/pages/{page}'
*/
const destroyForm = (args: { page: string | number | { id: string | number } } | [page: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PageController::destroy
* @see app/Http/Controllers/Admin/PageController.php:52
* @route '/admin/pages/{page}'
*/
destroyForm.delete = (args: { page: string | number | { id: string | number } } | [page: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const PageController = { index, create, store, edit, update, destroy }

export default PageController