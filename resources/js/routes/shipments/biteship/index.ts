import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\BiteshipWebhookController::__invoke
* @see app/Http/Controllers/Customer/BiteshipWebhookController.php:16
* @route '/api/shipments/biteship/webhook'
*/
export const webhook = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(options),
    method: 'post',
})

webhook.definition = {
    methods: ["post"],
    url: '/api/shipments/biteship/webhook',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\BiteshipWebhookController::__invoke
* @see app/Http/Controllers/Customer/BiteshipWebhookController.php:16
* @route '/api/shipments/biteship/webhook'
*/
webhook.url = (options?: RouteQueryOptions) => {
    return webhook.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\BiteshipWebhookController::__invoke
* @see app/Http/Controllers/Customer/BiteshipWebhookController.php:16
* @route '/api/shipments/biteship/webhook'
*/
webhook.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\BiteshipWebhookController::__invoke
* @see app/Http/Controllers/Customer/BiteshipWebhookController.php:16
* @route '/api/shipments/biteship/webhook'
*/
const webhookForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhook.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\BiteshipWebhookController::__invoke
* @see app/Http/Controllers/Customer/BiteshipWebhookController.php:16
* @route '/api/shipments/biteship/webhook'
*/
webhookForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhook.url(options),
    method: 'post',
})

webhook.form = webhookForm

const biteship = {
    webhook: Object.assign(webhook, webhook),
}

export default biteship