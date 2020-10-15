import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'

Vue.use(VueResource)
Vue.use(VueCookies)

Vue.config.productionTip = false

Vue.http.options.root = 'http://localhost:9000/'

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
