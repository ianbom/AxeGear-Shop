import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
const GalleryController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: GalleryController.url(options),
    method: 'get',
})

GalleryController.definition = {
    methods: ["get","head"],
    url: '/gallery',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
GalleryController.url = (options?: RouteQueryOptions) => {
    return GalleryController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
GalleryController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: GalleryController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
GalleryController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: GalleryController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
const GalleryControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: GalleryController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
GalleryControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: GalleryController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
GalleryControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: GalleryController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

GalleryController.form = GalleryControllerForm

export default GalleryController