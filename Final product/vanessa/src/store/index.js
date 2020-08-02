import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screenWidth: 0,
    name: '',
    account: '',
    cart: [
      {
        user1234: [
          {
            id: 'sadas',
            title: 'asd',
            number: 1,
            value: 12
          }
        ]
      }
    ]
    //   {
    //     user1234: [
    //       {
    //         id: 'sadas',
    //         title: 'asd',
    //         number: 1
    //       }
    //     ]
    //   },
    //   {
    //     zzz: [
    //       {
    //         id: '097',
    //         title: 'asd',
    //         number: 1
    //       },
    //       {
    //         id: '097',
    //         title: 'asd',
    //         number: 1
    //       }
    //     ]
    //   }

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
    },
    addcart (state, itemdata) {
      const cart = JSON.parse(JSON.stringify(state.cart))
      cart.forEach(accountresult => {
        for (var account in accountresult) {
          if (account === state.account) {
            accountresult[account].forEach(itemresult => {
              console.log(itemresult.id)
              console.log(itemdata[0])
              if (itemresult.id === itemdata[0]) {
                itemresult.number = itemresult.number + itemdata[1]
              } else {
                accountresult[account].push(
                  {
                    id: itemdata[0],
                    number: itemdata[1],
                    title: itemdata[2],
                    value: itemdata[3]
                  }
                )
              }
            })
          }
        // else {
        //   accountresult[accountresult.length].account = state.account
        //   accountresult[accountresult.length].account.id = itemdata[0]
        //   accountresult[accountresult.length].account.number = itemdata[1]
        //   accountresult[accountresult.length].account.title = itemdata[2]
        // }
        }
      })
      state.cart = cart
    }
  },
  actions: {
  },
  modules: {
  },

  plugins: [createPersistedState()]
})
