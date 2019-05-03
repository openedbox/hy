import Vue from 'vue'
import Router from 'vue-router'
import { Layout } from '@/components/layout'
Vue.use(Router)


const routerMap = [
  {
    path: '/',
    name: 'index',
    component: Layout,
    meta: { title: '首页' },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/pi',
        name: 'pi',
        component: () => import('@/views/Pi.vue')
      }
    ]
  }
]


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routerMap
})
