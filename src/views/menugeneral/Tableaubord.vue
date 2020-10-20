<template>
 <div id="tableaubord">


   <div class="row">
     <div class="col-1">
       <button class="btn btn-secondary button" @click="add">Add</button>
     </div>

     <div class="col-7">
       <h3>Draggable {{ draggingInfo }}</h3>

       <draggable tag="ul" :list="list" class="list-group" handle=".handle">
         <li
             class="list-group-item"
             v-for="(element, idx) in list"
             :key="element.name"
         >
           <b-icon icon="gear-fill" class="handle" aria-hidden="true"></b-icon>

           <span class="text">{{ element.name }} </span>

           <input type="text" class="form-control" v-model="element.text" />

           <b-icon icon="x"   @click="removeAt(idx)"></b-icon>
         </li>
       </draggable>
     </div>

     <rawDisplayer class="col-3" :value="list" title="List" />
   </div>




  


 </div>
</template>

<script>
let id = 3;
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import draggable from "vuedraggable";
//import draggable from 'vuedraggable';

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
editorData: '<p>Content of the editor.</p>',
editorConfig: {
// The configuration of the editor.
},
  list: [
    { name: "John", text: "", id: 0 },
    { name: "Joao", text: "", id: 1 },
    { name: "Jean", text: "", id: 2 }
  ],
  dragging: false


}

    



},

  computed : {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    }

  },
  methods: {
    removeAt(idx) {
      this.list.splice(idx, 1);
    },
    add: function() {
      id++;
      this.list.push({ name: "Juan " + id, id, text: "" });
    }
  }
  

}
</script>

<style scoped>

</style>