import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Welcome from '../views/menugeneral/Welcome.vue'
import Home from '../views/Home.vue'

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

    {
      path: '/Hello/:a',
      component: Welcome,
      name : 'Welcome'
    }

  ,
    {
      path: '*',
      component: Home


    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
