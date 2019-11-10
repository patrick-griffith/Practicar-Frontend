<template>
  
  <div>In dev...</div>      
  
</template>

<script>
        
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
                balert: {'show':false,'variant':'primary'},
                member: [],  
                formData: ['id','first_name','last_name','phone','email']
            };
        },   
        methods: {
          async getMember() {

              const memberProfile= await $members.getMember( this.member_id )

              if (memberProfile.success) {
                
                  this.member = memberProfile.success.data.member
                  
                  //trim object to just form fields + id
                  this.member = await $app.dataPreflight( this.formData, this.member )
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
                this.balert.show = 5
                this.balert.variant = 'warning'
                this.balert.message = 'There is missing information.  Please try again.'  
                
                return false
              }
            
                
                this.$root.$loading.start();
            
                //remove email as precaution                
                var memberSend = this.member
                this.$delete( memberSend, 'email');
                
                var reply = await $members.updateMember( memberSend )
                
                this.$root.$loading.finish();
                
                if( reply.error ){
                    this.balert.show = 5
                    this.balert.variant = 'danger'
                    this.balert.message = 'An error occurred.' 
                }
                else{
                    await this.$auth.fetchUser()
                    this.getMember()
                    this.$emit('memberProfileUpdate', true );
                    this.balert.show = 5
                    this.balert.variant = 'success'
                    this.balert.message = 'Member details have been updated.'   
                }            
             
          }                
          
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
