import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screenWidth: 1
  },
  getters: {
    screenWidth (state) {
      return state.screenWidth
    }
  },
  mutations: {
    getScreenWidth (state, val) {
      state.screenWidth = val
      return state.screenWidth
    }
  },
  actions: {
  },
  modules: {
  }
})
