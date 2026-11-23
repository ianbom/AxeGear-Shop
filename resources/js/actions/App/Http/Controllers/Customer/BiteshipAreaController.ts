import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
const BiteshipAreaController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: BiteshipAreaController.url(options),
    method: 'get',
})

BiteshipAreaController.definition = {
    methods: ["get","head"],
    url: '/biteship/areas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
BiteshipAreaController.url = (options?: RouteQueryOptions) => {
    return BiteshipAreaController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
BiteshipAreaController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: BiteshipAreaController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
BiteshipAreaController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: BiteshipAreaController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
const BiteshipAreaControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: BiteshipAreaController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
BiteshipAreaControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: BiteshipAreaController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
BiteshipAreaControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: BiteshipAreaController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

BiteshipAreaController.form = BiteshipAreaControllerForm

export default BiteshipAreaController