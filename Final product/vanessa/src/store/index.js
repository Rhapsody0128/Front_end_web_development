import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screenWidth: 0,
    name: ''
  },
  getters: {
    screenWidth (state) {
      return state.screenWidth
    },
    name (state) {
      return state.name
    }
  },
  mutations: {
    getScreenWidth (state, val) {
      state.screenWidth = val
      return state.screenWidth
    },
    login (state, name) {
      state.name = name
    },
    logout (state, name) {
      state.name = ''
    }
  },
  actions: {
  },
  modules: {
  },

  plugins: [createPersistedState()]
})
