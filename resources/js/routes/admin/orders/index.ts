import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import shipments from './shipments'
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:16
* @route '/admin/orders'
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
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
export const show = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/orders/{order}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
show.url = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { order: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            order: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        order: typeof args.order === 'object'
        ? args.order.id
        : args.order,
    }

    return show.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
show.get = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
show.head = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
const showForm = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
showForm.get = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:21
* @route '/admin/orders/{order}'
*/
showForm.head = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:26
* @route '/admin/orders/{order}/status'
*/
export const status = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(args, options),
    method: 'post',
})

status.definition = {
    methods: ["post"],
    url: '/admin/orders/{order}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:26
* @route '/admin/orders/{order}/status'
*/
status.url = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { order: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            order: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        order: typeof args.order === 'object'
        ? args.order.id
        : args.order,
    }

    return status.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:26
* @route '/admin/orders/{order}/status'
*/
status.post = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:26
* @route '/admin/orders/{order}/status'
*/
const statusForm = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:26
* @route '/admin/orders/{order}/status'
*/
statusForm.post = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, options),
    method: 'post',
})

status.form = statusForm

/**
* @see \App\Http\Controllers\Admin\OrderController::notes
* @see app/Http/Controllers/Admin/OrderController.php:33
* @route '/admin/orders/{order}/notes'
*/
export const notes = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: notes.url(args, options),
    method: 'post',
})

notes.definition = {
    methods: ["post"],
    url: '/admin/orders/{order}/notes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::notes
* @see app/Http/Controllers/Admin/OrderController.php:33
* @route '/admin/orders/{order}/notes'
*/
notes.url = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { order: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            order: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        order: typeof args.order === 'object'
        ? args.order.id
        : args.order,
    }

    return notes.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::notes
* @see app/Http/Controllers/Admin/OrderController.php:33
* @route '/admin/orders/{order}/notes'
*/
notes.post = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: notes.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::notes
* @see app/Http/Controllers/Admin/OrderController.php:33
* @route '/admin/orders/{order}/notes'
*/
const notesForm = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: notes.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::notes
* @see app/Http/Controllers/Admin/OrderController.php:33
* @route '/admin/orders/{order}/notes'
*/
notesForm.post = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: notes.url(args, options),
    method: 'post',
})

notes.form = notesForm

const orders = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    status: Object.assign(status, status),
    notes: Object.assign(notes, notes),
    shipments: Object.assign(shipments, shipments),
}

export default orders