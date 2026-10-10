import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
export const areas = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: areas.url(options),
    method: 'get',
})

areas.definition = {
    methods: ["get","head"],
    url: '/biteship/areas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
areas.url = (options?: RouteQueryOptions) => {
    return areas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
areas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: areas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
areas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: areas.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
const areasForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: areas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
areasForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: areas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
areasForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: areas.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

areas.form = areasForm

const biteship = {
    areas: Object.assign(areas, areas),
}

export default biteship