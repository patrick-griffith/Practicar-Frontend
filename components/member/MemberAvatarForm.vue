<template>
  
  <form ref="formDetails">    
    <LayoutImageUpload ref="MemberAvatar" :imageUrl="member_photo" imageName="avatar" /> 
    <b-button @click.prevent="saveMemberForm()" type="is-dark">Save</b-button>
  </form> 
  
</template>

<script>
        
    window.$members = require('~/modules/data/members') 
    window.$app = require('~/modules/app')

    import axios from 'axios'

    import LayoutImageUpload from '~/components/layout/ImageUpload.vue'

    export default {        
        middleware: ['auth'],        
        props: {
          member_id: {
            default: 0
          }
        },
        data: function () {
            return {                
                formData: ['id','image_avatar'],
                member: [],
                member_photo: ''               
            };
        }, 
        components: {            
            LayoutImageUpload
        },       
        methods: {                 
          async getMember() {

              const memberProfile= await $members.getMember( this.member_id )

              if (memberProfile.success) {
                
                  this.member = memberProfile.success.data.member
                
                  //trim object to just form fields + id                  
                  this.member = await $app.dataPreflight( this.formData, this.member )                      
                
                  //pull logo for editable object
                  if( this.member.image_avatar != null ){  
                      this.member_photo = this.member.image_avatar.url
                  }
              }

          },
          async saveMemberForm() {
              
              this.$root.$loading.start();
                          
              //post image of attached              
              if( this.$refs.MemberAvatar.image_crop_file )
                  this.member.image_avatar = this.$refs.MemberAvatar.image_crop_file;
              else          
                  this.$delete(this.member, 'image_avatar')

              await $members.updateMember( this.member )
            
              //trigger ui refresh 
              await this.$auth.fetchUser()     
              await this.getMember()
              this.$refs.MemberAvatar.imageReset()

              this.$buefy.toast.open({
                message: 'Member avatar has been updated.',
                type: 'is-success'
              })   
            
              this.$root.$loading.finish();

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