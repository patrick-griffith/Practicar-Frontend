<template>
    <div>
        <b-navbar :spaced=true wrapper-class="container" id="top-nav">
            <template slot="brand">
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    <h2 class="title is-5">
                        <span class="tag is-warning">practicar.mx</span>
                    </h2>
                </b-navbar-item>
            </template>
            <template slot="start">                
                
            </template>

            <template slot="end">
                <template  v-if="isLoggedIn">
                    <div id="member-nav">
                        <b-dropdown>
                            <div slot="trigger">
                                <figure class="image is-48x48">
                                    <img class="is-rounded is-padded" :src="('https://via.placeholder.com/200/dedfe0/000?text=' + memberProfile.username.charAt(0))">
                                </figure>
                            </div>
                           
                            <nuxt-link v-if="$store.getters.isSiteAdmin" to="/admin" class="dropdown-item">Admin</nuxt-link>
                            <nuxt-link v-if="false" to="/account/profile" class="dropdown-item">My Account</nuxt-link>
                            <nuxt-link to="/account/answers" class="dropdown-item">My Answers</nuxt-link>
                            <nuxt-link to="/account/logout" class="dropdown-item">Logout</nuxt-link>
                                            
                        </b-dropdown> 
                    </div>
                </template>
                <template v-else>
                    <b-navbar-item tag="div">
                        <div class="buttons">
                            <nuxt-link to="/login/signup" class="button is-dark">
                                sign up
                            </nuxt-link>
                            <nuxt-link to="/login" class="button">
                                log in
                            </nuxt-link>
                        </div>
                    </b-navbar-item> 
                </template>
            </template>
        </b-navbar>        

    </div>
</template>

<script>

    import { mapGetters } from 'vuex'
    
    export default {             
        data:  function(){
            return {
                
            }
        },
        components: {
        },
        computed: {
          ...mapGetters(['isLoggedIn', 'memberProfile'])
        }
    }
</script>