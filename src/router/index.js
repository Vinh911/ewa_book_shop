import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopView from '../views/ShopView.vue'
import SuccessView from "../views/SuccessView.vue";
import CanceledView from "../views/CanceledView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/dev',
      name: 'dev',
      component: ShopView
    },
    {
      path: '/success',
      name: 'success',
      component: SuccessView
    },
    {
      path: '/canceled',
      name: 'canceled',
      component: CanceledView
    }
  ]
})

export default router
