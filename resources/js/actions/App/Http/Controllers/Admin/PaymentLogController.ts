import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PaymentLogController::index
* @see app/Http/Controllers/Admin/PaymentLogController.php:13
* @route '/admin/payment-logs'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/payment-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PaymentLogController::index
* @see app/Http/Controllers/Admin/PaymentLogController.php:13
* @route '/admin/payment-logs'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PaymentLogController::index
* @see app/Http/Controllers/Admin/PaymentLogController.php:13
* @route '/admin/payment-logs'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PaymentLogController::index
* @see app/Http/Controllers/Admin/PaymentLogController.php:13
* @route '/admin/payment-logs'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PaymentLogController::index
* @see app/Http/Controllers/Admin/PaymentLogController.php:13
* @route '/admin/payment-logs'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PaymentLogController::index
* @see app/Http/Controllers/Admin/PaymentLogController.php:13
* @route '/admin/payment-logs'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PaymentLogController::index
* @see app/Http/Controllers/Admin/PaymentLogController.php:13
* @route '/admin/payment-logs'
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
* @see \App\Http\Controllers\Admin\PaymentLogController::show
* @see app/Http/Controllers/Admin/PaymentLogController.php:18
* @route '/admin/payment-logs/{paymentLog}'
*/
export const show = (args: { paymentLog: string | number | { id: string | number } } | [paymentLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/payment-logs/{paymentLog}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PaymentLogController::show
* @see app/Http/Controllers/Admin/PaymentLogController.php:18
* @route '/admin/payment-logs/{paymentLog}'
*/
show.url = (args: { paymentLog: string | number | { id: string | number } } | [paymentLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { paymentLog: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { paymentLog: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            paymentLog: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        paymentLog: typeof args.paymentLog === 'object'
        ? args.paymentLog.id
        : args.paymentLog,
    }

    return show.definition.url
            .replace('{paymentLog}', parsedArgs.paymentLog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PaymentLogController::show
* @see app/Http/Controllers/Admin/PaymentLogController.php:18
* @route '/admin/payment-logs/{paymentLog}'
*/
show.get = (args: { paymentLog: string | number | { id: string | number } } | [paymentLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PaymentLogController::show
* @see app/Http/Controllers/Admin/PaymentLogController.php:18
* @route '/admin/payment-logs/{paymentLog}'
*/
show.head = (args: { paymentLog: string | number | { id: string | number } } | [paymentLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PaymentLogController::show
* @see app/Http/Controllers/Admin/PaymentLogController.php:18
* @route '/admin/payment-logs/{paymentLog}'
*/
const showForm = (args: { paymentLog: string | number | { id: string | number } } | [paymentLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PaymentLogController::show
* @see app/Http/Controllers/Admin/PaymentLogController.php:18
* @route '/admin/payment-logs/{paymentLog}'
*/
showForm.get = (args: { paymentLog: string | number | { id: string | number } } | [paymentLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PaymentLogController::show
* @see app/Http/Controllers/Admin/PaymentLogController.php:18
* @route '/admin/payment-logs/{paymentLog}'
*/
showForm.head = (args: { paymentLog: string | number | { id: string | number } } | [paymentLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const PaymentLogController = { index, show }

export default PaymentLogController