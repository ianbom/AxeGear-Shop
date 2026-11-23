import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\CheckoutController::show
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/checkout',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\CheckoutController::show
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CheckoutController::show
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::show
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::show
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::show
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::show
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Customer\CheckoutController::shippingRates
* @see app/Http/Controllers/Customer/CheckoutController.php:38
* @route '/checkout/shipping-rates'
*/
export const shippingRates = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: shippingRates.url(options),
    method: 'post',
})

shippingRates.definition = {
    methods: ["post"],
    url: '/checkout/shipping-rates',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\CheckoutController::shippingRates
* @see app/Http/Controllers/Customer/CheckoutController.php:38
* @route '/checkout/shipping-rates'
*/
shippingRates.url = (options?: RouteQueryOptions) => {
    return shippingRates.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CheckoutController::shippingRates
* @see app/Http/Controllers/Customer/CheckoutController.php:38
* @route '/checkout/shipping-rates'
*/
shippingRates.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: shippingRates.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::shippingRates
* @see app/Http/Controllers/Customer/CheckoutController.php:38
* @route '/checkout/shipping-rates'
*/
const shippingRatesForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: shippingRates.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::shippingRates
* @see app/Http/Controllers/Customer/CheckoutController.php:38
* @route '/checkout/shipping-rates'
*/
shippingRatesForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: shippingRates.url(options),
    method: 'post',
})

shippingRates.form = shippingRatesForm

/**
* @see \App\Http\Controllers\Customer\CheckoutController::selectShippingRate
* @see app/Http/Controllers/Customer/CheckoutController.php:45
* @route '/checkout/shipping-rate'
*/
export const selectShippingRate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: selectShippingRate.url(options),
    method: 'post',
})

selectShippingRate.definition = {
    methods: ["post"],
    url: '/checkout/shipping-rate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\CheckoutController::selectShippingRate
* @see app/Http/Controllers/Customer/CheckoutController.php:45
* @route '/checkout/shipping-rate'
*/
selectShippingRate.url = (options?: RouteQueryOptions) => {
    return selectShippingRate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CheckoutController::selectShippingRate
* @see app/Http/Controllers/Customer/CheckoutController.php:45
* @route '/checkout/shipping-rate'
*/
selectShippingRate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: selectShippingRate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::selectShippingRate
* @see app/Http/Controllers/Customer/CheckoutController.php:45
* @route '/checkout/shipping-rate'
*/
const selectShippingRateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: selectShippingRate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::selectShippingRate
* @see app/Http/Controllers/Customer/CheckoutController.php:45
* @route '/checkout/shipping-rate'
*/
selectShippingRateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: selectShippingRate.url(options),
    method: 'post',
})

selectShippingRate.form = selectShippingRateForm

/**
* @see \App\Http\Controllers\Customer\CheckoutController::applyVoucher
* @see app/Http/Controllers/Customer/CheckoutController.php:52
* @route '/checkout/voucher'
*/
export const applyVoucher = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: applyVoucher.url(options),
    method: 'post',
})

applyVoucher.definition = {
    methods: ["post"],
    url: '/checkout/voucher',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\CheckoutController::applyVoucher
* @see app/Http/Controllers/Customer/CheckoutController.php:52
* @route '/checkout/voucher'
*/
applyVoucher.url = (options?: RouteQueryOptions) => {
    return applyVoucher.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CheckoutController::applyVoucher
* @see app/Http/Controllers/Customer/CheckoutController.php:52
* @route '/checkout/voucher'
*/
applyVoucher.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: applyVoucher.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::applyVoucher
* @see app/Http/Controllers/Customer/CheckoutController.php:52
* @route '/checkout/voucher'
*/
const applyVoucherForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: applyVoucher.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::applyVoucher
* @see app/Http/Controllers/Customer/CheckoutController.php:52
* @route '/checkout/voucher'
*/
applyVoucherForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: applyVoucher.url(options),
    method: 'post',
})

applyVoucher.form = applyVoucherForm

/**
* @see \App\Http\Controllers\Customer\CheckoutController::removeVoucher
* @see app/Http/Controllers/Customer/CheckoutController.php:57
* @route '/checkout/voucher'
*/
export const removeVoucher = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeVoucher.url(options),
    method: 'delete',
})

removeVoucher.definition = {
    methods: ["delete"],
    url: '/checkout/voucher',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Customer\CheckoutController::removeVoucher
* @see app/Http/Controllers/Customer/CheckoutController.php:57
* @route '/checkout/voucher'
*/
removeVoucher.url = (options?: RouteQueryOptions) => {
    return removeVoucher.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CheckoutController::removeVoucher
* @see app/Http/Controllers/Customer/CheckoutController.php:57
* @route '/checkout/voucher'
*/
removeVoucher.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeVoucher.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::removeVoucher
* @see app/Http/Controllers/Customer/CheckoutController.php:57
* @route '/checkout/voucher'
*/
const removeVoucherForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: removeVoucher.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::removeVoucher
* @see app/Http/Controllers/Customer/CheckoutController.php:57
* @route '/checkout/voucher'
*/
removeVoucherForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: removeVoucher.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

removeVoucher.form = removeVoucherForm

/**
* @see \App\Http\Controllers\Customer\CheckoutController::placeOrder
* @see app/Http/Controllers/Customer/CheckoutController.php:62
* @route '/checkout/place-order'
*/
export const placeOrder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: placeOrder.url(options),
    method: 'post',
})

placeOrder.definition = {
    methods: ["post"],
    url: '/checkout/place-order',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\CheckoutController::placeOrder
* @see app/Http/Controllers/Customer/CheckoutController.php:62
* @route '/checkout/place-order'
*/
placeOrder.url = (options?: RouteQueryOptions) => {
    return placeOrder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CheckoutController::placeOrder
* @see app/Http/Controllers/Customer/CheckoutController.php:62
* @route '/checkout/place-order'
*/
placeOrder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: placeOrder.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::placeOrder
* @see app/Http/Controllers/Customer/CheckoutController.php:62
* @route '/checkout/place-order'
*/
const placeOrderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: placeOrder.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::placeOrder
* @see app/Http/Controllers/Customer/CheckoutController.php:62
* @route '/checkout/place-order'
*/
placeOrderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: placeOrder.url(options),
    method: 'post',
})

placeOrder.form = placeOrderForm

const CheckoutController = { show, shippingRates, selectShippingRate, applyVoucher, removeVoucher, placeOrder }

export default CheckoutController