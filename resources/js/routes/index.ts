import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

login.form = loginForm

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

logout.form = logoutForm

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

register.form = registerForm

/**
* @see \App\Http\Controllers\Customer\HomeController::home
* @see app/Http/Controllers/Customer/HomeController.php:13
* @route '/'
*/
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\HomeController::home
* @see app/Http/Controllers/Customer/HomeController.php:13
* @route '/'
*/
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\HomeController::home
* @see app/Http/Controllers/Customer/HomeController.php:13
* @route '/'
*/
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\HomeController::home
* @see app/Http/Controllers/Customer/HomeController.php:13
* @route '/'
*/
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\HomeController::home
* @see app/Http/Controllers/Customer/HomeController.php:13
* @route '/'
*/
const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\HomeController::home
* @see app/Http/Controllers/Customer/HomeController.php:13
* @route '/'
*/
homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\HomeController::home
* @see app/Http/Controllers/Customer/HomeController.php:13
* @route '/'
*/
homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

home.form = homeForm

/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
export const gallery = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: gallery.url(options),
    method: 'get',
})

gallery.definition = {
    methods: ["get","head"],
    url: '/gallery',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
gallery.url = (options?: RouteQueryOptions) => {
    return gallery.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
gallery.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: gallery.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
gallery.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: gallery.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
const galleryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: gallery.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
galleryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: gallery.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
galleryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: gallery.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

gallery.form = galleryForm

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
export const about = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})

about.definition = {
    methods: ["get","head"],
    url: '/about',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
about.url = (options?: RouteQueryOptions) => {
    return about.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
about.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
about.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: about.url(options),
    method: 'head',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
const aboutForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: about.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
aboutForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: about.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
aboutForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: about.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

about.form = aboutForm

/**
* @see \App\Http\Controllers\BlogController::blog
* @see app/Http/Controllers/BlogController.php:11
* @route '/blog'
*/
export const blog = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: blog.url(options),
    method: 'get',
})

blog.definition = {
    methods: ["get","head"],
    url: '/blog',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BlogController::blog
* @see app/Http/Controllers/BlogController.php:11
* @route '/blog'
*/
blog.url = (options?: RouteQueryOptions) => {
    return blog.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BlogController::blog
* @see app/Http/Controllers/BlogController.php:11
* @route '/blog'
*/
blog.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: blog.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BlogController::blog
* @see app/Http/Controllers/BlogController.php:11
* @route '/blog'
*/
blog.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: blog.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BlogController::blog
* @see app/Http/Controllers/BlogController.php:11
* @route '/blog'
*/
const blogForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: blog.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BlogController::blog
* @see app/Http/Controllers/BlogController.php:11
* @route '/blog'
*/
blogForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: blog.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BlogController::blog
* @see app/Http/Controllers/BlogController.php:11
* @route '/blog'
*/
blogForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: blog.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

blog.form = blogForm

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
export const contact = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})

contact.definition = {
    methods: ["get","head"],
    url: '/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
contact.url = (options?: RouteQueryOptions) => {
    return contact.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
contact.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
contact.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contact.url(options),
    method: 'head',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
const contactForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contact.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
contactForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contact.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
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
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
export const newProduct = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: newProduct.url(options),
    method: 'get',
})

newProduct.definition = {
    methods: ["get","head"],
    url: '/new-product',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
newProduct.url = (options?: RouteQueryOptions) => {
    return newProduct.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
newProduct.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: newProduct.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
newProduct.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: newProduct.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
const newProductForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: newProduct.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
newProductForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: newProduct.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
newProductForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: newProduct.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

newProduct.form = newProductForm

/**
* @see \App\Http\Controllers\Customer\ProductController::detail
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
export const detail = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detail.url(options),
    method: 'get',
})

detail.definition = {
    methods: ["get","head"],
    url: '/detail',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\ProductController::detail
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
detail.url = (options?: RouteQueryOptions) => {
    return detail.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\ProductController::detail
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
detail.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detail.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\ProductController::detail
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
detail.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: detail.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\ProductController::detail
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
const detailForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: detail.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\ProductController::detail
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
detailForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: detail.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\ProductController::detail
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
detailForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: detail.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

detail.form = detailForm

/**
* @see \App\Http\Controllers\Customer\ProductController::list
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\ProductController::list
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\ProductController::list
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\ProductController::list
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\ProductController::list
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
const listForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\ProductController::list
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
listForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\ProductController::list
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
listForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: list.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

list.form = listForm

/**
* @see routes/web.php:70
* @route '/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:70
* @route '/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see routes/web.php:70
* @route '/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:70
* @route '/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see routes/web.php:70
* @route '/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:70
* @route '/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:70
* @route '/dashboard'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm

/**
* @see \App\Http\Controllers\Settings\ProfileController::myProfile
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
export const myProfile = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myProfile.url(options),
    method: 'get',
})

myProfile.definition = {
    methods: ["get","head"],
    url: '/my-profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::myProfile
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
myProfile.url = (options?: RouteQueryOptions) => {
    return myProfile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::myProfile
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
myProfile.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myProfile.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::myProfile
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
myProfile.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myProfile.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::myProfile
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
const myProfileForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myProfile.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::myProfile
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
myProfileForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myProfile.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::myProfile
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
myProfileForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myProfile.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

myProfile.form = myProfileForm

/**
* @see \App\Http\Controllers\Customer\CartController::cart
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
export const cart = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cart.url(options),
    method: 'get',
})

cart.definition = {
    methods: ["get","head"],
    url: '/my-cart',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\CartController::cart
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
cart.url = (options?: RouteQueryOptions) => {
    return cart.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CartController::cart
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
cart.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cart.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\CartController::cart
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
cart.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cart.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\CartController::cart
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
const cartForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cart.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\CartController::cart
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
cartForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cart.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\CartController::cart
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
cartForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cart.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

cart.form = cartForm

/**
* @see \App\Http\Controllers\Customer\CheckoutController::checkout
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
export const checkout = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkout.url(options),
    method: 'get',
})

checkout.definition = {
    methods: ["get","head"],
    url: '/checkout',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\CheckoutController::checkout
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
checkout.url = (options?: RouteQueryOptions) => {
    return checkout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\CheckoutController::checkout
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
checkout.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkout.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::checkout
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
checkout.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkout.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::checkout
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
const checkoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: checkout.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::checkout
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
checkoutForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: checkout.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\CheckoutController::checkout
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
checkoutForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: checkout.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

checkout.form = checkoutForm

/**
* @see \App\Http\Controllers\Customer\OrderController::myOrder
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
export const myOrder = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myOrder.url(options),
    method: 'get',
})

myOrder.definition = {
    methods: ["get","head"],
    url: '/my-order',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\OrderController::myOrder
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
myOrder.url = (options?: RouteQueryOptions) => {
    return myOrder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\OrderController::myOrder
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
myOrder.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myOrder.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\OrderController::myOrder
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
myOrder.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myOrder.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\OrderController::myOrder
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
const myOrderForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myOrder.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\OrderController::myOrder
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
myOrderForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myOrder.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\OrderController::myOrder
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
myOrderForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myOrder.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

myOrder.form = myOrderForm

/**
* @see \App\Http\Controllers\Customer\WishlistController::myWishlist
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
export const myWishlist = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myWishlist.url(options),
    method: 'get',
})

myWishlist.definition = {
    methods: ["get","head"],
    url: '/wishlist',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\WishlistController::myWishlist
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
myWishlist.url = (options?: RouteQueryOptions) => {
    return myWishlist.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\WishlistController::myWishlist
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
myWishlist.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myWishlist.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\WishlistController::myWishlist
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
myWishlist.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myWishlist.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\WishlistController::myWishlist
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
const myWishlistForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myWishlist.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\WishlistController::myWishlist
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
myWishlistForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myWishlist.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\WishlistController::myWishlist
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
myWishlistForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myWishlist.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

myWishlist.form = myWishlistForm

/**
* @see \App\Http\Controllers\Customer\NotificationController::notifications
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
export const notifications = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notifications.url(options),
    method: 'get',
})

notifications.definition = {
    methods: ["get","head"],
    url: '/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\NotificationController::notifications
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
notifications.url = (options?: RouteQueryOptions) => {
    return notifications.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\NotificationController::notifications
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
notifications.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notifications.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\NotificationController::notifications
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
notifications.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: notifications.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\NotificationController::notifications
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
const notificationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: notifications.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\NotificationController::notifications
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
notificationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: notifications.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\NotificationController::notifications
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
notificationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: notifications.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

notifications.form = notificationsForm

/**
* @see \App\Http\Controllers\Customer\AddressController::manageAddress
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
export const manageAddress = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manageAddress.url(options),
    method: 'get',
})

manageAddress.definition = {
    methods: ["get","head"],
    url: '/address',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Customer\AddressController::manageAddress
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
manageAddress.url = (options?: RouteQueryOptions) => {
    return manageAddress.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Customer\AddressController::manageAddress
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
manageAddress.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manageAddress.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\AddressController::manageAddress
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
manageAddress.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: manageAddress.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Customer\AddressController::manageAddress
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
const manageAddressForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: manageAddress.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\AddressController::manageAddress
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
manageAddressForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: manageAddress.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Customer\AddressController::manageAddress
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
manageAddressForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: manageAddress.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

manageAddress.form = manageAddressForm
