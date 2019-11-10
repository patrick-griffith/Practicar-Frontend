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
                            <b-dropdown-item v-if="$store.getters.isSiteAdmin">
                                <nuxt-link to="/admin">Admin</nuxt-link>
                            </b-dropdown-item>
                            <b-dropdown-item v-if="false">
                                <nuxt-link to="/account/profile">My Account</nuxt-link>
                            </b-dropdown-item>
                            <b-dropdown-item>
                                <nuxt-link to="/account/answers">My Answers</nuxt-link>
                            </b-dropdown-item>
                            <b-dropdown-item>
                                <nuxt-link to="/account/logout">Logout</nuxt-link>
                            </b-dropdown-item>                
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