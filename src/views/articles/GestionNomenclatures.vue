<template>

<div id="gestionnomenclature">



<div class = "shadow-lg d-flex align-items-start flex-column bg-light ml-auto">
<div class="p2">
 <h2>{{titrepages}}</h2>
</div>
  
</div> 

<div class="d-flex align-items-end flex-column"> 
  <div class="p2">
    
Nombre de ligne par page 
 <select class="form-control-sm" v-model="LimitLignePage" @change="affNbrLign (LimitLignePage)">
   <option v-for="nbrlignes in nombreligne" :key="nbrlignes.a" v-bind:value="nbrlignes.value">  
     {{nbrlignes.a}} 
     </option>
       </select>  
  </div>

 <div class="p2">

  <select class="form-control-sm align-bottom"  v-model="choixrefreshpage" @change = "Setinter (choixrefreshpage)">
    <option v-for="i in delaisrefreshpage" :key="i.texte" v-bind:value="i.value">
  {{i.texte}}
   </option>
  </select>
</div>
</div>


<div class="d-lg-flex bg-light">
    <div class="p-1">          
    <label for="Recherche">Recherche</label> <input type="search" class="form-rounded" v-model="filter" id="filterInput">

</div>
      <div class="p-1 ml-auto">
        <button type= "button" class= "btn btn-primary btn-sm"  @click = "InitAll()"> <span class="material-icons align-bottom" >update</span>Actualiser</button>
         <button type="button" class="btn btn-primary btn-sm" @click="Openmodelfonction()"><span class="material-icons align-bottom">note_add</span>Nouveau </button>
       </div>
</div>

     <div class="d-lg-flex">


    <b-table id="mytable" fixed responsive :items="info" :fields="fields" :busy="isBusy" head-variant="light" :per-page="LimitLignePage" :current-page="currentPage"
             :filter="filter" :filterIncludedFields="filterOn"
             @filtered="onFiltered"
             hover caption-top>

        <template v-slot:table-busy>
            <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Chargement...</strong>
            </div>
        </template>



        <template v-slot:cell(id)="data">
      {{data.item.id}}
        </template>


     <template v-slot:cell(gestionstock)="data">
       <div v-if="data.item.gestionstock === '1'"> Oui </div>
       <div v-else-if="data.item.gestionstock === '0'">Non</div>
      </template>

     <template v-slot:cell(stocknegatif)="data">
       <div v-if="data.item.stocknegatif === '1'"> Oui </div>
      <div v-else-if="data.item.stocknegatif === '0'">Non</div>
      </template>

     <template v-slot:cell(serialiser)="data">
        <div v-if="data.item.serialiser === '1'"> Oui </div>
       <div v-else-if="data.item.serialiser === '0'">Non</div>
      </template>


     <template v-slot:cell(Nomenclature)="data" >

      <b-button :id="`popover-target-${data.item.id}`" class="text-center"  @mouseenter="afficheQteNomenclatureId (data.item.idnomenclature)">
       Nomenclature taille <br> Nombre {{data.item.nombre_taille}}
      </b-button>

      <b-popover
       :target="`popover-target-${data.item.id}`"
       placement ="left"
       triggers="hover focus">

       <template v-slot:title>Nomenclature taille</template>
       <div v-for="tailleNom in info2" :key="tailleNom.id">
        {{tailleNom.id}} : <code>{{tailleNom.nomqtenomenclature }}</code>
          </div>
      </b-popover>


      </template>

<template v-slot:cell(idnomenclature)="data">
<td>

   <button type="button" class="btn btn-secondary btn-sm" v-on:click="deleteList_a(data.item.idnomenclature)" ><i class="material-icons">delete</i></button> |
   <button type="button" class="btn btn-primary btn-sm" v-on:click="ModificationNomenclature(data.item.idnomenclature)"><i class="material-icons">edit</i>
  </button>
  </td>

  </template>



<template v-slot:table-caption>{{titrepages}} </template>

      
    </b-table>

</div>
<div class="d-flex justify-content-center p-1"> <b-pagination  v-model="currentPage" :total-rows="nbrEnreg" :per-page="LimitLignePage" aria-controls="mytable" >  </b-pagination></div>


<div class="d-flex mx-auto bg-info p-2">
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#formclient" ref="openmodal" style="display: none;"> Nouveau </button>
    <button type= "button" class= "btn btn-primary btn-sm"  @click = "InitAll()"> <span class="material-icons align-bottom" >update</span>Actualiser</button>  |
    <button type="button" class="btn btn-primary" @click="Openmodelfonction()"> <span class="material-icons align-bottom">note_add </span>Nouveau </button>
    <a data-toggle="modal" data-target="#DeleteAccord" ref="openmodal2"></a>
</div>



    <!-- Menu de navigation  -->


<!-- 
************************** Modal formulaire Famille produit / création ou modification
--> 

<div class="shadow modal" id="formclient" tabindex="-1" role="dialog"  aria-hidden="true">
      
<div class="modal-dialog modal-xl bg-dark" role="document">
<div class="modal-content">
        
    
<div class="modal-header">
 <h5 class="modal-title">{{titrepages}}</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="fermemodale ()">
 <span aria-hidden="true">&times;</span>
</button>
</div>

 
<p align="center" class="alert alert-danger" v-if ="ErreurApi"> {{ MessageErreurApi }}</p>

 <b-container fluid>
 <b-row cols="1" >
       <b-col cols="6">

        <b-form-group
         id="input-group-1"
         label="Désignation:"
         label-for="input-1"
         description="le nom de la nomenclature"
        >
         <b-form-input
          id="input-1"
          v-model="designationnomenclature"
          type="text"
          required
          placeholder="Désignation"
         ></b-form-input>
        </b-form-group>

        <b-form-group
         id="input-group-2"
         label="Description:"
         label-for="input-2"
         description="la définition de la nomenclature"
        >
         <b-form-textarea
          id="input-2"
          v-model="descriptionnomenclature"
          type="text"
          required
          placeholder="Description"
         ></b-form-textarea>
        </b-form-group>


        <b-form-group >
         <b-form-checkbox switch size="l" v-model="gestionstock" >Gestion des stocks</b-form-checkbox>
         </b-form-group>

        <b-form-group >
         <b-form-checkbox switch size="l" v-model="numeroserie">Gestion des numéros de série</b-form-checkbox>
        </b-form-group>

 </b-col>
</b-row>

<b-row cols="1">
     <b-col>
<label> Composer votre tableau de taille selon la nomenclature choisie (Qte,M2,M,S,L,XL...) </label>
      <br> 
<b-button @click = "ligneplus()" size="sm">Ajouter une nouvelle ligne {{typenumber}}</b-button>
     </b-col>
</b-row>
     <b-form-group>
 <b-row  cols="1" v-for="(Tbltaille,index) in TblNomenclature" :key="index">
  <b-col  cols="4">
   <label>
 Unité<code>{{Tbltaille.idligne}}:</code>
 <b-form-input type="text" size="sm" v-model="Tbltaille.valeurid" ></b-form-input>
</label>
<b-button @click = "lignemoins(index)" size="sm" v-if="index===(TblNomenclature.length-1)"> <b-icon icon="x-circle-fill" scale="1" variant="light" > </b-icon></b-button>
</b-col>
 </b-row>
     </b-form-group>
 </b-container>

<div class="modal-footer">
<button type="button" class="btn btn-primary" @click ='AddNewClient' v-if ="!Modification">Enregistrer</button> 
<button type="button" class="btn btn-primary" @click ='ModifierFicheclient(keyline)' v-else>Modification</button> 
<button type="button" class="btn btn-secondary" data-dismiss="modal" ref ="closemodal" v-on:click="fermemodale ()">Annuler</button>
</div>



</div>

</div> 

</div>

<!------************************ Suppression****************-->
<!-- Modal -->
<div class="modal fade" id="DeleteAccord" tabindex="-1" role="dialog" aria-labelledby="DeleteAccord" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Attention </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
      <span aria-hidden="true">&times;</span>
  </button>
 </div>
 <div class="modal-body alert alert-warning" role="alert">
Etes-vous sûr de vouloir supprimer ?  
 </div>
 <input type="text"  class="form-control"  v-model="keyline">
      
      <div class="modal-footer">
       <button  type="button" class="btn btn-danger" v-on:click='DeleteLine (keyline)'> Oui je supprimer </button> 
       <button type="button" class="btn btn-secondary" data-dismiss="modal" ref ="closemodal2">Fermer</button>

      </div>
    </div>
  </div>
</div>


</div> <!-- DIV Final--> 
</template>
<script>

import axios from 'axios'
export default {
 
  data () {
    return {
      titrepages: "Gestion des Nomenclatures",
        limitA: 0,
         LimitLignePage: 10,
        nombreligne:[
         {a : 10, value:"10"  },
         {a : 25, value:"25"  },
         {a : 50, value:"50"  },
         {a : 100, value:"100"  },
         {a : 500, value:"500"  },
                 
        ],
    delaisrefreshpage:[
    {texte : "Ne pas rafraîchir la page", value:0},
    {texte : "rafraîchir toutes les 30s ", value:30000  },
    {texte : "rafraîchir toutes les 1 min", value:60000  },
    {texte : "rafraîchir toutes les 5 min", value:300000  },
    {texte : "rafraîchir toutes les 15 min", value:900000  },
    {texte : "rafraîchir toutes les 30 min", value:1800000  },
    {texte : "rafraîchir toutes les 60 min", value:3600000},

    ]
         
    ,

    choixrefreshpage: 0 // pas de rafraissiement de la page par défaut
    ,
        fields: [


        {

             key:'id',
            label :'N°'
            }
                ,
              {
                key: 'nomnomenclature',
                label :'Nomenclature',
                sortable: true
               },
            {
                key: 'descriptionnomenclature',
                label :'Description',
                sortable: false
            },

            {
                key: 'gestionstock',
                label :'Stock',
                sortable: true
            }
        ,



        {
        key: 'serialiser',
        label: 'Serialisé',
        sortable: true
        }  ,


                
        {

        key:'Nomenclature'

        }
           ,
        {
        key: 'idnomenclature',
        label :'Actions'

        }

        ]
         ,
    test : "", 
    numeroserie : false,
    gestionstock : false,
    stocknegatif : false,
        nbrlignes:'',
        descriptionnomenclature: "",
    designationnomenclature :"",
        currentPage: 1,
        nbrEnreg:1,
        nombrepage: 1,
        i:1,
        ErreurApi: false,
info : [],
info2: [],
info3: [],
copy_info: [], 
Modification: false,
Labelboutton: 'Enregistrer',
keyline:'', 
cheminUrl:  process.env.VUE_APP_URL,
ApiProduit : 'produits/API_gestionproduits/',
MessageErreurApi: '', 
valeur2 : '', 
isLitListeclient : false,
recherchenom : '', 
myReg: '',
nomgroupe: '', 
refgroupe: '',
isBusy : true,
    filter: null,
    filterOn: [],
      jecompte : 0,
   file: null,
typenumber:1,
  champsnumber: 1,

    TblNomenclature:[
    {valeurid:'', idligne:1}
    ],
    CcTblNomenclature:[],
    compteur : 0,


    }

  },
computed : {





},

filters : {


}
,
mounted : function () 
{
this.InitAll () 
}
,
methods: {


ligneplus : function ()

{

if (this.typenumber < 15) {
this.typenumber =this.typenumber+1
this.TblNomenclature.push({valeurid: '', idligne: this.typenumber});

}
}
,

lignemoins : function (i) {

if (this.typenumber > 1) {
this.TblNomenclature.splice(i, 1)
this.typenumber = this.typenumber - 1
}
},


AfficheListe : function ()
{
axios.isLitListeclient = true
axios.get(this.cheminUrl+this.ApiProduit+'afficheNomenclatures').then(response => {
this.info = this.copy_info = response.data
this.nbrEnreg = Object.keys(this.info).length //récupère le nombre d'enregistrement
axios.isLitListeclient = false
this.isBusy = false
this.limitA = 0
this.limitB = parseInt(this.LimitLignePage)
this.nombrepage  = Math.ceil(this.nbrEnreg/this.limitB)
})
  
}
,
InitAll : function () 
{
this.InitForm () 
this.AfficheListe () 
},
  afficheimageselect : function (e)

  {


  const file = e.target.files[0];
  this.file = URL.createObjectURL(file);
}

,

Setinter: function (t) {

if (t != 0) {

setInterval(() => {


this.AfficheListe()
this.InitForm()

}, t)

}


},

onFiltered(filteredItems) {
// Trigger pagination to update the number of buttons/pages due to filtering
this.nbrEnreg= filteredItems.length
this.currentPage = 1
}
, 

MessageErreur: function (MessageText) {
this.ErreurApi = "true"
this.MessageErreurApi = "Erreur d'enregistrement ou de modification de la fiche / Merci de contacter le support"+MessageText

}
,
ModifierFicheclient : function () {

let formData = new FormData();

formData.append('keyline',this.keyline)
formData.append('nomnomenclature',this.designationnomenclature)
formData.append('descriptionnomenclature',this.descriptionnomenclature)
formData.append('gestionstock',this.gestionstock)
formData.append('numeroserie',this.numeroserie)
formData.append('idutilisateur',localStorage.idutilisateurencours)
formData.append('listenomenclature',JSON.stringify(this.TblNomenclature))

axios({
method:'POST',
url: this.cheminUrl+this.ApiProduit+'ModificationNomenclature',
data:formData,
config: {headers: {'Content-Type': 'multipart/form-data'}}
}).then (() => {

this.AfficheListe () 
this.InitForm () 
this.$refs.closemodal.click()

}).catch ( (error) => { 

this.MessageErreur (error.message)
}) 
}
,
 // fin de ajouter  
 
DeleteLine : function (i) 
{
axios.get(this.cheminUrl+this.ApiProduit+'deleteNomenclature/'+i).then(() =>{
this.keyline = ''
this.AfficheListe ()
this.$refs.closemodal2.click()

})

 .catch(function (error) {
   this.MessageErreur (error.message)

  });

},

afficheQteNomenclatureId : function (i)
{

axios.get(this.cheminUrl+this.ApiProduit+'AfficheQteNomenclaturId/'+i).then(response => {
this.info2 = response.data

}) .catch (error => {

  this.MessageErreur (error.message)
})




}



,

Openmodelfonction : function () {
this.titrepages = "Gestion des nomenclatures | Nouveau"
this.$refs.openmodal.click()
}
,
ModificationTbleNomenclature : function (i)
{

axios.get(this.cheminUrl+this.ApiProduit+'AfficheQteNomenclaturId/'+i).then(response => {
this.info3 = response.data

alert (Object.keys(this.info3).length )


}) .catch (error => {

  this.MessageErreur (error.message)

})


},

ModificationNomenclature : function (d) {
this.Modification = true;  // pase en mode modifiction 
this.keyline = d
this.compteur = 1
this.TblNomenclature = []

axios.get(this.cheminUrl + this.ApiProduit + 'afficheNomenclatures_parId_full/' + this.keyline).then(response => {
this.info2 = response.data
this.designationnomenclature = this.info2[0].nomnomenclature
this.descriptionnomenclature = this.info2[0].descriptionnomenclature

if (this.info2[0].gestionstock === "1") this.gestionstock = true
else this.gestionstock = false

if (this.info2[0].serialiser === "1") this.numeroserie = true
else this.numeroserie = false

 // boucle pour le tableau
    this.info2.forEach(Element => {
    this.TblNomenclature.push({valeurid: Element.nomqtenomenclature, idligne: this.compteur});
     this.compteur++
    })
this.typenumber = this.compteur-1

this.$refs.openmodal.click()
//this.Openmodelfonction ()
this.titrepages = "Gestion des Nomenclature produits | Modification"
}).catch(error => {
  this.MessageErreur (error.message)
})

}
,

fermemodale : function () {
this.Modification  = false;  // pase en mode modifiction 
this.Labelboutton ="Enregistrer"
this.keyline = 0
this.MessageErreurApi = ""
this.ErreurApi = false
this.designationnomenclature = ''
this.descriptionnomenclature = ''
this.TblNomenclature =[{valeurid:'', idligne:1}]
this.typenumber = 1
},

deleteList_a : function (a)
{
this.keyline = a
this.$refs.openmodal2.click ();
},

InitForm : function ()
{
this.designationnomenclature = ''
this.descriptionnomenclature = ''
this.Modification = false
this.recherchenom = ""
this.TblNomenclature = [{valeurid:'', idligne:1}]
}

,
AddNewClient : function () 
{

//this.TblNomenclature.push({value:'', idligne:this.typenumber});

// ************************** préparation de données au format API 
// ******************************************************************


let formData = new FormData();
formData.append('nomnomenclature',this.designationnomenclature)
formData.append('descriptionnomenclature',this.descriptionnomenclature)
formData.append('gestionstock',this.gestionstock)
formData.append('numeroserie',this.numeroserie)
formData.append('idutilisateur',localStorage.idutilisateurencours)
formData.append('listenomenclature',JSON.stringify(this.TblNomenclature))

//******************************************
axios({
method:'POST',
url: this.cheminUrl+this.ApiProduit+'ajoutNomenclature',
data:formData,
config: {headers: {'Content-Type': 'multipart/form-data'}}
}).then (() => {
// reinit le formulaire
// femrer le fenetre
this.AfficheListe ()
this.InitForm ()
this.$refs.closemodal.click()

}).catch ( (error) => {
  this.MessageErreur (error.message)
})



}

}
 

}
</script>
<style scoped>
 a.disabled {
  pointer-events: none;
 }

 .form-rounded {
  border-radius: 1rem;
 }
</style>