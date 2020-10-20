import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import Welcome from './views/menugeneral/Welcome.vue'
import gestioncivilite from './views/parametrage/GestionCivilte.vue'
import gestioncodepostaux from './views/parametrage/GestionCodepostaux.vue'
import gestionclients from './views/clients/GestionClients.vue'
import groupesclients from './views/parametrage/GroupesClients.vue'

Vue.use(Router)

 export default new Router({
  mode: 'history',
   routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
     {
      path :'/gestionclients',
      component : gestionclients, 
      name :"clients"
      },

    {
      path: '/about',
      name: 'about',
      component:About
    },
 
    {
   path: '/Hello/:a',
   component: Welcome,
   name : 'Welcome'
   },

{
path :'/gestioncivlite',
component : gestioncivilite, 
name :"civil"
},

{
   path : '/groupesclients',
  component :groupesclients,
  name : "groupesclients"
   },

{

path : '/gestioncodepostaux',
component :gestioncodepostaux,
name : "codepostaux"

} ,
       {
path: '*',
component: Home


  }
 
  ]


})
