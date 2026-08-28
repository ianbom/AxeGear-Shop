import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ReportController::index
* @see app/Http/Controllers/Admin/ReportController.php:13
* @route '/admin/reports/{type}'
*/
export const index = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/reports/{type}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ReportController::index
* @see app/Http/Controllers/Admin/ReportController.php:13
* @route '/admin/reports/{type}'
*/
index.url = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { type: args }
    }

    if (Array.isArray(args)) {
        args = {
            type: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        type: args.type,
    }

    return index.definition.url
            .replace('{type}', parsedArgs.type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportController::index
* @see app/Http/Controllers/Admin/ReportController.php:13
* @route '/admin/reports/{type}'
*/
index.get = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::index
* @see app/Http/Controllers/Admin/ReportController.php:13
* @route '/admin/reports/{type}'
*/
index.head = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::index
* @see app/Http/Controllers/Admin/ReportController.php:13
* @route '/admin/reports/{type}'
*/
const indexForm = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::index
* @see app/Http/Controllers/Admin/ReportController.php:13
* @route '/admin/reports/{type}'
*/
indexForm.get = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::index
* @see app/Http/Controllers/Admin/ReportController.php:13
* @route '/admin/reports/{type}'
*/
indexForm.head = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Admin\ReportController::exportMethod
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/{type}/export'
*/
export const exportMethod = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/admin/reports/{type}/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ReportController::exportMethod
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/{type}/export'
*/
exportMethod.url = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { type: args }
    }

    if (Array.isArray(args)) {
        args = {
            type: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        type: args.type,
    }

    return exportMethod.definition.url
            .replace('{type}', parsedArgs.type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportController::exportMethod
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/{type}/export'
*/
exportMethod.get = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::exportMethod
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/{type}/export'
*/
exportMethod.head = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::exportMethod
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/{type}/export'
*/
const exportMethodForm = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::exportMethod
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/{type}/export'
*/
exportMethodForm.get = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::exportMethod
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/{type}/export'
*/
exportMethodForm.head = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportMethod.form = exportMethodForm

const ReportController = { index, exportMethod, export: exportMethod }

export default ReportController