<template>

<div id="documentventes">


<div class = "d-flex align-items-start flex-column bg-light"> 
<div class="p2">
 <h2>   {{titlePage}} </h2>
1) choisir un client + N° de client  
<br> 
2) date 
<br> 
3)  Description sur une ligne 
<br>
4) recherche du produit (sans stock pour commaencer)
<br> 
5) calcule du document TVA + TTC 
</div>
</div> 


<b-container class="bv-example-row border" >
  <b-row class="justify-content-md-center">
  <b-col xl="4"> <h4>Création du document</h4>   </b-col>




 <!-- recherche du client + choix
    --> 
<b-col xl="4" offset-md="4">

 <h5> Client </h5>
 Recherche Client <b-form-input list="my-list-id" v-model="searchclient" @keypress="ajxClientDb()" @keyup.delete = "Ajxcliendb2 ()" ></b-form-input>
   <b-form-select
      v-model="selected"
      :options="listeclient"
      class="mb-3"
      value-field="idclient"
      text-field="information_client"
      :select-size="nbrlignetbl"
      v-if="affiche"
       @change="SelectChoixClient()"
      disabled-field="notEnabled"
  ></b-form-select>
  </b-col>

  </b-row>
  <b-row >
    <b-col xl="8" offset-md="8">
      <td> <i>information client</i><br> <b>{{titrecivil}} {{nomclient}}</b></td> <tr></tr>
    <td>{{adresse}}</td> <tr></tr>
 <td> {{adressesuite}} </td> <tr></tr>
 <td> {{codepostal}} {{ville }} </td> <tr></tr>
 <td> {{emailclient}} {{telfixe }} </td> <tr></tr>
  <td> {{telportable}} </td> <tr></tr>
  </b-col>
 </b-row>
  <!--
     ******************************
     -->
  
  <b-row class="p-2 shadow-sm">

    <b-col xl="3" >
      <label  for="Objet du document">Objet / commentaire </label>
    </b-col>
        <b-col xl="9">
        <b-input v-model="objetdocument" placeholder="objet/commentaire"></b-input>
   </b-col>


  </b-row>


  <b-row class="p-3 shadow-sm">

    <b-col xl="3">
      <label for="Date du document">Date du document</label>
    </b-col>
    <b-col xl="3">
      <b-form-datepicker v-model="datedocument" placeholder="date du document" local="fr" class="mb-2"></b-form-datepicker>
    </b-col>


 
  <b-col xl="3">
    <label for="Date du document">Date d'échéance</label>
  </b-col>
  <b-col xl="3">
    <b-form-datepicker v-model="datedocumentlimite" placeholder="Date d'échéance" local="fr" class="mb-2"></b-form-datepicker>
  </b-col>

    </b-row>

  <b-row>


    <b-col xl="1" class="mx-auto">
      <b-button variant="sm" @click="addlignedocument('produit')">
        <b-icon icon="cart-plus" font-scale="2"    aria-hidden="true" ></b-icon>
       Produit
      </b-button>
    </b-col>


  <b-col xl="1" class="mx-auto" >

    <b-button variant="sm" @click="addlignedocument('commentaire')">
      <b-icon icon="file-earmark-plus" font-scale="2"    aria-hidden="true" ></b-icon>
    Commentaire
    </b-button>

  </b-col>
  <b-col xl="1" class="mx-auto" >


    <b-button variant="sm" @click="addlignedocument('bloc')">
      <b-icon icon="bookmark-plus" font-scale="2"    aria-hidden="true" ></b-icon>
    Titre bloc
    </b-button>

  </b-col>



  </b-row>

      <draggable tag="ul" :list="document" class="list-group p-2" handle=".handle"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = true">


        <li  class="list-group-item"
        v-for="(element,index) in document"
        :key="element.id" >

          <b-row >
 <b-col cols="2" class="align-middle">
 <h5>Produit N° <b-badge>{{element.id }}</b-badge></h5>
</b-col>

     <b-col xl="1" class="mx-auto" >
    <b-button variant="sm" @click="removelignedocument(index)">
    <b-icon icon="trash" font-scale="2" aria-hidden="true"></b-icon>
    </b-button>
     </b-col>

     <b-col xl="1" class="ml-auto text-right" >
     <b-icon icon="list" font-scale="2"   class="handle all-scroll " aria-hidden="true"></b-icon>
     </b-col>
      </b-row>



          <b-row v-if="titrebloc">
            <b-col xl="8" class="justify-content-center">
              <b-form-group
                  id="Titre_Bloc"
                  label="Produit"
                  label-for="input-8"
                  :invalid-feedback="invalidFeedback"
                  :valid-feedback="validFeedback"
                  :state="state"
              >
                <b-input placeholder="Titre Bloc" > </b-input>
              </b-form-group>

            </b-col>

          </b-row>






          <b-row class="p-3 bg-light">
           <b-col xl="8" class="justify-content-center">
              <b-form-group
                  id="fieldset-7"
                  label="Produit"
                  label-for="input-8"
                  :invalid-feedback="invalidFeedback"
                  :valid-feedback="validFeedback"
                  :state="state"
              >
              <b-input placeholder="Ref article" v-model="refarticle"> </b-input>
              </b-form-group>
            </b-col>

  <b-col xl="5">
   <b-form-group
              id="fieldset-1"
              label="Désignation"
              label-for="input-1"
              :invalid-feedback="invalidFeedback"
              :valid-feedback="validFeedback"
              :state="state"
          >

            <b-input id="input-1" v-model="designationproduit"> </b-input>
          </b-form-group>


          </b-col>


          <b-col xl="1">


            <b-form-group
                id="fieldset-2"
                label="Qte"
                label-for="input-2"
                :invalid-feedback="invalidFeedback"
                :valid-feedback="validFeedback"
                :state="state"
            >

              <b-input id="input-2" v-model="Qantite"> </b-input>
            </b-form-group>
          </b-col>


          <b-col xl="2">
            <b-form-group
                id="fieldset-3"
                label="Prix vente Ht"
                label-for="input-3"
                :invalid-feedback="invalidFeedback"
                :valid-feedback="validFeedback"
                :state="state"
            >

              <b-input id="input-3" v-model="Prixvente"> </b-input>

            </b-form-group>
          </b-col>

          <b-col xl="3">

            <b-form-group
                id="fieldset-4"
                label="Tva"
                label-for="input-4"
                :invalid-feedback="invalidFeedback"
                :valid-feedback="validFeedback"
                :state="state"
            >


              <b-form-select v-model="selectedtva" :options="listeTva"
                             value-field="idtva"
                             text-field="tauxtva">

                <template v-slot:first>
                  <b-form-select-option :value="null" disabled>-- Selectionnez un taux de Tva --</b-form-select-option>
                </template>

              </b-form-select>
            </b-form-group>




          </b-col>
         

           <b-col xl="12">
              <b-form-group
                  id="fieldset-6"
                  label="Description"
                  label-for="input-6"
                  :invalid-feedback="invalidFeedback"
                  :valid-feedback="validFeedback"
                  :state="state"
              >


                <ckeditor :editor="editor" v-model="datadescription" :config="editorConfig"></ckeditor>

              </b-form-group>
            </b-col>






          </b-row>


        </li>
      </draggable>

  <rawDisplayer class="col-3" :value="document" title="Document List" />

  <b-row class="p-3 mx-auto shadow-sm ">

    <b-col xl="12">
      <b-form-group 
          id="fieldset-7"
          label="Produit"
          label-for="input-8"
          :invalid-feedback="invalidFeedback"
          :valid-feedback="validFeedback"
          :state="state"
      >



      <b-input placeholder="Ref article" v-model="article"> </b-input>



        <b-button size="sm" class="mb-2" @click="addlignedocument()" variant="info">
          <b-icon icon="plus-circle" aria-hidden="true"></b-icon> Ajouter
        </b-button>




      </b-form-group>
    </b-col>



     </b-row>



<b-row class="offset-9">
<b-col xl="5">
Total €/HT
</b-col>
</b-row>

<b-row class="offset-9">
<b-col xl="5">
TVA €/HT
</b-col>
</b-row>
<b-row class="offset-9">
 <b-col xl="5">
TVA €/HT
</b-col>
</b-row>

</b-container>

 <b-container class="p-2 bg-dark shadow">
 <b-row  class="justify-content-center">
   <b-col class="col-2 text-center"   >
 <b-button variant="info"> Enregistrer</b-button>
 </b-col>

   <b-col class="col-2 text-center" >
     <b-button variant="info">Annuler</b-button>
   </b-col>
 </b-row>



 </b-container>
  {{document }}

</div> <!-- DIV Final-->



</template>

<script>


import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import draggable from "vuedraggable";





export default {

  name: "handle",
  display: "Handle",
  instruction: "Drag using the handle icon",
  order: 5,
  components: {
    draggable,
  }, 



  data () {
return {

  editor: ClassicEditor,
  editorData: '<p>Decription du produit</p>',
  editorConfig: {
// The configuration of the editor.
    toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
  },

titlePage:"Documents de Ventes",
searchclient:'',
cheminUrl: 'http://127.0.0.1/apisababa/',
Apiventes: 'ventes/API_ventes/',
ApiTaxes: 'parametrage/API_Taxes/',
listeclient: [],
selected:null,
  nbrlignetbl:0,
  affiche: false,
nbrcaract : 0,
  i:0,
  nomclient: '',
  titrecivil:'',
  adresse:'',
  adressesuite:'',
  codepostal:'',
  ville:'',
  emailclient:'',
  telfixe:'',
  telportable:'',
  objetdocument:"",
  datedocument:"",
  datedocumentlimite:"",
  listeTva: [],
  selectedtva: '',

  datadescription: '',
  Prixvente:0.00,
  Qantite: 0,
  designationproduit: '',

nbrlignedocument :1,
  document : [
    {id:1 ,designation : '', description: '',quantite:0,prixventeht:0,tva:0,typeligne:0}
],
   idligne : 1, 
  dragging: false,

  Commentaire: false,
  titrebloc : false,


}

},

   mounted: function () {

this.InitAll ()


  },

  computed : {

    draggingInfo() {
      return this.dragging ? "under drag" : "";
    }





},

methods:{


ajxClientDb: function () {

this.nbrcaract = this.searchclient.length
if (this.nbrcaract >=2) {
axios.get(this.cheminUrl + this.Apiventes + 'SearchListClient/' +this.searchclient).then(response => {
this.listeclient = response.data
  this.nbrlignetbl = this.listeclient.length
  this.nbrlignetbl +=1
   this.affiche= true
}) // fin de la requete GET


} // fin de if




},

  // fin de la fonction


  Ajxcliendb2: function() {
    this.nbrcaract = this.searchclient.length

    if (this.nbrcaract < 2) {
      this.affiche = false
    }

  },


 SelectChoixClient: function () {

 this.affiche = false

   // retouver le ID + N° du tableau
   for (this.i=0;this.i < this.listeclient.length;this.i ++)
   {
   if (this.listeclient[this.i]['idclient']=== this.selected)
     {
     this.nomclient = this.listeclient[this.i]['nomclient']
     this.titrecivil= this.listeclient[this.i]['titrecivilite']
     this.adresse=this.listeclient[this.i]['adresse']
     this.adressesuite=this.listeclient[this.i]['adressesuite']
     this.codepostal= this.listeclient[this.i]['codepostal']
     this.ville = this.listeclient[this.i]['ville']
     this.emailclient = this.listeclient[this.i]['email']
     this.telfixe = this.listeclient[this.i]['telfixe']
     this.telportable =  this.listeclient[this.i]['telportable']

      }

   }




 } ,

  InitAll: function ()
  {


 var datedaye = new Date()
 this.datedocument =   this.datedocumentlimite  =datedaye.getFullYear()+"-"+(datedaye.getMonth()+1)+'-'+datedaye.getDate()
 this.AfficheTVA()
    
 } ,


  AfficheTVA : function () {
    axios.get(this.cheminUrl + this.ApiTaxes + 'afficheListeTva').then(response => {
      this.listeTva = response.data
    })
  },

  addlignedocument (iid)
  {
alert (iid)
    if (idd ==="bloc")
    {
      // titre bloc


this.titrebloc  = true
this.Commentaire = false
      this.idligne++;
      this.document.push({id: this.idligne,titrebloc:'',typeligne:'bloc'})


    }

if (iid ==='commantaire')
{
this.commentaire = true
this.titrebloc  = false
this.idligne++;
this.document.push({id: this.idligne,commentaire:'',typeligne:'commentaire'})
}


    if (iid === 'produit') {

      this.titrebloc  = false

      this.Commentaire = false


this.idligne++;
this.document.push({id: this.idligne, designation: '', description: '', quantite: 0, prixventeht: 0, tva: 0,typeligne: 'produit'})

    }

  } ,


  removelignedocument(idligne) {

  idligne ++;
  alert (idligne)
    this.document.splice(idligne, 1);
  },


} // fin du groupe methode






}  // fin du projet

</script>

<style>
.all-scroll {cursor: all-scroll;}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

</style>

