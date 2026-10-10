import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::index
* @see app/Http/Controllers/Admin/GalleryImageController.php:15
* @route '/admin/gallery'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/gallery',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::index
* @see app/Http/Controllers/Admin/GalleryImageController.php:15
* @route '/admin/gallery'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::index
* @see app/Http/Controllers/Admin/GalleryImageController.php:15
* @route '/admin/gallery'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::index
* @see app/Http/Controllers/Admin/GalleryImageController.php:15
* @route '/admin/gallery'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::index
* @see app/Http/Controllers/Admin/GalleryImageController.php:15
* @route '/admin/gallery'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::index
* @see app/Http/Controllers/Admin/GalleryImageController.php:15
* @route '/admin/gallery'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::index
* @see app/Http/Controllers/Admin/GalleryImageController.php:15
* @route '/admin/gallery'
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
* @see \App\Http\Controllers\Admin\GalleryImageController::create
* @see app/Http/Controllers/Admin/GalleryImageController.php:20
* @route '/admin/gallery/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/gallery/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::create
* @see app/Http/Controllers/Admin/GalleryImageController.php:20
* @route '/admin/gallery/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::create
* @see app/Http/Controllers/Admin/GalleryImageController.php:20
* @route '/admin/gallery/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::create
* @see app/Http/Controllers/Admin/GalleryImageController.php:20
* @route '/admin/gallery/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::create
* @see app/Http/Controllers/Admin/GalleryImageController.php:20
* @route '/admin/gallery/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::create
* @see app/Http/Controllers/Admin/GalleryImageController.php:20
* @route '/admin/gallery/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::create
* @see app/Http/Controllers/Admin/GalleryImageController.php:20
* @route '/admin/gallery/create'
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
* @see \App\Http\Controllers\Admin\GalleryImageController::store
* @see app/Http/Controllers/Admin/GalleryImageController.php:29
* @route '/admin/gallery'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/gallery',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::store
* @see app/Http/Controllers/Admin/GalleryImageController.php:29
* @route '/admin/gallery'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::store
* @see app/Http/Controllers/Admin/GalleryImageController.php:29
* @route '/admin/gallery'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::store
* @see app/Http/Controllers/Admin/GalleryImageController.php:29
* @route '/admin/gallery'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::store
* @see app/Http/Controllers/Admin/GalleryImageController.php:29
* @route '/admin/gallery'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::edit
* @see app/Http/Controllers/Admin/GalleryImageController.php:36
* @route '/admin/gallery/{galleryImage}/edit'
*/
export const edit = (args: { galleryImage: string | number | { id: string | number } } | [galleryImage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/gallery/{galleryImage}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::edit
* @see app/Http/Controllers/Admin/GalleryImageController.php:36
* @route '/admin/gallery/{galleryImage}/edit'
*/
edit.url = (args: { galleryImage: string | number | { id: string | number } } | [galleryImage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { galleryImage: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { galleryImage: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            galleryImage: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        galleryImage: typeof args.galleryImage === 'object'
        ? args.galleryImage.id
        : args.galleryImage,
    }

    return edit.definition.url
            .replace('{galleryImage}', parsedArgs.galleryImage.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::edit
* @see app/Http/Controllers/Admin/GalleryImageController.php:36
* @route '/admin/gallery/{galleryImage}/edit'
*/
edit.get = (args: { galleryImage: string | number | { id: string | number } } | [galleryImage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::edit
* @see app/Http/Controllers/Admin/GalleryImageController.php:36
* @route '/admin/gallery/{galleryImage}/edit'
*/
edit.head = (args: { galleryImage: string | number | { id: string | number } } | [galleryImage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::edit
* @see app/Http/Controllers/Admin/GalleryImageController.php:36
* @route '/admin/gallery/{galleryImage}/edit'
*/
const editForm = (args: { galleryImage: string | number | { id: string | number } } | [galleryImage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::edit
* @see app/Http/Controllers/Admin/GalleryImageController.php:36
* @route '/admin/gallery/{galleryImage}/edit'
*/
editForm.get = (args: { galleryImage: string | number | { id: string | number } } | [galleryImage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::edit
* @see app/Http/Controllers/Admin/GalleryImageController.php:36
* @route '/admin/gallery/{galleryImage}/edit'
*/
editForm.head = (args: { galleryImage: string | number | { id: string | number } } | [galleryImage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\GalleryImageController::update
* @see app/Http/Controllers/Admin/GalleryImageController.php:47
* @route '/admin/gallery/{galleryImage}'
*/
export const update = (args: { galleryImage: string | number | { id: string | number } } | [galleryImage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/gallery/{galleryImage}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::update
* @see app/Http/Controllers/Admin/GalleryImageController.php:47
* @route '/admin/gallery/{galleryImage}'
*/
update.url = (args: { galleryImage: string | number | { id: string | number } } | [galleryImage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { galleryImage: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { galleryImage: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            galleryImage: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        galleryImage: typeof args.galleryImage === 'object'
        ? args.galleryImage.id
        : args.galleryImage,
    }

    return update.definition.url
            .replace('{galleryImage}', parsedArgs.galleryImage.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::update
* @see app/Http/Controllers/Admin/GalleryImageController.php:47
* @route '/admin/gallery/{galleryImage}'
*/
update.put = (args: { galleryImage: string | number | { id: string | number } } | [galleryImage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::update
* @see app/Http/Controllers/Admin/GalleryImageController.php:47
* @route '/admin/gallery/{galleryImage}'
*/
const updateForm = (args: { galleryImage: string | number | { id: string | number } } | [galleryImage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::update
* @see app/Http/Controllers/Admin/GalleryImageController.php:47
* @route '/admin/gallery/{galleryImage}'
*/
updateForm.put = (args: { galleryImage: string | number | { id: string | number } } | [galleryImage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\GalleryImageController::destroy
* @see app/Http/Controllers/Admin/GalleryImageController.php:54
* @route '/admin/gallery/{galleryImage}'
*/
export const destroy = (args: { galleryImage: string | number | { id: string | number } } | [galleryImage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/gallery/{galleryImage}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::destroy
* @see app/Http/Controllers/Admin/GalleryImageController.php:54
* @route '/admin/gallery/{galleryImage}'
*/
destroy.url = (args: { galleryImage: string | number | { id: string | number } } | [galleryImage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { galleryImage: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { galleryImage: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            galleryImage: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        galleryImage: typeof args.galleryImage === 'object'
        ? args.galleryImage.id
        : args.galleryImage,
    }

    return destroy.definition.url
            .replace('{galleryImage}', parsedArgs.galleryImage.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::destroy
* @see app/Http/Controllers/Admin/GalleryImageController.php:54
* @route '/admin/gallery/{galleryImage}'
*/
destroy.delete = (args: { galleryImage: string | number | { id: string | number } } | [galleryImage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::destroy
* @see app/Http/Controllers/Admin/GalleryImageController.php:54
* @route '/admin/gallery/{galleryImage}'
*/
const destroyForm = (args: { galleryImage: string | number | { id: string | number } } | [galleryImage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::destroy
* @see app/Http/Controllers/Admin/GalleryImageController.php:54
* @route '/admin/gallery/{galleryImage}'
*/
destroyForm.delete = (args: { galleryImage: string | number | { id: string | number } } | [galleryImage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const GalleryImageController = { index, create, store, edit, update, destroy }

export default GalleryImageController