<template>

<div id="gestionmarques">



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
    <label for="Recherche">Recherche</label><input type="search" v-model="filter" id="filterInput">
</div>
      <div class="p-1 ml-auto">
        <button type= "button" class= "btn btn-primary btn-sm"  @click = "InitAll()"> <span class="material-icons align-bottom" >update</span>Actualiser</button>
         <button type="button" class="btn btn-primary btn-sm" @click="Openmodelfonction()"><span class="material-icons align-bottom">note_add</span>Nouveau </button>
       </div>
</div>

     <div class="d-lg-flex">

   
    <b-table id="mytable" responsive :items="info" :fields="fields" :busy="isBusy" head-variant="dark" :per-page="LimitLignePage"  :current-page="currentPage"
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
          {{ data.item.id}}
        </template>



     <template v-slot:cell(refproduit)="data">

      <b>{{data.item.refproduit}}</b>

     </template>


      <template v-slot:cell(photoproduitprincipal)="data">
       <div>
        <img :src='data.item.photoproduitprincipal'  width="100px" height="100px">
       </div>
      </template>


      <template v-slot:cell(marque)="data">
        <div> {{data.item.nommarque}}</div>
         </template>

      <template v-slot:cell(nomfamilleproduit)="data">
        <div> {{data.item.nomfamilleproduit}}</div>
        <div> <i>Sous Famille:</i> {{data.item.nomsousfamilleproduit}}</div>
      </template>

      <template v-slot:cell(nomproduit)="data">
      {{data.item.nomproduit}}
       <span v-html="data.item.descriptionproduit"> </span>
     </template>



      <template v-slot:cell(prixachat)="data">
      {{data.item.prixachat}}
      </template>

      <template v-slot:cell(prixvente)="data">
    {{data.item.prixvente}}

      </template>

      <template v-slot:cell(nomnomenclature)="data">
        <div>  {{data.item.nomnomenclature}} </div>
        <div class="text-sm-left">  <i> {{data.item.descriptionnomenclature}} </i></div>

        <div v-if="data.item.gestionstock === '1'">Gest. stock: <b-badge>Oui</b-badge> </div>
        <div v-else-if="data.item.gestionstock === '0'">Gest. stock: <b-badge>Non</b-badge></div>

        <div v-if="data.item.serialiser === '1'">Gest N°série: <b-badge>Oui</b-badge></div>
        <div v-else-if="data.item.serialiser === '0'">Gest N°série: <b-badge>Nui</b-badge></div>


        <div v-if="data.item.stocknegatif === '1'">Stock négatif: <b-badge>Oui</b-badge>  </div>
        <div v-else-if="data.item.stocknegatif === '0'">Stock négatif: <b-badge>Non</b-badge> </div>

      </template>



      <template v-slot:cell(fichetechnique)="data">
       <div>  <b-link :href="data.item.liendocumentation" target="_blank">afficher</b-link> </div>

      </template>


      <template v-slot:cell(journalisation)="data">
        <div><p class="text-sm-left">Création le <i>{{data.item.datecreationproduit_fr}}</i> </p></div>

        <div v-if="data.item.datemodificationproduit_fr === data.item.datecreationproduit_fr">Modification : aucune </div>
        <div v-else> Modification le: <i>{{data.item.datemodificationproduit_fr}}</i></div>

      </template>


      <template v-slot:cell(idproduit)="data">
     <div>
                <button type="button" class="btn btn-secondary btn-sm" v-on:click="deleteList_a(data.item.idproduit)" ><i class="material-icons">delete</i></button>
                <button type="button" class="btn btn-primary btn-sm" v-on:click="ModificationProduit(data.item.idproduit)"><i class="material-icons">edit</i>
                </button>
       </div>
      </template>

<template v-slot:table-caption>{{titrepages}} </template>

</b-table>

</div>

 <div class="d-flex justify-content-center p-1"> <b-pagination  v-model="currentPage" :total-rows="nbrEnreg" :per-page="LimitLignePage" aria-controls="mytable"> </b-pagination></div>


<div class="d-flex mx-auto bg-dark p-2">
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#formclient" ref="openmodal" style="display: none;" > Nouveau </button>
    <button type= "button" class= "btn btn-primary btn-sm"  @click = "InitAll()"> <span class="material-icons align-bottom" >update</span>Actualiser</button>  |
    <button type="button" class="btn btn-primary" @click="Openmodelfonction()"> <span class="material-icons align-bottom">note_add </span>Nouveau </button>
    
    <a data-toggle="modal" data-target="#DeleteAccord" ref="openmodal2"  data-backdrop="static" data-keyboard="false"></a>
</div>




<!-- Menu de navigation  -->



<!-- 
************************** Modal formulaire  produit / création ou modification
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



<div class="shadow-lg modal-body">
<p align="center" class="alert alert-danger" v-if ="ErreurApi"> {{ MessageErreurApi }}</p> 


 <div class = "container bg-light">
 <div class="row">
 <div class="col-md-2">

  <b-form-group label ="Référence produit" label-align-sm="left" label-for ="rproduit">
  <b-input id="rproduit" v-model ="refproduit" placeholder="Réference du produit"></b-input>
  </b-form-group>
  </div>

  <div class="col-md-10 ml-auto" >
  <label class ="blue-text text-darken-2" for="Désignation produit">Désignation du produit</label>
  <b-input v-model ="designproduit" placeholder="Réference du produit"></b-input>
 </div>



  <div class = "col-md-12" style="height:300px">
   <b-form-group>
 <label class ="blue-text text-darken-2" for="Description produit">Description du produit</label>
 <!--
 <textarea class="form-control" name="descripproduit" v-model="descripproduit" placeholder="Description du produit"></textarea>
     -->
  <ckeditor :editor="editor" v-model="datadescription" :config="editorConfig"></ckeditor>
  </b-form-group>
  </div>


  <div class = "d-flex align-items-center col-md-12">
  
   <b-form-file v-model="documentationPdf" accept=".pdf"
                placeholder="Telecharger la documentation du produit" >
   </b-form-file>

  </div>

     <div class="d-flex  justify-content-between ">

  <div class = "d-flex align-items-center col-md-3">
  <b-form-group label ="Prix d'achat Ht" label-align-sm="left" label-for ="pachat">
  <b-input v-model ="pachat" placeholder="Prix d'achat" type="number" min="0.1" step="0.1" ></b-input>
  </b-form-group>
 </div>


  <div class = "d-flex align-items-center col-md-2">
   <b-form-group label ="Marge %" label-align-sm="left" label-for ="marge">
  <b-input v-model ="marge" placeholder="Marge en %" type="number"  min="1" step="1"  @focusout="CalculMargePoucentage()"></b-input>
   </b-form-group>
  </div>

  <div class="d-flex align-items-center col-md-3">
   <b-form-group label ="Prix de vente Ht" label-align-sm="left" label-for ="pvente">

   <b-input v-model ="pvente" placeholder="Prix d'achat" type="number"  min="0.1" step="0.1" @focusout="CalculMarge ()"></b-input>
   </b-form-group>
   </div>


  <div class="d-flex col-md-2">
   <b-form-group label ="Tva" label-align-sm="left" label-for ="Tva">

   <b-form-select v-model="selectedtva" :options="listeTva"
                  value-field="idtva"
                  text-field="tauxtva">

    <template v-slot:first>
     <b-form-select-option  disabled>-- Selectionnez un taux de Tva --</b-form-select-option>
    </template>

   </b-form-select>
   </b-form-group>

  </div>


  <div class="d-flex">
      <b-button variant="light" size="m" @click="CalculMargePoucentage"><span class="material-icons align-bottom">update</span>Actualisé</b-button>
     </div>



     </div>






  <div class = "col-md-4">

  <label class ="blue-text text-darken-2" for="Famille">Famille</label>

 <b-form-select v-model="selectedfamille" :options="listeFamille"
 value-field="idfamilleproduit"
 text-field="nomfamilleproduit" @change="AfficheListeSousFamilleparFamille(selectedfamille)">

    <template v-slot:first>
     <b-form-select-option  disabled>-- Selectionnez une famille --</b-form-select-option>
    </template>

   </b-form-select>
  </div>

  <div class="col-md-4">
  <label class="blue-text text-darken-2" for="Sous Famille">Sous Famille</label>
  <b-form-select v-model="selectedsousfamille" :options="listesousFamille"
                  value-field="idsousfamilleproduit"
                  text-field="nomsousfamilleproduit"
                  :disabled = "sousfamilletf"
   ></b-form-select>
  </div>


  <div class = "col-md-4 ml-auto">

   <label class ="blue-text text-darken-2" for="Famille">Marque</label>

   <b-form-select v-model="selectedmarque" :options="listeMarque "
                  value-field="idmarquesproduits"
                  text-field="nommarque">

    <template v-slot:first>
     <b-form-select-option  disabled>-- Selectionnez une Marque --</b-form-select-option>
    </template>

   </b-form-select>
  </div>

  <div class = "col-md-6">

   <label class ="blue-text text-darken-2" for="Famille">Nomenclature</label>

      
   <b-form-select v-model="selectednomenclature" :options="listeNomeclature"
                  value-field="idnomenclature"
                  text-field="nomnomenclature" @change="AfficheListeNomenclatureparId(selectednomenclature)">

    <template v-slot:first>
     <b-form-select-option  disabled>-- Selectionnez une Nomenclature --</b-form-select-option>
    </template>

   </b-form-select>
  </div>

  <div class="col-md-6 ml-auto">
   <b-table responsive striped hover :items="listeNomenclatureId" :fields="nomenclaturetbl">

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



   </b-table>
  </div>

  <div class = "col-md-12">
   <b-form-group >
    <b-form-checkbox switch size="l" v-model="gestionstocknegatif">Gestion des stocks negatif</b-form-checkbox>
   </b-form-group>

  </div>

  <div class = "col-md-12">

   <b-form-file v-on:change="afficheimageselect" v-model="fichierimage1" accept=".jpg, .png, .gif"
                placeholder="Choisissez la photo 1" >
   </b-form-file>

  <div>
   photo actuelle:
   <img :src='fichierimage2'  width="50%" height="50%">
  </div>

  <div v-if="file">
   Nouvelle photo :
   <img :src="file"  width="400" height="400">
  </div>
  </div>







  <input  type="hidden"  class="form-control" id="index" name="index" v-model="keyline">


</div> <!-- Row 1--> 

 </div>
</div>

<div class="modal-footer">
<button type="button" class="btn btn-primary" @click ='AjoutProduit()' v-if ="!Modification">Enregistrer</button>
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
       <br>
       <p align="center" class="alert alert-danger" v-if ="ErreurApi"> {{ MessageErreurApi }}</p>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
      <span aria-hidden="true">&times;</span>
  </button>
 </div>
 <div class="modal-body alert alert-warning" role="alert">
Etes-vous sûr de vouloir supprimer ?  
 </div>
 <input type="hidden"  class="form-control" id="index" name="index" v-model="keyline">
 <input type="text"  class="form-control" id="nomfichierp" name="nomfichierp" v-model="nomfichierphoto">

     <div class="modal-footer">
       <button  type="button" class="btn btn-danger" v-on:click='DeleteLine (keyline,nomfichierphoto)'> Oui je supprimer </button>
       <button type="button" class="btn btn-secondary" data-dismiss="modal" ref ="closemodal2">Fermer</button>

      </div>
    </div>
  </div>
</div>


</div> <!-- DIV Final-->




</template>
<script>

import axios from 'axios'
import axios2 from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
 
  data () {
    return {

    editor: ClassicEditor,
    editorData: '<p>Decription du produit</p>',
    editorConfig: {
// The configuration of the editor.
    toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],

    },
    

      titrepages: "Gestion des Produits",
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

         key:'id',
         label :'N°'
            }
                ,
              {
                key: 'refproduit',
                label :'Reference',
                sortable: true
               },
          {
            key:'photoproduitprincipal',
            label:'Photo'

          },
          {
            key: 'marque',
            label :'Marque',
            sortable: true
          },


          {
            key: 'nomfamilleproduit',
            label :'Familles ',
            sortable: true
          },

          {
                key: 'nomproduit',
                label :'Désignation',
                sortable: false
            },

        {
        key: 'nomproduit',
        label :'Désignation',
        sortable: false
        },

          {
            key: 'prixachat',
            label :'Prix Achat HT',
            sortable: true
          },
          {
            key: 'prixvente',
            label :'Prix vente HT',
            sortable: true
          },


          {
            key: 'nomnomenclature',
            label :'Type Nomenclature',
            sortable: true
          },

          {
            key: 'fichetechnique',
            label :'Fiche',
            sortable: false
          },
          {
            key: 'journalisation',
            label :'Date',
            sortable: true
          },


          {
        key: 'idproduit',
        label :'Actions'

        }  ],



    nomenclaturetbl: [

    {
    key: 'nomqtenomenclature',
    label :'Unité',
    sortable: true
    } ,

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
    }




     ]


        ,
        nbrlignes:'', 
        nommarque: "",
        
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
ApiProduit: 'produits/API_gestionproduits/',
ApiTaxes: 'parametrage/API_Taxes/',
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
    nomfichierphoto : "",
    listeFamille: [] ,
    listesousFamille: [],
    listeNomeclature: [],
    pvente:0.00,
    pachat:0.00,
    gestionstocknegatif: false,
    refproduit:'',
    designproduit:'',
    datadescription:'',
    documentationPdf:'',
    selectedfamille:0,
    selectedsousfamille:0,
    selectedmarque:0,
    selectednomenclature:0,
    selectedtva:0,
    fichierimage1:'',
    listeNomenclatureId:[],
    listeTva: [],
    marge: 0,
    sousfamilletf: true,
    listeMarque:[],
    

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


 //Famille
//sous Famille
//Nomenclature
//Marque
// prix d'achat
// prix de vente
// TVA

///**************Produit

AfficheListeFamille: function () {

axios2.get(this.cheminUrl + this.ApiProduit + 'afficheListeFamilleProduit').then(response => {
this.listeFamille = response.data
})

},

AfficheListeSousFamilleparFamille : function (i)

{
//AfficheSousFamilleProduitparFamille
axios2.get(this.cheminUrl + this.ApiProduit+'AfficheSousFamilleProduitparFamille/'+i).then(response => {
this.listesousFamille = response.data
this.sousfamilletf = false

})


},


AfficheListeNomenclature : function ()
{
axios.isLitListeclient = true
axios.get(this.cheminUrl+this.ApiProduit+'afficheNomenclatures').then(response => {
this.listeNomeclature = response.data
})

},

AfficheListeNomenclatureparId : function (i)

{

axios2.get(this.cheminUrl + this.ApiProduit+'afficheNomenclatures_parId_full/'+i).then(response => {
this.listeNomenclatureId = response.data

})


},


AfficheListeMarque : function () {
axios.isLitListeclient = true
axios.get(this.cheminUrl + this.ApiProduit + 'afficheListeMarque').then(response => {
this.listeMarque = response.data
})
}, 


AfficheTVA : function () {
axios.get(this.cheminUrl + this.ApiTaxes + 'afficheListeTva').then(response => {
this.listeTva = response.data
})
}



,
CalculMargePoucentage : function () {

this.pvente = ((this.pachat * this.marge) / 100)
this.pvente = parseInt(this.pvente) + parseInt(this.pachat)
}
,

CalculMarge: function () {

this.marge = (this.pvente/this.pachat)*100
    
this.marge = parseInt (this.marge)- 100

}

,
AfficheListe : function ()
{

axios.isLitListeclient = true
axios.get(this.cheminUrl+this.ApiProduit+'Affiche_Allproduit').then(response => {
this.info = response.data
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

} ,
tranformeHtml:function (i)
{
   alert("coucou ")

}

,
ModifierFicheclient : function (i) {
let formData = new FormData();

formData.append('nommarque',this.nommarque)
formData.append('idutilisateur',localStorage.idutilisateurencours)
formData.append('keyline',this.keyline)
formData.append('fichierimage_actuel',this.fichierimage2)
if (this.file != null) formData.append('fichierimage',this.fichierimage)

axios({
method:'POST',
url: this.cheminUrl+this.ApiGroupeClient+'ModificationMarque',
data:formData,
config: {headers: {'Content-Type': 'multipart/form-data'}}
}).then ((response) => {

this.AfficheListe () 
this.InitForm () 
this.$refs.closemodal.click()

}).catch ( (error) => { 

this.MessageErreur ("Erreur d'enregistrement ou de modification de la fiche / Merci de contacter le support")
}) 
}
,
 // fin de ajouter  
 
DeleteLine : function (i,nomfichier)
{
axios.get(this.cheminUrl+this.ApiGroupeClient+'SupprimerMarque/'+i+'/'+nomfichier).then(response =>{
this.keyline = ''
this.AfficheListe () 
this.$refs.closemodal2.click()

}).catch((error) =>  {

this.MessageErreur ("Erreur de suppression: il existe une ou des dépendance(s) à cette Marque.")


  })

},

Openmodelfonction : function () {
this.titrepages = "Gestion produits | Nouveau"
this.AfficheListeFamille () 
this.AfficheListeNomenclature ()
this.AfficheListeMarque ()
this.AfficheTVA ()
 
this.$refs.openmodal.click()
}


,
ModificationProduit : function (idp)
{

this.Modification = true;  // pase en mode modifiction
this.keyline = idp
axios.get(this.cheminUrl+this.ApiProduit+'Affiche_Produit_parId/'+this.keyline).then(response => {
this.info2 = response.data

this.Openmodelfonction ()
this.titrepages = "Gestion des Produits | Modification"
  this.pachat =this.info2[0].prixachat
  this.pvente = this.info2[0].prixvente
 
  this.gestionstocknegatif = this.info2[0].stocknegatif
  this.refproduit = this.info2[0].refproduit
  this.designproduit = this.info2[0].nomproduit
  this.datadescription = this.info2[0].descriptionproduit
  this.documentationPdf = this.info2[0].liendocumentation
  this.selectedfamille = this.info2[0].idfamilleproduit
  this.selectedsousfamille = this.info2[0].idsousfamilleproduit
  this.selectedmarque = this.info2[0].idmarquesproduits
  this.selectednomenclature = this.info2[0].idnomenclature
  this.selectedtva = this.info2[0].idtva
  this.sousfamilletf = false
  this.AfficheListeNomenclatureparId (this.selectednomenclature)
  this.AfficheListeSousFamilleparFamille (this.selectedfamille)
 this.marge = 0.00
  this.CalculMarge()
  this.fichierimage2 = this.info2[0].photoproduitprincipal
  

 // this.fichierimage1 = this.info2.photoproduitprincipal
 // this.marge = 10

}) .catch (error => { 

this.MessageErreur (error)

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
this.nommarque = ""
},

deleteList_a : function (a,b)
{
this.keyline = a

// j'ai besoin de récupérer l'extension et le nom de fichier
//de la fin de la chaine jusqu'il rencontre un point
//puis la chaine jusqu'a qu'il rencontre un "\"
//b = b.substring(b.lastIndexOf("."))
b = b.substring(b.lastIndexOf("/"))
b = b.substring(1,b.length)
this.nomfichierphoto = b
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
AjoutProduit : function ()
{


// ************************** préparation de données au format API 
// ******************************************************************

let formData = new FormData();

formData.append('refproduit',this.refproduit)
formData.append('designproduit',this.designproduit)
formData.append('datadescription',this.datadescription)
formData.append('prixachat',this.pachat)
formData.append('prixvente',this.pvente)
formData.append('idfamille',this.selectedfamille)
formData.append('idsousfamille',this.selectedsousfamille)
formData.append('idmarque',this.selectedmarque)
formData.append('idnomenclature',this.selectednomenclature)
formData.append('stocknegatif',this.gestionstocknegatif)
formData.append('documentationPdf',this.documentationPdf)
formData.append('tauxtva',this.selectedtva)
formData.append('fichierimage',this.fichierimage1)     
formData.append('idutilisateur',localStorage.idutilisateurencours)



//******************************************
axios({
method:'POST',
url: this.cheminUrl+this.ApiProduit+'ajouter_produit',
data:formData,
config: {headers: {'Content-Type': 'multipart/form-data'}}
}).then ((response) => {
// reinit le formulaire
// femrer le fenetre 
this.AfficheListe () 
this.InitForm () 
this.$refs.closemodal.click()

}).catch ( (error) => { 
this.MessageErreur () 
})

}

}
 

}
</script>

<style >


 .ck-editor__editable {
  height: 210px;
 }
</style>