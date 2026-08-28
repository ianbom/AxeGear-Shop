import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\BiteshipWebhookController::__invoke
* @see app/Http/Controllers/Customer/BiteshipWebhookController.php:16
* @route '/api/shipments/biteship/webhook'
*/
const BiteshipWebhookController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: BiteshipWebhookController.url(options),
    method: 'post',
})

BiteshipWebhookController.definition = {
    methods: ["post"],
    url: '/api/shipments/biteship/webhook',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\BiteshipWebhookController::__invoke
* @see app/Http/Controllers/Customer/BiteshipWebhookController.php:16
* @route '/api/shipments/biteship/webhook'
*/
BiteshipWebhookController.url = (options?: RouteQueryOptions) => {
    return BiteshipWebhookController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\BiteshipWebhookController::__invoke
* @see app/Http/Controllers/Customer/BiteshipWebhookController.php:16
* @route '/api/shipments/biteship/webhook'
*/
BiteshipWebhookController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: BiteshipWebhookController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\BiteshipWebhookController::__invoke
* @see app/Http/Controllers/Customer/BiteshipWebhookController.php:16
* @route '/api/shipments/biteship/webhook'
*/
const BiteshipWebhookControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: BiteshipWebhookController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\BiteshipWebhookController::__invoke
* @see app/Http/Controllers/Customer/BiteshipWebhookController.php:16
* @route '/api/shipments/biteship/webhook'
*/
BiteshipWebhookControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: BiteshipWebhookController.url(options),
    method: 'post',
})

BiteshipWebhookController.form = BiteshipWebhookControllerForm

export default BiteshipWebhookController