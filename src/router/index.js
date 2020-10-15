import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../views/Store.vue'
import Account from '../views/Account.vue'
import Address from '../views/Address.vue'

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
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/address',
    name: 'Address',
    component: Address
  }
]

const router = new VueRouter({
  routes
})

export default router
