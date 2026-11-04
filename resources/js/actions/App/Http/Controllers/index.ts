import Customer from './Customer'
import GalleryController from './GalleryController'
import BlogController from './BlogController'
import ContactController from './ContactController'
import Auth from './Auth'
import Settings from './Settings'
import Admin from './Admin'

const Controllers = {
    Customer: Object.assign(Customer, Customer),
    GalleryController: Object.assign(GalleryController, GalleryController),
    BlogController: Object.assign(BlogController, BlogController),
    ContactController: Object.assign(ContactController, ContactController),
    Auth: Object.assign(Auth, Auth),
    Settings: Object.assign(Settings, Settings),
    Admin: Object.assign(Admin, Admin),
}

export default Controllers