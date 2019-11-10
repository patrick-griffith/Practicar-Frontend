
<template>
  <div>      
    <div class="box-with-title functional">
      <h2>Member Details</h2>
      <div class="box">
        <MemberBasicForm :member_id="memberProfile.id"/>           
      </div>
    </div>

    <div class="box-with-title">
      <h2>Avatar</h2>
      <div class="box">
        <MemberAvatarForm :member_id="memberProfile.id"/>
      </div>
    </div>

    <div class="box-with-title">
      <h2>Change Password</h2>
      <div class="box">
        <MemberPasswordForm :member_id="memberProfile.id"/>
      </div>
    </div>

   </div>
</template>

<script>

    import { mapGetters } from 'vuex'
    var pagetitle = 'Member Profile'
    
    import MemberBasicForm from '~/components/member/MemberBasicForm.vue'
    import MemberAvatarForm from '~/components/member/MemberAvatarForm.vue'
    import MemberPasswordForm from '~/components/member/MemberPasswordForm.vue'

    export default {
        layout: 'standard',
        middleware: ['auth', 'member'],
        data: function () {
            return {
                pageTitle: pagetitle
            };
        },
        components: {
            MemberBasicForm,
            MemberAvatarForm,
            MemberPasswordForm      
        },     
        head: {
            title: pagetitle+' - '+process.env.appName,
            meta: [
                {hid: 'description', name: 'description', content: pagetitle+' - '+process.env.appName},
            ]
        },
        computed: {
          ...mapGetters(['memberProfile'])
        }      
    }
</script>
