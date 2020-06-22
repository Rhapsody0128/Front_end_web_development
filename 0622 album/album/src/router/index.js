import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    mata: {
      login: false,
      title: '線上相簿'
    }
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import(/* webpackChunkName: "reg" */ '../views/Reg.vue'),
    mata: {
      login: false,
      title: '線上相簿 | 註冊'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    mata: {
      login: false,
      title: '線上相簿 | 登入'
    }
  },
  {
    path: '/album',
    name: 'Album',
    component: () => import(/* webpackChunkName: "album" */ '../views/Album.vue'),
    mata: {
      login: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 判斷是否登入並導向的頁面
  if (to.meta.login && !store.state.user) {
    next('/login')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  document.title = (to.name !== 'Albem') ? to.meta.title : store.state.user + '的相簿'
  // if (to.name !== 'Albem') document.title = to.meta.title
  // else document, title = store.state.user + '的相簿'
})

export default router
