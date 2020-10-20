<template>

<div id="gestionclients">

<welcome> </welcome>

<div class = "d-flex align-items-start flex-column bg-light"> 
<div class="p2">
 <h2>{{titrepages}} {{cheminUrl}}</h2>

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
 <th  scope="col">Nom client</th>
  <th  scope="col">Adresse</th>
 <th  scope="col">Tel</th>
 <th  scope="col">Tel Port</th>
 <th  scope="col">Email</th>
 <th  scope="col">Groupe</th>
 <th  scope="col"> Actions</th> 
</tr>
 </thead>

<tbody v-for= "(items,i) in PaginationFiltre" :key ="items.idclient">

 <td>{{(++i)}}|{{items.idclient}}</td>
 <td> {{items.idtitrecivilite}} {{items.nomclient}}</td>
 <td>{{items.adresse}} {{items.adressesuite}}<br>{{items.codepostal}}{{items.ville}}</td>
 <td>{{items.telfixe}}</td>
 <td>{{items.telportable}}</td>
 <td>{{items.email}}</td>
 <td>{{items.idgroupeclient}}</td>
  <td>
<button type="button" class="btn btn-secondary" v-on:click="deleteList_a(items.idclient)" ><i class="material-icons">delete</i></button> |
<button type="button" class="btn btn-primary" v-on:click="ModificationCLient(items.idclient)"><i class="material-icons">edit</i> </button> 
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

<div class="modal fade bg-light" id="formclient" tabindex="-1" role="dialog"  aria-hidden="true">
      
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
<label for="civilité" >Civilité </label> 
<select class="custom-select" name="civilite" v-model="civilite">
<option  v-for="item2s in dbcivilite" :key="item2s.idtitrecivilite" :value="item2s.idtitrecivilite"> {{item2s.titreciviliteLong}}</option> 
</select>



<label for="nom">Nom</label> <input type="text" class="form-control"  name="nomclient" v-model="nomclient" placeholder="Nom client"> 

<label for="civilité" >Groupe Client</label> 
<select class="custom-select" name="groupeclient" v-model="groupeclient">
<option  v-for="item3s in dbgroupeclient" :key="item3s.idgroupeclient" :value="item3s.idgroupeclient"> {{item3s.groupeclientLong}}</option> 
</select>

</div>  





<div class="form-group">
<label class ="blue-text text-darken-2" for="adresse"> Adresse </label> <input type="text" class="form-control" name="adresseclient" v-model="adresseclient1" placeholder="Adresse"> 
<label class ="blue-text text-darken-2" for="adresse suite">complément</label><input type="text" class="form-control" name="adresseclient2" v-model="adresseclient2" placeholder="complément d'adresse"> 
</div> 

<div class="form-group">
<label class ="blue-text text-darken-2" for="code postal">Code Postal</label><input type="text" class="form-control" name="codepostalclient" v-model="codepostalclient" placeholder="Code Postal du client"> 
<label class ="blue-text text-darken-2" for ="ville">Ville</label> <input type="text" class="form-control" name="villeclient" v-model="villeclient" placeholder="ville"> 
<label class ="blue-text text-darken-2" for="pays">Pays</label> <input type="text" class="form-control" name="paysclient" v-model="paysclient" placeholder="Pays"> 
</div>
</div> <!-- col 1--> 
<div class="col-5">
<div class="form-group">
<label class ="blue-text text-darken-2">Téléphone fixe</label> <input type="text" class="form-control" name="telfixeclient" v-model="telfixeclient" placeholder="téléphone fixe"> 
<label class ="blue-text text-darken-2">Téléphone portable </label> <input type="text" class="form-control" name="telportableclient" v-model="telportableclient" placeholder="Téléphone portable"> 
<label class ="blue-text text-darken-2">Téléphone fax </label> <input type="text" class="form-control" name="telfax" v-model="telfax" placeholder="Téléphone fax"> 
</div>
<div class="form-group">
<label class ="blue-text text-darken-2" for="email">Em@il </label> <input type="text" class="form-control" name="emailclient" v-model="emailclient" placeholder="Adresse email"> 
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
      titrepages: "Gestion des Clients",
        limitA: 0,
         LimitLignePage: 10,
        nombreligne:[
         {a : 10, value:"10"  },
         {a : 25, value:"25"  },
         {a : 50, value:"50"  },
         {a : 100, value:"100"  },
         {a : 500, value:"500"  },
                 
        ],

       limitB:10, 
       currentPage: 1,
        nbrEnreg:0, 
        nombrepage: 0,
        i:1,
       
        particulier: false, 
        professionnel:true, 
        ErreurApi: false, 
 civilite:'',
 
 nomclient:'', 
 adresseclient1:'',
 adresseclient2:'', 
 codepostalclient: '',
 villeclient : '',
 paysclient:'',
 telfixeclient: '', 
 telfax : '', 
 telportableclient: '',
 emailclient:'',
groupeclient: '', 
info : [],
info2: [], 
copy_info: [], 
Modification: false,
Labelboutton: 'Enregistrer',
keyline:'', 
cheminUrl: process.env.VUE_APP_URL,
ApiGestionClient : 'clients/API_gestionclients/',
ApiGestionCivilite : 'parametrage/API_gestioncivilite/',
ApiGestionGroupeclient : 'parametrage/API_groupeclients/',
dbtypeclient:[],
dbcivilite : [],
dbtypesociete:[],
dbgroupeclient: [], 
MessageErreurApi: '', 
valeur2 : '', 
isLitListeclient : false,
recherchenom : '', 
myReg: '',
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
plus_Un : function (valeur)
{

return parseInt(valeur = valeur+1) 
}


}
,
mounted : function () 
{
this.InitAll () 
}
,
methods: { 

AfficheListeClient : function () 
{

axios.isLitListeclient = true
axios.get(this.cheminUrl+this.ApiGestionClient+'AfficheListeClient').then(response => {
this.info = this.copy_info = response.data 
this.nbrEnreg = Object.keys(this.info).length //this.info.nbrenr

axios.isLitListeclient = false 

this.limitA = 0
this.limitB = parseInt(this.LimitLignePage)
this.nombrepage  = Math.ceil(this.nbrEnreg/this.limitB)
})

},

InitAll : function () 
{

this.InitForm () 
this.AfficheListeClient () 

}

, 
actionrechenom: function (z) 
{

this.recherchenom = this.recherchenom.toLowerCase () 
console.log ("Z: "+z + "-  longieur"+this.recherchenom.length)
console.log ("Z: "+z)
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


AfficheListeCivlite : function () 
{
axios.get(this.cheminUrl+this.ApiGestionCivilite+'AfficheListeCivilite').then(response => {
       this.dbcivilite   = response.data }) 
},

AfficheListeGroupeClient : function () 
{
axios.get(this.cheminUrl+this.ApiGestionGroupeclient+'AfficheListeGroupeClient').then(response => {
this.dbgroupeclient = response.data
})

}





,

fTclient : function (valeur) 
{

if (valeur === "Part")
{
this.particulier  = true 
this.professionnel = false 
}
else 
{
this.particulier  = false
this.professionnel = true 
}
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
this.MessageErreurApi = "Erreur de modification de la fiche / Merci de contacter le suppoer"

}
,
ModifierFicheclient : function (i) {
let formData = new FormData();
formData.append('civilite',this.civilite)
formData.append('nomclient',this.nomclient)
formData.append('adresseclient1',this.adresseclient1)
formData.append('adresseclient2',this.adresseclient2)
formData.append('codepostalclient',this.codepostalclient)
formData.append('villeclient',this.villeclient)
formData.append('paysclient',this.paysclient)
formData.append('telfixeclient',this.telfixeclient)
formData.append('telfax',this.telfax)
formData.append('telportableclient',this.telportableclient)
formData.append('emailclient',this.emailclient)
formData.append ('groupeclient',this.groupeclient)
formData.append ('keyline',this.keyline)
axios({
method:'POST',
url: this.cheminUrl+this.ApiGestionClient+'modifieFicheclientdb', 
data:formData,
config: {headers: {'Content-Type': 'multipart/form-data'}}
}).then ((response) => {

console.log (response.data)

// reinit le formulaire 
// femrer le fenetre 
this.AfficheListeClient () 
this.InitForm () 
this.$refs.closemodal.click()

}).catch ( (error) => { 
console.log (">>"+error)
this.MessageErreur () 
}) 
}
,
 // fin de ajouter  
 
DeleteLine : function (i) 
{
axios.get(this.cheminUrl+this.ApiGestionClient+'deleteclient/'+i).then(response =>{
this.keyline = ''
this.AfficheListeClient () 
this.$refs.closemodal2.click()

})
 .catch(function (error) {
 console.log(error);
  });

},
Openmodelfonction : function () {
this.titrepages = "Gesion des clients | Nouveau"
this.AfficheListeCivlite () 
this.AfficheListeGroupeClient () 
this.$refs.openmodal.click()
}


,
ModificationCLient : function (d) 
{
this.Modification = true;  // pase en mode modifiction 
this.keyline = d

axios.get(this.cheminUrl+this.ApiGestionClient+'AfficheClientparId/'+this.keyline).then(response => {
this.info2 = response.data 
this.civilite = this.info2.idtitrecivilite
this.nomclient =  this.info2.nomclient
this.adresseclient1 = this.info2.adresse
this.adresseclient2 = this.info2.adressesuite
this.codepostalclient = this.info2.codepostal
this.villeclient= this.info2.ville
this.paysclient=this.info2.pays
this.telfixeclient =this.info2.telfixe
this.telfax = this.info2.telfax
this.telportableclient =this.info2.telportable
this.emailclient=this.info2.email
this.groupeclient = this.info2.groupeclient
this.Openmodelfonction () 
this.titrepages = "Gesion des clients | modification"

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
this.civilite = 0
this.nomclient = '' 
this.adresseclient1 = ''
this.adresseclient2 = '' 
this.codepostalclient = ''
this.villeclient= ''
this.paysclient=''
this.telfixeclient ='' 
this.telportableclient =''
this.emailclient=''
this.groupeclient = 0
this.Modification = false;
this.recherchenom = "" 
}

,
AddNewClient : function () 
{


// ************************** préparation de données au format API 
// ******************************************************************

let formData = new FormData();
formData.append('civilite',this.civilite)
formData.append('nomclient',this.nomclient)
formData.append('adresseclient1',this.adresseclient1)
formData.append('adresseclient2',this.adresseclient2)
formData.append('codepostalclient',this.codepostalclient)
formData.append('villeclient',this.villeclient)
formData.append('paysclient',this.paysclient)
formData.append('telfixeclient',this.telfixeclient)
formData.append('telfax',this.telfax)
formData.append('telportableclient',this.telportableclient)
formData.append('emailclient',this.emailclient)
formData.append ('groupeclient',this.groupeclient)
/*
var contact = {};
        formData.forEach(function(value, key){
            contact[key] = value;
        });
*/

// ****************************************
//******************************************
axios({
method:'POST',
url: this.cheminUrl+this.ApiGestionClient+'ajoutclientdb', 
data:formData,
config: {headers: {'Content-Type': 'multipart/form-data'}}
}).then ((response) => {
console.log (response.data)
// reinit le formulaire 
// femrer le fenetre 
this.AfficheListeClient () 
this.InitForm () 
this.$refs.closemodal.click()

}).catch ( (error) => { 
this.MessageErreur () 

})

}


}
 

}


</script> 
