<template>
  <div>
               
  </div>  
</template>

<script>
  export default {
    created:function(){
      this.$auth.logout();
      $nuxt.$router.push('/')
    }
  }
</script>