import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screenWidth: 0,
    name: '',
    account: ''
  },
  getters: {
    screenWidth (state) {
      return state.screenWidth
    },
    name (state) {
      return state.name
    },
    account (state) {
      return state.account
    },
    cart (state) {
      return JSON.parse(JSON.stringify(state.cart))
    }
  },
  mutations: {
    getScreenWidth (state, val) {
      state.screenWidth = val
      return state.screenWidth
    },
    login (state, data) {
      state.name = data[0]
      state.account = data[1]
    },
    logout (state) {
      state.name = ''
      state.account = ''
    }
  },
  actions: {
  },
  modules: {
  },

  plugins: [createPersistedState()]
})
