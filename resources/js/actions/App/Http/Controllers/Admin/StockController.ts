import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\StockController::edit
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
export const edit = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/product-variants/{productVariant}/stock-adjustment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StockController::edit
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
edit.url = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { productVariant: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { productVariant: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            productVariant: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        productVariant: typeof args.productVariant === 'object'
        ? args.productVariant.id
        : args.productVariant,
    }

    return edit.definition.url
            .replace('{productVariant}', parsedArgs.productVariant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StockController::edit
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
edit.get = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StockController::edit
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
edit.head = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\StockController::edit
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
const editForm = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StockController::edit
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
editForm.get = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StockController::edit
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
editForm.head = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Admin\StockController::update
* @see app/Http/Controllers/Admin/StockController.php:32
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
export const update = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/admin/product-variants/{productVariant}/stock-adjustment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\StockController::update
* @see app/Http/Controllers/Admin/StockController.php:32
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
update.url = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { productVariant: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { productVariant: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            productVariant: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        productVariant: typeof args.productVariant === 'object'
        ? args.productVariant.id
        : args.productVariant,
    }

    return update.definition.url
            .replace('{productVariant}', parsedArgs.productVariant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StockController::update
* @see app/Http/Controllers/Admin/StockController.php:32
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
update.post = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\StockController::update
* @see app/Http/Controllers/Admin/StockController.php:32
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
const updateForm = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\StockController::update
* @see app/Http/Controllers/Admin/StockController.php:32
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
updateForm.post = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Admin\StockController::index
* @see app/Http/Controllers/Admin/StockController.php:15
* @route '/admin/stock'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/stock',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StockController::index
* @see app/Http/Controllers/Admin/StockController.php:15
* @route '/admin/stock'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StockController::index
* @see app/Http/Controllers/Admin/StockController.php:15
* @route '/admin/stock'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StockController::index
* @see app/Http/Controllers/Admin/StockController.php:15
* @route '/admin/stock'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\StockController::index
* @see app/Http/Controllers/Admin/StockController.php:15
* @route '/admin/stock'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StockController::index
* @see app/Http/Controllers/Admin/StockController.php:15
* @route '/admin/stock'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StockController::index
* @see app/Http/Controllers/Admin/StockController.php:15
* @route '/admin/stock'
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

/**
* @see \App\Http\Controllers\Admin\StockController::logs
* @see app/Http/Controllers/Admin/StockController.php:20
* @route '/admin/stock/logs'
*/
export const logs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logs.url(options),
    method: 'get',
})

logs.definition = {
    methods: ["get","head"],
    url: '/admin/stock/logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StockController::logs
* @see app/Http/Controllers/Admin/StockController.php:20
* @route '/admin/stock/logs'
*/
logs.url = (options?: RouteQueryOptions) => {
    return logs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StockController::logs
* @see app/Http/Controllers/Admin/StockController.php:20
* @route '/admin/stock/logs'
*/
logs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StockController::logs
* @see app/Http/Controllers/Admin/StockController.php:20
* @route '/admin/stock/logs'
*/
logs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: logs.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\StockController::logs
* @see app/Http/Controllers/Admin/StockController.php:20
* @route '/admin/stock/logs'
*/
const logsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: logs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StockController::logs
* @see app/Http/Controllers/Admin/StockController.php:20
* @route '/admin/stock/logs'
*/
logsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: logs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StockController::logs
* @see app/Http/Controllers/Admin/StockController.php:20
* @route '/admin/stock/logs'
*/
logsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: logs.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

logs.form = logsForm

const StockController = { edit, update, index, logs }

export default StockController