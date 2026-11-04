import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\WishlistController::index
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/wishlist',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\WishlistController::index
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\WishlistController::index
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\WishlistController::index
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\WishlistController::index
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\WishlistController::index
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\WishlistController::index
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
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
* @see \App\Http\Controllers\Customer\WishlistController::destroyProduct
* @see app/Http/Controllers/Customer/WishlistController.php:46
* @route '/wishlist/products/{product}'
*/
export const destroyProduct = (args: { product: string | number | { id: string | number } } | [product: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyProduct.url(args, options),
    method: 'delete',
})

destroyProduct.definition = {
    methods: ["delete"],
    url: '/wishlist/products/{product}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Customer\WishlistController::destroyProduct
* @see app/Http/Controllers/Customer/WishlistController.php:46
* @route '/wishlist/products/{product}'
*/
destroyProduct.url = (args: { product: string | number | { id: string | number } } | [product: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return destroyProduct.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\WishlistController::destroyProduct
* @see app/Http/Controllers/Customer/WishlistController.php:46
* @route '/wishlist/products/{product}'
*/
destroyProduct.delete = (args: { product: string | number | { id: string | number } } | [product: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyProduct.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Customer\WishlistController::destroyProduct
* @see app/Http/Controllers/Customer/WishlistController.php:46
* @route '/wishlist/products/{product}'
*/
const destroyProductForm = (args: { product: string | number | { id: string | number } } | [product: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyProduct.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\WishlistController::destroyProduct
* @see app/Http/Controllers/Customer/WishlistController.php:46
* @route '/wishlist/products/{product}'
*/
destroyProductForm.delete = (args: { product: string | number | { id: string | number } } | [product: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyProduct.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyProduct.form = destroyProductForm

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

const WishlistController = { index, store, destroyProduct, destroy }

export default WishlistController