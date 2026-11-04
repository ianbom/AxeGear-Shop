import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\CartController::update
* @see app/Http/Controllers/Customer/CartController.php:37
* @route '/cart-items/{cartItem}'
*/
export const update = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/cart-items/{cartItem}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Customer\CartController::update
* @see app/Http/Controllers/Customer/CartController.php:37
* @route '/cart-items/{cartItem}'
*/
update.url = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{cartItem}', parsedArgs.cartItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CartController::update
* @see app/Http/Controllers/Customer/CartController.php:37
* @route '/cart-items/{cartItem}'
*/
update.patch = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Customer\CartController::update
* @see app/Http/Controllers/Customer/CartController.php:37
* @route '/cart-items/{cartItem}'
*/
const updateForm = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CartController::update
* @see app/Http/Controllers/Customer/CartController.php:37
* @route '/cart-items/{cartItem}'
*/
updateForm.patch = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Customer\CartController::destroy
* @see app/Http/Controllers/Customer/CartController.php:51
* @route '/cart-items/{cartItem}'
*/
export const destroy = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/cart-items/{cartItem}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Customer\CartController::destroy
* @see app/Http/Controllers/Customer/CartController.php:51
* @route '/cart-items/{cartItem}'
*/
destroy.url = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{cartItem}', parsedArgs.cartItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CartController::destroy
* @see app/Http/Controllers/Customer/CartController.php:51
* @route '/cart-items/{cartItem}'
*/
destroy.delete = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Customer\CartController::destroy
* @see app/Http/Controllers/Customer/CartController.php:51
* @route '/cart-items/{cartItem}'
*/
const destroyForm = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CartController::destroy
* @see app/Http/Controllers/Customer/CartController.php:51
* @route '/cart-items/{cartItem}'
*/
destroyForm.delete = (args: { cartItem: string | number | { id: string | number } } | [cartItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const items = {
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default items