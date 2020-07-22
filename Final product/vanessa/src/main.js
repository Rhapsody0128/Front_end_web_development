import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar'
import Vuesax from 'vuesax'
import VuePageTransition from 'vue-page-transition'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './style/style.styl'
import 'vuesax/dist/vuesax.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VCalendar)
Vue.use(Vuesax)
Vue.use(VuePageTransition)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
