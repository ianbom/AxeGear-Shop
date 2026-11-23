import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\DokuWebhookController::__invoke
* @see app/Http/Controllers/Customer/DokuWebhookController.php:13
* @route '/api/payments/doku/notification'
*/
export const notification = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: notification.url(options),
    method: 'post',
})

notification.definition = {
    methods: ["post"],
    url: '/api/payments/doku/notification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\DokuWebhookController::__invoke
* @see app/Http/Controllers/Customer/DokuWebhookController.php:13
* @route '/api/payments/doku/notification'
*/
notification.url = (options?: RouteQueryOptions) => {
    return notification.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\DokuWebhookController::__invoke
* @see app/Http/Controllers/Customer/DokuWebhookController.php:13
* @route '/api/payments/doku/notification'
*/
notification.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: notification.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\DokuWebhookController::__invoke
* @see app/Http/Controllers/Customer/DokuWebhookController.php:13
* @route '/api/payments/doku/notification'
*/
const notificationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: notification.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\DokuWebhookController::__invoke
* @see app/Http/Controllers/Customer/DokuWebhookController.php:13
* @route '/api/payments/doku/notification'
*/
notificationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: notification.url(options),
    method: 'post',
})

notification.form = notificationForm

/**
* @see \App\Http\Controllers\Customer\DokuFinishController::__invoke
* @see app/Http/Controllers/Customer/DokuFinishController.php:10
* @route '/payments/doku/finish'
*/
export const finish = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: finish.url(options),
    method: 'get',
})

finish.definition = {
    methods: ["get","head"],
    url: '/payments/doku/finish',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\DokuFinishController::__invoke
* @see app/Http/Controllers/Customer/DokuFinishController.php:10
* @route '/payments/doku/finish'
*/
finish.url = (options?: RouteQueryOptions) => {
    return finish.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\DokuFinishController::__invoke
* @see app/Http/Controllers/Customer/DokuFinishController.php:10
* @route '/payments/doku/finish'
*/
finish.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: finish.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\DokuFinishController::__invoke
* @see app/Http/Controllers/Customer/DokuFinishController.php:10
* @route '/payments/doku/finish'
*/
finish.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: finish.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\DokuFinishController::__invoke
* @see app/Http/Controllers/Customer/DokuFinishController.php:10
* @route '/payments/doku/finish'
*/
const finishForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: finish.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\DokuFinishController::__invoke
* @see app/Http/Controllers/Customer/DokuFinishController.php:10
* @route '/payments/doku/finish'
*/
finishForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: finish.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\DokuFinishController::__invoke
* @see app/Http/Controllers/Customer/DokuFinishController.php:10
* @route '/payments/doku/finish'
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

const doku = {
    notification: Object.assign(notification, notification),
    finish: Object.assign(finish, finish),
}

export default doku