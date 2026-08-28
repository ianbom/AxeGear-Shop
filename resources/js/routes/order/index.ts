import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\OrderController::detail
* @see app/Http/Controllers/Customer/OrderController.php:20
* @route '/my-order/{order}'
*/
export const detail = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detail.url(args, options),
    method: 'get',
})

detail.definition = {
    methods: ["get","head"],
    url: '/my-order/{order}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\OrderController::detail
* @see app/Http/Controllers/Customer/OrderController.php:20
* @route '/my-order/{order}'
*/
detail.url = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return detail.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\OrderController::detail
* @see app/Http/Controllers/Customer/OrderController.php:20
* @route '/my-order/{order}'
*/
detail.get = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detail.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\OrderController::detail
* @see app/Http/Controllers/Customer/OrderController.php:20
* @route '/my-order/{order}'
*/
detail.head = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: detail.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\OrderController::detail
* @see app/Http/Controllers/Customer/OrderController.php:20
* @route '/my-order/{order}'
*/
const detailForm = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: detail.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\OrderController::detail
* @see app/Http/Controllers/Customer/OrderController.php:20
* @route '/my-order/{order}'
*/
detailForm.get = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: detail.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\OrderController::detail
* @see app/Http/Controllers/Customer/OrderController.php:20
* @route '/my-order/{order}'
*/
detailForm.head = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: detail.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

detail.form = detailForm

/**
* @see \App\Http\Controllers\Customer\OrderController::cancel
* @see app/Http/Controllers/Customer/OrderController.php:25
* @route '/my-order/{order}/cancel'
*/
export const cancel = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/my-order/{order}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\OrderController::cancel
* @see app/Http/Controllers/Customer/OrderController.php:25
* @route '/my-order/{order}/cancel'
*/
cancel.url = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return cancel.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\OrderController::cancel
* @see app/Http/Controllers/Customer/OrderController.php:25
* @route '/my-order/{order}/cancel'
*/
cancel.post = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\OrderController::cancel
* @see app/Http/Controllers/Customer/OrderController.php:25
* @route '/my-order/{order}/cancel'
*/
const cancelForm = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\OrderController::cancel
* @see app/Http/Controllers/Customer/OrderController.php:25
* @route '/my-order/{order}/cancel'
*/
cancelForm.post = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(args, options),
    method: 'post',
})

cancel.form = cancelForm

const order = {
    detail: Object.assign(detail, detail),
    cancel: Object.assign(cancel, cancel),
}

export default order