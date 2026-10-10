import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\StockController::update
* @see app/Http/Controllers/Admin/StockController.php:32
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
export const update = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/admin/product-variants/{productVariant}/stock-adjustment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\StockController::update
* @see app/Http/Controllers/Admin/StockController.php:32
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
update.url = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { productVariant: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { productVariant: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            productVariant: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        productVariant: typeof args.productVariant === 'object'
        ? args.productVariant.id
        : args.productVariant,
    }

    return update.definition.url
            .replace('{productVariant}', parsedArgs.productVariant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StockController::update
* @see app/Http/Controllers/Admin/StockController.php:32
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
update.post = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\StockController::update
* @see app/Http/Controllers/Admin/StockController.php:32
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
const updateForm = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\StockController::update
* @see app/Http/Controllers/Admin/StockController.php:32
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
updateForm.post = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

update.form = updateForm

const stockAdjustment = {
    update: Object.assign(update, update),
}

export default stockAdjustment