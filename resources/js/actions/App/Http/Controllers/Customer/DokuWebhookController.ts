import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\DokuWebhookController::__invoke
* @see app/Http/Controllers/Customer/DokuWebhookController.php:13
* @route '/api/payments/doku/notification'
*/
const DokuWebhookController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: DokuWebhookController.url(options),
    method: 'post',
})

DokuWebhookController.definition = {
    methods: ["post"],
    url: '/api/payments/doku/notification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\DokuWebhookController::__invoke
* @see app/Http/Controllers/Customer/DokuWebhookController.php:13
* @route '/api/payments/doku/notification'
*/
DokuWebhookController.url = (options?: RouteQueryOptions) => {
    return DokuWebhookController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\DokuWebhookController::__invoke
* @see app/Http/Controllers/Customer/DokuWebhookController.php:13
* @route '/api/payments/doku/notification'
*/
DokuWebhookController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: DokuWebhookController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\DokuWebhookController::__invoke
* @see app/Http/Controllers/Customer/DokuWebhookController.php:13
* @route '/api/payments/doku/notification'
*/
const DokuWebhookControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: DokuWebhookController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\DokuWebhookController::__invoke
* @see app/Http/Controllers/Customer/DokuWebhookController.php:13
* @route '/api/payments/doku/notification'
*/
DokuWebhookControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: DokuWebhookController.url(options),
    method: 'post',
})

DokuWebhookController.form = DokuWebhookControllerForm

export default DokuWebhookController