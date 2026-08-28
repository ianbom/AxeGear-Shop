import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
* @see app/Http/Controllers/Admin/AdminUserController.php:16
* @route '/admin/admin-users'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/admin-users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
* @see app/Http/Controllers/Admin/AdminUserController.php:16
* @route '/admin/admin-users'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
* @see app/Http/Controllers/Admin/AdminUserController.php:16
* @route '/admin/admin-users'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
* @see app/Http/Controllers/Admin/AdminUserController.php:16
* @route '/admin/admin-users'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
* @see app/Http/Controllers/Admin/AdminUserController.php:16
* @route '/admin/admin-users'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
* @see app/Http/Controllers/Admin/AdminUserController.php:16
* @route '/admin/admin-users'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AdminUserController::index
* @see app/Http/Controllers/Admin/AdminUserController.php:16
* @route '/admin/admin-users'
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
* @see \App\Http\Controllers\Admin\AdminUserController::create
* @see app/Http/Controllers/Admin/AdminUserController.php:21
* @route '/admin/admin-users/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/admin-users/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminUserController::create
* @see app/Http/Controllers/Admin/AdminUserController.php:21
* @route '/admin/admin-users/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminUserController::create
* @see app/Http/Controllers/Admin/AdminUserController.php:21
* @route '/admin/admin-users/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AdminUserController::create
* @see app/Http/Controllers/Admin/AdminUserController.php:21
* @route '/admin/admin-users/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AdminUserController::create
* @see app/Http/Controllers/Admin/AdminUserController.php:21
* @route '/admin/admin-users/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AdminUserController::create
* @see app/Http/Controllers/Admin/AdminUserController.php:21
* @route '/admin/admin-users/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AdminUserController::create
* @see app/Http/Controllers/Admin/AdminUserController.php:21
* @route '/admin/admin-users/create'
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
* @see \App\Http\Controllers\Admin\AdminUserController::store
* @see app/Http/Controllers/Admin/AdminUserController.php:29
* @route '/admin/admin-users'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/admin-users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminUserController::store
* @see app/Http/Controllers/Admin/AdminUserController.php:29
* @route '/admin/admin-users'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminUserController::store
* @see app/Http/Controllers/Admin/AdminUserController.php:29
* @route '/admin/admin-users'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminUserController::store
* @see app/Http/Controllers/Admin/AdminUserController.php:29
* @route '/admin/admin-users'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminUserController::store
* @see app/Http/Controllers/Admin/AdminUserController.php:29
* @route '/admin/admin-users'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\AdminUserController::edit
* @see app/Http/Controllers/Admin/AdminUserController.php:38
* @route '/admin/admin-users/{adminUser}/edit'
*/
export const edit = (args: { adminUser: string | number | { id: string | number } } | [adminUser: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/admin-users/{adminUser}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminUserController::edit
* @see app/Http/Controllers/Admin/AdminUserController.php:38
* @route '/admin/admin-users/{adminUser}/edit'
*/
edit.url = (args: { adminUser: string | number | { id: string | number } } | [adminUser: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { adminUser: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { adminUser: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            adminUser: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        adminUser: typeof args.adminUser === 'object'
        ? args.adminUser.id
        : args.adminUser,
    }

    return edit.definition.url
            .replace('{adminUser}', parsedArgs.adminUser.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminUserController::edit
* @see app/Http/Controllers/Admin/AdminUserController.php:38
* @route '/admin/admin-users/{adminUser}/edit'
*/
edit.get = (args: { adminUser: string | number | { id: string | number } } | [adminUser: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AdminUserController::edit
* @see app/Http/Controllers/Admin/AdminUserController.php:38
* @route '/admin/admin-users/{adminUser}/edit'
*/
edit.head = (args: { adminUser: string | number | { id: string | number } } | [adminUser: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AdminUserController::edit
* @see app/Http/Controllers/Admin/AdminUserController.php:38
* @route '/admin/admin-users/{adminUser}/edit'
*/
const editForm = (args: { adminUser: string | number | { id: string | number } } | [adminUser: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AdminUserController::edit
* @see app/Http/Controllers/Admin/AdminUserController.php:38
* @route '/admin/admin-users/{adminUser}/edit'
*/
editForm.get = (args: { adminUser: string | number | { id: string | number } } | [adminUser: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AdminUserController::edit
* @see app/Http/Controllers/Admin/AdminUserController.php:38
* @route '/admin/admin-users/{adminUser}/edit'
*/
editForm.head = (args: { adminUser: string | number | { id: string | number } } | [adminUser: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\AdminUserController::update
* @see app/Http/Controllers/Admin/AdminUserController.php:46
* @route '/admin/admin-users/{adminUser}'
*/
export const update = (args: { adminUser: string | number | { id: string | number } } | [adminUser: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/admin-users/{adminUser}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AdminUserController::update
* @see app/Http/Controllers/Admin/AdminUserController.php:46
* @route '/admin/admin-users/{adminUser}'
*/
update.url = (args: { adminUser: string | number | { id: string | number } } | [adminUser: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { adminUser: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { adminUser: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            adminUser: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        adminUser: typeof args.adminUser === 'object'
        ? args.adminUser.id
        : args.adminUser,
    }

    return update.definition.url
            .replace('{adminUser}', parsedArgs.adminUser.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminUserController::update
* @see app/Http/Controllers/Admin/AdminUserController.php:46
* @route '/admin/admin-users/{adminUser}'
*/
update.put = (args: { adminUser: string | number | { id: string | number } } | [adminUser: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\AdminUserController::update
* @see app/Http/Controllers/Admin/AdminUserController.php:46
* @route '/admin/admin-users/{adminUser}'
*/
const updateForm = (args: { adminUser: string | number | { id: string | number } } | [adminUser: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminUserController::update
* @see app/Http/Controllers/Admin/AdminUserController.php:46
* @route '/admin/admin-users/{adminUser}'
*/
updateForm.put = (args: { adminUser: string | number | { id: string | number } } | [adminUser: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const adminUsers = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
}

export default adminUsers