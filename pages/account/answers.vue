
<template>
  <div>      
      <section class="section">
          <div class="columns is-centered">
                <div class="column is-6">
                    <h1 class="title">Coming Soon</h1>
                    <p>Pretty soon I'll add a way to make sense of your corrent and incorrect answers, and then tailor your practice accordingly. In the meantime, though, here’s a raw dump of your answers.</p>                 
                </div>
          </div>

          <br/><br/><br/>
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Correct Answer</th>
                        <th>Your Answer</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="answers">
                        <tr v-for="answer in answers" :key="answer.id">
                            <td>{{ answer.conjugation.english }}</td>
                            <td>{{ answer.conjugation.spanish }}</td>
                            <td>{{ answer.answer }}</td>
                        </tr>
                    </template>
                    <tr v-else>
                        <td colspan="3">                                    
                            No answers recorded yet.
                        </td>
                    </tr>
                </tbody>                        
            </table>
      </section>

   </div>
</template>

<script>

    import { mapGetters } from 'vuex'
    var pagetitle = 'My Answers'
    window.$verbs = require('~/modules/data/verbs') 

    export default {
        layout: 'standard',
        middleware: ['auth', 'member'],
        data: function () {
            return {
                pageTitle: pagetitle,
                answers: null
            };
        },
        components: {
        },     
        head: {
            title: pagetitle+' - '+process.env.appName,
        },
        methods: {
            async getAnswers(){                
                $verbs.getAnswers().then((result) => {    
                    this.answers = result.success.data.answers
                }).catch((error) => {
                    console.log("error", error);
                }) 
            },
        },
        computed: {
          ...mapGetters(['memberProfile'])
        },
        mounted(){
            this.getAnswers()
        }
    }
</script>
