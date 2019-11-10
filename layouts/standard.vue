<template>
  
<div>    
    <ShowToast/>
    <div id="page-innards">        
        <div class="container">                        
            <Header/>
            <nuxt/>
            <Footer/>
        </div>    
    </div>
  </div>

</template>

<script>
                           
    import Header from '~/components/layout/Header'
    import Footer from '~/components/layout/Footer'
    import ShowToast from '~/components/Toast.vue'

    export default {
        components: {
            Header,   
            Footer,
            ShowToast
        }
    }

</script>