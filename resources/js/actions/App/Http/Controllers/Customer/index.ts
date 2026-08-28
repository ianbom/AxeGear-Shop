import MidtransWebhookController from './MidtransWebhookController'
import BiteshipWebhookController from './BiteshipWebhookController'
import HomeController from './HomeController'
import NewProductController from './NewProductController'
import ProductController from './ProductController'
import CartController from './CartController'
import CheckoutController from './CheckoutController'
import OrderController from './OrderController'
import MidtransFinishController from './MidtransFinishController'
import WishlistController from './WishlistController'
import NotificationController from './NotificationController'
import BiteshipAreaController from './BiteshipAreaController'
import AddressController from './AddressController'

const Customer = {
    MidtransWebhookController: Object.assign(MidtransWebhookController, MidtransWebhookController),
    BiteshipWebhookController: Object.assign(BiteshipWebhookController, BiteshipWebhookController),
    HomeController: Object.assign(HomeController, HomeController),
    NewProductController: Object.assign(NewProductController, NewProductController),
    ProductController: Object.assign(ProductController, ProductController),
    CartController: Object.assign(CartController, CartController),
    CheckoutController: Object.assign(CheckoutController, CheckoutController),
    OrderController: Object.assign(OrderController, OrderController),
    MidtransFinishController: Object.assign(MidtransFinishController, MidtransFinishController),
    WishlistController: Object.assign(WishlistController, WishlistController),
    NotificationController: Object.assign(NotificationController, NotificationController),
    BiteshipAreaController: Object.assign(BiteshipAreaController, BiteshipAreaController),
    AddressController: Object.assign(AddressController, AddressController),
}

export default Customer