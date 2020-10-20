<template>

<div id="HeaderTop">

 <!-----********************************
 * Menu general     22h36 -29/04/2020 **
*************************************** -->

<div class="d-flex text-dark">

 <div class="shadow-lg bg-dark p-1 m-0 rounded-left border-secondary text-left" id="Menugeneral" v-show="show" style="width:290px">




  <!-------  Accueil-->


  <div role="tablist">

  <div class="text-light bg-info p-3 m-0 w-100 ">

   <b-badge><h5> Bienvenue </h5></b-badge>

   </div>


   <b-container class="p-1" >
   <b-row cols="12">
    <b-col  cols="2">
    <b-button v-b-toggle.accordion-1 variant="bg-primary" class="text-light">
     <b-icon class="align-bottom" icon="house-fill" scale="1"></b-icon>
    </b-button>
   </b-col>



   <b-col class="" cols="8" align-self="end"><b-link :to="{ name: 'Welcome', params: { a:'Go',b:0}}" variant="" class="text-light text-left border-primary"><h6>Tableau de bord</h6></b-link>
   </b-col>

   </b-row>


   </b-container>


   <!-------   clients :class="[vclients  ? menu2: true , menu1]" -->

   <b-container fluid="lm" :class="[vclients  ? menu2: true , menu1]">
    <b-row cols="12" class="ml-0 mr-0">

    <b-col class="p-0" align-self="baseline"  cols="2">
     <b-button v-b-toggle.accordion-1 variant="left" class="text-light">
   <b-icon class="align-bottom" icon="people-fill" scale="1"></b-icon>
     </b-button>
    </b-col>


     <b-col class="p-1 my-0 text-light" cols="5" align-self="end"  >
     <b-button class="text-decoration-none" variant="link text-light" v-b-toggle.accordion-1><h6>Clients</h6></b-button>
     </b-col>

     <b-col align-self="baseline" cols="1" v-if ="!vclients" class="ml-auto text-right text-light" ><b-icon icon="caret-down-fill" scale="1" variant="light" ></b-icon></b-col>
     <b-col cols="1" v-else-if ="vclients" class="ml-auto text-right text-light">   <b-icon icon="caret-up-fill" scale="1" variant="light" ></b-icon>  </b-col>

    </b-row>

   </b-container>

    <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel" v-model="vclients">
     <div class="bg-light rounded-bottom p-3">
      <div class="text-left"> <router-link class="text-secondary" :to="{ name: 'Welcome', params: { a: 'gestion-clients', b:1}}">Gestion Clients</router-link> </div>
      <div class="text-left"> <router-link :to="{ name: 'Welcome', params: { a: 'groupe-clients', b:1}}">Groupe clients</router-link>  </div>
    </div>
    </b-collapse>





   <!-------   Produits -->
   <b-container  fluid="lm"  :class="[vproduits ? menu2: true , menu1]">
       <b-row cols="12" class="ml-0 mr-0">

     <b-col class="p-0" align-self="baseline"  cols="2">
      <b-button v-b-toggle.accordion-2 variant="bg-primary left" class="text-light">
       <b-icon class="align-bottom" icon="file-earmark-spreadsheet" scale="1"></b-icon>
      </b-button>
     </b-col>


     <b-col class="p-1 my-0 text-light" cols="5"  align-self="end">
      <b-button v-b-toggle.accordion-2><h6>Produits</h6></b-button></b-col>


     <b-col align-self="baseline" cols="1" v-if ="!vproduits" class="ml-auto text-right text-light" ><b-icon icon="caret-down-fill" scale="1" variant="light" ></b-icon></b-col>
     <b-col cols="1" v-else-if ="vproduits" class="ml-auto text-right text-light">   <b-icon icon="caret-up-fill" scale="1" variant="light" ></b-icon>  </b-col>

    </b-row>
   </b-container>
<b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel" v-model="vproduits">
 <div class="bg-light rounded-bottom p-3">

 <div> <router-link :to="{ name: 'Welcome', params: { a: 'produits-familles', b:2}}">Familles</router-link></div>
 <div> <router-link :to="{ name: 'Welcome', params: { a: 'produits-sousfamilles', b:2}}" >Sous-Familles</router-link></div>
<hr>
 <div> <router-link :to="{ name: 'Welcome', params: { a: 'gestion-marques', b:2}}" >Marques</router-link></div>
  <div><router-link :to="{ name: 'Welcome', params: { a: 'gestion-nomenclatures', b:2}}">Nomenclatures</router-link> </div>
  <div><router-link :to="{ name: 'Welcome', params: { a: 'gestion-produits', b:2}}">Produits</router-link></div>

 </div>
 </b-collapse>


   <!-------   Gestion Achats -->
   <b-container fluid="lm"  :class="[vachats ? menu2: true , menu1]">
     <b-row cols="12" class="ml-0 mr-0">

     <b-col class="p-0" align-self="baseline"  cols="2">
      <b-button v-b-toggle.accordion-3 variant="bg-primary left" class="text-light">
       <b-icon class="align-bottom" icon="bag-fill" scale="1"></b-icon>
      </b-button>
     </b-col>


     <b-col class="p-1 my-0 text-light" cols="5"  align-self="end">
      <b-button v-b-toggle.accordion-3><h6>Achats</h6></b-button></b-col>


     <b-col align-self="baseline" cols="1" v-if ="!vachats" class="ml-auto text-right text-light" ><b-icon icon="caret-down-fill" scale="1" variant="light" ></b-icon></b-col>
     <b-col cols="1" v-else-if ="vachats" class="ml-auto text-right text-light">   <b-icon icon="caret-up-fill" scale="1" variant="light" ></b-icon>  </b-col>

    </b-row>
   </b-container>

    <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel" v-model="vachats">
     <div class="bg-light rounded-bottom p-3">

      <div class="p-1"><router-link :to="{ name: 'Welcome', params: { a: 'produits-familles', b:2}}">Fournisseur</router-link></div>
      <div class="p-1"><router-link :to="{ name: 'Welcome', params: { a: 'produits-familles', b:2}}">Groupe Fournisseur</router-link></div>
      <div class="p-1"><router-link :to="{ name: 'Welcome', params: { a: 'produits-familles', b:2}}">Factures d'achat</router-link></div>
      <div class="p-1"><router-link :to="{ name: 'Welcome', params: { a: 'produits-familles', b:2}}">Gestion des Achats</router-link></div>
     </div>


    </b-collapse>

   <!-------   Gestion ventes -->
   <b-container fluid="lm"  :class="[vventes ? menu2: true , menu1]">


   <b-row cols="12" class="ml-0 mr-0">

    <b-col class="p-0" align-self="baseline"  cols="2">
     <b-button v-b-toggle.accordion-4 variant="bg-primary left" class="text-light">
      <b-icon class="align-bottom" icon="credit-card" scale="1"></b-icon>
     </b-button>
    </b-col>
   


   <b-col class="p-1 my-0 text-light" cols="5"  align-self="end">
     <b-button v-b-toggle.accordion-4><h6>Ventes</h6></b-button></b-col>


    <b-col align-self="baseline" cols="1" v-if ="!vventes" class="ml-auto text-right text-light" ><b-icon icon="caret-down-fill" scale="1" variant="light" ></b-icon></b-col>
    <b-col cols="1" v-else-if ="vventes" class="ml-auto text-right text-light">   <b-icon icon="caret-up-fill" scale="1" variant="light" ></b-icon>  </b-col>
   </b-row>


   </b-container>
   <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel" v-model="vventes">

    <div class="bg-light rounded-bottom p-3">
    <div class="p-1"><router-link :to="{ name: 'Welcome', params: { a: 'gestion-ventes', b:2}}">Gestion des Ventes</router-link></div>
    <div class="p-1"><router-link :to="{ name: 'Welcome', params: { a: 'produits-familles', b:2}}">Devis</router-link></div>
    <div class="p-1"><router-link :to="{ name: 'Welcome', params: { a: 'bon-commande', b:2}}">Bons de Commande</router-link></div>
    <div class="p-1"><router-link :to="{ name: 'Welcome', params: { a: 'produits-familles', b:2}}">Factures</router-link></div>
     <div class="p-1"><router-link :to="{ name: 'Welcome', params: { a: 'produits-familles', b:2}}">Avoirs</router-link></div>

    </div>

   </b-collapse>

 <!-------   Gestion Statistiques -->
   <b-container fluid="lm"  :class="[vstatistiques ? menu2: true , menu1]">

   <b-row cols="12" class="ml-0 mr-0">

     <b-col class="p-0" align-self="baseline"  cols="2">
      <b-button v-b-toggle.accordion-5 variant="bg-primary left" class="text-light">
       <b-icon class="align-bottom" icon="bar-chart-fill" scale="1"></b-icon>
      </b-button>
     </b-col>

     <b-col class="p-1 my-0 text-light" cols="5"  align-self="end">
     <b-button v-b-toggle.accordion-5><h6>Statistiques</h6></b-button></b-col>

     <b-col align-self="baseline" cols="1" v-if ="!vstatistiques" class="ml-auto text-right text-light" ><b-icon icon="caret-down-fill" scale="1" variant="light" ></b-icon></b-col>
     <b-col cols="1" v-else-if ="vstatistiques" class="ml-auto text-right text-light">   <b-icon icon="caret-up-fill" scale="1" variant="light" ></b-icon>  </b-col>
    </b-row>
   </b-container>


   <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel" v-model="vstatistiques">
   <div class="bg-light rounded-bottom p-3">
   <div class="p-1"><router-link :to="{ name: 'Welcome', params: { a: 'produits-familles', b:2}}">Meilleures des Ventes</router-link></div>
   

    </div>

   </b-collapse>




 <!-------   Gestion Paramétrage -->


   <b-container  fluid="lm" :class="[vparametres ? menu2: true , menu1]">
    
    <b-row cols="12" class="ml-0 mr-0">

     <b-col class="p-0" align-self="baseline"  cols="2">
      <b-button v-b-toggle.accordion-6 variant="bg-primary left" class="text-light">
       <b-icon class="align-bottom" icon="gear-fill" scale="1"></b-icon>
      </b-button>
     </b-col>

     <b-col class="p-1 my-0 text-light" cols="5"  align-self="end">
      <b-button v-b-toggle.accordion-6><h6>Paramétrage</h6></b-button></b-col>

     <b-col align-self="baseline" cols="1" v-if ="!vparametres" class="ml-auto text-right text-light" ><b-icon icon="caret-down-fill" scale="1" variant="light" ></b-icon></b-col>
     <b-col cols="1" v-else-if ="vparametres" class="ml-auto text-right text-light">   <b-icon icon="caret-up-fill" scale="1" variant="light" ></b-icon>  </b-col>
    </b-row>



   </b-container>





  <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel" v-model="vparametres">
   <div class="bg-light rounded-bottom p-3">

    <div class="p-1"><router-link :to="{ name: 'Welcome', params: { a: 'produits-familles', b:2}}">Groupes utilisateurs</router-link></div>
    <div class="p-1"><router-link :to="{ name: 'Welcome', params: { a: 'produits-familles', b:2}}">Utilisateurs</router-link></div>
    <div class="p-1"> <router-link :to="{ name: 'Welcome', params: { a: 'gestion-civilite', b:4}}">Civlités</router-link></div>
    <div class="p-1"> <router-link :to="{ name: 'Welcome', params: { a: 'gestion-codepostaux', b:4}}">Code postaux</router-link><br></div>
    <div class="p-1"><router-link :to="{ name: 'Welcome', params: { a: 'gestion-tva', b:2}}">Taxes Articles</router-link></div>

    <div class="p-1"><router-link :to="{ name: 'Welcome', params: { a: 'produits-familles', b:2}}">Conditions de règlements</router-link></div>
   </div>
  </b-collapse>



 <!-------   Gestion Support -->
   <b-container fluid="lm"  :class="[vsupport ? menu2: true , menu1]">

    <b-row cols="12" class="ml-0 mr-0">

     <b-col class="p-0" align-self="baseline"  cols="2">
      <b-button v-b-toggle.accordion-7 variant="bg-primary left" class="text-light">
       <b-icon class="align-bottom" icon="wrench" scale="1"></b-icon>
      </b-button>
     </b-col>

     <b-col class="p-1 my-0 text-light" cols="5"  align-self="end">
     <b-button v-b-toggle.accordion-7><h6>Support</h6></b-button></b-col>
        <b-col align-self="baseline" cols="1" v-if ="!vsupport" class="ml-auto text-right text-light" ><b-icon icon="caret-down-fill" scale="1" variant="light" ></b-icon></b-col>
     <b-col cols="1" v-else-if ="vsupport" class="ml-auto text-right text-light">   <b-icon icon="caret-up-fill" scale="1" variant="light" ></b-icon>  </b-col>
    </b-row>

   </b-container>



 </div>

 <div class="mh-100 mx-100 bg-light">

  



  </div>

 </div>

 
 <div class=" p-0 bg-light w-100 mh-100">
  
  <!-- Menu Header -->

  <div class="d-flex bg-secondary border-bottom align-items-center" style="height: 75px" >
   <!---
   <div class=""> <b-button  size="sm" @click="show = !show" v-if = "show">  <b-icon-chevron-bar-left></b-icon-chevron-bar-left></b-button> <b-button  size="sm" @click="show = !show"  v-else-if="!show">  <b-icon-chevron-bar-right></b-icon-chevron-bar-right></b-button>   </div>
     -->

   <div class="p-2 align-items-center">
    <b-button class="" @click="show = !show" v-if = "show" > <b-icon icon="box-arrow-left" scale="1.5" variant="light border-light"></b-icon> </b-button>
    <b-button @click="show = !show" v-else-if = "!show" > <b-icon icon="box-arrow-right" scale="1.5" variant="light  border-light"></b-icon> </b-button>
    
   </div>

   <div class="p-1 align-items-center">  <b-button size="l"> <b-icon icon="collection" scale="1" variant="warning"></b-icon><h6>Sababa</h6></b-button></div>
   <div class="align-items-center p-2">
    <b-input-group>
    <b-input-group-prepend variant="light">

    <div class="input-group-text"><b-icon icon="search"  aria-hidden="true"></b-icon></div>

    </b-input-group-prepend>

    <b-form-input class="form-rounded" placeholder="client,devis,facture" trim></b-form-input>
    </b-input-group>
   </div>

   <div class="ml-auto text-right text-light p-2"  role="alert">Utilisateur: {{nomutilisateurencours}} {{prenomutilisateurencours}} - Email {{mailutilisateurencours}} - compte <b>{{nomsociete}} </b></div>
            
   <!-- Gestion utilisateur -->
 <div class="p-2 align-items-center">
              
 <menuparametrage> </menuparametrage>
  </div>
 </div>

  <!-----

    >
    </b-card>
  1° par thème de menu
  2°

  -->

<tableaubord v-if="$route.params.a==='Go'"> </tableaubord>
<gestionclients v-if="$route.params.a==='gestion-clients'"> </gestionclients>
<groupesclients v-if="$route.params.a==='groupe-clients'"> </groupesclients>
<gestioncivilite v-if="$route.params.a==='gestion-civilite'"></gestioncivilite>
<gestioncodepostaux v-if="$route.params.a==='gestion-codepostaux'"> </gestioncodepostaux>
<famillearticles v-if="$route.params.a==='produits-familles'"> </famillearticles>
<famillesousarticles v-if="$route.params.a==='produits-sousfamilles'"> </famillesousarticles>
<gestionnomenclatures v-if="$route.params.a==='gestion-nomenclatures'"> </gestionnomenclatures>
<gestionproduits v-if="$route.params.a==='gestion-produits'"></gestionproduits>
<gestionmarques v-if="$route.params.a==='gestion-marques'"></gestionmarques>
<gestiontva v-if="$route.params.a==='gestion-tva'"> </gestiontva>
<gestionventes v-if="$route.params.a==='gestion-ventes'"></gestionventes>
<documentventes v-if="$route.params.a==='bon-commande'"></documentventes>

 </div>

</div>


<!-- Footer    -->
 <basdepage></basdepage>



</div>
</template>
<script>



export default {


data () {
return {

idutilisateurencours: 0,
nomutilisateurencours: '',
mailutilisateurencours:'',
prenomutilisateurencours:'',
nomsociete: '',
show : true,
vacceuil: false,
vclients: false,
vproduits :false,
vventes: false,
vfournisseurs :false,
vstatistiques: false,
vparametres:false,
vsupport: false,
vachats : false,
menu1: 'bg-secondary',
menu2 :'bg-info',
ssfamille : false 
}



},

 mounted : function ()
{
 this.nomutilisateurencours = localStorage.nomutilisateurencours
 this.mailutilisateurencours = localStorage.mailutilisateurencours
 this.prenomutilisateurencours =localStorage.prenomutilisateurencours
 this.idutilisateurencours = localStorage.idutilisateurencours
 this.nomsociete = localStorage.nomsociete
 
},

 computed : {


 }

 ,
 methods : {

}



}
</script>

<style scoped>


 .form-rounded {
  border-radius: 1rem;
 }
</style>

