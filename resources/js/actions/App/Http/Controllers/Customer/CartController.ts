import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\CartController::index
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/my-cart',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\CartController::index
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CartController::index
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\CartController::index
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\CartController::index
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\CartController::index
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\CartController::index
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
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
* @see \App\Http\Controllers\Customer\CartController::addProductVariantToCart
* @see app/Http/Controllers/Customer/CartController.php:23
* @route '/product-variants/{productVariant}/add-to-cart'
*/
export const addProductVariantToCart = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addProductVariantToCart.url(args, options),
    method: 'post',
})

addProductVariantToCart.definition = {
    methods: ["post"],
    url: '/product-variants/{productVariant}/add-to-cart',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\CartController::addProductVariantToCart
* @see app/Http/Controllers/Customer/CartController.php:23
* @route '/product-variants/{productVariant}/add-to-cart'
*/
addProductVariantToCart.url = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return addProductVariantToCart.definition.url
            .replace('{productVariant}', parsedArgs.productVariant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CartController::addProductVariantToCart
* @see app/Http/Controllers/Customer/CartController.php:23
* @route '/product-variants/{productVariant}/add-to-cart'
*/
addProductVariantToCart.post = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addProductVariantToCart.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CartController::addProductVariantToCart
* @see app/Http/Controllers/Customer/CartController.php:23
* @route '/product-variants/{productVariant}/add-to-cart'
*/
const addProductVariantToCartForm = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addProductVariantToCart.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CartController::addProductVariantToCart
* @see app/Http/Controllers/Customer/CartController.php:23
* @route '/product-variants/{productVariant}/add-to-cart'
*/
addProductVariantToCartForm.post = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addProductVariantToCart.url(args, options),
    method: 'post',
})

addProductVariantToCart.form = addProductVariantToCartForm

/**
* @see \App\Http\Controllers\Customer\CartController::updateCartItemQuantity
* @see app/Http/Controllers/Customer/CartController.php:37
* @route '/cart-items/{cartItem}'
*/
export const updateCartItemQuantity = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateCartItemQuantity.url(args, options),
    method: 'patch',
})

updateCartItemQuantity.definition = {
    methods: ["patch"],
    url: '/cart-items/{cartItem}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Customer\CartController::updateCartItemQuantity
* @see app/Http/Controllers/Customer/CartController.php:37
* @route '/cart-items/{cartItem}'
*/
updateCartItemQuantity.url = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cartItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cartItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cartItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cartItem: typeof args.cartItem === 'object'
        ? args.cartItem.id
        : args.cartItem,
    }

    return updateCartItemQuantity.definition.url
            .replace('{cartItem}', parsedArgs.cartItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CartController::updateCartItemQuantity
* @see app/Http/Controllers/Customer/CartController.php:37
* @route '/cart-items/{cartItem}'
*/
updateCartItemQuantity.patch = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateCartItemQuantity.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Customer\CartController::updateCartItemQuantity
* @see app/Http/Controllers/Customer/CartController.php:37
* @route '/cart-items/{cartItem}'
*/
const updateCartItemQuantityForm = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateCartItemQuantity.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CartController::updateCartItemQuantity
* @see app/Http/Controllers/Customer/CartController.php:37
* @route '/cart-items/{cartItem}'
*/
updateCartItemQuantityForm.patch = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateCartItemQuantity.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateCartItemQuantity.form = updateCartItemQuantityForm

/**
* @see \App\Http\Controllers\Customer\CartController::removeCartItem
* @see app/Http/Controllers/Customer/CartController.php:51
* @route '/cart-items/{cartItem}'
*/
export const removeCartItem = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeCartItem.url(args, options),
    method: 'delete',
})

removeCartItem.definition = {
    methods: ["delete"],
    url: '/cart-items/{cartItem}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Customer\CartController::removeCartItem
* @see app/Http/Controllers/Customer/CartController.php:51
* @route '/cart-items/{cartItem}'
*/
removeCartItem.url = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cartItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cartItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cartItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cartItem: typeof args.cartItem === 'object'
        ? args.cartItem.id
        : args.cartItem,
    }

    return removeCartItem.definition.url
            .replace('{cartItem}', parsedArgs.cartItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CartController::removeCartItem
* @see app/Http/Controllers/Customer/CartController.php:51
* @route '/cart-items/{cartItem}'
*/
removeCartItem.delete = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeCartItem.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Customer\CartController::removeCartItem
* @see app/Http/Controllers/Customer/CartController.php:51
* @route '/cart-items/{cartItem}'
*/
const removeCartItemForm = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: removeCartItem.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CartController::removeCartItem
* @see app/Http/Controllers/Customer/CartController.php:51
* @route '/cart-items/{cartItem}'
*/
removeCartItemForm.delete = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: removeCartItem.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

removeCartItem.form = removeCartItemForm

const CartController = { index, addProductVariantToCart, updateCartItemQuantity, removeCartItem }

export default CartController