import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::index
* @see app/Http/Controllers/Admin/CustomerAddressController.php:15
* @route '/admin/customer-addresses'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/customer-addresses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::index
* @see app/Http/Controllers/Admin/CustomerAddressController.php:15
* @route '/admin/customer-addresses'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::index
* @see app/Http/Controllers/Admin/CustomerAddressController.php:15
* @route '/admin/customer-addresses'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::index
* @see app/Http/Controllers/Admin/CustomerAddressController.php:15
* @route '/admin/customer-addresses'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::index
* @see app/Http/Controllers/Admin/CustomerAddressController.php:15
* @route '/admin/customer-addresses'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::index
* @see app/Http/Controllers/Admin/CustomerAddressController.php:15
* @route '/admin/customer-addresses'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::index
* @see app/Http/Controllers/Admin/CustomerAddressController.php:15
* @route '/admin/customer-addresses'
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
* @see \App\Http\Controllers\Admin\CustomerAddressController::show
* @see app/Http/Controllers/Admin/CustomerAddressController.php:20
* @route '/admin/customer-addresses/{customerAddress}'
*/
export const show = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/customer-addresses/{customerAddress}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::show
* @see app/Http/Controllers/Admin/CustomerAddressController.php:20
* @route '/admin/customer-addresses/{customerAddress}'
*/
show.url = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { customerAddress: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { customerAddress: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            customerAddress: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customerAddress: typeof args.customerAddress === 'object'
        ? args.customerAddress.id
        : args.customerAddress,
    }

    return show.definition.url
            .replace('{customerAddress}', parsedArgs.customerAddress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::show
* @see app/Http/Controllers/Admin/CustomerAddressController.php:20
* @route '/admin/customer-addresses/{customerAddress}'
*/
show.get = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::show
* @see app/Http/Controllers/Admin/CustomerAddressController.php:20
* @route '/admin/customer-addresses/{customerAddress}'
*/
show.head = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::show
* @see app/Http/Controllers/Admin/CustomerAddressController.php:20
* @route '/admin/customer-addresses/{customerAddress}'
*/
const showForm = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::show
* @see app/Http/Controllers/Admin/CustomerAddressController.php:20
* @route '/admin/customer-addresses/{customerAddress}'
*/
showForm.get = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::show
* @see app/Http/Controllers/Admin/CustomerAddressController.php:20
* @route '/admin/customer-addresses/{customerAddress}'
*/
showForm.head = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::edit
* @see app/Http/Controllers/Admin/CustomerAddressController.php:25
* @route '/admin/customer-addresses/{customerAddress}/edit'
*/
export const edit = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/customer-addresses/{customerAddress}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::edit
* @see app/Http/Controllers/Admin/CustomerAddressController.php:25
* @route '/admin/customer-addresses/{customerAddress}/edit'
*/
edit.url = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { customerAddress: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { customerAddress: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            customerAddress: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customerAddress: typeof args.customerAddress === 'object'
        ? args.customerAddress.id
        : args.customerAddress,
    }

    return edit.definition.url
            .replace('{customerAddress}', parsedArgs.customerAddress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::edit
* @see app/Http/Controllers/Admin/CustomerAddressController.php:25
* @route '/admin/customer-addresses/{customerAddress}/edit'
*/
edit.get = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::edit
* @see app/Http/Controllers/Admin/CustomerAddressController.php:25
* @route '/admin/customer-addresses/{customerAddress}/edit'
*/
edit.head = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::edit
* @see app/Http/Controllers/Admin/CustomerAddressController.php:25
* @route '/admin/customer-addresses/{customerAddress}/edit'
*/
const editForm = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::edit
* @see app/Http/Controllers/Admin/CustomerAddressController.php:25
* @route '/admin/customer-addresses/{customerAddress}/edit'
*/
editForm.get = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::edit
* @see app/Http/Controllers/Admin/CustomerAddressController.php:25
* @route '/admin/customer-addresses/{customerAddress}/edit'
*/
editForm.head = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\CustomerAddressController::update
* @see app/Http/Controllers/Admin/CustomerAddressController.php:30
* @route '/admin/customer-addresses/{customerAddress}'
*/
export const update = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/customer-addresses/{customerAddress}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::update
* @see app/Http/Controllers/Admin/CustomerAddressController.php:30
* @route '/admin/customer-addresses/{customerAddress}'
*/
update.url = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { customerAddress: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { customerAddress: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            customerAddress: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customerAddress: typeof args.customerAddress === 'object'
        ? args.customerAddress.id
        : args.customerAddress,
    }

    return update.definition.url
            .replace('{customerAddress}', parsedArgs.customerAddress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::update
* @see app/Http/Controllers/Admin/CustomerAddressController.php:30
* @route '/admin/customer-addresses/{customerAddress}'
*/
update.put = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::update
* @see app/Http/Controllers/Admin/CustomerAddressController.php:30
* @route '/admin/customer-addresses/{customerAddress}'
*/
const updateForm = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::update
* @see app/Http/Controllers/Admin/CustomerAddressController.php:30
* @route '/admin/customer-addresses/{customerAddress}'
*/
updateForm.put = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\CustomerAddressController::destroy
* @see app/Http/Controllers/Admin/CustomerAddressController.php:37
* @route '/admin/customer-addresses/{customerAddress}'
*/
export const destroy = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/customer-addresses/{customerAddress}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::destroy
* @see app/Http/Controllers/Admin/CustomerAddressController.php:37
* @route '/admin/customer-addresses/{customerAddress}'
*/
destroy.url = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { customerAddress: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { customerAddress: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            customerAddress: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        customerAddress: typeof args.customerAddress === 'object'
        ? args.customerAddress.id
        : args.customerAddress,
    }

    return destroy.definition.url
            .replace('{customerAddress}', parsedArgs.customerAddress.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::destroy
* @see app/Http/Controllers/Admin/CustomerAddressController.php:37
* @route '/admin/customer-addresses/{customerAddress}'
*/
destroy.delete = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::destroy
* @see app/Http/Controllers/Admin/CustomerAddressController.php:37
* @route '/admin/customer-addresses/{customerAddress}'
*/
const destroyForm = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CustomerAddressController::destroy
* @see app/Http/Controllers/Admin/CustomerAddressController.php:37
* @route '/admin/customer-addresses/{customerAddress}'
*/
destroyForm.delete = (args: { customerAddress: string | number | { id: string | number } } | [customerAddress: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const customerAddresses = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default customerAddresses