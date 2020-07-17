import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: main
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import(/* webpackChunkName: "menu" */ '../views/menu.vue')
  },
  {
    path: '/story',
    name: 'story',
    component: () => import(/* webpackChunkName: "story" */ '../views/story.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import(/* webpackChunkName: "news" */ '../views/news.vue')
  },
  {
    path: '/location',
    name: 'location',
    component: () => import(/* webpackChunkName: "location" */ '../views/location.vue')
  },
  {
    path: '/member',
    name: 'member',
    component: () => import(/* webpackChunkName: "member" */ '../views/member.vue')
  },
  {
    path: '/member_login',
    name: 'member_login',
    component: () => import(/* webpackChunkName: "member_login" */ '../views/member_login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
