<template>

<div id="HeaderTop">

<div class="d-flex flex-row bg-dark border-bottom border-primary" >
 <div class="p-2">
  <h2 class ="text-light">
  <i class="material-icons">storage</i>
   Sababa</h2>

  <button class="link">
choix :  {{$route.params.a}} // b: {{$route.params.b}}
  </button>
 </div>


 <div class="ml-auto text-right text-light p-2"  role="alert">
  Nom utilisateur  {{nomutilisateurencours}} {{prenomutilisateurencours}} - Mail {{mailutilisateurencours}}
 </div>

</div>

 <!-----********************************
 Menu general
 -->

<div class="d-flex flex-row text-dark border"  style="max-height: 100%">

 <div class="shadow p-2 w-25 h-100 bg-light border border-left-0 border-dark rounded" id="Menugeneral">

  <div class="card border-0">
   <div class="card-header border-0" id="GestionClients">

    <div class="P-1">
  <h6>
  <b-icon icon="people-fill" font-scale="1.5"></b-icon>
   <button type="button" class="btn" data-toggle="collapse" data-target="#clients"
 aria-expanded="false" aria-controls="clients">Clients</button>
  </h6>
 </div>

   </div>
   <div id="clients" class="collapse" aria-labelledby="GestionClients" data-parent="#Menugeneral">
    <div class="shadow card-body text-left">

 <div class="p-1 ">
  <router-link :to="{ name: 'Welcome', params: { a: 'gestion-clients', b:1}}">Clients</router-link>

 </div>
     <div class="p-1">

      <router-link :to="{ name: 'Welcome', params: { a: 'groupe-clients', b:1}}">Groupe clients</router-link>
     </div>
     <div class="p-1">
      <button type="button" class="btn btn-link" v-on:click='pageaffiche(2)'>Contacts</button>
     </div>
    </div>
   </div>
  </div>


  <!-------   Gestion Produits -->
  <div class="card border-0">

   <div class= "card-header border-0"  id="GestionProduits">

    <div class="P-1">
     <h6>
      <b-icon icon="bucket" font-scale="1.5"></b-icon>


      <button type="button" class="btn"
              data-toggle="collapse" data-target="#produits"
              aria-expanded="false" aria-controls="produits" >Produits</button>
     </h6>
    </div>
   </div>

   <div class="collapse" aria-expanded="true"  id="produits"  aria-labelledby="GestionProduits" data-parent="#Menugeneral" >

    <div class="shadow card-body text-left">

     <div class="p-1">
      <router-link :to="{ name: 'Welcome', params: { a: 'produits-familles', b:2}}">Familles</router-link>
     </div>

     <div class="p-1 ">
      <button type="button" class="btn btn-link" v-on:click='pageaffiche(1)'>Nomenclature</button><br>
     </div>
     <div class="p-1">
      <button type="button" class="btn btn-link" v-on:click='pageaffiche(2)'>Articles</button>
     </div>

    </div>
   </div>
  </div>

  <div class="card border-0">

  <!-------   Gestion Achats -->
  <div class= "card-header border-0"  id="GestionAchats">

   <div class="P-1">
    <h6>
     <b-icon icon="table" font-scale="1.5"></b-icon>
     <button type="button" class="btn"
             data-toggle="collapse" data-target="#achats"
             aria-expanded="false" aria-controls="achats">Achats</button>
    </h6>
   </div>
   </div>
   <div id="achats" class="collapse" aria-labelledby="GestionAchats" data-parent="#Menugeneral">
    <div class="shadow card-body text-left">


     <div class="p-1">
      <button type="button" class="btn btn-link" v-on:click='pageaffiche(2)'>Gestion des Achats</button>
     </div>

     <div class="p-1 ">
      <button type="button" class="btn btn-link" v-on:click='pageaffiche(1)'>Fournisseur</button><br>
     </div>
     <div class="p-1">
      <button type="button" class="btn btn-link" v-on:click='pageaffiche(2)'>Groupe Fournisseur</button>
     </div>

     <div class="p-1">
      <button type="button" class="btn btn-link" v-on:click='pageaffiche(2)'>Factures d'achat</button>
     </div>

    </div>
   </div>


  </div>


 <div class="card border-0">
   <!-------   Gestion ventes -->
   <div class= "card-header  border-0" id="GestionVentes">

    <div class="P-1">
     <h6> <b-icon icon = "bar-chart-fill" font-scale="1.5"> </b-icon>
      <button class="btn"
              data-toggle="collapse" data-target="#ventes"
              aria-expanded="true" aria-controls="ventes">Ventes</button>
     </h6>
    </div>

   </div>

  <div id="ventes" class="collapse" aria-labelledby="GestionVentes" data-parent="#Menugeneral">
   <div class="shadow card-body text-left">

    <div class="p-1">
     <button type="button" class="btn btn-link" v-on:click='pageaffiche(2)'>Gestion des Articles</button>
    </div>



    <div class="p-1">
     <button type="button" class="btn btn-link" v-on:click='pageaffiche(2)'>Gestion des Ventes</button>
    </div>


    <div class="p-1 ">
     <button type="button" class="btn btn-link" v-on:click='pageaffiche(1)'>Devis</button><br>
    </div>
    <div class="p-1">
     <button type="button" class="btn btn-link" v-on:click='pageaffiche(2)'>Bon de Commande</button>
    </div>

    <div class="p-1">
     <button type="button" class="btn btn-link" v-on:click='pageaffiche(2)'>Factures</button>
    </div>
    <div class="p-1">
     <button type="button" class="btn btn-link" v-on:click='pageaffiche(2)'>Avoirs</button>
    </div>


   </div>
  </div>
 </div>

  <div class="card border-0">
   <!-------   Gestion Paramétrage -->
   <div class= "card-header  border-0">

    <div class="P-1">
     <h6> <b-icon icon = "pie-chart-fill" font-scale="1.5"> </b-icon>
      <button class="btn" data-toggle="collapse" data-target="#client" aria-expanded="true" aria-controls="client">Statistiques</button>
     </h6>
    </div>

   </div>

  </div>


  <div class="card border-0">
   <div class="card-header border-0" id="headingOne2">

    <div class="P-1">
     <h6>
      <b-icon icon="gear-fill" font-scale="1.5"></b-icon>
      <button type="button" class="btn" data-toggle="collapse" data-target="#collapseOne2" aria-expanded="false" aria-controls="collapseOne2">Parametrage</button>
     </h6>
    </div>

   </div>


   <div id="collapseOne2" class="collapse" aria-labelledby="headingOne2" data-parent="#Menugeneral">
    <div class="card-body text-left">

     <div class="p-1 ">
      <button type="button" class="btn btn-link" v-on:click='pageaffiche(40)'>Groupes utilisateurs</button><br>
     </div>
     <div class="p-1">
      <button type="button" class="btn btn-link" v-on:click='pageaffiche(41)'>Utilisateurs</button>
     </div>

     <div class="p-1 ">
      <router-link :to="{ name: 'Welcome', params: { a: 'gestion-civilite', b:4}}">Civlités</router-link>
     </div>

     <div class="p-1 ">

      <router-link :to="{ name: 'Welcome', params: { a: 'gestion-codepostaux', b:4}}">Code postaux</router-link><br>

     </div>

     <div class="p-1 ">
      <button type="button" class="btn btn-link" v-on:click='pageaffiche(44)'>Taxes Articles</button><br>
     </div>

     <div class="p-1 ">
      <button type="button" class="btn btn-link" v-on:click='pageaffiche(45)'>Conditions de règlements</button><br>
     </div>


    </div>
   </div>
  </div>



  <div class="card border-0 rounded-0">

   <!-------   Gestion Support -->
   <div class= "card-header">
   <div class="P-1">
    <h6>

   <b-icon icon = "at" font-scale="1.5"> </b-icon>
   <button class="btn" data-toogle="collapse" data-target="#client" aria-expanded="true" aria-controls="client"> Support</button>


    </h6>
   </div>
  </div>

  </div>


 <div class="mh-100 mx-100 bg-light" style="width:100%; max-height:100%;" >


 </div>


 </div>

 <div class="p-3 bg-light w-100  mx-auto ">

  <!-----

  1° par thème de menu
  2°

  -->


<gestionclients v-if="$route.params.a==='gestion-clients'"> </gestionclients>
 <groupesclients v-if="$route.params.a==='groupe-clients'"> </groupesclients>
 <gestioncivilite v-if="$route.params.a==='gestion-civilite'"></gestioncivilite>
 <gestioncodepostaux v-if="$route.params.a==='gestion-codepostaux'"> </gestioncodepostaux>
<famillearticles v-if="$route.params.a==='produits-familles'"> </famillearticles>

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

}

 console.log ("hell the word 2")

},

 mounted : function ()
{

 this.nomutilisateurencours = localStorage.nomutilisateurencours
 this.mailutilisateurencours = localStorage.mailutilisateurencours
 this.prenomutilisateurencours =localStorage.prenomutilisateurencours
 this.idutilisateurencours = localStorage.idutilisateurencours

}

 ,
 methods : {



}



}
</script>


