<template>
    <div> 
        <div v-if="conjugation">
            {{ conjugation.spanish }}
        </div>
    </div>
</template>

<script>
    var pagetitle = 'Home'
    import { mapGetters } from 'vuex'
    window.$verbs = require('~/modules/data/verbs') 
    export default {
        layout: 'standard',
        data: function () {
            return {
                pageTitle: pagetitle,
                conjugation: null,
                conjugations: null
            };
        },  
        computed: {
          ...mapGetters([]),
        },
        head: {
            title: pagetitle + ' - ' + process.env.appName,            
        },
        methods: {
            async fetch_questions(){
                await $verbs.getQuestions().then((result) => {    
                    this.conjugations = result.success.data.conjugations
                    this.conjugation = this.conjugations[0]
                }).catch((error) => {
                    console.log("error", error);
                }) 
            }
        },
        components: {
            
        },
        mounted(){
            this.fetch_questions();
        }
    }
</script>