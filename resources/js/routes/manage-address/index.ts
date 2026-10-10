import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\AddressController::store
* @see app/Http/Controllers/Customer/AddressController.php:22
* @route '/address'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/address',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\AddressController::store
* @see app/Http/Controllers/Customer/AddressController.php:22
* @route '/address'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\AddressController::store
* @see app/Http/Controllers/Customer/AddressController.php:22
* @route '/address'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\AddressController::store
* @see app/Http/Controllers/Customer/AddressController.php:22
* @route '/address'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\AddressController::store
* @see app/Http/Controllers/Customer/AddressController.php:22
* @route '/address'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Customer\AddressController::update
* @see app/Http/Controllers/Customer/AddressController.php:37
* @route '/address/{customerAddress}'
*/
export const update = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/address/{customerAddress}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Customer\AddressController::update
* @see app/Http/Controllers/Customer/AddressController.php:37
* @route '/address/{customerAddress}'
*/
update.url = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { customerAddress: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { customerAddress: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            customerAddress: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customerAddress: typeof args.customerAddress === 'object'
        ? args.customerAddress.id
        : args.customerAddress,
    }

    return update.definition.url
            .replace('{customerAddress}', parsedArgs.customerAddress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\AddressController::update
* @see app/Http/Controllers/Customer/AddressController.php:37
* @route '/address/{customerAddress}'
*/
update.put = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Customer\AddressController::update
* @see app/Http/Controllers/Customer/AddressController.php:37
* @route '/address/{customerAddress}'
*/
const updateForm = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\AddressController::update
* @see app/Http/Controllers/Customer/AddressController.php:37
* @route '/address/{customerAddress}'
*/
updateForm.put = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Customer\AddressController::destroy
* @see app/Http/Controllers/Customer/AddressController.php:52
* @route '/address/{customerAddress}'
*/
export const destroy = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/address/{customerAddress}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Customer\AddressController::destroy
* @see app/Http/Controllers/Customer/AddressController.php:52
* @route '/address/{customerAddress}'
*/
destroy.url = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { customerAddress: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { customerAddress: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            customerAddress: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customerAddress: typeof args.customerAddress === 'object'
        ? args.customerAddress.id
        : args.customerAddress,
    }

    return destroy.definition.url
            .replace('{customerAddress}', parsedArgs.customerAddress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\AddressController::destroy
* @see app/Http/Controllers/Customer/AddressController.php:52
* @route '/address/{customerAddress}'
*/
destroy.delete = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Customer\AddressController::destroy
* @see app/Http/Controllers/Customer/AddressController.php:52
* @route '/address/{customerAddress}'
*/
const destroyForm = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\AddressController::destroy
* @see app/Http/Controllers/Customer/AddressController.php:52
* @route '/address/{customerAddress}'
*/
destroyForm.delete = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const manageAddress = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default manageAddress