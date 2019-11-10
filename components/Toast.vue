<template>
    <div></div>
</template>
<script>
import { mapState } from 'vuex'
export default {

    computed: {
        ...mapState(['toast'])
    },
    mounted(){
        if(this.toast){
            this.$buefy.toast.open({
                message: this.toast.message,
                type: this.toast.type,
                duration: (this.toast.duration ? this.toast.duration : 4000)
            })
            this.$store.commit('SET_TOAST', null)
        }        
    }
}
</script>