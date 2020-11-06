import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../views/Store.vue'
import Details from '../views/Details.vue'
import Checkout from '../views/Checkout.vue'
import Cart from '../views/Cart.vue'
import Account from '../views/Account.vue'
import Address from '../views/Address.vue'
import AboutUs from '../views/AboutUs.vue'
import Confirmation from '../views/Confirmation.vue'
import CompletedPurchase from '../views/CompletedPurchase.vue'
import Contact from '../views/Contact.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/store',
    name: 'Store',
    component: Store
  },
  {
    path: '/details/:productId',
    name: 'Details',
    component: Details
  },
  {
    path: '/checkout/',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/cart/',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/address',
    name: 'Address',
    component: Address
  },
  {
    path: '/about',
    name: 'AboutUs',
    component: AboutUs
  },
  {
    path: '/confirmation',
    name: 'confirmation',
    component: Confirmation
  },
  {
    path: '/completedPurchase/:orderId',
    name: 'completedPurchase',
    component: CompletedPurchase
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
]

const router = new VueRouter({
  routes
})

export default router
