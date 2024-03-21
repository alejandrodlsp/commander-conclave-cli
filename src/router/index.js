import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '@/views/LayoutView'

import RoomSelection from '@/views/room/RoomSelection'
import RoomView from '@/views/room/RoomView'

import { AUTH } from './auth'

const routes = [
  AUTH,
  {
    path: '/',
    component: LayoutView,
    children: [
      {
        path: '/',
        name: 'roomSelection',
        component: RoomSelection,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/room/:id',
        name: 'roomView',
        component: RoomView,
        props: true,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.signedIn) {
      this.$store.alerts.commit('setGlobalAlert', 'You need to be logged in to access that page.')
      next({ name: 'signin' })
      return
    }
  }
  if (to.matched.some(record => record.meta.redirectIfAuthorized)) {
    if (localStorage.signedIn) {
      next({ name: 'roomSelection' })
      return
    }
  }
  next()
})

export default router
