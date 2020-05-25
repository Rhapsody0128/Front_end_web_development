import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    addcart (state, data) {
      state.cart.push(data)
    },
    delcart (state, index) {
      state.cart.splice(index, 1)
    }
  },
  actions: {
  },
  getters: {
    cart (state) {
      return state.cart
    }
  },
  modules: {
  }
})
