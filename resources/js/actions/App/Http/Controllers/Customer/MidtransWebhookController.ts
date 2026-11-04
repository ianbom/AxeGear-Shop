import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\MidtransWebhookController::__invoke
* @see app/Http/Controllers/Customer/MidtransWebhookController.php:13
* @route '/api/payments/midtrans/notification'
*/
const MidtransWebhookController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: MidtransWebhookController.url(options),
    method: 'post',
})

MidtransWebhookController.definition = {
    methods: ["post"],
    url: '/api/payments/midtrans/notification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\MidtransWebhookController::__invoke
* @see app/Http/Controllers/Customer/MidtransWebhookController.php:13
* @route '/api/payments/midtrans/notification'
*/
MidtransWebhookController.url = (options?: RouteQueryOptions) => {
    return MidtransWebhookController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\MidtransWebhookController::__invoke
* @see app/Http/Controllers/Customer/MidtransWebhookController.php:13
* @route '/api/payments/midtrans/notification'
*/
MidtransWebhookController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: MidtransWebhookController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\MidtransWebhookController::__invoke
* @see app/Http/Controllers/Customer/MidtransWebhookController.php:13
* @route '/api/payments/midtrans/notification'
*/
const MidtransWebhookControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: MidtransWebhookController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\MidtransWebhookController::__invoke
* @see app/Http/Controllers/Customer/MidtransWebhookController.php:13
* @route '/api/payments/midtrans/notification'
*/
MidtransWebhookControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: MidtransWebhookController.url(options),
    method: 'post',
})

MidtransWebhookController.form = MidtransWebhookControllerForm

export default MidtransWebhookController