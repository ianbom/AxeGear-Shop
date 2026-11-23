import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\DokuFinishController::__invoke
* @see app/Http/Controllers/Customer/DokuFinishController.php:10
* @route '/payments/doku/finish'
*/
const DokuFinishController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DokuFinishController.url(options),
    method: 'get',
})

DokuFinishController.definition = {
    methods: ["get","head"],
    url: '/payments/doku/finish',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\DokuFinishController::__invoke
* @see app/Http/Controllers/Customer/DokuFinishController.php:10
* @route '/payments/doku/finish'
*/
DokuFinishController.url = (options?: RouteQueryOptions) => {
    return DokuFinishController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\DokuFinishController::__invoke
* @see app/Http/Controllers/Customer/DokuFinishController.php:10
* @route '/payments/doku/finish'
*/
DokuFinishController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DokuFinishController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\DokuFinishController::__invoke
* @see app/Http/Controllers/Customer/DokuFinishController.php:10
* @route '/payments/doku/finish'
*/
DokuFinishController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: DokuFinishController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\DokuFinishController::__invoke
* @see app/Http/Controllers/Customer/DokuFinishController.php:10
* @route '/payments/doku/finish'
*/
const DokuFinishControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DokuFinishController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\DokuFinishController::__invoke
* @see app/Http/Controllers/Customer/DokuFinishController.php:10
* @route '/payments/doku/finish'
*/
DokuFinishControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DokuFinishController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\DokuFinishController::__invoke
* @see app/Http/Controllers/Customer/DokuFinishController.php:10
* @route '/payments/doku/finish'
*/
DokuFinishControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DokuFinishController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

DokuFinishController.form = DokuFinishControllerForm

export default DokuFinishController