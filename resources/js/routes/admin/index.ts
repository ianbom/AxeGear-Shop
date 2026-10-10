import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import products from './products'
import productVariants from './product-variants'
import categories from './categories'
import collections from './collections'
import stock from './stock'
import orders from './orders'
import payments from './payments'
import paymentLogs from './payment-logs'
import shipments from './shipments'
import biteshipWebhookLogs from './biteship-webhook-logs'
import customers from './customers'
import customerAddresses from './customer-addresses'
import vouchers from './vouchers'
import notifications from './notifications'
import wishlists from './wishlists'
import banners from './banners'
import blogs from './blogs'
import gallery from './gallery'
import pages from './pages'
import newProduct from './new-product'
import settings from './settings'
import adminUsers from './admin-users'
import reports from './reports'
import auditLogs from './audit-logs'
/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:12
* @route '/admin/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:12
* @route '/admin/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:12
* @route '/admin/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:12
* @route '/admin/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:12
* @route '/admin/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:12
* @route '/admin/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
* @see app/Http/Controllers/Admin/DashboardController.php:12
* @route '/admin/dashboard'
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

const admin = {
    dashboard: Object.assign(dashboard, dashboard),
    products: Object.assign(products, products),
    productVariants: Object.assign(productVariants, productVariants),
    categories: Object.assign(categories, categories),
    collections: Object.assign(collections, collections),
    stock: Object.assign(stock, stock),
    orders: Object.assign(orders, orders),
    payments: Object.assign(payments, payments),
    paymentLogs: Object.assign(paymentLogs, paymentLogs),
    shipments: Object.assign(shipments, shipments),
    biteshipWebhookLogs: Object.assign(biteshipWebhookLogs, biteshipWebhookLogs),
    customers: Object.assign(customers, customers),
    customerAddresses: Object.assign(customerAddresses, customerAddresses),
    vouchers: Object.assign(vouchers, vouchers),
    notifications: Object.assign(notifications, notifications),
    wishlists: Object.assign(wishlists, wishlists),
    banners: Object.assign(banners, banners),
    blogs: Object.assign(blogs, blogs),
    gallery: Object.assign(gallery, gallery),
    pages: Object.assign(pages, pages),
    newProduct: Object.assign(newProduct, newProduct),
    settings: Object.assign(settings, settings),
    adminUsers: Object.assign(adminUsers, adminUsers),
    reports: Object.assign(reports, reports),
    auditLogs: Object.assign(auditLogs, auditLogs),
}

export default admin