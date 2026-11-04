import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\NotificationController::readAll
* @see app/Http/Controllers/Customer/NotificationController.php:21
* @route '/notifications/read-all'
*/
export const readAll = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: readAll.url(options),
    method: 'post',
})

readAll.definition = {
    methods: ["post"],
    url: '/notifications/read-all',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\NotificationController::readAll
* @see app/Http/Controllers/Customer/NotificationController.php:21
* @route '/notifications/read-all'
*/
readAll.url = (options?: RouteQueryOptions) => {
    return readAll.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\NotificationController::readAll
* @see app/Http/Controllers/Customer/NotificationController.php:21
* @route '/notifications/read-all'
*/
readAll.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: readAll.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\NotificationController::readAll
* @see app/Http/Controllers/Customer/NotificationController.php:21
* @route '/notifications/read-all'
*/
const readAllForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: readAll.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\NotificationController::readAll
* @see app/Http/Controllers/Customer/NotificationController.php:21
* @route '/notifications/read-all'
*/
readAllForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: readAll.url(options),
    method: 'post',
})

readAll.form = readAllForm

/**
* @see \App\Http\Controllers\Customer\NotificationController::read
* @see app/Http/Controllers/Customer/NotificationController.php:28
* @route '/notifications/{notification}/read'
*/
export const read = (args: { notification: string | number | { id: string | number } } | [notification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: read.url(args, options),
    method: 'post',
})

read.definition = {
    methods: ["post"],
    url: '/notifications/{notification}/read',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Customer\NotificationController::read
* @see app/Http/Controllers/Customer/NotificationController.php:28
* @route '/notifications/{notification}/read'
*/
read.url = (args: { notification: string | number | { id: string | number } } | [notification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { notification: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { notification: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            notification: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        notification: typeof args.notification === 'object'
        ? args.notification.id
        : args.notification,
    }

    return read.definition.url
            .replace('{notification}', parsedArgs.notification.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\NotificationController::read
* @see app/Http/Controllers/Customer/NotificationController.php:28
* @route '/notifications/{notification}/read'
*/
read.post = (args: { notification: string | number | { id: string | number } } | [notification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: read.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\NotificationController::read
* @see app/Http/Controllers/Customer/NotificationController.php:28
* @route '/notifications/{notification}/read'
*/
const readForm = (args: { notification: string | number | { id: string | number } } | [notification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: read.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Customer\NotificationController::read
* @see app/Http/Controllers/Customer/NotificationController.php:28
* @route '/notifications/{notification}/read'
*/
readForm.post = (args: { notification: string | number | { id: string | number } } | [notification: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: read.url(args, options),
    method: 'post',
})

read.form = readForm

const notifications = {
    readAll: Object.assign(readAll, readAll),
    read: Object.assign(read, read),
}

export default notifications