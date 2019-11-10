<template>
    <div>

        <section class="hero is-medium">
            <div class="hero-body">
                <div class="columns is-centered is-variable">
                    <div class="column is-half-tablet is-4-desktop">
                        <h1 class="title">finish signup</h1>
                        <p>please finish creating your account by setting a custom password to replace the temporary one that was created for you. <span v-if="!memberProfile.username">additionally, please choose a username.</span></p>                                                                
                    </div>
                    <div class="column is-half-tablet is-5-desktop is-offset-1-desktop">
                        <form class="box">                                    
                            <div class="field">
                                <label class="label" for="email">email</label>
                                <p>{{ $store.state.auth.user.email }}</p>                           
                            </div>
                            <template v-if="!memberProfile.username">
                                <div class="field">
                                    <label class="label" for="username">username</label>
                                    <input v-validate="'required'" data-vv-as="username" type="text" name="username" id="username" ref="username" v-model="username" class="input"/>                  
                                    <span class="help is-danger">{{ errors.first('username') }}</span>
                                </div>
                            </template>
                            <div class="field">
                                <label class="label" for="password">new password</label>
                                <input v-validate="'required'" data-vv-as="password" type="password" name="password" id="password" ref="password" v-model="password" class="input">                  
                                <span class="help is-danger">{{ errors.first('password') }}</span>
                            </div>
                            <div class="field">
                                <label class="label" for="password">new password, again</label>
                                <input v-validate="'required|confirmed:password'" name="password_confirmation" type="password" placeholder="Password, Again" data-vv-as="password" class="input">
                                <span class="help is-danger">{{ errors.first('password_confirmation') }}</span>                                        
                            </div>                            
                            <div class="field">
                                <b-button type="is-dark" v-on:click.prevent="completeSignup()" class="btn btn-primary">save</b-button>
                            </div>
                        </form>
                    </div>                    
                </div>
            </div>
        </section>

    </div>
</template>

<script>

var pagetitle = 'Finish Creating Your Account'
window.$members = require('~/modules/data/members')
window.$app = require('~/modules/app')
import { mapGetters } from 'vuex' 

export default {
    layout: 'login',
    middleware: ['auth', 'notClaimed'],    
    data: function () {
        return {                
            password: '',
            username: ''
        };
    }, 
    computed: {
        ...mapGetters(['memberProfile'])
    },
    methods:{
        async completeSignup(){            
            //confirm validated
            event.preventDefault()
        
            //validate form
            var proceed= false              
            await this.$validator.validateAll().then((result) => {
                proceed = result
            });
        
            if (!proceed) {

                this.$buefy.toast.open({
                  message: 'There is missing information. Please try again.',
                  type: 'is-warning'
                })      

                return false
            }

            if(this.username && this.password){
                var reply = await $members.updateMember({
                    id: this.memberProfile.id,
                    username: this.username,
                    password: this.password
                }).then((result) => {
                    if(result.success){
                        this.$store.commit('COMPLETE_USER', {
                            username: this.username,
                        })  
                        this.$router.push('/');
                    }else{
                        if(result.error.response.data.username){
                            this.$buefy.toast.open({
                                message: result.error.response.data.username[0],
                                type: 'is-danger'
                            })
                        }else if(result.error.response.data.password){
                            this.$buefy.toast.open({
                                message: result.error.response.data.password[0],
                                type: 'is-danger'
                            })
                        }
                    }
                }).catch((error) => {
                    console.log(error)    
                })
            }                        
        }
    }
}
</script>