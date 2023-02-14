import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import('../views/detailsPage.vue')
  },
  {
    path: '/countries/:continent',
    name: 'Countries',
    component: () => import('../views/countriesPage.vue')
  },
  {
    path: '/country/:country',
    name: 'Country',
    component: () => import('../views/CountryPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
