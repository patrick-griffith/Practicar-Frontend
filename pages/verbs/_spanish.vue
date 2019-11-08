<template>
    <div> 
        Single Verb
    </div>
</template>

<script>
    var pagetitle = 'Single Verb'
    import { mapGetters } from 'vuex'
    window.$verbs = require('~/modules/data/verbs') 
    export default {
        layout: 'standard',
        data: function () {
            return {
                pageTitle: pagetitle
            };
        },  
        computed: {
          ...mapGetters([]),
        },
        head: {
            title: pagetitle + ' - ' + process.env.appName,            
        },
        methods: {
            async fetch_verb(){
                await $verbs.getVerb(this.$route.params.spanish).then((result) => {    
                    console.log(result.success.data.verb)
                }).catch((error) => {
                    console.log("error", error);
                }) 
            }
        },
        components: {
            
        },
        mounted(){
            this.fetch_verb()
        }
    }
</script>