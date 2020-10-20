<template>

<div id="gestioncodepostaux">



<div class="d-flex flex-column ">
<div class="container">

 <h2>{{titrepages}} </h2>

<div class="d-flex justify-content-end">
Nombre de ligne par page 
 <select class="form-control-sm" v-model="LimitLignePage" @change="affNbrLign (LimitLignePage)"> 
   <option v-for="nbrlignes in nombreligne" :key="nbrlignes.a" v-bind:value="nbrlignes.value">  
     {{nbrlignes.a}} 
     </option>
       </select>  
 </div>
<div class="d-flex justify-content-right">
Nombre de ligne par page 

 </div>

 
              
  <table class="table table-hover">
    <thead class = "table-primary">
      <tr>
        <th>N°</th>
        <th>Code Postal</th>
      <th>Ville</th>
      <th>Pays</th>
      <th> Actions    </th> 
      </tr>
    </thead>

  <tbody v-for= "(items,index,i) in info " :key ="i" v-if="i >= limitA && i <= limitB">
       <tr>
     <!--  <b> *{{ nbrEnreg }} {{items.idPostalCode}} </b> --> 
 <td> {{i+1}} </td> <td>{{items.codepostal}}</td>  <td>{{items.Ville}} </td> <td>{{items.Pays}} </td>

 <td>
<button type="button" class="btn btn-secondary" v-on:click="deleteList_a(items.idPostalCode)" ><i class="material-icons">delete</i></button> |
 <button type="button" class="btn btn-primary" v-on:click="ModifyList(items.PostalCode, items.Ville,items.Pays,items.idPostalCode)"><i class="material-icons">edit</i> 
  </button> 
  
  </td>
</tr>
</tbody>
</table>

<div class="d-flex justify-content-center p-1">
<nav aria-label="" class="p-2">
<ul class="pagination pagination-sm">
<li class="page-item active" aria-current="page"> <button type="button" class="btn btn-outline-primary btn-sm" @click ="PremierePage()"> <i class="material-icons">skip_previous</i></button></li> 
<li class="page-item"><button type="button" class="btn btn-outline-primary btn-sm" @click ="suivantmoinsun()"> <i class="material-icons">arrow_left</i></button></li>

<li class="page-item">
<select class="form-control" v-model="currentPage" v-on:change ="affpagelien(currentPage)"> 
<option v-for="i in nombrepage" v-bind:value="i">{{i}}</option></select>  
</li>
<li class="page-item"> <button type="button" class="btn btn-primary" disabled> sur {{nombrepage}}</button> </li> 




<li class="page-item"><button type="button" class="btn btn-outline-primary btn-sm" @click ="suivantplusun()"><i class="material-icons">arrow_right</i></button></li>
<li class="page-item"><button type="button" class="btn btn-outline-primary btn-sm" @click ="DernierePage()"> <i class="material-icons">skip_next</i></button></li>
</ul> 
</nav>
 </div> 

<!-- Menu de navigation  -->
 
<nav class = "navbar navbar-light bg-dark">
<td> 
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#formcodepostaux" ref="openmodal"> Ajouter </button>
<a data-toggle="modal" data-target="#DeleteAccord" ref="openmodal2"></a> </td>
</nav>
</div>




</div>


<!-- Modal -->
<div class="modal fade" id="formcodepostaux" tabindex="-1" role="dialog" aria-labelledby="formcivilite" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{titrepages}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="fermemodale ()">
      <span aria-hidden="true">&times;</span>
  </button>
 </div>
 <div class="modal-body">
     
<p align="center alert alert-danger">   </p> 
<label class ="blue-text text-darken-2"> Code postal </label> <input type="text" class="form-control" id="CodePostal" name="CodePostal" v-model="CodePostal" placeholder="">
<label class ="blue-text text-darken-2"> Ville</label> <input type="text" class="form-control" id="ville" name="ville" v-model="Ville" placeholder=""> 
<label class ="blue-text text-darken-2"> Pays</label> <input type="text" class="form-control" id="pays" name="pays" v-model="Pays" placeholder=""> 

<input  type="hidden"  class="form-control" id="index" name="index" v-model="keyline"> 

      </div>
      <div class="modal-footer">
       <button  type="button" class="btn btn-primary" v-on:click='ajouter(keyline)'>{{ Labelboutton  }}</button> 
       <button type="button" class="btn btn-secondary" data-dismiss="modal" ref ="closemodal" v-on:click="fermemodale ()">Fermer</button>

      </div>
    </div>
  </div>
</div>


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


<!-- fin de div -->
  </div> 
</template>

<script>
import axios from 'axios'

export default {
 
  data () {
    return {
      titrepages: "Liste des codes postaux",
        limitA: 0,
         LimitLignePage: "10",
        nombreligne:[
         {a : 10, value:"10"  },
         {a : 25, value:"25"  },
         {a : 50, value:"50"  },
         {a : 100, value:"100"  },
         {a : 500, value:"500"  },
         {a : 1000, value:"1000" }
         
        ]
          ,
       limitB:10, 
       currentPage: 1,
        nbrEnreg:0, 
        nombrepage: 0,
        i:0,
   CodePostal: '',
   Ville : '',
   Pays:'',
  TcS: '', 
TcL:'', 
info : [],
modify : false,
Labelboutton: 'Ajouter',
keyline:'', 
cheminUrl: process.env.VUE_APP_URL,
nameApi : 'parametrage/API_gestioncodepostaux/',
 }
  },

mounted : function () 
{
// lit la base de données 
axios.get(this.cheminUrl+this.nameApi+'AfficheListeCodePostal').then(response => {
this.info = response.data 
this.nbrEnreg = this.info.nbrenr

console.log ("*:"+this.info)
this.limitA = 0
this.limitB = parseInt(this.LimitLignePage)
this.nombrepage  = Math.ceil(this.nbrEnreg/this.limitB)



})

}, 

computed : {




}

,
methods: {

affNbrLign : function (valeur)
{
this.limitA = -1
this.limitB = parseInt(valeur) 
this.nombrepage  =Math.ceil(this.nbrEnreg/this.limitB)
this.currentPage =1

console.log ("nbr page"+ this.nbrEnreg/this.limitB)

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
this.limitA = this.LimitLignePage*(this.currentPage-1)+1
this.limitB = this.LimitLignePage*this.currentPage
 } 
},
suivantmoinsun : function ()
{
  if (this.currentPage>1)
  {
this.currentPage--
if (this.currentPage === 1) {this.i = 0} else {this.i = 1 }
this.limitA = this.LimitLignePage*(this.currentPage-1)+this.i
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



}
,
ajouter : function (i) {

if (this.modify === true)

{
//modifycivilite
axios.post(this.cheminUrl+this.nameApi+'modifycodepostal', {
          ville:  this.Ville, 
      CodePostal : this.CodePostal,
      pays : this.Pays,
    index: i 
  })
.then(response =>{
  
if (response.data.erreur_sql === 0)
{
this.Ville = ''
this.CodePostal= '' 
this.Pays = ''
 this.keyline  =''
this.$refs.closemodal.click()
this.ReadServer ();
}

})
 .catch(function (error) {
 console.log(error);
  });

}

else

{ // ajouter !


axios.post(this.cheminUrl+this.nameApi+'ajoutcodepostal', {
      ville:  this.Ville, 
      CodePostal : this.CodePostal,
      pays : this.Pays 

  })
.then(response =>{
  
if (response.data.erreur_sql === 0)
{
this.Ville = ''
this.CodePostal= '' 
this.Pays = ''
this.keyline = ''
this.$refs.closemodal.click()
this.ReadServer ();
}

})
 .catch(function (error) {
 console.log(error);
  });

}

} // fin de ajouter  
, 


DeleteLine : function (i) 
{

axios.post(this.cheminUrl+this.nameApi+'deletecodepostal', {
idline : i
 })
.then(response =>{
  
if (response.data.erreur_sql === 0)
{
  this.keyline = ''
this.$refs.closemodal2.click()
this.ReadServer ();
}

})
 .catch(function (error) {
 console.log(error);
  });

},


ModifyList : function (a,b,c,d) 
{
this.modify  = true;  // pase en mode modifiction 
this.Labelboutton ="Modifier"
this.Ville = b
this.CodePostal= a 
this.Pays = c
this.keyline = d
this.$refs.openmodal.click()
},

fermemodale : function () {
this.modify  = false;  // pase en mode modifiction 
this.Labelboutton ="Ajouter"
this.Ville = ''
this.CodePostal= '' 
this.Pays = ''
this.keyline =''

},

deleteList_a : function (a)
{
this.keyline = a

this.$refs.openmodal2.click ();

},

Trilistinverse : function (a)
{

console.log (a) 

}

,
ReadServer : function () 
{
axios.get(this.cheminUrl+this.nameApi+'AfficheListeCodePostal').then(response => {
this.info = response.data })

}

}


}
</script> 

