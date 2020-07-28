import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/main.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: main,
    meta: {
      transition: 'fade-in-up',
      login: false,
      title: '首頁'
    }
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import(/* webpackChunkName: "menu" */ '../views/menu.vue'),
    meta: {
      transition: 'fade-in-up',
      login: false,
      title: '菜單'
    }
  },
  {
    path: '/story',
    name: 'story',
    component: () => import(/* webpackChunkName: "story" */ '../views/story.vue'),
    meta: {
      transition: 'fade-in-up',
      login: false,
      title: '關於我們'
    }
  },
  {
    path: '/news',
    name: 'news',
    component: () => import(/* webpackChunkName: "news" */ '../views/news.vue'),
    meta: {
      transition: 'fade-in-up',
      login: false,
      title: '最新消息'
    }
  },
  {
    path: '/location',
    name: 'location',
    component: () => import(/* webpackChunkName: "location" */ '../views/location.vue'),
    meta: {
      transition: 'fade-in-up',
      login: false,
      title: '店家資訊'
    }
  },
  {
    path: '/member',
    name: 'member',
    component: () => import(/* webpackChunkName: "member" */ '../views/member.vue'),
    meta: {
      transition: 'fade-in-up',
      login: false,
      title: '會員專區'
    }
  },
  {
    path: '/member_login',
    name: 'member_login',
    component: () => import(/* webpackChunkName: "member_login" */ '../views/member_login.vue'),
    meta: {
      transition: 'fade-in-up',
      login: true,
      title: '會員服務'
    }
  },
  {
    path: '/back',
    name: 'back',
    component: () => import(/* webpackChunkName: "back" */ '../views/back.vue'),
    meta: {
      transition: 'fade-in-up',
      login: 'control',
      title: '後臺管理'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.login !== 'control') {
    if (to.meta.login && store.state.name.length === 0) {
      Vue.swal('未登入', '請先登入', 'error')
      next('/member')
    } else {
      next()
    }
  } else {
    if (store.state.account === 'user1234') {
      Vue.swal('歡迎', '老大歡迎', 'success')
      next()
    } else {
      Vue.swal('權限不足', '使用者管理權限不足', 'error')
      next('/member')
    }
  }
})

export default router
