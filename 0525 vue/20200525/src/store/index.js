import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // vuex的資料
    cart: []
  },
  mutations: {
    // 修改vuex資料的function
    addCart (state, data) {
      state.cart.push(data)
    },
    delCart (state, index) {
      state.cart.splice(index, 1)
    }
  },
  actions: {
    // 修改vuex資料的function可以用async
    // 但是需要呼叫 mutations裡的function 修改
  },
  getters: {
    // 取得vuex資料的function
    cart (state) {
      return state.cart
    }
  },
  modules: {
    // 把vuex的資料分割
  }
})
