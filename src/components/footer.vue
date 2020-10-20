<template>

<div id="basdepage">




<div class="mx-auto bg-light border border-top-0 border-dark">

  <h6 class="ml-auto text-right"> {{version}} - {{jour}} / {{mois}} / {{annee}} </h6>

  </div>
</div>



</template>

<script>
export default {

  data () {
  
  return {
version : 'ERP-Sababa version 0.1b',
datedujour : new Date (),
jour :  '', 
mois: '', 
annee:''
    }
  }, 

mounted : function () {


this.jour  = this.datedujour.getDate ()
this.mois  = this.datedujour.getMonth ()
this.annee  = this.datedujour.getFullYear ()

  }
 
}
</script>


