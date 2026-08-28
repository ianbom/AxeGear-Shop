import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\MidtransWebhookController::__invoke
* @see app/Http/Controllers/Customer/MidtransWebhookController.php:13
* @route '/api/payments/midtrans/notification'
*/
export const notification = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: notification.url(options),
    method: 'post',
})

notification.definition = {
    methods: ["post"],
    url: '/api/payments/midtrans/notification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\MidtransWebhookController::__invoke
* @see app/Http/Controllers/Customer/MidtransWebhookController.php:13
* @route '/api/payments/midtrans/notification'
*/
notification.url = (options?: RouteQueryOptions) => {
    return notification.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\MidtransWebhookController::__invoke
* @see app/Http/Controllers/Customer/MidtransWebhookController.php:13
* @route '/api/payments/midtrans/notification'
*/
notification.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: notification.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\MidtransWebhookController::__invoke
* @see app/Http/Controllers/Customer/MidtransWebhookController.php:13
* @route '/api/payments/midtrans/notification'
*/
const notificationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: notification.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\MidtransWebhookController::__invoke
* @see app/Http/Controllers/Customer/MidtransWebhookController.php:13
* @route '/api/payments/midtrans/notification'
*/
notificationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: notification.url(options),
    method: 'post',
})

notification.form = notificationForm

/**
* @see \App\Http\Controllers\Customer\MidtransFinishController::__invoke
* @see app/Http/Controllers/Customer/MidtransFinishController.php:10
* @route '/payments/midtrans/finish'
*/
export const finish = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: finish.url(options),
    method: 'get',
})

finish.definition = {
    methods: ["get","head"],
    url: '/payments/midtrans/finish',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\MidtransFinishController::__invoke
* @see app/Http/Controllers/Customer/MidtransFinishController.php:10
* @route '/payments/midtrans/finish'
*/
finish.url = (options?: RouteQueryOptions) => {
    return finish.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\MidtransFinishController::__invoke
* @see app/Http/Controllers/Customer/MidtransFinishController.php:10
* @route '/payments/midtrans/finish'
*/
finish.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: finish.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\MidtransFinishController::__invoke
* @see app/Http/Controllers/Customer/MidtransFinishController.php:10
* @route '/payments/midtrans/finish'
*/
finish.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: finish.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\MidtransFinishController::__invoke
* @see app/Http/Controllers/Customer/MidtransFinishController.php:10
* @route '/payments/midtrans/finish'
*/
const finishForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: finish.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\MidtransFinishController::__invoke
* @see app/Http/Controllers/Customer/MidtransFinishController.php:10
* @route '/payments/midtrans/finish'
*/
finishForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: finish.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\MidtransFinishController::__invoke
* @see app/Http/Controllers/Customer/MidtransFinishController.php:10
* @route '/payments/midtrans/finish'
*/
finishForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: finish.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

finish.form = finishForm

const midtrans = {
    notification: Object.assign(notification, notification),
    finish: Object.assign(finish, finish),
}

export default midtrans