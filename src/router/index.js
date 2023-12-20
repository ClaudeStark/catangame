import { createRouter, createWebHistory } from 'vue-router'
import CatanView from '../views/CatanView.vue'
import SessionView from '../views/SessionView.vue'
import MainDeviceView from '../views/MainDeviceView.vue'
import SideDeviceView from '../views/SideDeviceView.vue'
import WaitingRoomView from '../views/WaitingRoomView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'catan',
      component: CatanView,
      meta: {
        showNavigation: true
      }
    },
    {
      path: '/session',
      name: 'session',
      component: SessionView,
      meta: {
        showNavigation: true
      }
    },
    {
      path: '/maindevice/:id',
      name: 'maindevice',
      component: MainDeviceView,
      meta: {
        showNavigation: false
      }
    },
    {
      path: '/sidedevice/:id',
      name: 'sidedevice',
      component: SideDeviceView,
      meta: {
        showNavigation: false
      }
    },
    {
      path: '/waitingroom/:id',
      name: 'waitingroom',
      component: WaitingRoomView,
      meta: {
        showNavigation: false
      }
    }

  ]
})

export default router