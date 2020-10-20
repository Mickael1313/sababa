<template>

<div id="FamillesArticles">



<div class = "d-flex align-items-start flex-column bg-light"> 
<div class="p2">
 <h2>{{titrepages}}</h2>
</div>
  
</div> 

<div class="d-flex align-items-end flex-column"> 
  <div class="p2">
    <input type= "button" class= "btn btn-primary" value = "actualiser" @click = "InitAll()">
Nombre de ligne par page 
 <select class="form-control-sm" v-model="LimitLignePage" @change="affNbrLign (LimitLignePage)"> 
   <option v-for="nbrlignes in nombreligne" :key="nbrlignes.a" v-bind:value="nbrlignes.value">  
     {{nbrlignes.a}} 
     </option>
       </select>  
  </div>
</div> 


<div class="d-lg-flex bg-light">
  <label for="recherche nom client"> Nom</label> 
<input type="text" v-model="recherchenom" @keyup="actionrechenom" @keyup.delete="actionrechenom(8)"> 

</div>

<div class="d-lg-flex"> 


  <table class="table table-hover" v-if=!isLitListeclient>
    <thead class = "table-primary">
      <tr>
 <th scope="col">N°</th>
   <th  scope="col">Nom famille</th>
 <th  scope="col">Description</th>
 <th  scope="col">photo</th>
 <th  scope="col"> Actions</th>
</tr>
 </thead>

<tbody v-for= "(items,i) in PaginationFiltre" :key ="items.idgroupeclient">

 <td>{{(++i)}}|{{items.idfamilleproduit}}</td>
 <td> {{items.nomfamilleproduit}}</td>
 <td>{{items.descriptionfamilleproduit}} </td>
 <td> <img :src="items.photofamilleproduit"></td>

 <td>
<button type="button" class="btn btn-secondary" v-on:click="deleteList_a(items.idgroupeclient)" ><i class="material-icons">delete</i></button> |
<button type="button" class="btn btn-primary" v-on:click="ModificationCLient(items.idgroupeclient)"><i class="material-icons">edit</i> 
</button> 
</td>

</tbody>
</table>
</div> 
<div class="d-lg-flex bg-dark"> 
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#formclient" ref="openmodal" style="display: none;"> Nouveau </button>
<button type="button" class="btn btn-primary" @click="Openmodelfonction()"> Nouveau </button> 
<a data-toggle="modal" data-target="#DeleteAccord" ref="openmodal2"></a> 
</div>



    <div class="d-flex justify-content-center p-1">
        <nav aria-label="" class="p-2">
            <ul class="pagination pagination-sm">
                <li class="page-item active" aria-current="page"> <button type="button" class="btn btn-outline-primary btn-sm" @click ="PremierePage()"> <i class="material-icons">skip_previous</i></button></li>
                <li class="page-item"><button type="button" class="btn btn-outline-primary btn-sm" @click ="suivantmoinsun()"> <b-icon icon="chevron-left" font-scale="2"></b-icon> </button></li>

                <li class="page-item">
                    <select class="form-control" v-model="currentPage" v-on:change ="affpagelien(currentPage)">
                        <option v-for="i in nombrepage" :key="i" v-bind:value="i">{{i}}</option></select>  </li>
                <li class="page-item"> <button type="button" class="btn btn-primary" disabled> sur {{nombrepage}}</button> </li>

                <li class="page-item"><button type="button" class="btn btn-outline-primary btn-sm" @click ="suivantplusun()">
                    <b-icon icon="chevron-right" font-scale="2"></b-icon>
                </button></li>
                <li class="page-item"><button type="button" class="btn btn-outline-primary btn-sm" @click ="DernierePage()"> <i class="material-icons">skip_next</i></button></li>
            </ul>
        </nav>
    </div>

    <!-- Menu de navigation  -->



<!-- 
************************** Modal formulaire Client  
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

    <b-form-file nom ="fichierimage" v-model ="fichierimage" accept=".jpg, .png, .gif"
            placeholder="Choisissez la photo pour désigner la famille du produit..."
    value="">
    </b-form-file>



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

<!------****************************************-->
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
        descriptionfamille: "",
        designationfamille :"",
        fichierimage:null,
       limitB:10, 
       currentPage: 1,
        nbrEnreg:0, 
        nombrepage: 0,
        i:1,
       
        ErreurApi: false,
info : [],
info2: [], 
copy_info: [], 
Modification: false,
Labelboutton: 'Enregistrer',
keyline:'', 
cheminUrl: 'http://127.0.0.1/apisababa/',
ApiGroupeClient : 'produits/API_gestionproduits/',
MessageErreurApi: '', 
valeur2 : '', 
isLitListeclient : false,
recherchenom : '', 
myReg: '',
nomgroupe: '', 
refgroupe: ''
 }

  },
computed : {

PaginationFiltre : function ()
{
return Object.entries(this.info).slice(this.limitA,this.limitB).map(entry => entry[1])
}


}

,
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
axios.get(this.cheminUrl+this.ApiGroupeClient+'afficheListeFamilleProduit').then(response => {
this.info = this.copy_info = response.data 
this.nbrEnreg = Object.keys(this.info).length //récupère le nombre d'enregistrement
axios.isLitListeclient = false 
this.limitA = 0
this.limitB = parseInt(this.LimitLignePage)
this.nombrepage  = Math.ceil(this.nbrEnreg/this.limitB)
})

},

InitAll : function () 
{
this.InitForm () 
this.AfficheListe () 
}

, 
actionrechenom: function (z) 
{
this.recherchenom = this.recherchenom.toLowerCase () 
this.myReg = RegExp('/'+this.recherchenom+'*/')

if (z === 8)
{
this.info   = this.copy_info 
this.info = Object.entries(this.info).filter (valeur=>(valeur[1]['nomclient'].toLowerCase()).match(this.recherchenom)).map (entry=>entry[1])
}

if (this.recherchenom.length >=3 && z != 8) this.info =  Object.entries(this.info).filter (valeur=>(valeur[1]['nomclient'].toLowerCase()).match(this.recherchenom)).map (entry=>entry[1])

if (this.recherchenom.length === 0 ){
  this.info   = this.copy_info }

},

// pagination 
affNbrLign : function (valeur)
{
this.limitA = 0
this.limitB = parseInt(valeur) 
this.nombrepage  =Math.ceil(this.nbrEnreg/this.limitB)
this.currentPage =1
},

affpagelien : function (PageNouvelle)
{  
this.limitA = this.LimitLignePage*(PageNouvelle-1)
this.limitB = this.LimitLignePage*PageNouvelle
},

suivantplusun : function ()
{
  if (this.currentPage < this.nombrepage)
  {
this.currentPage++
this.limitA = this.LimitLignePage*(this.currentPage-1)
this.limitB = this.LimitLignePage*this.currentPage
 } 
},
suivantmoinsun : function ()
{
  if (this.currentPage>1)
  {
this.currentPage--
//if (this.currentPage === 1) {this.i = 0} else {this.i = 1 }
this.limitA = this.LimitLignePage*(this.currentPage-1)
this.limitB = this.LimitLignePage*this.currentPage
}
}
,

DernierePage : function ()
{
if (this.currentPage < this.nombrepage)
  {
this.currentPage = this.nombrepage
this.limitA = this.LimitLignePage*(this.currentPage-1)
this.limitB = this.LimitLignePage*this.currentPage
} 

},

PremierePage : function () 
{

if (this.currentPage>1)
  {
this.currentPage=1
this.limitA = this.LimitLignePage*(this.currentPage-1)
this.limitB = this.LimitLignePage*this.currentPage
  }
}, 

MessageErreur: function () {
this.ErreurApi = "true"
this.MessageErreurApi = "Erreur d'enregistrement ou de modification de la fiche / Merci de contacter le support"

}
,
ModifierFicheclient : function (i) {
let formData = new FormData();

    formData.append('designationfamille',this.designationfamille)
    formData.append('descriptionfamille',this.descriptionfamille)
    formData.append('fichierimage',this.fichierimage)

axios({
method:'POST',
url: this.cheminUrl+this.ApiGroupeClient+'modificationGroupeClient', 
data:formData,
config: {headers: {'Content-Type': 'multipart/form-data'}}
}).then ((response) => {

this.AfficheListe () 
this.InitForm () 
this.$refs.closemodal.click()

}).catch ( (error) => { 
console.log (">>"+error)

console.error("Error response:");
    console.error(error.response.data);    // ***
    console.error(error.response.status);  // ***
    console.error(error.response.headers);

this.MessageErreur () 
}) 
}
,
 // fin de ajouter  
 
DeleteLine : function (i) 
{
axios.get(this.cheminUrl+this.ApiGroupeClient+'deleteclient/'+i).then(response =>{
this.keyline = ''
this.AfficheListe () 
this.$refs.closemodal2.click()

})
 .catch(function (error) {
  });

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

axios.get(this.cheminUrl+this.ApiGroupeClient+'AfficheGroupeClientparId/'+this.keyline).then(response => {
this.info2 = response.data 
this.refgroupe = this.info2.groupeclientCourt
this.nomgroupe =  this.info2.groupeclientLong

this.Openmodelfonction () 
this.titrepages = "Gestion des Familles de produits | modification"

}) .catch (error => { 

this.MessageErreur () 

})

},

fermemodale : function () {
this.Modification  = false;  // pase en mode modifiction 
this.Labelboutton ="Enregistrer"
this.keyline =''
this.MessageErreurApi = ""
this.ErreurApi = false
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
//******************************************
axios({
method:'POST',
url: this.cheminUrl+this.ApiGroupeClient+'ajoutFamilleProduit',
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
