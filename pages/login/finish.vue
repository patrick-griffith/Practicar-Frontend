<template>
    <div>

        <section class="hero is-medium">
            <div class="hero-body">
                <div class="columns is-centered is-variable">
                    <div class="column is-half-tablet is-4-desktop">
                        <h1 class="title">finish signup</h1>
                        <p>please finish creating your account by setting a custom password to replace the temporary one that was created for you. <span v-if="!memberProfile.first_name">additionally, please fill in your name. feel free to use a fake name if you want. no me importa.</span></p>                                                                
                    </div>
                    <div class="column is-half-tablet is-5-desktop is-offset-1-desktop">
                        <form class="box">                                    
                            <div class="field">
                                <label class="label" for="email">email</label>
                                <p>{{ $store.state.auth.user.email }}</p>                           
                            </div>
                            <template v-if="!memberProfile.first_name">
                                <div class="field">
                                    <label class="label" for="first_name">first name</label>
                                    <input v-validate="'required'" data-vv-as="first_name" type="text" name="first_name" id="first_name" ref="first_name" v-model="first_name" class="input"/>                  
                                    <span class="help is-danger">{{ errors.first('first_name') }}</span>
                                </div>
                                <div class="field">
                                    <label class="label" for="last_name">last name</label>
                                    <input v-validate="'required'" data-vv-as="last_name" type="text" name="last_name" id="last_name" ref="last_name" v-model="last_name" class="input"/>                  
                                    <span class="help is-danger">{{ errors.first('last_name') }}</span>
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
            first_name: '',
            last_name: ''
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

            this.$root.$loading.start();
            var memberSend = []
            memberSend.password = password.value
            memberSend.id = this.$store.state.auth.user.id
            
            await $members.setCustomPassword( memberSend ).then(() => {
                
            }).catch((error) => {
                console.log(error)    
            })

            if(this.first_name && this.last_name){
                var reply = await $members.updateMember({
                        id: this.memberProfile.id,
                        first_name: this.first_name,
                        last_name: this.last_name
                    }).then(() => {
                        this.$store.commit('COMPLETE_USER', {
                            first_name: this.first_name,
                            last_name: this.last_name
                        })  
                }).catch((error) => {
                    console.log(error)    
                })
            }            

            this.$router.push('/');
            this.$root.$loading.finish();
        }
    }
}
</script>