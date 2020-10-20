<template>

<div id="gestioncivilite">

<div class="d-flex flex-column ">
<div class="container">
 <h2>Liste des civilités</h2>
              
  <table class="table table-hover">
    <thead class = "table-primary">
      <tr>
        <th>N°</th>
        <th>Civilité courte</th>
      <th>Civilité longue</th>
      <th> Actions    </th> 
      </tr>
    </thead>
    <tbody v-for= "(items,index) in orderedUsers" :key="items.index">
       <tr>
         <td>{{index+1}} / {{items.idtitrecivilite}} </td> <td>{{items.titreciviliteCourt}}</td>  <td>{{items.titreciviliteLong}} </td>
        <td>
<button type="button" class="btn btn-secondary" v-on:click="deleteList_a(items.IdTitleCustomer)" ><i class="material-icons">delete</i></button> |
 <button type="button" class="btn btn-primary" v-on:click="ModifyList(items.TitleCustomerShort, items.TitleCustomerLong,items.IdTitleCustomer)"><i class="material-icons">edit</i> 
  </button> 
  
</td>
</tr>
</tbody>
</table>


<!-- Menu de navigation  -->
 
<nav class = "navbar navbar-light bg-dark">
 <td> 
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#formcivilite" ref="openmodal">
Ajouter

</button>


 <a data-toggle="modal" data-target="#DeleteAccord" ref="openmodal2"></a> 

</td>
 
</nav></div>
</div>







<!-- Modal -->
<div class="modal fade" id="formcivilite" tabindex="-1" role="dialog" aria-labelledby="formcivilite" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Gestion des civilités</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="fermemodale ()">
      <span aria-hidden="true">&times;</span>
  </button>
 </div>
 <div class="modal-body">
     
<p align="center alert alert-danger">   </p> 
<label class ="blue-text text-darken-2"> Cvilité courte </label> <input type="text" class="form-control" id="civilitelc" name="civilitelc" v-model="cc" placeholder="">
<label class ="blue-text text-darken-2"> Civilité Longue</label> <input type="text" class="form-control" id="civilitel" name="civilitel" v-model="cl" placeholder=""> 
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
Etes-vous sûr de vouloir supprime ?  
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
   cl: '',
   cc : '',
  TcS: '', 
TcL:'', 
info : '',
modify : false,
Labelboutton: 'Ajouter',
keyline:'', 
cheminUrl: process.env.VUE_APP_URL,
nameApi : 'parametrage/API_gestioncivilite/'
  }
  },

mounted : function () 
{
// lit la base de données 
axios.get(this.cheminUrl+this.nameApi+'AfficheListeCivilite').then(response => {
this.info = response.data })

}, 

computed : {

  orderedUsers: function () {
    //return _.orderBy(this.info, ['TitleCustomerShort'],['desc','asc'])
return _.orderBy(this.info, ['TitleCustomerShort'],['asc'])
  }


}

,
methods: {

ajouter : function (i) {

if (this.modify === true)

{
//modifycivilite
axios.post(this.cheminUrl+this.nameApi+'modifycivilite', {
    TitleCourt: this.cc,
    TitleLong: this.cl,
    index: i 
  })
.then(response =>{
  
if (response.data.erreur_sql === 0)
{
 this.cl  = ''
 this.cc  = '' 
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


axios.post(this.cheminUrl+this.nameApi+'ajoutcivilite', {
    TitleCourt: this.cc,
    TitleLong: this.cl
  })
.then(response =>{
  
if (response.data.erreur_sql === 0)
{
this.cl  = ''
this.cc  = '' 
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

axios.post(this.cheminUrl+this.nameApi+'deletecivilite', {
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


ModifyList : function (a,b,c) 
{
this.modify  = true;  // pase en mode modifiction 
this.Labelboutton ="Modifier"
this.cl = b
this.cc= a 
this.keyline = c
this.$refs.openmodal.click()
},

fermemodale : function () {
this.modify  = false;  // pase en mode modifiction 
this.Labelboutton ="Ajouter"
this.cl = ''
this.cc= ''
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
axios.get(this.cheminUrl+this.nameApi+'AfficheListeCivilite').then(response => {
this.info = response.data })

}

}


}
</script> 

