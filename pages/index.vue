<template>
    <div :class="{'logged-in' : isLoggedIn}">         
        <div id="question-box" class="has-text-centered">

            <div id="score">
               <span class="correct">{{ score.right }}</span> <span class="slash">/</span> <span class="total">{{ score.total }}</span>
            </div>

            <template v-if="conjugation">
                <div v-if="singleVerb" id="spanish-verb">
                    studying only <strong>{{ singleVerb.spanish }}</strong>. <nuxt-link :to="'/'">study all verbs.</nuxt-link>
                </div>
                <div v-else id="spanish-verb">
                    <b-tooltip label="click to study JUST this verb" type="is-dark">
                        <nuxt-link :to="'/verb/' + conjugation.verb.spanish">{{ conjugation.verb.spanish }}</nuxt-link>
                    </b-tooltip>
                </div>
            </template>
            
            <h1 class="title" v-if="conjugation">
                <template v-if="conjugation.tense.mood.id == 3">¡</template>
                
                {{ conjugation.english }}                
                
                <span v-if="conjugation.tense.id == 2">(one time)</span>
                <span v-else-if="conjugation.tense.id == 3">(every day)</span>
                
                <template v-if="conjugation.tense.mood.id == 3">!</template>
            </h1>
            

            <div id="answer">                
                <input ref="answer" type="text" spellcheck="false" v-model="answer"/>
            </div>            

            <div id="wrong" v-if="conjugation && wrong">
                <p>{{ conjugation.spanish }}</p>
                <table>
                    <tr><td>Verb:</td><td>{{ conjugation.verb.spanish }}</td></tr>
                    <tr><td>Mood:</td><td>{{ conjugation.tense.mood.name }}</td></tr>
                    <tr><td>Tense:</td><td>{{ conjugation.tense.name }}</td></tr>
                </table>
            </div> 

            <div id="notes">
                <b-message :active.sync="showHelp" title="Noticias" type="is-warning" aria-close-label="Close message">
                    <ul>
                        <li class="list-item">press <code>SPACE</code> to add accent/tilda to most recent letter. again to remove.</li>
                        <li class="list-item">change your settings below to practice different things.</li>
                        <li class="list-item">click a verb (in blue) above to practice JUST that verb.</li>
                        <li class="list-item" v-if="!isLoggedIn"><nuxt-link :to="'/login/signup'">create an account</nuxt-link> to save your settings and a complete record of all your answers, so your practice can be automatically tailored based on the verbs/tenses you struggle with.</li>
                    </ul>
                </b-message>
                <p v-if="showHelp == false"><code @click="accentLastChar()">SPACE</code> for accents. <code @click="showHelp = true">TAB</code> for info.</p>
            </div>

        </div>

        <div id="settings">
            <div class="section ">
                <div class="columns">
                    <div class="column is-5">
                        <h2 class="title is-5">personas</h2>
                        <div>
                            <div class="field" v-for="person in persons" :key="person.id">
                                <b-checkbox v-model="personGroup" :native-value="person.id">{{ person.spanish }}</b-checkbox>
                            </div> 
                        </div>
                    </div>  
                
                    <div class="column is-5">
                        <h2 class="title is-5">tiempos</h2>
                        <div>
                            <div v-for="mood in moods" :key="mood.id">
                                <h3 class="subtitle is-italic">{{ mood.name }}</h3>
                                <div class="field" v-for="tense in mood.tenses" :key="tense.id">                                    
                                    <b-checkbox v-model="tenseGroup" :native-value="tense.id">{{ tense.name }}</b-checkbox>
                                </div>
                            </div>

                            <div>
                                <h3 class="subtitle is-italic">indicativo</h3>
                                <div class="field">
                                    <b-tag>coming soon</b-tag>
                                </div>
                            </div>

                            <div>
                                <h3 class="subtitle is-italic">subjuntivo</h3>
                                <div class="field">
                                    <b-tag>coming soon</b-tag>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                     <div class="column is-2">
                        <h2 class="title is-5">tipos</h2>
                        <div>
                             <div class="field">
                                <b-checkbox v-model="regularGroup" :native-value="0">regulares</b-checkbox>
                            </div> 
                            <div class="field">
                                <b-checkbox v-model="regularGroup" :native-value="1">irregulares</b-checkbox>
                            </div> 
                        </div>
                     </div>
                </div>
            </div>
        </div>     

        <div class="has-text-centered" style="margin: 10em 0 3em 0;">
            <b-button @click.prevent="isNotesModalActive = true" type="is-danger">qué es eso?</b-button>
        </div>
        <b-modal :active.sync="isNotesModalActive" :has-modal-card=true>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">qué es eso?</p>
                </header>
                <section class="modal-card-body article">
                   <p>i’ve been taking <a href="https://www.walkspanish.com/" target="_blank">spanish classes</a> in la ciudad de mexico for the past couple of weeks, and have done super well on each of the assignments where we conjugate only once tense at a time. but then when i get out in the real world - where i don't have a paper telling me exactly what tense and what verb to use - i flutter.</p>
                   <p>so i’m building this to become a little better at quickly choosing the right verb and the right tense for what i want to say, and then conjugating it. because i don't care about doing well on my homework. i want to be able to have conversations.</p>
                   <p>i have a background in both maching learning engineering and in app development, so I have high hopes for what this app might one day be. but for now... poco a poco.</p>
                   <p>also i understand that there are tons of shortcomings in this app right now. si quieres ayudar, <a href="patrick.lorenzut@gmail.com">email me</a>.</p>
                </section>
            </div>
        </b-modal>
        
       
    </div>
</template>

<script>
    var pagetitle = 'Home'
    import { mapGetters } from 'vuex'
    window.$verbs = require('~/modules/data/verbs') 
    window.$members = require('~/modules/data/members') 
    export default {
        layout: 'standard',  
        middleware: ['member'],      
        data: function () {
            return {
                pageTitle: pagetitle, 
                seconds_elapsed: 0,
                shouldRecordAnswer: true,
                singleVerb: null,
                showHelp: false,
                isNotesModalActive: false,               
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
                personGroup: [1,2,3,4,6],
                regularGroup: [0,1]
            };
        }, 
        watch:{
            personGroup (val) {
                this.updateSettings()
            },
            tenseGroup (val) {
                this.updateSettings()
            },
            regularGroup (val) {
                this.updateSettings()
            },
        },
        computed: {
            ...mapGetters(['isLoggedIn', 'memberProfile']),
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
                this.shouldRecordAnswer = true

                if(this.isLoggedIn){
                    $members.updateMemberSettings({
                        id: this.memberProfile.id,
                        tenses: this.tenseGroup,
                        persons: this.personGroup,
                        regulars: this.regularGroup
                    }).then((result) => {    
                        
                    }).catch((error) => {
                        console.log("error", error);
                    })
                }

                this.getQuestions()
            },
            async getSingleVerb(spanish){
                await $verbs.getVerb(spanish).then((result) => {    
                    this.singleVerb = result.success.data.verb
                }).catch((error) => {
                    console.log("error", error);
                })
            },
            async getQuestions(){                
                $verbs.getQuestions(
                    this.tenseGroup.toString(),
                    this.personGroup.toString(), 
                    this.regularGroup.toString(),
                    this.singleVerb
                ).then((result) => {    
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
            async recordAnswer(answer, conjugations_id, seconds_elapsed){
                if(this.shouldRecordAnswer && this.isLoggedIn){
                    $verbs.recordAnswer({
                        conjugations_id: conjugations_id,
                        seconds_elapsed: seconds_elapsed,
                        answer: answer
                    }).then((result) => {    
                        
                    }).catch((error) => {
                        console.log("error", error);
                    }) 
                }
            },
            checkAnswer(){
                if(this.answer !== ''){
                    this.recordAnswer(this.answer, this.conjugation.id, this.seconds_elapsed)
                    if(this.answer == this.conjugation.spanish){                     
                        this.nextQuestion()
                        this.shouldRecordAnswer = true
                        this.wrong = false
                        this.answer = ''
                        this.score.right += 1
                        this.score.total += 1
                        let that = this                     
                    }else{
                        this.wrong = true
                        this.shouldRecordAnswer = false
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
            },
            async useUserSettings(){
                if(this.memberProfile.settings.tenses){
                    this.tenseGroup = JSON.parse("[" + this.memberProfile.settings.tenses + "]");
                }
                if(this.memberProfile.settings.persons){
                    this.personGroup = JSON.parse("[" + this.memberProfile.settings.persons + "]");
                }
                if(this.memberProfile.settings.regulars){
                    this.regularGroup = JSON.parse("[" + this.memberProfile.settings.regulars + "]");
                }
            }
        },
        components: {
            
        },
        async mounted(){  
            
            if(this.isLoggedIn){
                await this.useUserSettings()
            }

            if(this.$route.params.verb){
                await this.getSingleVerb(this.$route.params.verb)
            }            

            this.getQuestions()            
            this.getMoods()
            this.getPersons()
            this.$refs.answer.focus()
        },
        created(){
            let that = this
            document.addEventListener('keydown', function (evt) {
                if (evt.keyCode === 32) { //SPACE
                    evt.preventDefault()
                    that.accentLastChar()                    
                }
                else if (evt.keyCode === 9) { //TAB
                    evt.preventDefault()
                    if(that.showHelp == true){
                        that.showHelp = false
                    }else{
                        that.showHelp = true
                    }
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