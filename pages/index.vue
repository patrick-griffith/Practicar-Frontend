<template>
    <div> 
        <div id="question-box" class="has-text-centered">
            
            <div id="score">
               <span class="correct">{{ score.right }}</span> <span class="slash">/</span> <span class="total">{{ score.total }}</span>
            </div>

            <h1 class="title" v-if="conjugation">
                {{ conjugation.english }}
                <span v-if="conjugation.tense.id == 2">(one time)</span>
                <span v-else-if="conjugation.tense.id == 3">(every day)</span>
            </h1>                

            <div id="answer">                
                <input ref="answer" type="text" v-model="answer"/>
            </div>

            <div id="wrong" v-if="conjugation && wrong">
                <p>{{ conjugation.spanish }}</p>
                <table>
                    <tr><td>Verb:</td><td>{{ conjugation.verb.spanish }}</td></tr>
                    <tr><td>Mood:</td><td>{{ conjugation.tense.mood.name }}</td></tr>
                    <tr><td>Tense:</td><td>{{ conjugation.tense.name }}</td></tr>
                </table>
            </div>                  
        </div>

        <div id="settings">
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <h2 class="subtitle">Persons</h2>
                        <div>
                            <div class="field" v-for="person in persons" :key="person.id">
                                <b-checkbox v-model="personGroup" :native-value="person.id">{{ person.spanish }}</b-checkbox>
                            </div> 
                        </div>
                    </div>  
                
                    <div class="column">
                        <h2 class="subtitle">Tenses</h2>
                        <div>
                            <div v-for="mood in moods" :key="mood.id">
                                <h3 class="subtitle">{{ mood.name }}</h3>
                                <div class="field" v-for="tense in mood.tenses" :key="tense.id">
                                    <b-checkbox v-model="tenseGroup" :native-value="tense.id">{{ tense.name }}</b-checkbox>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                conjugations: null,
                moods: null,
                persons: null,
                answer: '',
                wrong: false,
                score: {
                    right: 0,                
                    total: 0
                },
                tenseGroup: [1],
                personGroup: [1,2,3,4,6]
            };
        }, 
        watch:{
            personGroup (val) {
                this.updateSettings()
            },
            tenseGroup (val) {
                this.updateSettings()
            },
        },
        computed: {
            ...mapGetters([]),
            conjugation: function () {
                if(this.conjugations){
                    return this.conjugations[0]
                }                
            }
        },
        head: {
            title: pagetitle + ' - ' + process.env.appName,            
        },
        methods: {
            updateSettings(){
                this.wrong = false
                this.answer = ''
                this.getQuestions()
            },
            async getQuestions(){
                $verbs.getQuestions(this.tenseGroup.toString(),this.personGroup.toString()).then((result) => {    
                    this.conjugations = result.success.data.conjugations
                }).catch((error) => {
                    console.log("error", error);
                }) 
            },
            async getMoods(){
                $verbs.getMoods().then((result) => {    
                    this.moods = result.success.data.moods
                }).catch((error) => {
                    console.log("error", error);
                }) 
            },
            async getPersons(){
                $verbs.getPersons().then((result) => {    
                    this.persons = result.success.data.persons
                }).catch((error) => {
                    console.log("error", error);
                }) 
            },
            checkAnswer(){
                if(this.answer !== ''){
                    if(this.answer == this.conjugation.spanish){                     
                        this.nextQuestion()
                        this.wrong = false
                        this.answer = ''
                        this.score.right += 1
                        this.score.total += 1
                    }else{
                        this.wrong = true
                        this.score.total += 1
                    }
                }
            },
            nextQuestion(){
                this.conjugations.shift()
                if(this.conjugations.length <= 0){
                    this.getQuestions()
                }
            },
            accentLastChar(){
                var char = this.answer.charAt(this.answer.length-1); 
                var new_char = char

                if(char == 'a'){
                    new_char = 'á'
                }else if(char == 'e'){
                    new_char = 'é'
                }else if(char == 'i'){
                    new_char = 'í'
                }else if(char == 'o'){
                    new_char = 'ó'
                }else if(char == 'u'){
                    new_char = 'ú'
                }else if(char == 'n'){
                    new_char = 'ñ'
                }else if(char == 'á'){
                    new_char = 'a'
                }else if(char == 'é'){
                    new_char = 'e'
                }else if(char == 'í'){
                    new_char = 'i'
                }else if(char == 'ó'){
                    new_char = 'o'
                }else if(char == 'ú'){
                    new_char = 'u'
                }else if(char == 'ñ'){
                    new_char = 'n'
                }

                this.answer = this.answer.replace(/.$/,new_char)
            }
        },
        components: {
            
        },
        mounted(){  
            this.getQuestions()
            this.getMoods()
            this.getPersons()
            this.$refs.answer.focus()
        },
        created(){
            let that = this
            document.addEventListener('keyup', function (evt) {
                if (evt.keyCode === 16) { //shift
                    that.accentLastChar()
                }
                else if(evt.keyCode >= 48 && evt.keyCode <= 57){ //numbers

                }
                else if(evt.keyCode == 13){ //enter
                    that.checkAnswer()
                }
            });
        }
    }
</script>