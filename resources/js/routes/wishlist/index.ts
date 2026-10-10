import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import products from './products'
/**
* @see \App\Http\Controllers\Customer\WishlistController::store
* @see app/Http/Controllers/Customer/WishlistController.php:29
* @route '/wishlist/{product}'
*/
export const store = (args: { product: string | number | { id: string | number } } | [product: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/wishlist/{product}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\WishlistController::store
* @see app/Http/Controllers/Customer/WishlistController.php:29
* @route '/wishlist/{product}'
*/
store.url = (args: { product: string | number | { id: string | number } } | [product: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { product: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            product: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        product: typeof args.product === 'object'
        ? args.product.id
        : args.product,
    }

    return store.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\WishlistController::store
* @see app/Http/Controllers/Customer/WishlistController.php:29
* @route '/wishlist/{product}'
*/
store.post = (args: { product: string | number | { id: string | number } } | [product: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\WishlistController::store
* @see app/Http/Controllers/Customer/WishlistController.php:29
* @route '/wishlist/{product}'
*/
const storeForm = (args: { product: string | number | { id: string | number } } | [product: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\WishlistController::store
* @see app/Http/Controllers/Customer/WishlistController.php:29
* @route '/wishlist/{product}'
*/
storeForm.post = (args: { product: string | number | { id: string | number } } | [product: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Customer\WishlistController::destroy
* @see app/Http/Controllers/Customer/WishlistController.php:22
* @route '/wishlist/{wishlist}'
*/
export const destroy = (args: { wishlist: string | number | { id: string | number } } | [wishlist: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/wishlist/{wishlist}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Customer\WishlistController::destroy
* @see app/Http/Controllers/Customer/WishlistController.php:22
* @route '/wishlist/{wishlist}'
*/
destroy.url = (args: { wishlist: string | number | { id: string | number } } | [wishlist: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { wishlist: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { wishlist: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            wishlist: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        wishlist: typeof args.wishlist === 'object'
        ? args.wishlist.id
        : args.wishlist,
    }

    return destroy.definition.url
            .replace('{wishlist}', parsedArgs.wishlist.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\WishlistController::destroy
* @see app/Http/Controllers/Customer/WishlistController.php:22
* @route '/wishlist/{wishlist}'
*/
destroy.delete = (args: { wishlist: string | number | { id: string | number } } | [wishlist: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Customer\WishlistController::destroy
* @see app/Http/Controllers/Customer/WishlistController.php:22
* @route '/wishlist/{wishlist}'
*/
const destroyForm = (args: { wishlist: string | number | { id: string | number } } | [wishlist: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\WishlistController::destroy
* @see app/Http/Controllers/Customer/WishlistController.php:22
* @route '/wishlist/{wishlist}'
*/
destroyForm.delete = (args: { wishlist: string | number | { id: string | number } } | [wishlist: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const wishlist = {
    store: Object.assign(store, store),
    products: Object.assign(products, products),
    destroy: Object.assign(destroy, destroy),
}

export default wishlist