import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\WishlistInsightController::index
* @see app/Http/Controllers/Admin/WishlistInsightController.php:12
* @route '/admin/wishlists'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/wishlists',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WishlistInsightController::index
* @see app/Http/Controllers/Admin/WishlistInsightController.php:12
* @route '/admin/wishlists'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WishlistInsightController::index
* @see app/Http/Controllers/Admin/WishlistInsightController.php:12
* @route '/admin/wishlists'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WishlistInsightController::index
* @see app/Http/Controllers/Admin/WishlistInsightController.php:12
* @route '/admin/wishlists'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\WishlistInsightController::index
* @see app/Http/Controllers/Admin/WishlistInsightController.php:12
* @route '/admin/wishlists'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WishlistInsightController::index
* @see app/Http/Controllers/Admin/WishlistInsightController.php:12
* @route '/admin/wishlists'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WishlistInsightController::index
* @see app/Http/Controllers/Admin/WishlistInsightController.php:12
* @route '/admin/wishlists'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

const WishlistInsightController = { index }

export default WishlistInsightController