import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import items from './items'
/**
* @see \App\Http\Controllers\Customer\CartController::addProductVariant
* @see app/Http/Controllers/Customer/CartController.php:23
* @route '/product-variants/{productVariant}/add-to-cart'
*/
export const addProductVariant = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addProductVariant.url(args, options),
    method: 'post',
})

addProductVariant.definition = {
    methods: ["post"],
    url: '/product-variants/{productVariant}/add-to-cart',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\CartController::addProductVariant
* @see app/Http/Controllers/Customer/CartController.php:23
* @route '/product-variants/{productVariant}/add-to-cart'
*/
addProductVariant.url = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return addProductVariant.definition.url
            .replace('{productVariant}', parsedArgs.productVariant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CartController::addProductVariant
* @see app/Http/Controllers/Customer/CartController.php:23
* @route '/product-variants/{productVariant}/add-to-cart'
*/
addProductVariant.post = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addProductVariant.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CartController::addProductVariant
* @see app/Http/Controllers/Customer/CartController.php:23
* @route '/product-variants/{productVariant}/add-to-cart'
*/
const addProductVariantForm = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addProductVariant.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CartController::addProductVariant
* @see app/Http/Controllers/Customer/CartController.php:23
* @route '/product-variants/{productVariant}/add-to-cart'
*/
addProductVariantForm.post = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addProductVariant.url(args, options),
    method: 'post',
})

addProductVariant.form = addProductVariantForm

const cart = {
    addProductVariant: Object.assign(addProductVariant, addProductVariant),
    items: Object.assign(items, items),
}

export default cart