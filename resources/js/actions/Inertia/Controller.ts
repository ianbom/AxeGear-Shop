import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
const Controller535fd093ca1d5254af5dc12ac208e8d5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller535fd093ca1d5254af5dc12ac208e8d5.url(options),
    method: 'get',
})

Controller535fd093ca1d5254af5dc12ac208e8d5.definition = {
    methods: ["get","head"],
    url: '/about',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
Controller535fd093ca1d5254af5dc12ac208e8d5.url = (options?: RouteQueryOptions) => {
    return Controller535fd093ca1d5254af5dc12ac208e8d5.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
Controller535fd093ca1d5254af5dc12ac208e8d5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller535fd093ca1d5254af5dc12ac208e8d5.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
Controller535fd093ca1d5254af5dc12ac208e8d5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller535fd093ca1d5254af5dc12ac208e8d5.url(options),
    method: 'head',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
const Controller535fd093ca1d5254af5dc12ac208e8d5Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controller535fd093ca1d5254af5dc12ac208e8d5.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
Controller535fd093ca1d5254af5dc12ac208e8d5Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controller535fd093ca1d5254af5dc12ac208e8d5.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/about'
*/
Controller535fd093ca1d5254af5dc12ac208e8d5Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controller535fd093ca1d5254af5dc12ac208e8d5.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

Controller535fd093ca1d5254af5dc12ac208e8d5.form = Controller535fd093ca1d5254af5dc12ac208e8d5Form
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
const Controller36402f3b102b68b92616e946647e00cf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller36402f3b102b68b92616e946647e00cf.url(options),
    method: 'get',
})

Controller36402f3b102b68b92616e946647e00cf.definition = {
    methods: ["get","head"],
    url: '/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
Controller36402f3b102b68b92616e946647e00cf.url = (options?: RouteQueryOptions) => {
    return Controller36402f3b102b68b92616e946647e00cf.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
Controller36402f3b102b68b92616e946647e00cf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller36402f3b102b68b92616e946647e00cf.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
Controller36402f3b102b68b92616e946647e00cf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller36402f3b102b68b92616e946647e00cf.url(options),
    method: 'head',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
const Controller36402f3b102b68b92616e946647e00cfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controller36402f3b102b68b92616e946647e00cf.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
Controller36402f3b102b68b92616e946647e00cfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controller36402f3b102b68b92616e946647e00cf.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/contact'
*/
Controller36402f3b102b68b92616e946647e00cfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controller36402f3b102b68b92616e946647e00cf.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

Controller36402f3b102b68b92616e946647e00cf.form = Controller36402f3b102b68b92616e946647e00cfForm
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/privacy-policy'
*/
const Controller546d1d979582dcab4cda77f98be026ca = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller546d1d979582dcab4cda77f98be026ca.url(options),
    method: 'get',
})

Controller546d1d979582dcab4cda77f98be026ca.definition = {
    methods: ["get","head"],
    url: '/privacy-policy',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/privacy-policy'
*/
Controller546d1d979582dcab4cda77f98be026ca.url = (options?: RouteQueryOptions) => {
    return Controller546d1d979582dcab4cda77f98be026ca.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/privacy-policy'
*/
Controller546d1d979582dcab4cda77f98be026ca.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller546d1d979582dcab4cda77f98be026ca.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/privacy-policy'
*/
Controller546d1d979582dcab4cda77f98be026ca.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller546d1d979582dcab4cda77f98be026ca.url(options),
    method: 'head',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/privacy-policy'
*/
const Controller546d1d979582dcab4cda77f98be026caForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controller546d1d979582dcab4cda77f98be026ca.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/privacy-policy'
*/
Controller546d1d979582dcab4cda77f98be026caForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controller546d1d979582dcab4cda77f98be026ca.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/privacy-policy'
*/
Controller546d1d979582dcab4cda77f98be026caForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controller546d1d979582dcab4cda77f98be026ca.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

Controller546d1d979582dcab4cda77f98be026ca.form = Controller546d1d979582dcab4cda77f98be026caForm
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/no-return-policy'
*/
const Controller575d5c1786b3ac9094b3cb1dffdb2fd9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller575d5c1786b3ac9094b3cb1dffdb2fd9.url(options),
    method: 'get',
})

Controller575d5c1786b3ac9094b3cb1dffdb2fd9.definition = {
    methods: ["get","head"],
    url: '/no-return-policy',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/no-return-policy'
*/
Controller575d5c1786b3ac9094b3cb1dffdb2fd9.url = (options?: RouteQueryOptions) => {
    return Controller575d5c1786b3ac9094b3cb1dffdb2fd9.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/no-return-policy'
*/
Controller575d5c1786b3ac9094b3cb1dffdb2fd9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller575d5c1786b3ac9094b3cb1dffdb2fd9.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/no-return-policy'
*/
Controller575d5c1786b3ac9094b3cb1dffdb2fd9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller575d5c1786b3ac9094b3cb1dffdb2fd9.url(options),
    method: 'head',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/no-return-policy'
*/
const Controller575d5c1786b3ac9094b3cb1dffdb2fd9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controller575d5c1786b3ac9094b3cb1dffdb2fd9.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/no-return-policy'
*/
Controller575d5c1786b3ac9094b3cb1dffdb2fd9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controller575d5c1786b3ac9094b3cb1dffdb2fd9.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/no-return-policy'
*/
Controller575d5c1786b3ac9094b3cb1dffdb2fd9Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controller575d5c1786b3ac9094b3cb1dffdb2fd9.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

Controller575d5c1786b3ac9094b3cb1dffdb2fd9.form = Controller575d5c1786b3ac9094b3cb1dffdb2fd9Form
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/shipping-policy'
*/
const Controller5bf7411ab408e1ab05950031f1cd136f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller5bf7411ab408e1ab05950031f1cd136f.url(options),
    method: 'get',
})

Controller5bf7411ab408e1ab05950031f1cd136f.definition = {
    methods: ["get","head"],
    url: '/shipping-policy',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/shipping-policy'
*/
Controller5bf7411ab408e1ab05950031f1cd136f.url = (options?: RouteQueryOptions) => {
    return Controller5bf7411ab408e1ab05950031f1cd136f.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/shipping-policy'
*/
Controller5bf7411ab408e1ab05950031f1cd136f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller5bf7411ab408e1ab05950031f1cd136f.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/shipping-policy'
*/
Controller5bf7411ab408e1ab05950031f1cd136f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller5bf7411ab408e1ab05950031f1cd136f.url(options),
    method: 'head',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/shipping-policy'
*/
const Controller5bf7411ab408e1ab05950031f1cd136fForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controller5bf7411ab408e1ab05950031f1cd136f.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/shipping-policy'
*/
Controller5bf7411ab408e1ab05950031f1cd136fForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controller5bf7411ab408e1ab05950031f1cd136f.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/shipping-policy'
*/
Controller5bf7411ab408e1ab05950031f1cd136fForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controller5bf7411ab408e1ab05950031f1cd136f.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

Controller5bf7411ab408e1ab05950031f1cd136f.form = Controller5bf7411ab408e1ab05950031f1cd136fForm
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/terms-conditions'
*/
const Controllerbde268484c3b2a6b4ff24080000e89d7 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllerbde268484c3b2a6b4ff24080000e89d7.url(options),
    method: 'get',
})

Controllerbde268484c3b2a6b4ff24080000e89d7.definition = {
    methods: ["get","head"],
    url: '/terms-conditions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/terms-conditions'
*/
Controllerbde268484c3b2a6b4ff24080000e89d7.url = (options?: RouteQueryOptions) => {
    return Controllerbde268484c3b2a6b4ff24080000e89d7.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/terms-conditions'
*/
Controllerbde268484c3b2a6b4ff24080000e89d7.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllerbde268484c3b2a6b4ff24080000e89d7.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/terms-conditions'
*/
Controllerbde268484c3b2a6b4ff24080000e89d7.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controllerbde268484c3b2a6b4ff24080000e89d7.url(options),
    method: 'head',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/terms-conditions'
*/
const Controllerbde268484c3b2a6b4ff24080000e89d7Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controllerbde268484c3b2a6b4ff24080000e89d7.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/terms-conditions'
*/
Controllerbde268484c3b2a6b4ff24080000e89d7Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controllerbde268484c3b2a6b4ff24080000e89d7.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/terms-conditions'
*/
Controllerbde268484c3b2a6b4ff24080000e89d7Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controllerbde268484c3b2a6b4ff24080000e89d7.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

Controllerbde268484c3b2a6b4ff24080000e89d7.form = Controllerbde268484c3b2a6b4ff24080000e89d7Form
/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/settings/appearance'
*/
const Controllere19ee86e9cf603ce1a59a1ec5d21dec5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllere19ee86e9cf603ce1a59a1ec5d21dec5.url(options),
    method: 'get',
})

Controllere19ee86e9cf603ce1a59a1ec5d21dec5.definition = {
    methods: ["get","head"],
    url: '/settings/appearance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/settings/appearance'
*/
Controllere19ee86e9cf603ce1a59a1ec5d21dec5.url = (options?: RouteQueryOptions) => {
    return Controllere19ee86e9cf603ce1a59a1ec5d21dec5.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/settings/appearance'
*/
Controllere19ee86e9cf603ce1a59a1ec5d21dec5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllere19ee86e9cf603ce1a59a1ec5d21dec5.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/settings/appearance'
*/
Controllere19ee86e9cf603ce1a59a1ec5d21dec5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controllere19ee86e9cf603ce1a59a1ec5d21dec5.url(options),
    method: 'head',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/settings/appearance'
*/
const Controllere19ee86e9cf603ce1a59a1ec5d21dec5Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controllere19ee86e9cf603ce1a59a1ec5d21dec5.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/settings/appearance'
*/
Controllere19ee86e9cf603ce1a59a1ec5d21dec5Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controllere19ee86e9cf603ce1a59a1ec5d21dec5.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/settings/appearance'
*/
Controllere19ee86e9cf603ce1a59a1ec5d21dec5Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: Controllere19ee86e9cf603ce1a59a1ec5d21dec5.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

Controllere19ee86e9cf603ce1a59a1ec5d21dec5.form = Controllere19ee86e9cf603ce1a59a1ec5d21dec5Form

const Controller = {
    '/about': Controller535fd093ca1d5254af5dc12ac208e8d5,
    '/contact': Controller36402f3b102b68b92616e946647e00cf,
    '/privacy-policy': Controller546d1d979582dcab4cda77f98be026ca,
    '/no-return-policy': Controller575d5c1786b3ac9094b3cb1dffdb2fd9,
    '/shipping-policy': Controller5bf7411ab408e1ab05950031f1cd136f,
    '/terms-conditions': Controllerbde268484c3b2a6b4ff24080000e89d7,
    '/settings/appearance': Controllere19ee86e9cf603ce1a59a1ec5d21dec5,
}

export default Controller