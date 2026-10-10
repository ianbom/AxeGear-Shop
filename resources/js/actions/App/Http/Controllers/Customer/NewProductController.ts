import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
const NewProductController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: NewProductController.url(options),
    method: 'get',
})

NewProductController.definition = {
    methods: ["get","head"],
    url: '/new-product',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
NewProductController.url = (options?: RouteQueryOptions) => {
    return NewProductController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
NewProductController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: NewProductController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
NewProductController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: NewProductController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
const NewProductControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: NewProductController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
NewProductControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: NewProductController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
NewProductControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: NewProductController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

NewProductController.form = NewProductControllerForm

export default NewProductController