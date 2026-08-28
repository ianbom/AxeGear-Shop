import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ShipmentController::createFromOrder
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
export const createFromOrder = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createFromOrder.url(args, options),
    method: 'post',
})

createFromOrder.definition = {
    methods: ["post"],
    url: '/admin/orders/{order}/shipments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ShipmentController::createFromOrder
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
createFromOrder.url = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return createFromOrder.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ShipmentController::createFromOrder
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
createFromOrder.post = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createFromOrder.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ShipmentController::createFromOrder
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
const createFromOrderForm = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createFromOrder.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ShipmentController::createFromOrder
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
createFromOrderForm.post = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createFromOrder.url(args, options),
    method: 'post',
})

createFromOrder.form = createFromOrderForm

/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/shipments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ShipmentController::index
* @see app/Http/Controllers/Admin/ShipmentController.php:19
* @route '/admin/shipments'
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
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
export const show = (args: { shipment: string | number | { id: string | number } } | [shipment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/shipments/{shipment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
show.url = (args: { shipment: string | number | { id: string | number } } | [shipment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shipment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { shipment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            shipment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        shipment: typeof args.shipment === 'object'
        ? args.shipment.id
        : args.shipment,
    }

    return show.definition.url
            .replace('{shipment}', parsedArgs.shipment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
show.get = (args: { shipment: string | number | { id: string | number } } | [shipment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
show.head = (args: { shipment: string | number | { id: string | number } } | [shipment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
const showForm = (args: { shipment: string | number | { id: string | number } } | [shipment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
showForm.get = (args: { shipment: string | number | { id: string | number } } | [shipment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ShipmentController::show
* @see app/Http/Controllers/Admin/ShipmentController.php:24
* @route '/admin/shipments/{shipment}'
*/
showForm.head = (args: { shipment: string | number | { id: string | number } } | [shipment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ShipmentController::updateStatus
* @see app/Http/Controllers/Admin/ShipmentController.php:44
* @route '/admin/shipments/{shipment}/status'
*/
export const updateStatus = (args: { shipment: string | number | { id: string | number } } | [shipment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStatus.url(args, options),
    method: 'post',
})

updateStatus.definition = {
    methods: ["post"],
    url: '/admin/shipments/{shipment}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ShipmentController::updateStatus
* @see app/Http/Controllers/Admin/ShipmentController.php:44
* @route '/admin/shipments/{shipment}/status'
*/
updateStatus.url = (args: { shipment: string | number | { id: string | number } } | [shipment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shipment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { shipment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            shipment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        shipment: typeof args.shipment === 'object'
        ? args.shipment.id
        : args.shipment,
    }

    return updateStatus.definition.url
            .replace('{shipment}', parsedArgs.shipment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ShipmentController::updateStatus
* @see app/Http/Controllers/Admin/ShipmentController.php:44
* @route '/admin/shipments/{shipment}/status'
*/
updateStatus.post = (args: { shipment: string | number | { id: string | number } } | [shipment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStatus.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ShipmentController::updateStatus
* @see app/Http/Controllers/Admin/ShipmentController.php:44
* @route '/admin/shipments/{shipment}/status'
*/
const updateStatusForm = (args: { shipment: string | number | { id: string | number } } | [shipment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateStatus.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ShipmentController::updateStatus
* @see app/Http/Controllers/Admin/ShipmentController.php:44
* @route '/admin/shipments/{shipment}/status'
*/
updateStatusForm.post = (args: { shipment: string | number | { id: string | number } } | [shipment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateStatus.url(args, options),
    method: 'post',
})

updateStatus.form = updateStatusForm

/**
* @see \App\Http\Controllers\Admin\ShipmentController::refreshTracking
* @see app/Http/Controllers/Admin/ShipmentController.php:51
* @route '/admin/shipments/{shipment}/refresh-tracking'
*/
export const refreshTracking = (args: { shipment: string | number | { id: string | number } } | [shipment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refreshTracking.url(args, options),
    method: 'post',
})

refreshTracking.definition = {
    methods: ["post"],
    url: '/admin/shipments/{shipment}/refresh-tracking',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ShipmentController::refreshTracking
* @see app/Http/Controllers/Admin/ShipmentController.php:51
* @route '/admin/shipments/{shipment}/refresh-tracking'
*/
refreshTracking.url = (args: { shipment: string | number | { id: string | number } } | [shipment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shipment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { shipment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            shipment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        shipment: typeof args.shipment === 'object'
        ? args.shipment.id
        : args.shipment,
    }

    return refreshTracking.definition.url
            .replace('{shipment}', parsedArgs.shipment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ShipmentController::refreshTracking
* @see app/Http/Controllers/Admin/ShipmentController.php:51
* @route '/admin/shipments/{shipment}/refresh-tracking'
*/
refreshTracking.post = (args: { shipment: string | number | { id: string | number } } | [shipment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refreshTracking.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ShipmentController::refreshTracking
* @see app/Http/Controllers/Admin/ShipmentController.php:51
* @route '/admin/shipments/{shipment}/refresh-tracking'
*/
const refreshTrackingForm = (args: { shipment: string | number | { id: string | number } } | [shipment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: refreshTracking.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ShipmentController::refreshTracking
* @see app/Http/Controllers/Admin/ShipmentController.php:51
* @route '/admin/shipments/{shipment}/refresh-tracking'
*/
refreshTrackingForm.post = (args: { shipment: string | number | { id: string | number } } | [shipment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: refreshTracking.url(args, options),
    method: 'post',
})

refreshTracking.form = refreshTrackingForm

const ShipmentController = { createFromOrder, index, show, updateStatus, refreshTracking }

export default ShipmentController