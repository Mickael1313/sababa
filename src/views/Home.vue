<template>
  <div id="Connexion">


    <header class="p-3">
      <h2> <i class="material-icons">
        storage
      </i>SababaERP </h2>
    </header>


    <section>
      <div class="d-flex shadow flex-column mx-auto w-50 bg-white rounded-5 border">
        <div class="p-2 bg-light rounded-top"> <h5 class="mx-auto text-info p-3"> >> Connexion à l'intranet :)  Ah:  {{txt1}} </h5></div>

        <!-- message d'erreur -->
        <div align="center alert alert-danger" v-if= "erreurform"> <b>{{ message }} </b></div>
        <div align="center alert alert-danger" v-if= "!erreurform"> <b>{{ message }}</b></div>
        <!-------------------------------- -->


        <div class="mx-auto w-75 form-group">
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text"> <i class="material-icons">mail</i> </div></div>

            <input type="email" class="form-control" id="mail" name="mail" v-model="mail" placeholder="adresse email">
          </div>
        </div> <!-- mail -->

        <div class="mx-auto w-75 form-group">
          <div class="input-group mb-2"> <div class="input-group-prepend">
            <div class="input-group-text"><i class="material-icons">vpn_key</i></div> </div>
            <input type="password" class="form-control" id="mp" name="mp" v-model="mp" placeholder="******">
          </div>
        </div> <!----mot de passe-->


        <hr>
        <div class = "mx-5 p-3 bg-light mx-auto">
          <button class="btn btn-primary mx-auto" v-on:click= "gestconnexion()">Connexion</button>
        </div>


      </div> <!-- containeir -->
      <!--
   <div class="d-flex flex-column w-100">
   <div class="min-vh-100 white"> </div>
      </div>
  -->

    </section>





    <footer class="bg-light p-4 text-right text-dark">
      MD One Computer(c)2020
    </footer>




  </div>




</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {

  data () {
    return {
      msg: '',
      erreurform: false,
      erreurApiConnect: false,
      mail: '',
      mp: '',
      message: '',
      erreur1: '',
      info: null,
      loading: true,
      idutilisateurencours: 0,
      nomutilisateurencours: '',
      mailutilisateurencours: '',
      prenomutilisateurencours: '',
      nomsociete: '',
      cheminUrl: process.env.VUE_APP_URL,
      API_Gestionconnexion: 'connexion/API_connexion/',
    txt1 : process.env.VUE_APP_URL,
    txt2: process.env.VUE_APP_TITLE 
    }

  },
  mounted : function ()
  {

    



    this.mail = localStorage.mailutilisateurencours

    /* this.nomutilisateurencours = localStorage.nomutilisateurencours
     this.mailutilisateurencours = localStorage.mailutilisateurencours
     this.prenomutilisateurencours =localStorage.prenomutilisateurencours
     this.idutilisateurencours = localStorage.idutilisateurencours
*/
  }
  ,

  methods : {

    gestconnexion : function () {

      this.erreurform = false;
      this.erreurApiConnect  = false;
      this.message  = '';

      if (this.mail === '' || this.mp === '' ) {
        this.erreurform = true;
        this.message ="Erreur: le champs email ou mot de passe vide #1 ";
      }  else  if (!this.validEmail(this.mail)) {

        this.erreurform = true;
        this.message ="Erreur: Votre adresse email n'est pas conforme #2";
      }

      if (this.erreurform === false) {

        axios.get(this.cheminUrl+this.API_Gestionconnexion+'gestion_connexion/'+this.mail+'/'+this.mp).then(response => {

          this.info = response.data


          if (this.info.erreuruser === 1 || this.info.erreurmp === 1)
          {
            this.erreurform = true
            this.erreurApiConnect = true
            this.message = 'Erreur : Adresse mail ou mot de passe incorrect #3'
          }
          else
          {
            if ((this.erreurform === false) || (this.erreurApiConnect===false))
            {

              localStorage.nomutilisateurencours = this.info.nom_utilisateur_encours
              localStorage.prenomutilisateurencours = this.info.Prenom_utilisateur_encours
              localStorage.mailutilisateurencours = this.info.mail_utilisateur_ecours
              localStorage.idutilisateurencours = this.info.id_utilisateur_encours
              localStorage.nomsociete = this.info.nomsociete


              this.$router.push ('/Hello/go')

            }}

        })

            .catch ((error)  =>  {
// Erreur

              if (error.response) {

                this.erreurform = true
                this.erreurApiConnect = true
                this.message = 'Erreur de connexion au serveur API #3'
              }
              else if (error.request) {

                this.erreurform = true
                this.erreurApiConnect = true
                this.message = 'Erreur de connexion au serveur API #4'

              }

              else {
                this.erreurform = true
                this.erreurApiConnect = true
                this.message = 'Erreur de connexion au serveur API #5'
              }
            })
            .finally(() =>  { });
      }


    },


    validEmail: function (email) {
      /* eslint-disable  no-useless-escape */
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

  }

}
</script>
