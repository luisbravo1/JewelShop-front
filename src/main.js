import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'
import VueNumberInput from '@chenfengyuan/vue-number-input'
import moment from 'moment'
import VuePlaceAutocomplete from 'vue-place-autocomplete'

Vue.use(VueResource)
Vue.use(VueCookies)
Vue.use(VueNumberInput)
Vue.use(VuePlaceAutocomplete)

Vue.config.productionTip = false

Vue.http.options.root = 'http://localhost:9000/'
// Vue.http.options.root = 'https://api.jewelshop.com/'
Vue.prototype.moment = moment

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
