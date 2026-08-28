import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\BlogArticleController::index
* @see app/Http/Controllers/Admin/BlogArticleController.php:15
* @route '/admin/blogs'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/blogs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::index
* @see app/Http/Controllers/Admin/BlogArticleController.php:15
* @route '/admin/blogs'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::index
* @see app/Http/Controllers/Admin/BlogArticleController.php:15
* @route '/admin/blogs'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::index
* @see app/Http/Controllers/Admin/BlogArticleController.php:15
* @route '/admin/blogs'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::index
* @see app/Http/Controllers/Admin/BlogArticleController.php:15
* @route '/admin/blogs'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::index
* @see app/Http/Controllers/Admin/BlogArticleController.php:15
* @route '/admin/blogs'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::index
* @see app/Http/Controllers/Admin/BlogArticleController.php:15
* @route '/admin/blogs'
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
* @see \App\Http\Controllers\Admin\BlogArticleController::create
* @see app/Http/Controllers/Admin/BlogArticleController.php:20
* @route '/admin/blogs/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/blogs/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::create
* @see app/Http/Controllers/Admin/BlogArticleController.php:20
* @route '/admin/blogs/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::create
* @see app/Http/Controllers/Admin/BlogArticleController.php:20
* @route '/admin/blogs/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::create
* @see app/Http/Controllers/Admin/BlogArticleController.php:20
* @route '/admin/blogs/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::create
* @see app/Http/Controllers/Admin/BlogArticleController.php:20
* @route '/admin/blogs/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::create
* @see app/Http/Controllers/Admin/BlogArticleController.php:20
* @route '/admin/blogs/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::create
* @see app/Http/Controllers/Admin/BlogArticleController.php:20
* @route '/admin/blogs/create'
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
* @see \App\Http\Controllers\Admin\BlogArticleController::store
* @see app/Http/Controllers/Admin/BlogArticleController.php:25
* @route '/admin/blogs'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/blogs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::store
* @see app/Http/Controllers/Admin/BlogArticleController.php:25
* @route '/admin/blogs'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::store
* @see app/Http/Controllers/Admin/BlogArticleController.php:25
* @route '/admin/blogs'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::store
* @see app/Http/Controllers/Admin/BlogArticleController.php:25
* @route '/admin/blogs'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::store
* @see app/Http/Controllers/Admin/BlogArticleController.php:25
* @route '/admin/blogs'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::edit
* @see app/Http/Controllers/Admin/BlogArticleController.php:32
* @route '/admin/blogs/{blogArticle}/edit'
*/
export const edit = (args: { blogArticle: string | number | { id: string | number } } | [blogArticle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/blogs/{blogArticle}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::edit
* @see app/Http/Controllers/Admin/BlogArticleController.php:32
* @route '/admin/blogs/{blogArticle}/edit'
*/
edit.url = (args: { blogArticle: string | number | { id: string | number } } | [blogArticle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { blogArticle: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { blogArticle: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            blogArticle: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        blogArticle: typeof args.blogArticle === 'object'
        ? args.blogArticle.id
        : args.blogArticle,
    }

    return edit.definition.url
            .replace('{blogArticle}', parsedArgs.blogArticle.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::edit
* @see app/Http/Controllers/Admin/BlogArticleController.php:32
* @route '/admin/blogs/{blogArticle}/edit'
*/
edit.get = (args: { blogArticle: string | number | { id: string | number } } | [blogArticle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::edit
* @see app/Http/Controllers/Admin/BlogArticleController.php:32
* @route '/admin/blogs/{blogArticle}/edit'
*/
edit.head = (args: { blogArticle: string | number | { id: string | number } } | [blogArticle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::edit
* @see app/Http/Controllers/Admin/BlogArticleController.php:32
* @route '/admin/blogs/{blogArticle}/edit'
*/
const editForm = (args: { blogArticle: string | number | { id: string | number } } | [blogArticle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::edit
* @see app/Http/Controllers/Admin/BlogArticleController.php:32
* @route '/admin/blogs/{blogArticle}/edit'
*/
editForm.get = (args: { blogArticle: string | number | { id: string | number } } | [blogArticle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::edit
* @see app/Http/Controllers/Admin/BlogArticleController.php:32
* @route '/admin/blogs/{blogArticle}/edit'
*/
editForm.head = (args: { blogArticle: string | number | { id: string | number } } | [blogArticle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\BlogArticleController::update
* @see app/Http/Controllers/Admin/BlogArticleController.php:37
* @route '/admin/blogs/{blogArticle}'
*/
export const update = (args: { blogArticle: string | number | { id: string | number } } | [blogArticle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/blogs/{blogArticle}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::update
* @see app/Http/Controllers/Admin/BlogArticleController.php:37
* @route '/admin/blogs/{blogArticle}'
*/
update.url = (args: { blogArticle: string | number | { id: string | number } } | [blogArticle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { blogArticle: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { blogArticle: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            blogArticle: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        blogArticle: typeof args.blogArticle === 'object'
        ? args.blogArticle.id
        : args.blogArticle,
    }

    return update.definition.url
            .replace('{blogArticle}', parsedArgs.blogArticle.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::update
* @see app/Http/Controllers/Admin/BlogArticleController.php:37
* @route '/admin/blogs/{blogArticle}'
*/
update.put = (args: { blogArticle: string | number | { id: string | number } } | [blogArticle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::update
* @see app/Http/Controllers/Admin/BlogArticleController.php:37
* @route '/admin/blogs/{blogArticle}'
*/
const updateForm = (args: { blogArticle: string | number | { id: string | number } } | [blogArticle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::update
* @see app/Http/Controllers/Admin/BlogArticleController.php:37
* @route '/admin/blogs/{blogArticle}'
*/
updateForm.put = (args: { blogArticle: string | number | { id: string | number } } | [blogArticle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\BlogArticleController::destroy
* @see app/Http/Controllers/Admin/BlogArticleController.php:44
* @route '/admin/blogs/{blogArticle}'
*/
export const destroy = (args: { blogArticle: string | number | { id: string | number } } | [blogArticle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/blogs/{blogArticle}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::destroy
* @see app/Http/Controllers/Admin/BlogArticleController.php:44
* @route '/admin/blogs/{blogArticle}'
*/
destroy.url = (args: { blogArticle: string | number | { id: string | number } } | [blogArticle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { blogArticle: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { blogArticle: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            blogArticle: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        blogArticle: typeof args.blogArticle === 'object'
        ? args.blogArticle.id
        : args.blogArticle,
    }

    return destroy.definition.url
            .replace('{blogArticle}', parsedArgs.blogArticle.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::destroy
* @see app/Http/Controllers/Admin/BlogArticleController.php:44
* @route '/admin/blogs/{blogArticle}'
*/
destroy.delete = (args: { blogArticle: string | number | { id: string | number } } | [blogArticle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::destroy
* @see app/Http/Controllers/Admin/BlogArticleController.php:44
* @route '/admin/blogs/{blogArticle}'
*/
const destroyForm = (args: { blogArticle: string | number | { id: string | number } } | [blogArticle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\BlogArticleController::destroy
* @see app/Http/Controllers/Admin/BlogArticleController.php:44
* @route '/admin/blogs/{blogArticle}'
*/
destroyForm.delete = (args: { blogArticle: string | number | { id: string | number } } | [blogArticle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const blogs = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default blogs