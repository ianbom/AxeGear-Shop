import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Customer\MidtransFinishController::__invoke
* @see app/Http/Controllers/Customer/MidtransFinishController.php:10
* @route '/payments/midtrans/finish'
*/
const MidtransFinishController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: MidtransFinishController.url(options),
    method: 'get',
})

MidtransFinishController.definition = {
    methods: ["get","head"],
    url: '/payments/midtrans/finish',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\MidtransFinishController::__invoke
* @see app/Http/Controllers/Customer/MidtransFinishController.php:10
* @route '/payments/midtrans/finish'
*/
MidtransFinishController.url = (options?: RouteQueryOptions) => {
    return MidtransFinishController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\MidtransFinishController::__invoke
* @see app/Http/Controllers/Customer/MidtransFinishController.php:10
* @route '/payments/midtrans/finish'
*/
MidtransFinishController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: MidtransFinishController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\MidtransFinishController::__invoke
* @see app/Http/Controllers/Customer/MidtransFinishController.php:10
* @route '/payments/midtrans/finish'
*/
MidtransFinishController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: MidtransFinishController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\MidtransFinishController::__invoke
* @see app/Http/Controllers/Customer/MidtransFinishController.php:10
* @route '/payments/midtrans/finish'
*/
const MidtransFinishControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: MidtransFinishController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\MidtransFinishController::__invoke
* @see app/Http/Controllers/Customer/MidtransFinishController.php:10
* @route '/payments/midtrans/finish'
*/
MidtransFinishControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: MidtransFinishController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\MidtransFinishController::__invoke
* @see app/Http/Controllers/Customer/MidtransFinishController.php:10
* @route '/payments/midtrans/finish'
*/
MidtransFinishControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: MidtransFinishController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

MidtransFinishController.form = MidtransFinishControllerForm

export default MidtransFinishController