import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
const index0c70edcc722471a5b69e029da05ad7cd = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'get',
})

index0c70edcc722471a5b69e029da05ad7cd.definition = {
    methods: ["get","head"],
    url: '/admin/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
index0c70edcc722471a5b69e029da05ad7cd.url = (options?: RouteQueryOptions) => {
    return index0c70edcc722471a5b69e029da05ad7cd.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
index0c70edcc722471a5b69e029da05ad7cd.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
index0c70edcc722471a5b69e029da05ad7cd.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
const index0c70edcc722471a5b69e029da05ad7cdForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
index0c70edcc722471a5b69e029da05ad7cdForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
index0c70edcc722471a5b69e029da05ad7cdForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index0c70edcc722471a5b69e029da05ad7cd.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index0c70edcc722471a5b69e029da05ad7cd.form = index0c70edcc722471a5b69e029da05ad7cdForm
/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
const indexc3685980431a2226d878a79d3ffa00b9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexc3685980431a2226d878a79d3ffa00b9.url(options),
    method: 'get',
})

indexc3685980431a2226d878a79d3ffa00b9.definition = {
    methods: ["get","head"],
    url: '/admin/settings/store',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
indexc3685980431a2226d878a79d3ffa00b9.url = (options?: RouteQueryOptions) => {
    return indexc3685980431a2226d878a79d3ffa00b9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
indexc3685980431a2226d878a79d3ffa00b9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexc3685980431a2226d878a79d3ffa00b9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
indexc3685980431a2226d878a79d3ffa00b9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexc3685980431a2226d878a79d3ffa00b9.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
const indexc3685980431a2226d878a79d3ffa00b9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexc3685980431a2226d878a79d3ffa00b9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
indexc3685980431a2226d878a79d3ffa00b9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexc3685980431a2226d878a79d3ffa00b9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
indexc3685980431a2226d878a79d3ffa00b9Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexc3685980431a2226d878a79d3ffa00b9.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexc3685980431a2226d878a79d3ffa00b9.form = indexc3685980431a2226d878a79d3ffa00b9Form
/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
const index00a37dc6cd0135d753e3b0b8a46ccabd = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index00a37dc6cd0135d753e3b0b8a46ccabd.url(options),
    method: 'get',
})

index00a37dc6cd0135d753e3b0b8a46ccabd.definition = {
    methods: ["get","head"],
    url: '/admin/settings/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
index00a37dc6cd0135d753e3b0b8a46ccabd.url = (options?: RouteQueryOptions) => {
    return index00a37dc6cd0135d753e3b0b8a46ccabd.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
index00a37dc6cd0135d753e3b0b8a46ccabd.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index00a37dc6cd0135d753e3b0b8a46ccabd.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
index00a37dc6cd0135d753e3b0b8a46ccabd.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index00a37dc6cd0135d753e3b0b8a46ccabd.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
const index00a37dc6cd0135d753e3b0b8a46ccabdForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index00a37dc6cd0135d753e3b0b8a46ccabd.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
index00a37dc6cd0135d753e3b0b8a46ccabdForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index00a37dc6cd0135d753e3b0b8a46ccabd.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
index00a37dc6cd0135d753e3b0b8a46ccabdForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index00a37dc6cd0135d753e3b0b8a46ccabd.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index00a37dc6cd0135d753e3b0b8a46ccabd.form = index00a37dc6cd0135d753e3b0b8a46ccabdForm
/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
const index80e25c7327926441dc1e987cfbf08785 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index80e25c7327926441dc1e987cfbf08785.url(options),
    method: 'get',
})

index80e25c7327926441dc1e987cfbf08785.definition = {
    methods: ["get","head"],
    url: '/admin/settings/payment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
index80e25c7327926441dc1e987cfbf08785.url = (options?: RouteQueryOptions) => {
    return index80e25c7327926441dc1e987cfbf08785.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
index80e25c7327926441dc1e987cfbf08785.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index80e25c7327926441dc1e987cfbf08785.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
index80e25c7327926441dc1e987cfbf08785.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index80e25c7327926441dc1e987cfbf08785.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
const index80e25c7327926441dc1e987cfbf08785Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index80e25c7327926441dc1e987cfbf08785.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
index80e25c7327926441dc1e987cfbf08785Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index80e25c7327926441dc1e987cfbf08785.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
index80e25c7327926441dc1e987cfbf08785Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index80e25c7327926441dc1e987cfbf08785.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index80e25c7327926441dc1e987cfbf08785.form = index80e25c7327926441dc1e987cfbf08785Form
/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
const index546087b7fcd7b04a5cd00996ac336692 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index546087b7fcd7b04a5cd00996ac336692.url(options),
    method: 'get',
})

index546087b7fcd7b04a5cd00996ac336692.definition = {
    methods: ["get","head"],
    url: '/admin/settings/shipping',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
index546087b7fcd7b04a5cd00996ac336692.url = (options?: RouteQueryOptions) => {
    return index546087b7fcd7b04a5cd00996ac336692.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
index546087b7fcd7b04a5cd00996ac336692.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index546087b7fcd7b04a5cd00996ac336692.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
index546087b7fcd7b04a5cd00996ac336692.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index546087b7fcd7b04a5cd00996ac336692.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
const index546087b7fcd7b04a5cd00996ac336692Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index546087b7fcd7b04a5cd00996ac336692.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
index546087b7fcd7b04a5cd00996ac336692Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index546087b7fcd7b04a5cd00996ac336692.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
index546087b7fcd7b04a5cd00996ac336692Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index546087b7fcd7b04a5cd00996ac336692.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index546087b7fcd7b04a5cd00996ac336692.form = index546087b7fcd7b04a5cd00996ac336692Form

export const index = {
    '/admin/settings': index0c70edcc722471a5b69e029da05ad7cd,
    '/admin/settings/store': indexc3685980431a2226d878a79d3ffa00b9,
    '/admin/settings/contact': index00a37dc6cd0135d753e3b0b8a46ccabd,
    '/admin/settings/payment': index80e25c7327926441dc1e987cfbf08785,
    '/admin/settings/shipping': index546087b7fcd7b04a5cd00996ac336692,
}

/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:19
* @route '/admin/settings'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/settings',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:19
* @route '/admin/settings'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:19
* @route '/admin/settings'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:19
* @route '/admin/settings'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:19
* @route '/admin/settings'
*/
updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const SettingController = { index, update }

export default SettingController