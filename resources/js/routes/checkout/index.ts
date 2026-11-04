import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import voucher from './voucher'
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
* @see \App\Http\Controllers\Customer\CheckoutController::shippingRate
* @see app/Http/Controllers/Customer/CheckoutController.php:45
* @route '/checkout/shipping-rate'
*/
export const shippingRate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: shippingRate.url(options),
    method: 'post',
})

shippingRate.definition = {
    methods: ["post"],
    url: '/checkout/shipping-rate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\CheckoutController::shippingRate
* @see app/Http/Controllers/Customer/CheckoutController.php:45
* @route '/checkout/shipping-rate'
*/
shippingRate.url = (options?: RouteQueryOptions) => {
    return shippingRate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CheckoutController::shippingRate
* @see app/Http/Controllers/Customer/CheckoutController.php:45
* @route '/checkout/shipping-rate'
*/
shippingRate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: shippingRate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::shippingRate
* @see app/Http/Controllers/Customer/CheckoutController.php:45
* @route '/checkout/shipping-rate'
*/
const shippingRateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: shippingRate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::shippingRate
* @see app/Http/Controllers/Customer/CheckoutController.php:45
* @route '/checkout/shipping-rate'
*/
shippingRateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: shippingRate.url(options),
    method: 'post',
})

shippingRate.form = shippingRateForm

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

const checkout = {
    shippingRates: Object.assign(shippingRates, shippingRates),
    shippingRate: Object.assign(shippingRate, shippingRate),
    voucher: Object.assign(voucher, voucher),
    placeOrder: Object.assign(placeOrder, placeOrder),
}

export default checkout