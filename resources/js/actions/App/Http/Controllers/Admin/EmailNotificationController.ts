import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::index
* @see app/Http/Controllers/Admin/EmailNotificationController.php:17
* @route '/admin/email-notifications'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/email-notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::index
* @see app/Http/Controllers/Admin/EmailNotificationController.php:17
* @route '/admin/email-notifications'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::index
* @see app/Http/Controllers/Admin/EmailNotificationController.php:17
* @route '/admin/email-notifications'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::index
* @see app/Http/Controllers/Admin/EmailNotificationController.php:17
* @route '/admin/email-notifications'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::index
* @see app/Http/Controllers/Admin/EmailNotificationController.php:17
* @route '/admin/email-notifications'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::index
* @see app/Http/Controllers/Admin/EmailNotificationController.php:17
* @route '/admin/email-notifications'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::index
* @see app/Http/Controllers/Admin/EmailNotificationController.php:17
* @route '/admin/email-notifications'
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
* @see \App\Http\Controllers\Admin\EmailNotificationController::create
* @see app/Http/Controllers/Admin/EmailNotificationController.php:29
* @route '/admin/email-notifications/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/email-notifications/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::create
* @see app/Http/Controllers/Admin/EmailNotificationController.php:29
* @route '/admin/email-notifications/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::create
* @see app/Http/Controllers/Admin/EmailNotificationController.php:29
* @route '/admin/email-notifications/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::create
* @see app/Http/Controllers/Admin/EmailNotificationController.php:29
* @route '/admin/email-notifications/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::create
* @see app/Http/Controllers/Admin/EmailNotificationController.php:29
* @route '/admin/email-notifications/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::create
* @see app/Http/Controllers/Admin/EmailNotificationController.php:29
* @route '/admin/email-notifications/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::create
* @see app/Http/Controllers/Admin/EmailNotificationController.php:29
* @route '/admin/email-notifications/create'
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
* @see \App\Http\Controllers\Admin\EmailNotificationController::store
* @see app/Http/Controllers/Admin/EmailNotificationController.php:34
* @route '/admin/email-notifications'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/email-notifications',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::store
* @see app/Http/Controllers/Admin/EmailNotificationController.php:34
* @route '/admin/email-notifications'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::store
* @see app/Http/Controllers/Admin/EmailNotificationController.php:34
* @route '/admin/email-notifications'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::store
* @see app/Http/Controllers/Admin/EmailNotificationController.php:34
* @route '/admin/email-notifications'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::store
* @see app/Http/Controllers/Admin/EmailNotificationController.php:34
* @route '/admin/email-notifications'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::edit
* @see app/Http/Controllers/Admin/EmailNotificationController.php:41
* @route '/admin/email-notifications/{emailNotification}/edit'
*/
export const edit = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/email-notifications/{emailNotification}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::edit
* @see app/Http/Controllers/Admin/EmailNotificationController.php:41
* @route '/admin/email-notifications/{emailNotification}/edit'
*/
edit.url = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { emailNotification: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { emailNotification: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            emailNotification: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        emailNotification: typeof args.emailNotification === 'object'
        ? args.emailNotification.id
        : args.emailNotification,
    }

    return edit.definition.url
            .replace('{emailNotification}', parsedArgs.emailNotification.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::edit
* @see app/Http/Controllers/Admin/EmailNotificationController.php:41
* @route '/admin/email-notifications/{emailNotification}/edit'
*/
edit.get = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::edit
* @see app/Http/Controllers/Admin/EmailNotificationController.php:41
* @route '/admin/email-notifications/{emailNotification}/edit'
*/
edit.head = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::edit
* @see app/Http/Controllers/Admin/EmailNotificationController.php:41
* @route '/admin/email-notifications/{emailNotification}/edit'
*/
const editForm = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::edit
* @see app/Http/Controllers/Admin/EmailNotificationController.php:41
* @route '/admin/email-notifications/{emailNotification}/edit'
*/
editForm.get = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::edit
* @see app/Http/Controllers/Admin/EmailNotificationController.php:41
* @route '/admin/email-notifications/{emailNotification}/edit'
*/
editForm.head = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\EmailNotificationController::update
* @see app/Http/Controllers/Admin/EmailNotificationController.php:46
* @route '/admin/email-notifications/{emailNotification}'
*/
export const update = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/email-notifications/{emailNotification}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::update
* @see app/Http/Controllers/Admin/EmailNotificationController.php:46
* @route '/admin/email-notifications/{emailNotification}'
*/
update.url = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { emailNotification: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { emailNotification: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            emailNotification: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        emailNotification: typeof args.emailNotification === 'object'
        ? args.emailNotification.id
        : args.emailNotification,
    }

    return update.definition.url
            .replace('{emailNotification}', parsedArgs.emailNotification.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::update
* @see app/Http/Controllers/Admin/EmailNotificationController.php:46
* @route '/admin/email-notifications/{emailNotification}'
*/
update.put = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::update
* @see app/Http/Controllers/Admin/EmailNotificationController.php:46
* @route '/admin/email-notifications/{emailNotification}'
*/
update.patch = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::update
* @see app/Http/Controllers/Admin/EmailNotificationController.php:46
* @route '/admin/email-notifications/{emailNotification}'
*/
const updateForm = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::update
* @see app/Http/Controllers/Admin/EmailNotificationController.php:46
* @route '/admin/email-notifications/{emailNotification}'
*/
updateForm.put = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::update
* @see app/Http/Controllers/Admin/EmailNotificationController.php:46
* @route '/admin/email-notifications/{emailNotification}'
*/
updateForm.patch = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::destroy
* @see app/Http/Controllers/Admin/EmailNotificationController.php:53
* @route '/admin/email-notifications/{emailNotification}'
*/
export const destroy = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/email-notifications/{emailNotification}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::destroy
* @see app/Http/Controllers/Admin/EmailNotificationController.php:53
* @route '/admin/email-notifications/{emailNotification}'
*/
destroy.url = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { emailNotification: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { emailNotification: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            emailNotification: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        emailNotification: typeof args.emailNotification === 'object'
        ? args.emailNotification.id
        : args.emailNotification,
    }

    return destroy.definition.url
            .replace('{emailNotification}', parsedArgs.emailNotification.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::destroy
* @see app/Http/Controllers/Admin/EmailNotificationController.php:53
* @route '/admin/email-notifications/{emailNotification}'
*/
destroy.delete = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::destroy
* @see app/Http/Controllers/Admin/EmailNotificationController.php:53
* @route '/admin/email-notifications/{emailNotification}'
*/
const destroyForm = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EmailNotificationController::destroy
* @see app/Http/Controllers/Admin/EmailNotificationController.php:53
* @route '/admin/email-notifications/{emailNotification}'
*/
destroyForm.delete = (args: { emailNotification: string | number | { id: string | number } } | [emailNotification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const EmailNotificationController = { index, create, store, edit, update, destroy }

export default EmailNotificationController