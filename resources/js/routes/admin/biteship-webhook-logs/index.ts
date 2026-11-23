import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::index
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:13
* @route '/admin/biteship-webhook-logs'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/biteship-webhook-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::index
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:13
* @route '/admin/biteship-webhook-logs'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::index
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:13
* @route '/admin/biteship-webhook-logs'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::index
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:13
* @route '/admin/biteship-webhook-logs'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::index
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:13
* @route '/admin/biteship-webhook-logs'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::index
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:13
* @route '/admin/biteship-webhook-logs'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::index
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:13
* @route '/admin/biteship-webhook-logs'
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
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::show
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:18
* @route '/admin/biteship-webhook-logs/{biteshipWebhookLog}'
*/
export const show = (args: { biteshipWebhookLog: string | number | { id: string | number } } | [biteshipWebhookLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/biteship-webhook-logs/{biteshipWebhookLog}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::show
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:18
* @route '/admin/biteship-webhook-logs/{biteshipWebhookLog}'
*/
show.url = (args: { biteshipWebhookLog: string | number | { id: string | number } } | [biteshipWebhookLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { biteshipWebhookLog: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { biteshipWebhookLog: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            biteshipWebhookLog: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        biteshipWebhookLog: typeof args.biteshipWebhookLog === 'object'
        ? args.biteshipWebhookLog.id
        : args.biteshipWebhookLog,
    }

    return show.definition.url
            .replace('{biteshipWebhookLog}', parsedArgs.biteshipWebhookLog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::show
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:18
* @route '/admin/biteship-webhook-logs/{biteshipWebhookLog}'
*/
show.get = (args: { biteshipWebhookLog: string | number | { id: string | number } } | [biteshipWebhookLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::show
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:18
* @route '/admin/biteship-webhook-logs/{biteshipWebhookLog}'
*/
show.head = (args: { biteshipWebhookLog: string | number | { id: string | number } } | [biteshipWebhookLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::show
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:18
* @route '/admin/biteship-webhook-logs/{biteshipWebhookLog}'
*/
const showForm = (args: { biteshipWebhookLog: string | number | { id: string | number } } | [biteshipWebhookLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::show
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:18
* @route '/admin/biteship-webhook-logs/{biteshipWebhookLog}'
*/
showForm.get = (args: { biteshipWebhookLog: string | number | { id: string | number } } | [biteshipWebhookLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BiteshipWebhookLogController::show
* @see app/Http/Controllers/Admin/BiteshipWebhookLogController.php:18
* @route '/admin/biteship-webhook-logs/{biteshipWebhookLog}'
*/
showForm.head = (args: { biteshipWebhookLog: string | number | { id: string | number } } | [biteshipWebhookLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const biteshipWebhookLogs = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
}

export default biteshipWebhookLogs