<template>
 <div id="menu_parametrage">


  <b-dropdown right variant="info">
   <template v-slot:button-content>
    <b-icon icon="gear-fill" aria-hidden="true"></b-icon> 
   </template>
   <b-dropdown-item-button>
    <b-icon icon="lock-fill" aria-hidden="true"></b-icon>
   Se déconnecter <span class="sr-only">(Click to unlock)</span>
   </b-dropdown-item-button>
   <b-dropdown-divider></b-dropdown-divider>

   <b-dropdown-divider></b-dropdown-divider>
   <b-dropdown-item-button>Mon Compte</b-dropdown-item-button>
   <b-dropdown-item-button>Mon statut</b-dropdown-item-button>
   <b-dropdown-divider></b-dropdown-divider>
  
  </b-dropdown>

    

 </div>

 



</template>

<script>
export default {





}
</script>

<style scoped>

</style>