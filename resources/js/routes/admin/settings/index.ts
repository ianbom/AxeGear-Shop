import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings'
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

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: store.url(options),
    method: 'get',
})

store.definition = {
    methods: ["get","head"],
    url: '/admin/settings/store',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
store.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: store.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
store.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: store.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: store.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
storeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: store.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/store'
*/
storeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: store.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\SettingController::contact
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
export const contact = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})

contact.definition = {
    methods: ["get","head"],
    url: '/admin/settings/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::contact
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
contact.url = (options?: RouteQueryOptions) => {
    return contact.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::contact
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
contact.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::contact
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
contact.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contact.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::contact
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
const contactForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contact.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::contact
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
contactForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contact.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::contact
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/contact'
*/
contactForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contact.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

contact.form = contactForm

/**
* @see \App\Http\Controllers\Admin\SettingController::payment
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
export const payment = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payment.url(options),
    method: 'get',
})

payment.definition = {
    methods: ["get","head"],
    url: '/admin/settings/payment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::payment
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
payment.url = (options?: RouteQueryOptions) => {
    return payment.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::payment
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
payment.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payment.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::payment
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
payment.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: payment.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::payment
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
const paymentForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: payment.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::payment
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
paymentForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: payment.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::payment
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/payment'
*/
paymentForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: payment.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

payment.form = paymentForm

/**
* @see \App\Http\Controllers\Admin\SettingController::shipping
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
export const shipping = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shipping.url(options),
    method: 'get',
})

shipping.definition = {
    methods: ["get","head"],
    url: '/admin/settings/shipping',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::shipping
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
shipping.url = (options?: RouteQueryOptions) => {
    return shipping.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::shipping
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
shipping.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shipping.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::shipping
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
shipping.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: shipping.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::shipping
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
const shippingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: shipping.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::shipping
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
shippingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: shipping.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::shipping
* @see app/Http/Controllers/Admin/SettingController.php:14
* @route '/admin/settings/shipping'
*/
shippingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: shipping.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

shipping.form = shippingForm

const settings = {
    index: Object.assign(index, index),
    update: Object.assign(update, update),
    store: Object.assign(store, store),
    contact: Object.assign(contact, contact),
    payment: Object.assign(payment, payment),
    shipping: Object.assign(shipping, shipping),
}

export default settings