import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\CheckoutController::apply
* @see app/Http/Controllers/Customer/CheckoutController.php:52
* @route '/checkout/voucher'
*/
export const apply = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apply.url(options),
    method: 'post',
})

apply.definition = {
    methods: ["post"],
    url: '/checkout/voucher',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\CheckoutController::apply
* @see app/Http/Controllers/Customer/CheckoutController.php:52
* @route '/checkout/voucher'
*/
apply.url = (options?: RouteQueryOptions) => {
    return apply.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CheckoutController::apply
* @see app/Http/Controllers/Customer/CheckoutController.php:52
* @route '/checkout/voucher'
*/
apply.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apply.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::apply
* @see app/Http/Controllers/Customer/CheckoutController.php:52
* @route '/checkout/voucher'
*/
const applyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: apply.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::apply
* @see app/Http/Controllers/Customer/CheckoutController.php:52
* @route '/checkout/voucher'
*/
applyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: apply.url(options),
    method: 'post',
})

apply.form = applyForm

/**
* @see \App\Http\Controllers\Customer\CheckoutController::remove
* @see app/Http/Controllers/Customer/CheckoutController.php:57
* @route '/checkout/voucher'
*/
export const remove = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: remove.url(options),
    method: 'delete',
})

remove.definition = {
    methods: ["delete"],
    url: '/checkout/voucher',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Customer\CheckoutController::remove
* @see app/Http/Controllers/Customer/CheckoutController.php:57
* @route '/checkout/voucher'
*/
remove.url = (options?: RouteQueryOptions) => {
    return remove.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CheckoutController::remove
* @see app/Http/Controllers/Customer/CheckoutController.php:57
* @route '/checkout/voucher'
*/
remove.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: remove.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::remove
* @see app/Http/Controllers/Customer/CheckoutController.php:57
* @route '/checkout/voucher'
*/
const removeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: remove.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::remove
* @see app/Http/Controllers/Customer/CheckoutController.php:57
* @route '/checkout/voucher'
*/
removeForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: remove.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

remove.form = removeForm

const voucher = {
    apply: Object.assign(apply, apply),
    remove: Object.assign(remove, remove),
}

export default voucher