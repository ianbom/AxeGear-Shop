import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\BannerController::index
* @see app/Http/Controllers/Admin/BannerController.php:15
* @route '/admin/banners'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/banners',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BannerController::index
* @see app/Http/Controllers/Admin/BannerController.php:15
* @route '/admin/banners'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BannerController::index
* @see app/Http/Controllers/Admin/BannerController.php:15
* @route '/admin/banners'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::index
* @see app/Http/Controllers/Admin/BannerController.php:15
* @route '/admin/banners'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::index
* @see app/Http/Controllers/Admin/BannerController.php:15
* @route '/admin/banners'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::index
* @see app/Http/Controllers/Admin/BannerController.php:15
* @route '/admin/banners'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::index
* @see app/Http/Controllers/Admin/BannerController.php:15
* @route '/admin/banners'
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
* @see \App\Http\Controllers\Admin\BannerController::create
* @see app/Http/Controllers/Admin/BannerController.php:20
* @route '/admin/banners/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/banners/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BannerController::create
* @see app/Http/Controllers/Admin/BannerController.php:20
* @route '/admin/banners/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BannerController::create
* @see app/Http/Controllers/Admin/BannerController.php:20
* @route '/admin/banners/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::create
* @see app/Http/Controllers/Admin/BannerController.php:20
* @route '/admin/banners/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::create
* @see app/Http/Controllers/Admin/BannerController.php:20
* @route '/admin/banners/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::create
* @see app/Http/Controllers/Admin/BannerController.php:20
* @route '/admin/banners/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::create
* @see app/Http/Controllers/Admin/BannerController.php:20
* @route '/admin/banners/create'
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
* @see \App\Http\Controllers\Admin\BannerController::store
* @see app/Http/Controllers/Admin/BannerController.php:29
* @route '/admin/banners'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/banners',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\BannerController::store
* @see app/Http/Controllers/Admin/BannerController.php:29
* @route '/admin/banners'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BannerController::store
* @see app/Http/Controllers/Admin/BannerController.php:29
* @route '/admin/banners'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::store
* @see app/Http/Controllers/Admin/BannerController.php:29
* @route '/admin/banners'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::store
* @see app/Http/Controllers/Admin/BannerController.php:29
* @route '/admin/banners'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\BannerController::edit
* @see app/Http/Controllers/Admin/BannerController.php:36
* @route '/admin/banners/{banner}/edit'
*/
export const edit = (args: { banner: string | number | { id: string | number } } | [banner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/banners/{banner}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BannerController::edit
* @see app/Http/Controllers/Admin/BannerController.php:36
* @route '/admin/banners/{banner}/edit'
*/
edit.url = (args: { banner: string | number | { id: string | number } } | [banner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { banner: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { banner: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            banner: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        banner: typeof args.banner === 'object'
        ? args.banner.id
        : args.banner,
    }

    return edit.definition.url
            .replace('{banner}', parsedArgs.banner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BannerController::edit
* @see app/Http/Controllers/Admin/BannerController.php:36
* @route '/admin/banners/{banner}/edit'
*/
edit.get = (args: { banner: string | number | { id: string | number } } | [banner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::edit
* @see app/Http/Controllers/Admin/BannerController.php:36
* @route '/admin/banners/{banner}/edit'
*/
edit.head = (args: { banner: string | number | { id: string | number } } | [banner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::edit
* @see app/Http/Controllers/Admin/BannerController.php:36
* @route '/admin/banners/{banner}/edit'
*/
const editForm = (args: { banner: string | number | { id: string | number } } | [banner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::edit
* @see app/Http/Controllers/Admin/BannerController.php:36
* @route '/admin/banners/{banner}/edit'
*/
editForm.get = (args: { banner: string | number | { id: string | number } } | [banner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::edit
* @see app/Http/Controllers/Admin/BannerController.php:36
* @route '/admin/banners/{banner}/edit'
*/
editForm.head = (args: { banner: string | number | { id: string | number } } | [banner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\BannerController::update
* @see app/Http/Controllers/Admin/BannerController.php:45
* @route '/admin/banners/{banner}'
*/
export const update = (args: { banner: string | number | { id: string | number } } | [banner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/banners/{banner}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\BannerController::update
* @see app/Http/Controllers/Admin/BannerController.php:45
* @route '/admin/banners/{banner}'
*/
update.url = (args: { banner: string | number | { id: string | number } } | [banner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { banner: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { banner: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            banner: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        banner: typeof args.banner === 'object'
        ? args.banner.id
        : args.banner,
    }

    return update.definition.url
            .replace('{banner}', parsedArgs.banner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BannerController::update
* @see app/Http/Controllers/Admin/BannerController.php:45
* @route '/admin/banners/{banner}'
*/
update.put = (args: { banner: string | number | { id: string | number } } | [banner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::update
* @see app/Http/Controllers/Admin/BannerController.php:45
* @route '/admin/banners/{banner}'
*/
const updateForm = (args: { banner: string | number | { id: string | number } } | [banner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::update
* @see app/Http/Controllers/Admin/BannerController.php:45
* @route '/admin/banners/{banner}'
*/
updateForm.put = (args: { banner: string | number | { id: string | number } } | [banner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\BannerController::destroy
* @see app/Http/Controllers/Admin/BannerController.php:52
* @route '/admin/banners/{banner}'
*/
export const destroy = (args: { banner: string | number | { id: string | number } } | [banner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/banners/{banner}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\BannerController::destroy
* @see app/Http/Controllers/Admin/BannerController.php:52
* @route '/admin/banners/{banner}'
*/
destroy.url = (args: { banner: string | number | { id: string | number } } | [banner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { banner: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { banner: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            banner: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        banner: typeof args.banner === 'object'
        ? args.banner.id
        : args.banner,
    }

    return destroy.definition.url
            .replace('{banner}', parsedArgs.banner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BannerController::destroy
* @see app/Http/Controllers/Admin/BannerController.php:52
* @route '/admin/banners/{banner}'
*/
destroy.delete = (args: { banner: string | number | { id: string | number } } | [banner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::destroy
* @see app/Http/Controllers/Admin/BannerController.php:52
* @route '/admin/banners/{banner}'
*/
const destroyForm = (args: { banner: string | number | { id: string | number } } | [banner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\BannerController::destroy
* @see app/Http/Controllers/Admin/BannerController.php:52
* @route '/admin/banners/{banner}'
*/
destroyForm.delete = (args: { banner: string | number | { id: string | number } } | [banner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const BannerController = { index, create, store, edit, update, destroy }

export default BannerController