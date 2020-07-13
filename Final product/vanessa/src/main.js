import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar'

// Use v-calendar & v-date-picker components

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './style/style.styl'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VCalendar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
