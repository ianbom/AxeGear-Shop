import DashboardController from './DashboardController'
import ProductController from './ProductController'
import ProductVariantController from './ProductVariantController'
import StockController from './StockController'
import CategoryController from './CategoryController'
import CollectionController from './CollectionController'
import OrderController from './OrderController'
import ShipmentController from './ShipmentController'
import PaymentController from './PaymentController'
import PaymentLogController from './PaymentLogController'
import BiteshipWebhookLogController from './BiteshipWebhookLogController'
import CustomerController from './CustomerController'
import CustomerAddressController from './CustomerAddressController'
import VoucherController from './VoucherController'
import AdminNotificationController from './AdminNotificationController'
import WishlistInsightController from './WishlistInsightController'
import BannerController from './BannerController'
import BlogArticleController from './BlogArticleController'
import GalleryImageController from './GalleryImageController'
import PageController from './PageController'
import NewProductPageController from './NewProductPageController'
import SettingController from './SettingController'
import AdminUserController from './AdminUserController'
import ReportController from './ReportController'
import AuditLogController from './AuditLogController'

const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    ProductController: Object.assign(ProductController, ProductController),
    ProductVariantController: Object.assign(ProductVariantController, ProductVariantController),
    StockController: Object.assign(StockController, StockController),
    CategoryController: Object.assign(CategoryController, CategoryController),
    CollectionController: Object.assign(CollectionController, CollectionController),
    OrderController: Object.assign(OrderController, OrderController),
    ShipmentController: Object.assign(ShipmentController, ShipmentController),
    PaymentController: Object.assign(PaymentController, PaymentController),
    PaymentLogController: Object.assign(PaymentLogController, PaymentLogController),
    BiteshipWebhookLogController: Object.assign(BiteshipWebhookLogController, BiteshipWebhookLogController),
    CustomerController: Object.assign(CustomerController, CustomerController),
    CustomerAddressController: Object.assign(CustomerAddressController, CustomerAddressController),
    VoucherController: Object.assign(VoucherController, VoucherController),
    AdminNotificationController: Object.assign(AdminNotificationController, AdminNotificationController),
    WishlistInsightController: Object.assign(WishlistInsightController, WishlistInsightController),
    BannerController: Object.assign(BannerController, BannerController),
    BlogArticleController: Object.assign(BlogArticleController, BlogArticleController),
    GalleryImageController: Object.assign(GalleryImageController, GalleryImageController),
    PageController: Object.assign(PageController, PageController),
    NewProductPageController: Object.assign(NewProductPageController, NewProductPageController),
    SettingController: Object.assign(SettingController, SettingController),
    AdminUserController: Object.assign(AdminUserController, AdminUserController),
    ReportController: Object.assign(ReportController, ReportController),
    AuditLogController: Object.assign(AuditLogController, AuditLogController),
}

export default Admin