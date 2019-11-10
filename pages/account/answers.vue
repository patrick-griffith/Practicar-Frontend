
<template>
  <div>      
    <h1 class="title">Coming Soon</h1>
    <p>All of your answers are being saved. Within the coming days I'll add a way to view them.</p>

   </div>
</template>

<script>

    import { mapGetters } from 'vuex'
    var pagetitle = 'My Answers'

    export default {
        layout: 'standard',
        middleware: ['auth', 'member'],
        data: function () {
            return {
                pageTitle: pagetitle
            };
        },
        components: {
        },     
        head: {
            title: pagetitle+' - '+process.env.appName,
        },
        computed: {
          ...mapGetters(['memberProfile'])
        }      
    }
</script>
