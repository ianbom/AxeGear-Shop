import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ShipmentController::store
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
export const store = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/orders/{order}/shipments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ShipmentController::store
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
store.url = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ShipmentController::store
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
store.post = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ShipmentController::store
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
const storeForm = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ShipmentController::store
* @see app/Http/Controllers/Admin/ShipmentController.php:29
* @route '/admin/orders/{order}/shipments'
*/
storeForm.post = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

const shipments = {
    store: Object.assign(store, store),
}

export default shipments