<template>
    <div>
        <form class="card mb-1" ref="formLogin">
            <div class="card-body p-6">
                
                <b-alert v-model="balert.show" dismissible fade :variant="balert.variant">
                    {{balert.message}}
                </b-alert>                
                
                <div class="form-group">
                    <input v-model="Email" v-validate="'required|email'" type="email" name="Email" id="Email" placeholder="Email" class="form-control">                  
                    <span class="help is-danger">{{ errors.first('Email') }}</span>
                </div>
                <div class="form-group">
                    <input v-model="Token" v-validate="'required'" type="text" name="Token" id="Token" class="form-control" placeholder="Token">
                </div>
                <div class="form-footer">
                <button v-on:click.prevent="requestLogin()" class="btn btn-primary btn-block mb-3">Verify Email Addresss</button>
                </div>
            </div>
        </form>
    </div>
</template>


<script>      

    var pagetitle = 'Verify Your Email Address'

    export default {
        layout: 'fullcard', 
        head: {
            title: pagetitle+' - '+process.env.appName,
            meta: [
                {hid: 'description', name: 'description', content: pagetitle+' - '+process.env.appName},
            ]
        },   
        data: function () {
            return {
                balert: {'show':false,'variant':'primary'},              
                Email: '',
                Password: '',
            };
        },
        methods: {
                 
            
        },
        computed: {
          
        }
    }
</script>