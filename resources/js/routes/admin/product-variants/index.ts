import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import stockAdjustment554ffd from './stock-adjustment'
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/product-variants',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
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
* @see \App\Http\Controllers\Admin\ProductVariantController::create
* @see app/Http/Controllers/Admin/ProductVariantController.php:21
* @route '/admin/product-variants/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/product-variants/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::create
* @see app/Http/Controllers/Admin/ProductVariantController.php:21
* @route '/admin/product-variants/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::create
* @see app/Http/Controllers/Admin/ProductVariantController.php:21
* @route '/admin/product-variants/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::create
* @see app/Http/Controllers/Admin/ProductVariantController.php:21
* @route '/admin/product-variants/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::create
* @see app/Http/Controllers/Admin/ProductVariantController.php:21
* @route '/admin/product-variants/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::create
* @see app/Http/Controllers/Admin/ProductVariantController.php:21
* @route '/admin/product-variants/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::create
* @see app/Http/Controllers/Admin/ProductVariantController.php:21
* @route '/admin/product-variants/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::store
* @see app/Http/Controllers/Admin/ProductVariantController.php:31
* @route '/admin/product-variants'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/product-variants',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::store
* @see app/Http/Controllers/Admin/ProductVariantController.php:31
* @route '/admin/product-variants'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::store
* @see app/Http/Controllers/Admin/ProductVariantController.php:31
* @route '/admin/product-variants'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::store
* @see app/Http/Controllers/Admin/ProductVariantController.php:31
* @route '/admin/product-variants'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::store
* @see app/Http/Controllers/Admin/ProductVariantController.php:31
* @route '/admin/product-variants'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::edit
* @see app/Http/Controllers/Admin/ProductVariantController.php:38
* @route '/admin/product-variants/{productVariant}/edit'
*/
export const edit = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/product-variants/{productVariant}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::edit
* @see app/Http/Controllers/Admin/ProductVariantController.php:38
* @route '/admin/product-variants/{productVariant}/edit'
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
* @see \App\Http\Controllers\Admin\ProductVariantController::edit
* @see app/Http/Controllers/Admin/ProductVariantController.php:38
* @route '/admin/product-variants/{productVariant}/edit'
*/
edit.get = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::edit
* @see app/Http/Controllers/Admin/ProductVariantController.php:38
* @route '/admin/product-variants/{productVariant}/edit'
*/
edit.head = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::edit
* @see app/Http/Controllers/Admin/ProductVariantController.php:38
* @route '/admin/product-variants/{productVariant}/edit'
*/
const editForm = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::edit
* @see app/Http/Controllers/Admin/ProductVariantController.php:38
* @route '/admin/product-variants/{productVariant}/edit'
*/
editForm.get = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::edit
* @see app/Http/Controllers/Admin/ProductVariantController.php:38
* @route '/admin/product-variants/{productVariant}/edit'
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
* @see \App\Http\Controllers\Admin\ProductVariantController::update
* @see app/Http/Controllers/Admin/ProductVariantController.php:48
* @route '/admin/product-variants/{productVariant}'
*/
export const update = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/product-variants/{productVariant}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::update
* @see app/Http/Controllers/Admin/ProductVariantController.php:48
* @route '/admin/product-variants/{productVariant}'
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
* @see \App\Http\Controllers\Admin\ProductVariantController::update
* @see app/Http/Controllers/Admin/ProductVariantController.php:48
* @route '/admin/product-variants/{productVariant}'
*/
update.put = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::update
* @see app/Http/Controllers/Admin/ProductVariantController.php:48
* @route '/admin/product-variants/{productVariant}'
*/
const updateForm = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::update
* @see app/Http/Controllers/Admin/ProductVariantController.php:48
* @route '/admin/product-variants/{productVariant}'
*/
updateForm.put = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::destroy
* @see app/Http/Controllers/Admin/ProductVariantController.php:55
* @route '/admin/product-variants/{productVariant}'
*/
export const destroy = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/product-variants/{productVariant}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::destroy
* @see app/Http/Controllers/Admin/ProductVariantController.php:55
* @route '/admin/product-variants/{productVariant}'
*/
destroy.url = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{productVariant}', parsedArgs.productVariant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::destroy
* @see app/Http/Controllers/Admin/ProductVariantController.php:55
* @route '/admin/product-variants/{productVariant}'
*/
destroy.delete = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::destroy
* @see app/Http/Controllers/Admin/ProductVariantController.php:55
* @route '/admin/product-variants/{productVariant}'
*/
const destroyForm = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::destroy
* @see app/Http/Controllers/Admin/ProductVariantController.php:55
* @route '/admin/product-variants/{productVariant}'
*/
destroyForm.delete = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\Admin\StockController::stockAdjustment
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
export const stockAdjustment = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stockAdjustment.url(args, options),
    method: 'get',
})

stockAdjustment.definition = {
    methods: ["get","head"],
    url: '/admin/product-variants/{productVariant}/stock-adjustment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StockController::stockAdjustment
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
stockAdjustment.url = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return stockAdjustment.definition.url
            .replace('{productVariant}', parsedArgs.productVariant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StockController::stockAdjustment
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
stockAdjustment.get = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stockAdjustment.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StockController::stockAdjustment
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
stockAdjustment.head = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stockAdjustment.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\StockController::stockAdjustment
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
const stockAdjustmentForm = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stockAdjustment.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StockController::stockAdjustment
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
stockAdjustmentForm.get = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stockAdjustment.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StockController::stockAdjustment
* @see app/Http/Controllers/Admin/StockController.php:25
* @route '/admin/product-variants/{productVariant}/stock-adjustment'
*/
stockAdjustmentForm.head = (args: { productVariant: string | number | { id: string | number } } | [productVariant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stockAdjustment.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

stockAdjustment.form = stockAdjustmentForm

const productVariants = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    stockAdjustment: Object.assign(stockAdjustment, stockAdjustment554ffd),
}

export default productVariants