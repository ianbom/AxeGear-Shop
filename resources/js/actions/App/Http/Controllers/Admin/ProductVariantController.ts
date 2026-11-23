import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
const index4d1f0c4c52d70b9a734e44ea3b21bb03 = (args: { product: string | number | { id: string | number } } | [product: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index4d1f0c4c52d70b9a734e44ea3b21bb03.url(args, options),
    method: 'get',
})

index4d1f0c4c52d70b9a734e44ea3b21bb03.definition = {
    methods: ["get","head"],
    url: '/admin/products/{product}/variants',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
index4d1f0c4c52d70b9a734e44ea3b21bb03.url = (args: { product: string | number | { id: string | number } } | [product: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { product: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            product: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        product: typeof args.product === 'object'
        ? args.product.id
        : args.product,
    }

    return index4d1f0c4c52d70b9a734e44ea3b21bb03.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
index4d1f0c4c52d70b9a734e44ea3b21bb03.get = (args: { product: string | number | { id: string | number } } | [product: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index4d1f0c4c52d70b9a734e44ea3b21bb03.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
index4d1f0c4c52d70b9a734e44ea3b21bb03.head = (args: { product: string | number | { id: string | number } } | [product: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index4d1f0c4c52d70b9a734e44ea3b21bb03.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
const index4d1f0c4c52d70b9a734e44ea3b21bb03Form = (args: { product: string | number | { id: string | number } } | [product: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index4d1f0c4c52d70b9a734e44ea3b21bb03.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
index4d1f0c4c52d70b9a734e44ea3b21bb03Form.get = (args: { product: string | number | { id: string | number } } | [product: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index4d1f0c4c52d70b9a734e44ea3b21bb03.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/products/{product}/variants'
*/
index4d1f0c4c52d70b9a734e44ea3b21bb03Form.head = (args: { product: string | number | { id: string | number } } | [product: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index4d1f0c4c52d70b9a734e44ea3b21bb03.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index4d1f0c4c52d70b9a734e44ea3b21bb03.form = index4d1f0c4c52d70b9a734e44ea3b21bb03Form
/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
const index7535c30795c7cb77b90bb838b301bf1a = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7535c30795c7cb77b90bb838b301bf1a.url(options),
    method: 'get',
})

index7535c30795c7cb77b90bb838b301bf1a.definition = {
    methods: ["get","head"],
    url: '/admin/product-variants',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
index7535c30795c7cb77b90bb838b301bf1a.url = (options?: RouteQueryOptions) => {
    return index7535c30795c7cb77b90bb838b301bf1a.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
index7535c30795c7cb77b90bb838b301bf1a.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7535c30795c7cb77b90bb838b301bf1a.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
index7535c30795c7cb77b90bb838b301bf1a.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index7535c30795c7cb77b90bb838b301bf1a.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
const index7535c30795c7cb77b90bb838b301bf1aForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index7535c30795c7cb77b90bb838b301bf1a.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
index7535c30795c7cb77b90bb838b301bf1aForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index7535c30795c7cb77b90bb838b301bf1a.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProductVariantController::index
* @see app/Http/Controllers/Admin/ProductVariantController.php:16
* @route '/admin/product-variants'
*/
index7535c30795c7cb77b90bb838b301bf1aForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index7535c30795c7cb77b90bb838b301bf1a.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index7535c30795c7cb77b90bb838b301bf1a.form = index7535c30795c7cb77b90bb838b301bf1aForm

export const index = {
    '/admin/products/{product}/variants': index4d1f0c4c52d70b9a734e44ea3b21bb03,
    '/admin/product-variants': index7535c30795c7cb77b90bb838b301bf1a,
}

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

const ProductVariantController = { index, create, store, edit, update, destroy }

export default ProductVariantController