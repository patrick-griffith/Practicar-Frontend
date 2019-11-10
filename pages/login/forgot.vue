<template>
  <div>
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="columns is-centered is-variable is-8">
          <div class="column is-4">
            <form ref="formLogin" class="box">          
              
              <div class="field">
                <input v-model="Email" v-validate="'required|email'" type="email" class="input" id="Email" name="Email" placeholder="Email">
                <span class="help is-danger">{{ errors.first('Email') }}</span>
              </div>

              <div class="field">
                <b-button type="is-link" v-on:click="requestPasswordReset()">Reset Password</b-button>
              </div>
                        
            </form>
            <div>
              Back to <nuxt-link to="/login">Log In</nuxt-link>
            </div>
          </div>
          <div class="column is-4">
            <h1 class="title">Forgot Your Password?</h1>            
            <p>Enter your email and we'll send you a link to get back into your account.</p>
          </div>
        </div>
          
      </div>
    </section>

  </div>
</template>

<script>
            
    window.$members = require('~/modules/data/members')        

    var pagetitle = 'Forgot Password?'

    export default {    
      layout: 'login',   
        middleware: 'guest',
        data: function () {
            return {
                Email: ''
            };
        },  
        head: {
            title: pagetitle+' - '+process.env.appName,
            meta: [
                {hid: 'description', name: 'description', content: pagetitle+' - '+process.env.appName},
            ]
        },
        methods: {
            requestPasswordReset() {
                event.preventDefault()

                this.$validator.validateAll().then((result) => {

                  if (result) {
                    $members.requestPasswordReset(this.Email).then((response)=>{

                          if (response.success && response.success.data.success) {
                              this.$buefy.toast.open({
                                message: response.success.data.success,
                                type: 'is-success'
                              })      
                          } else {
                            this.$buefy.toast.open({
                              message: response.error,
                              type: 'is-danger'
                            })      
                          }

                      })
                  }

                });                 

            }
        }         
    }
</script>