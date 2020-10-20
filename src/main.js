import Vue from 'vue'
import App from './App.vue'
import draggable from 'vuedraggable'

//import router from './router/index'
//import VueLodash from 'vue-lodash'
//import lodash from 'lodash'




import  {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'

import 'bootstrap'
import 'material-design-icons'
import 'material-design-icons/iconfont/material-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import CKEditor from '@ckeditor/ckeditor5-vue';

import HearderTop from "./components/HelloWorld.vue"
import gestionclients from "./views/clients/GestionClients.vue"
import groupesclients from "./views/parametrage/GroupesClients.vue"
import gestioncivilite from "./views/parametrage/GestionCivilte.vue"
import famillearticles from "./views/articles/FamillesArticles.vue"
import famillesousarticles from "./views/articles/FamillesSousArticles.vue"
import menuparametrage from "./views/parametrage/menu_parametrage"
import gestioncodepostaux from "./views/parametrage/GestionCodepostaux.vue"
import basdepage from "./components/footer.vue"
import tableaubord from "./views/menugeneral/Tableaubord.vue"
import gestionnomenclatures from "./views/articles/GestionNomenclatures"
import gestionproduits from "./views/articles/produits"
import gestionmarques from "./views/articles/Marques"
import gestiontva from "./views/parametrage/gestionTva"
import gestionventes from "./views/ventes/gestion_ventes"
import documentventes from "./views/ventes/document_ventes"
import router from './router'

//import PortalVue from 'portal-vue'

//Vue.use(VueLodash, { name: 'custom' , lodash: lodash })
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
//Vue.use(PortalVue)
Vue.use(CKEditor)


Vue.component ("HeaderTop", HearderTop)
Vue.component ("gestionclients", gestionclients)
Vue.component("groupesclients", groupesclients)
Vue.component("gestioncivilite", gestioncivilite)
Vue.component("gestioncodepostaux",gestioncodepostaux)
Vue.component("famillearticles",famillearticles)
Vue.component("famillesousarticles",famillesousarticles)
Vue.component ("menuparametrage",menuparametrage)
Vue.component("basdepage",basdepage)
Vue.component("tableaubord",tableaubord)
Vue.component ("gestionnomenclatures",gestionnomenclatures)
Vue.component ("gestionproduits",gestionproduits)
Vue.component ("gestionmarques",gestionmarques)
Vue.component ("gestiontva",gestiontva)
Vue.component ("gestionventes",gestionventes)
Vue.component ("documentventes",documentventes)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
