import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAddressBook, faAddressCard } from '@fortawesome/free-solid-svg-icons'
// address-book => faAddressBook

import axios from 'axios'
import VueAxios from 'vue-axios'
import './style/style.styl'

Vue.config.productionTip = false

library.add(faAddressBook, faAddressCard)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueAxios, axios)

new Vue({
  render: h => h(App)
}).$mount('#app')
