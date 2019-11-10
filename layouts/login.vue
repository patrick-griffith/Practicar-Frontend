<template>
  
    <div>    
        <ShowToast/>
        <div id="page-innards">        
            <div class="container">                        
                <nuxt/>
            </div>    
        </div>
    </div>

</template>

<script>
                           
    import ShowToast from '~/components/Toast.vue'

    export default {
        components: {
            ShowToast
        }
    }

</script>