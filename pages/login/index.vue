<template>
  <div>

    <section class="hero is-medium">
      <div class="hero-body">
        <div class="columns is-centered is-variable">
          <div class="column is-half-tablet is-4-desktop">
            <h1 class="title">iniciar sesión</h1>
            
            <p></p>
          </div>
          <div class="column is-half-tablet is-4-desktop is-offset-1-desktop">
            <form ref="formLogin" class="box">               
              
              <div class="field">
                <label class="label">email address</label>
                <input v-model="Email" v-validate="'required|email'" spellcheck="false" type="email" name="Email" id="Email" placeholder="Email" class="input">                  
                <span class="help is-danger">{{ errors.first('Email') }}</span>
              </div>

              <div class="field">
                  <label class="label">password</label>
                  <input v-model="Password" v-validate="'required'" type="password" name="Password" id="Password" class="input" placeholder="Password">

                  <span class="help is-danger">{{ errors.first('Password') }}</span>                  
              </div>
              <div class="field">
                  <label>                    
                    <nuxt-link to="/login/forgot">i forgot my password</nuxt-link>
                  </label>
              </div>
              <div class="field">
                <b-button type="is-dark" v-on:click.prevent="requestLogin()">log in</b-button>
              </div>
                        
            </form>
            <div>
              don't have account yet? <nuxt-link to="/login/signup">sign up</nuxt-link>
            </div>
          </div>
        </div>
          
      </div>
    </section>
  </div>
</template>

<script>      
    import { mapGetters } from 'vuex'

    var pagetitle = 'Login'

    export default {
      layout: 'login',
        middleware: 'guest',
        head: {
            title: pagetitle+' - '+process.env.appName,
            meta: [
                {hid: 'description', name: 'description', content: pagetitle+' - '+process.env.appName},
            ]
        },   
        data: function () {
            return {
                Email: '',
                Password: '',
            };
        },
        methods: {
            async requestLogin() {
                this.$validator.validateAll().then((result) => {
                  
                if (result) {
                    this.login()             
                 }                
               })
            },
            async login() {
              try {
                
                await this.$auth.loginWith('local', {
                  data: {
                    email: this.Email,
                    password: this.Password
                  },
                })

                this.$router.push('/')
                
              } catch (e) {
                this.$buefy.toast.open({
                  message: 'Credentials are incorrect.',
                  type: 'is-danger'
                })            
              }
            }         
            
        },
        computed: {
          ...mapGetters(['isLoggedIn'])
        }
    }
</script>