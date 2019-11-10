<template>
    <div>

      <section class="hero is-medium">
        <div class="hero-body">
          <div class="columns is-centered is-variable">
            <div class="column is-half-tablet is-4-desktop">
              <h1 class="title">crear cuenta nueva</h1>
              
              <p>Create an account in order to save your settings and also get a complete history of every answer, allowing for optimized practice in the future.</p>
            </div>
            <div class="column is-half-tablet is-5-desktop is-offset-1-desktop">
              <form ref="formSignup" class="box">
                <div class="field">
                  <label class="label">
                    your email address
                  </label>
                  <input v-model="email" v-validate="'required|email'" type="email" class="input" id="email" name="email" placeholder="your.name@gmail.com" spellcheck="false"/>
                  <span class="help is-danger">{{ errors.first('email') }}</span>
                </div>
                <div class="field">
                  <label class="has-text-grey-light">
                    <input v-model="updates" type="checkbox" class="checkbox" id="updates" name="updates"/> email me super occasional updates.
                  </label>
                  <span class="help is-danger">{{ errors.first('updates') }}</span>
                </div>
                <div class="field has-text-grey-light" v-if="false">
                  By signing up, you agree to our <a class="pointer" @click="isTermsModalActive = true">Terms, Data Policy and Cookies Policy</a>.
                </div>
                <div class="field">
                  <b-button type="is-dark" v-on:click="requestSignup()">sign up</b-button>
                </div>
              </form>
              <div class="field has-text-grey-light">
                already have an account? <nuxt-link to="/login">log in</nuxt-link>
              </div>
              <div class="field has-text-grey-light">
                privacy policy = i’ll never spam you. and i’ll never share your contact info with anyone, ever... because i’m not an asshole.
              </div>    
            </div>            
          </div>
        </div>
      </section>
                

      <!-- Modal Component -->
      <b-modal :active.sync="isTermsModalActive">
        <div class="box">
          terms go here
        </div>
      </b-modal>

    </div>
</template>

<script>
            
    var pagetitle = 'Sign Up'
    window.$members = require('~/modules/data/members') 

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
                email: '',
                updates: true,
                isTermsModalActive: false
            };
        },          
        components: {
            
        },     
        methods: {
          requestSignup() {
            event.preventDefault()
            this.$validator.validateAll().then((result) => {              
              this.signup();      
            });                 
          },
          async signup(){
            var success = false
            await $members.createMember({
              email: this.email,
              email_updates: (this.updates ? 1 : 0)
            }).then((result) => {    
              if(result.success){
                success = true
              }
            }).catch((error) => {
                console.log("error", error);
            })

            if(success){
              await this.$store.commit('SET_TOAST', {
                message: 'check your email (including your spam folder), por favor',
                type: 'is-success',
                duration: 4000
              })
              $nuxt.$router.push('/')              
            }else{
              this.$buefy.toast.open({
                message: 'account creation failed',
                type: 'is-danger'
              }) 
            }

          }
        }
    }
</script>