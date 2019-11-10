<template>
  
  <form ref="formDetails">

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label" for="first_name">First Name</label>
            <input v-model="member.first_name" v-validate="'required'" data-vv-as="First Name" type="text" name="first_name" id="first_name" placeholder="First Name" class="input">                  
            <span class="help is-danger">{{ errors.first('first_name') }}</span>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label" for="last_name">Last Name</label>
            <input v-model="member.last_name" v-validate="'required'" data-vv-as="Last Name" type="text" name="last_name" id="last_name" placeholder="Last Name" class="input">                  
            <span class="help is-danger">{{ errors.first('last_name') }}</span>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label" for="phone">Phone</label>
            <input v-model="member.phone" v-validate="{ regex: /^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/ }" type="text" name="phone" id="phone" placeholder="123-456-7890" class="input">  
            <span class="help is-danger">{{ errors.first('phone') }}</span>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label" for="email">Email Address</label>              
            <input v-model="member.email" v-validate="'email'" type="text" name="email" id="email" placeholder="somebody@domain.com" class="input" :readonly="!isSuper">
            <small v-if="!isSuper" id="emailHelp" class="form-text has-text-grey-light"><nuxt-link to="/contact">Contact us</nuxt-link> if you wish to change your email address.</small>
            <span class="help is-danger">{{ errors.first('email') }}</span>
          </div>
        </div>

      </div>

    <div class="form-footer">
      <b-button v-on:click.prevent="saveMemberForm()" type="is-dark">Save</b-button>
    </div>

    </form>       
  
</template>

<script>
        
    import { mapGetters } from 'vuex'
    window.$members = require('~/modules/data/members')
    window.$app = require('~/modules/app')

    export default {        
        middleware: ['auth'],
        props: {
          member_id: {
            default: 0
          }
        },
        data: function () {
            return {  
                member: [], 
                formData: ['id','first_name','last_name','phone','email']
            };
        },   
        methods: {
          async getMember() {

            if(this.member_id){
              const memberProfile= await $members.getMember( this.member_id )

              if (memberProfile.success) {
                
                  this.member = memberProfile.success.data.member
                  
                  //trim object to just form fields + id
                  this.member = await $app.dataPreflight( this.formData, this.member )
              }
            }

          },

          async saveMemberForm() {
              
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
            
                var memberSend = this.member
                
                //remove email as precaution
                if(!this.$store.getters.isSuper){                  
                  this.$delete( memberSend, 'email');
                }
                
                var formAction = 'update'
                if(this.member.id){
                  var reply = await $members.updateMember( memberSend )
                }else if(this.$store.getters.isSuper){
                  formAction = 'create'
                  var reply = await $members.createMember( memberSend )
                }
                
                this.$root.$loading.finish();
                
                if( reply.error ){
                    this.$buefy.toast.open({
                      message: 'An error occurred.',
                      type: 'is-danger'
                    }) 
                }
                else{
                    await this.$auth.fetchUser()
                    this.getMember()
                    this.$emit('memberProfileUpdate', true );
                    
                    var successMessage = '';

                    if(formAction == 'update'){
                      successMessage = 'Member details have been updated.'   
                    }else if(formAction == 'create'){
                      successMessage = 'New member created.'   
                    }
                    
                    this.$buefy.toast.open({
                      message: successMessage,
                      type: 'is-success'
                    })                  
                }            
             
          }                
          
      },
      computed: {
        ...mapGetters(['isSuper'])
      },
      mounted(){
            this.getMember()          
      },
      watch: {
        member_id() {
          this.member = []
          this.getMember()
        }
      }      
    }
</script>
