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
import * as VueGoogleMaps from 'vue2-google-maps'
import VueApexCharts from 'vue-apexcharts'
const creds = require('../creds.json')
const API_KEY = creds.gmaps_key

Vue.use(VueGoogleMaps, {
  load: {
    key: API_KEY,
    libraries: 'places'
  }
})

Vue.use(VueApexCharts)
Vue.use(VueResource)
Vue.use(VueCookies)
Vue.use(VueNumberInput)
Vue.use(VuePlaceAutocomplete)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

Vue.http.options.root = 'http://localhost:9090/'
// Vue.http.options.root = 'https://jewel-shop-back.herokuapp.com/'
Vue.prototype.moment = moment

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
