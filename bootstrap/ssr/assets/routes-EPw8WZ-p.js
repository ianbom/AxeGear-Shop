import { n as queryParams } from "./wayfinder-Bgbpuenu.js";
//#region resources/js/routes/index.ts
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
var login = (options) => ({
	url: login.url(options),
	method: "get"
});
login.definition = {
	methods: ["get", "head"],
	url: "/login"
};
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.url = (options) => {
	return login.definition.url + queryParams(options);
};
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.get = (options) => ({
	url: login.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.head = (options) => ({
	url: login.url(options),
	method: "head"
});
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
var loginForm = (options) => ({
	action: login.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
loginForm.get = (options) => ({
	action: login.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
loginForm.head = (options) => ({
	action: login.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
login.form = loginForm;
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
var logout = (options) => ({
	url: logout.url(options),
	method: "post"
});
logout.definition = {
	methods: ["post"],
	url: "/logout"
};
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logout.url = (options) => {
	return logout.definition.url + queryParams(options);
};
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logout.post = (options) => ({
	url: logout.url(options),
	method: "post"
});
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
var logoutForm = (options) => ({
	action: logout.url(options),
	method: "post"
});
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logoutForm.post = (options) => ({
	action: logout.url(options),
	method: "post"
});
logout.form = logoutForm;
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
var register = (options) => ({
	url: register.url(options),
	method: "get"
});
register.definition = {
	methods: ["get", "head"],
	url: "/register"
};
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.url = (options) => {
	return register.definition.url + queryParams(options);
};
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.get = (options) => ({
	url: register.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.head = (options) => ({
	url: register.url(options),
	method: "head"
});
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
var registerForm = (options) => ({
	action: register.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
registerForm.get = (options) => ({
	action: register.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
registerForm.head = (options) => ({
	action: register.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
register.form = registerForm;
/**
* @see \App\Http\Controllers\Customer\HomeController::home
* @see app/Http/Controllers/Customer/HomeController.php:13
* @route '/'
*/
var home = (options) => ({
	url: home.url(options),
	method: "get"
});
home.definition = {
	methods: ["get", "head"],
	url: "/"
};
/**
* @see \App\Http\Controllers\Customer\HomeController::home
* @see app/Http/Controllers/Customer/HomeController.php:13
* @route '/'
*/
home.url = (options) => {
	return home.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\HomeController::home
* @see app/Http/Controllers/Customer/HomeController.php:13
* @route '/'
*/
home.get = (options) => ({
	url: home.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\HomeController::home
* @see app/Http/Controllers/Customer/HomeController.php:13
* @route '/'
*/
home.head = (options) => ({
	url: home.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\HomeController::home
* @see app/Http/Controllers/Customer/HomeController.php:13
* @route '/'
*/
var homeForm = (options) => ({
	action: home.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\HomeController::home
* @see app/Http/Controllers/Customer/HomeController.php:13
* @route '/'
*/
homeForm.get = (options) => ({
	action: home.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\HomeController::home
* @see app/Http/Controllers/Customer/HomeController.php:13
* @route '/'
*/
homeForm.head = (options) => ({
	action: home.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
home.form = homeForm;
/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
var gallery = (options) => ({
	url: gallery.url(options),
	method: "get"
});
gallery.definition = {
	methods: ["get", "head"],
	url: "/gallery"
};
/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
gallery.url = (options) => {
	return gallery.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
gallery.get = (options) => ({
	url: gallery.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
gallery.head = (options) => ({
	url: gallery.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
var galleryForm = (options) => ({
	action: gallery.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
galleryForm.get = (options) => ({
	action: gallery.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\GalleryController::__invoke
* @see app/Http/Controllers/GalleryController.php:10
* @route '/gallery'
*/
galleryForm.head = (options) => ({
	action: gallery.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
gallery.form = galleryForm;
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
var about = (options) => ({
	url: about.url(options),
	method: "get"
});
about.definition = {
	methods: ["get", "head"],
	url: "/about"
};
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
about.url = (options) => {
	return about.definition.url + queryParams(options);
};
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
about.get = (options) => ({
	url: about.url(options),
	method: "get"
});
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
about.head = (options) => ({
	url: about.url(options),
	method: "head"
});
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
var aboutForm = (options) => ({
	action: about.url(options),
	method: "get"
});
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
aboutForm.get = (options) => ({
	action: about.url(options),
	method: "get"
});
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
aboutForm.head = (options) => ({
	action: about.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
about.form = aboutForm;
/**
* @see \App\Http\Controllers\BlogController::blog
* @see app/Http/Controllers/BlogController.php:11
* @route '/blog'
*/
var blog = (options) => ({
	url: blog.url(options),
	method: "get"
});
blog.definition = {
	methods: ["get", "head"],
	url: "/blog"
};
/**
* @see \App\Http\Controllers\BlogController::blog
* @see app/Http/Controllers/BlogController.php:11
* @route '/blog'
*/
blog.url = (options) => {
	return blog.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\BlogController::blog
* @see app/Http/Controllers/BlogController.php:11
* @route '/blog'
*/
blog.get = (options) => ({
	url: blog.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\BlogController::blog
* @see app/Http/Controllers/BlogController.php:11
* @route '/blog'
*/
blog.head = (options) => ({
	url: blog.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\BlogController::blog
* @see app/Http/Controllers/BlogController.php:11
* @route '/blog'
*/
var blogForm = (options) => ({
	action: blog.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\BlogController::blog
* @see app/Http/Controllers/BlogController.php:11
* @route '/blog'
*/
blogForm.get = (options) => ({
	action: blog.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\BlogController::blog
* @see app/Http/Controllers/BlogController.php:11
* @route '/blog'
*/
blogForm.head = (options) => ({
	action: blog.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
blog.form = blogForm;
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
var contact = (options) => ({
	url: contact.url(options),
	method: "get"
});
contact.definition = {
	methods: ["get", "head"],
	url: "/contact"
};
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
contact.url = (options) => {
	return contact.definition.url + queryParams(options);
};
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
contact.get = (options) => ({
	url: contact.url(options),
	method: "get"
});
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
contact.head = (options) => ({
	url: contact.url(options),
	method: "head"
});
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
var contactForm = (options) => ({
	action: contact.url(options),
	method: "get"
});
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
contactForm.get = (options) => ({
	action: contact.url(options),
	method: "get"
});
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
contactForm.head = (options) => ({
	action: contact.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
contact.form = contactForm;
/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
var newProduct = (options) => ({
	url: newProduct.url(options),
	method: "get"
});
newProduct.definition = {
	methods: ["get", "head"],
	url: "/new-product"
};
/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
newProduct.url = (options) => {
	return newProduct.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
newProduct.get = (options) => ({
	url: newProduct.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
newProduct.head = (options) => ({
	url: newProduct.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
var newProductForm = (options) => ({
	action: newProduct.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
newProductForm.get = (options) => ({
	action: newProduct.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\NewProductController::__invoke
* @see app/Http/Controllers/Customer/NewProductController.php:11
* @route '/new-product'
*/
newProductForm.head = (options) => ({
	action: newProduct.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
newProduct.form = newProductForm;
/**
* @see \App\Http\Controllers\Customer\ProductController::detail
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
var detail = (options) => ({
	url: detail.url(options),
	method: "get"
});
detail.definition = {
	methods: ["get", "head"],
	url: "/detail"
};
/**
* @see \App\Http\Controllers\Customer\ProductController::detail
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
detail.url = (options) => {
	return detail.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\ProductController::detail
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
detail.get = (options) => ({
	url: detail.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\ProductController::detail
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
detail.head = (options) => ({
	url: detail.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\ProductController::detail
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
var detailForm = (options) => ({
	action: detail.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\ProductController::detail
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
detailForm.get = (options) => ({
	action: detail.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\ProductController::detail
* @see app/Http/Controllers/Customer/ProductController.php:18
* @route '/detail'
*/
detailForm.head = (options) => ({
	action: detail.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
detail.form = detailForm;
/**
* @see \App\Http\Controllers\Customer\ProductController::list
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
var list = (options) => ({
	url: list.url(options),
	method: "get"
});
list.definition = {
	methods: ["get", "head"],
	url: "/list"
};
/**
* @see \App\Http\Controllers\Customer\ProductController::list
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
list.url = (options) => {
	return list.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\ProductController::list
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
list.get = (options) => ({
	url: list.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\ProductController::list
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
list.head = (options) => ({
	url: list.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\ProductController::list
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
var listForm = (options) => ({
	action: list.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\ProductController::list
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
listForm.get = (options) => ({
	action: list.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\ProductController::list
* @see app/Http/Controllers/Customer/ProductController.php:13
* @route '/list'
*/
listForm.head = (options) => ({
	action: list.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
list.form = listForm;
/**
* @see routes/web.php:70
* @route '/dashboard'
*/
var dashboard = (options) => ({
	url: dashboard.url(options),
	method: "get"
});
dashboard.definition = {
	methods: ["get", "head"],
	url: "/dashboard"
};
/**
* @see routes/web.php:70
* @route '/dashboard'
*/
dashboard.url = (options) => {
	return dashboard.definition.url + queryParams(options);
};
/**
* @see routes/web.php:70
* @route '/dashboard'
*/
dashboard.get = (options) => ({
	url: dashboard.url(options),
	method: "get"
});
/**
* @see routes/web.php:70
* @route '/dashboard'
*/
dashboard.head = (options) => ({
	url: dashboard.url(options),
	method: "head"
});
/**
* @see routes/web.php:70
* @route '/dashboard'
*/
var dashboardForm = (options) => ({
	action: dashboard.url(options),
	method: "get"
});
/**
* @see routes/web.php:70
* @route '/dashboard'
*/
dashboardForm.get = (options) => ({
	action: dashboard.url(options),
	method: "get"
});
/**
* @see routes/web.php:70
* @route '/dashboard'
*/
dashboardForm.head = (options) => ({
	action: dashboard.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
dashboard.form = dashboardForm;
/**
* @see \App\Http\Controllers\Settings\ProfileController::myProfile
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
var myProfile = (options) => ({
	url: myProfile.url(options),
	method: "get"
});
myProfile.definition = {
	methods: ["get", "head"],
	url: "/my-profile"
};
/**
* @see \App\Http\Controllers\Settings\ProfileController::myProfile
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
myProfile.url = (options) => {
	return myProfile.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Settings\ProfileController::myProfile
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
myProfile.get = (options) => ({
	url: myProfile.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::myProfile
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
myProfile.head = (options) => ({
	url: myProfile.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::myProfile
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
var myProfileForm = (options) => ({
	action: myProfile.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::myProfile
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
myProfileForm.get = (options) => ({
	action: myProfile.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Settings\ProfileController::myProfile
* @see app/Http/Controllers/Settings/ProfileController.php:25
* @route '/my-profile'
*/
myProfileForm.head = (options) => ({
	action: myProfile.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
myProfile.form = myProfileForm;
/**
* @see \App\Http\Controllers\Customer\CartController::cart
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
var cart = (options) => ({
	url: cart.url(options),
	method: "get"
});
cart.definition = {
	methods: ["get", "head"],
	url: "/my-cart"
};
/**
* @see \App\Http\Controllers\Customer\CartController::cart
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
cart.url = (options) => {
	return cart.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\CartController::cart
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
cart.get = (options) => ({
	url: cart.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\CartController::cart
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
cart.head = (options) => ({
	url: cart.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\CartController::cart
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
var cartForm = (options) => ({
	action: cart.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\CartController::cart
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
cartForm.get = (options) => ({
	action: cart.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\CartController::cart
* @see app/Http/Controllers/Customer/CartController.php:18
* @route '/my-cart'
*/
cartForm.head = (options) => ({
	action: cart.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
cart.form = cartForm;
/**
* @see \App\Http\Controllers\Customer\CheckoutController::checkout
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
var checkout = (options) => ({
	url: checkout.url(options),
	method: "get"
});
checkout.definition = {
	methods: ["get", "head"],
	url: "/checkout"
};
/**
* @see \App\Http\Controllers\Customer\CheckoutController::checkout
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
checkout.url = (options) => {
	return checkout.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\CheckoutController::checkout
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
checkout.get = (options) => ({
	url: checkout.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\CheckoutController::checkout
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
checkout.head = (options) => ({
	url: checkout.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\CheckoutController::checkout
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
var checkoutForm = (options) => ({
	action: checkout.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\CheckoutController::checkout
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
checkoutForm.get = (options) => ({
	action: checkout.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\CheckoutController::checkout
* @see app/Http/Controllers/Customer/CheckoutController.php:20
* @route '/checkout'
*/
checkoutForm.head = (options) => ({
	action: checkout.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
checkout.form = checkoutForm;
/**
* @see \App\Http\Controllers\Customer\OrderController::myOrder
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
var myOrder = (options) => ({
	url: myOrder.url(options),
	method: "get"
});
myOrder.definition = {
	methods: ["get", "head"],
	url: "/my-order"
};
/**
* @see \App\Http\Controllers\Customer\OrderController::myOrder
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
myOrder.url = (options) => {
	return myOrder.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\OrderController::myOrder
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
myOrder.get = (options) => ({
	url: myOrder.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\OrderController::myOrder
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
myOrder.head = (options) => ({
	url: myOrder.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\OrderController::myOrder
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
var myOrderForm = (options) => ({
	action: myOrder.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\OrderController::myOrder
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
myOrderForm.get = (options) => ({
	action: myOrder.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\OrderController::myOrder
* @see app/Http/Controllers/Customer/OrderController.php:15
* @route '/my-order'
*/
myOrderForm.head = (options) => ({
	action: myOrder.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
myOrder.form = myOrderForm;
/**
* @see \App\Http\Controllers\Customer\WishlistController::myWishlist
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
var myWishlist = (options) => ({
	url: myWishlist.url(options),
	method: "get"
});
myWishlist.definition = {
	methods: ["get", "head"],
	url: "/wishlist"
};
/**
* @see \App\Http\Controllers\Customer\WishlistController::myWishlist
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
myWishlist.url = (options) => {
	return myWishlist.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\WishlistController::myWishlist
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
myWishlist.get = (options) => ({
	url: myWishlist.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\WishlistController::myWishlist
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
myWishlist.head = (options) => ({
	url: myWishlist.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\WishlistController::myWishlist
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
var myWishlistForm = (options) => ({
	action: myWishlist.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\WishlistController::myWishlist
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
myWishlistForm.get = (options) => ({
	action: myWishlist.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\WishlistController::myWishlist
* @see app/Http/Controllers/Customer/WishlistController.php:17
* @route '/wishlist'
*/
myWishlistForm.head = (options) => ({
	action: myWishlist.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
myWishlist.form = myWishlistForm;
/**
* @see \App\Http\Controllers\Customer\NotificationController::notifications
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
var notifications = (options) => ({
	url: notifications.url(options),
	method: "get"
});
notifications.definition = {
	methods: ["get", "head"],
	url: "/notifications"
};
/**
* @see \App\Http\Controllers\Customer\NotificationController::notifications
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
notifications.url = (options) => {
	return notifications.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\NotificationController::notifications
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
notifications.get = (options) => ({
	url: notifications.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\NotificationController::notifications
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
notifications.head = (options) => ({
	url: notifications.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\NotificationController::notifications
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
var notificationsForm = (options) => ({
	action: notifications.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\NotificationController::notifications
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
notificationsForm.get = (options) => ({
	action: notifications.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\NotificationController::notifications
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
notificationsForm.head = (options) => ({
	action: notifications.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
notifications.form = notificationsForm;
/**
* @see \App\Http\Controllers\Customer\AddressController::manageAddress
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
var manageAddress = (options) => ({
	url: manageAddress.url(options),
	method: "get"
});
manageAddress.definition = {
	methods: ["get", "head"],
	url: "/address"
};
/**
* @see \App\Http\Controllers\Customer\AddressController::manageAddress
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
manageAddress.url = (options) => {
	return manageAddress.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\AddressController::manageAddress
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
manageAddress.get = (options) => ({
	url: manageAddress.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\AddressController::manageAddress
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
manageAddress.head = (options) => ({
	url: manageAddress.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\AddressController::manageAddress
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
var manageAddressForm = (options) => ({
	action: manageAddress.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\AddressController::manageAddress
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
manageAddressForm.get = (options) => ({
	action: manageAddress.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\AddressController::manageAddress
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
manageAddressForm.head = (options) => ({
	action: manageAddress.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
manageAddress.form = manageAddressForm;
//#endregion
export { home as a, logout as c, detail as i, register as l, checkout as n, list as o, dashboard as r, login as s, cart as t };

//# sourceMappingURL=routes-EPw8WZ-p.js.map