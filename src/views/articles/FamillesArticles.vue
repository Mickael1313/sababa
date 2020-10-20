<template>

<div id="FamillesArticles">



<div class = "d-flex align-items-start flex-column bg-light"> 
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
    <label for="Recherche">Recherche</label> <input type="search" v-model="filter" id="filterInput">

</div>
      <div class="p-1 ml-auto">
        <button type= "button" class= "btn btn-primary btn-sm"  @click = "InitAll()"> <span class="material-icons align-bottom" >update</span>Actualiser</button>
         <button type="button" class="btn btn-primary btn-sm" @click="Openmodelfonction()"><span class="material-icons align-bottom">note_add</span>Nouveau </button>
       </div>
</div>

     <div class="d-lg-flex">


    <b-table id="mytable" fixed responsive :items="info" :fields="fields" :busy="isBusy" head-variant="dark" :per-page="LimitLignePage"  :current-page="currentPage"
             :filter="filter" :filterIncludedFields="filterOn"
             @filtered="onFiltered"
             hover caption-top>


        <template v-slot:table-busy>
            <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Chargement...</strong>
            </div>
        </template>



        <template v-slot:cell(index)="data">
            {{ data.index + 1}}
        </template>

        <template v-slot:cell(photofamilleproduit)="data">
        <td>

  <img :src='data.item.photofamilleproduit'  width="100px" height="100px">
        </td>
        </template>


           <template v-slot:cell(idfamilleproduit)="data">
            <td>
                <button type="button" class="btn btn-secondary btn-sm" v-on:click="deleteList_a(data.item.idfamilleproduit)" ><i class="material-icons">delete</i></button> |
                <button type="button" class="btn btn-primary btn-sm" v-on:click="ModificationCLient(data.item.idfamilleproduit)"><i class="material-icons">edit</i>
                </button>
            </td>

                </template>

<template v-slot:table-caption>{{titrepages}} </template>
        
    </b-table>



</div>
<div class="d-flex justify-content-center p-1"> <b-pagination  v-model="currentPage" :total-rows="nbrEnreg" :per-page="LimitLignePage" aria-controls="mytable"> </b-pagination></div>


<div class="d-flex mx-auto bg-dark p-2">
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#formclient" ref="openmodal" style="display: none;"> Nouveau </button>
    <button type= "button" class= "btn btn-primary btn-sm"  @click = "InitAll()"> <span class="material-icons align-bottom" >update</span>Actualiser</button>  |
    <button type="button" class="btn btn-primary" @click="Openmodelfonction()"> <span class="material-icons align-bottom">note_add </span>Nouveau </button>
    
    <a data-toggle="modal" data-target="#DeleteAccord" ref="openmodal2"></a>
</div>




    <!-- Menu de navigation  -->



<!-- 
************************** Modal formulaire Famille produit / création ou modification
--> 

<div class="shadow modal  " id="formclient" tabindex="-1" role="dialog"  aria-hidden="true">
      
<div class="modal-dialog modal-xl bg-dark" role="document">
<div class="modal-content">
        
    
<div class="modal-header">
 <h5 class="modal-title">{{titrepages}}</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="fermemodale ()">
 <span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">
<p align="center" class="alert alert-danger" v-if ="ErreurApi"> {{ MessageErreurApi }}</p> 

<div class = "container-fluid">
<div class="row">
<div class="col-6">
<div  class="form-group">

<label class ="blue-text text-darken-2" for="Désignation">Désgination</label>
    <input type="text" class="form-control" name="designationfamille" v-model="designationfamille" placeholder="Désignation courte">
<label for="Description">Description</label>
    <textarea class="form-control" name="descriptionfamille"  v-model="descriptionfamille"> </textarea>

    <label for="Photo">Photo</label>

    <b-form-file v-on:change="afficheimageselect" v-model="fichierimage" accept=".jpg, .png, .gif"
            placeholder="Choisissez la photo pour désigner la famille" >
    </b-form-file>


</div>

 <div>
  Photo actuelle :
  <img :src='fichierimage2'  width="50%" height="50%">
 </div>

 <div v-if="file">
  Photo nouvelle :
      <img :src="file"  width="50%" height="50%">
 </div>

 <input  type="hidden"  class="form-control" id="index" name="index" v-model="keyline">

</div>  <!-- col2--> 

</div> <!-- Row 1--> 
</div> <!-- fluid--> 
 

<div class="modal-footer">
<button type="button" class="btn btn-primary" @click ='AddNewClient' v-if ="!Modification">Enregistrer</button> 
<button type="button" class="btn btn-primary" @click ='ModifierFicheclient(keyline)' v-else>Modification</button> 

<button type="button" class="btn btn-secondary" data-dismiss="modal" ref ="closemodal" v-on:click="fermemodale ()">Annuler</button>
</div>


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
        <h5 class="modal-title">Attention </h5> <br>     
       <p align="center" class="alert alert-danger" v-if ="ErreurApi"> {{ MessageErreurApi }}</p>

        <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
      <span aria-hidden="true">&times;</span>
  </button>
 </div>



     <div class="modal-body alert alert-warning" role="alert">
Etes-vous sûr de vouloir supprimer ?  
 </div>
 <input type="hidden"  class="form-control" id="index" name="index" v-model="keyline">
      
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
      titrepages: "Gestion des Familles de produits",
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

    ],

    choixrefreshpage: 0 // pas de rafraissiement de la page par défaut
    ,
        fields: [


        {

             key:'index',
            label :'N°'
            }
                ,
              {
                key: 'nomfamilleproduit',
                label :'Nom Famille',
                sortable: true
               },
            {
                key: 'descriptionfamilleproduit',
                label :'Description',
                sortable: false
            },


            {
                key: 'photofamilleproduit',
                label :'Photo',
                sortable: false
            }


            ,
        {
        key: 'idfamilleproduit',
        label :'Actions'

        }           ]

        ,
        nbrlignes:'', 
        descriptionfamille: "",
        designationfamille :"",
        fichierimage:null,
       fichierimage2:null,
       currentPage: 1,
        nbrEnreg:1,
        nombrepage: 1,
        i:1,
       
        ErreurApi: false,
info : [],
info2: [], 
copy_info: [], 
Modification: false,
Labelboutton: 'Enregistrer',
keyline:'', 
cheminUrl:  process.env.VUE_APP_URL,
ApiGroupeClient : 'produits/API_gestionproduits/',
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

    }

  },
computed : {

PaginationFiltre : function ()
{
return Object.entries(this.info).slice(this.limitA,this.limitB).map(entry => entry[1])
},


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


AfficheListe : function () 
{
axios.isLitListeclient = true
axios.get(this.cheminUrl+this.ApiGroupeClient+'afficheListeFamilleProduit').then((response) => {
this.info = this.copy_info = response.data 
this.nbrEnreg = Object.keys(this.info).length //récupère le nombre d'enregistrement
axios.isLitListeclient = false
       this.isBusy = false
    this.limitA = 0
this.limitB = parseInt(this.LimitLignePage)
this.nombrepage  = Math.ceil(this.nbrEnreg/this.limitB)


})

},

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

MessageErreur: function (i) {
this.ErreurApi = "true"
this.MessageErreurApi = i

}
,
ModifierFicheclient : function () {
let formData = new FormData();

formData.append('designationfamille',this.designationfamille)
formData.append('descriptionfamille',this.descriptionfamille)
formData.append('keyline',this.keyline)
formData.append('idutilisateur',localStorage.idutilisateurencours)
formData.append('fichierimage_actuel',this.fichierimage2)
if (this.file != null) formData.append('fichierimage',this.fichierimage)
axios({
method:'POST',
url: this.cheminUrl+this.ApiGroupeClient+'modifieFamilleProduit',
data:formData,
config: {headers: {'Content-Type': 'multipart/form-data'}}
}).then (function (response){

this.info2 = response.data()

this.AfficheListe () 
this.InitForm () 
this.$refs.closemodal.click()

}).catch (function (error){

this.MessageErreur ("Erreur d'enregistrement ou de modification de la fiche / Merci de contacter le support"+error.message)
}) 
}
,
 // fin de ajouter  
 
DeleteLine : function (i) 
{
axios.get(this.cheminUrl+this.ApiGroupeClient+'deletefamilleproduit/'+i).then(response =>{
this.keyline = ''
this.AfficheListe () 
this.$refs.closemodal2.click()
this.info2 = response.data
}).catch( function (error){
 this.MessageErreur ("Erreur de suppression : il existe une ou des sous famille dépendante(s) à cette famille."+error.message)
  })

},

Openmodelfonction : function () {
this.titrepages = "Gestion des Familles de produits | Nouveau"

this.$refs.openmodal.click()
}


,
ModificationCLient : function (d) 
{
this.Modification = true;  // pase en mode modifiction 
this.keyline = d

axios.get(this.cheminUrl+this.ApiGroupeClient+'AfficheFamilleProduitparId/'+this.keyline).then(response => {
this.info2 = response.data 
this.designationfamille = this.info2.nomfamilleproduit
this.descriptionfamille =  this.info2.descriptionfamilleproduit
this.fichierimage2 = this.info2.photofamilleproduit

this.Openmodelfonction () 
this.titrepages = "Gestion des Familles de produits | modification"

}) .catch ((error) => {

this.MessageErreur ("Erreur d'enregistrement ou de modification de la fiche / Merci de contacter le support"+error.message)

})

},

fermemodale : function () {
this.Modification  = false;  // pase en mode modifiction 
this.Labelboutton ="Enregistrer"
this.keyline = 0
this.MessageErreurApi = ""
this.ErreurApi = false
this.file = null
this.fichierimage = ""
this.fichierimage2 = ""
},

deleteList_a : function (a)
{
this.keyline = a
this.$refs.openmodal2.click ();
},

InitForm : function ()
{
  this.designationfamille = ''
  this.descriptionfamille = ''
this.Modification = false;
this.recherchenom = "" 
}

,
AddNewClient : function () 
{


// ************************** préparation de données au format API 
// ******************************************************************

let formData = new FormData();
formData.append('designationfamille',this.designationfamille)
formData.append('descriptionfamille',this.descriptionfamille)
formData.append('fichierimage',this.fichierimage)
formData.append('idutilisateur',localStorage.idutilisateurencours)
//******************************************
axios({
method:'POST',
url: this.cheminUrl+this.ApiGroupeClient+'ajoutFamilleProduit',
data:formData,
config: {headers: {'Content-Type': 'multipart/form-data'}}
}).then (function (response){
// reinit le formulaire
// femrer le fenetre
  this.info2 = response.data()
this.AfficheListe () 
this.InitForm () 
this.$refs.closemodal.click()

}).catch ( function (error) {
this.MessageErreur ("Erreur d'enregistrement ou de modification de la fiche / Merci de contacter le support"+error.message)
})

}

}
 

}
</script> 
