<template>
    <div>
            
      <div v-if="!image_crop" class="img_hover_wrap pointer border d-flex text-center" @click.prevent="$refs.imageFileUpload.click()" :style="'height:'+viewerSize.height+'px;width:'+viewerSize.width+'px'" >        
        
        <b-img v-if="image_crop_preview != ''" blank-color="#777" :src="image_crop_preview"  class="border pointer img_hover_img"/>
          
        <span v-if="image_crop_preview == ''" class="align-self-center align-middle mx-auto has-text-grey-light"> 
          Click to upload {{imageName}}<br/>
            <small>{{imageSize.width}} x {{imageSize.height}}</small>
        </span>          
        <span v-if="image_crop_preview != ''" class="img_hover_text pt-5">
            <i class="fal fa-camera "></i>  Click to update {{imageName}}<br/>
            <small>{{imageSize.width}} x {{imageSize.height}}</small>
        </span>
      </div>        

      <span v-if="image_crop_file && !image_crop" class="btn btn-outline-primary btn-sm pointer mt-3 mx-auto" @click.prevent="imageReset()" >Reset {{imageName}}</span>
      
        
      <VueCroppie 
          v-if="image_crop"
          ref="imageFileCrop"
          :enableResize="false"
          :enableExif="true"
          :enforceBoundary="true"
          :viewport="{ width: viewerSize.width, height: viewerSize.height, type: 'square' }"
          :boundary="{ width: viewerSize.width+30, height: viewerSize.height+30, type: 'square' }"
          @update="cropUpdate"
          >
      </VueCroppie>                        

      <input type="file" ref="imageFileUpload"  style="display: none" v-on:change="imageChange($event)" accept=".jpg,.png" />
      
      <div class="text-center">
        <span v-if="image_crop" class="btn btn-outline-primary btn-sm pointer" @click.prevent="imageReset()" >Cancel</span>  
        <span v-if="image_crop" class="btn btn-outline-primary btn-sm pointer" @click.prevent="image_crop=false" >Update</span>
      </div>

    </div>
</template>

<script>
        
    window.$common = require('~/modules/common')

    export default {
       props: {
        imageUrl: {
          default: ''
        },
        imageName: {
          default: 'image'
        },
        viewerSize: {
          type: Object,
          default: function () { return {'height':300,'width':300} }
        },          
        imageSize: {
          type: Object,
          default: function () { return {'height':600,'width':600} }
        }               
      },
      data: function() {
        return { 
          image_crop: false,
          image_crop_file: null,
          image_crop_preview: this.imageUrl
        }
      },    
      methods: {
          async imageChange(e) { 
            
            if( e.target.files[0] ){

              //this.brand_image = this.createImage(this.brand_image_file )
              var files = (e.target.files || e.target.dataTransfer.files);
            
              //bind file to croppie
              var reader = new FileReader();
              reader.readAsDataURL( files[0] );
              reader.onload = () => {
                  this.dialog = true;
                  this.$refs.imageFileCrop.bind({
                      url: reader.result,
                  });
              };
              
              this.image_crop = true
                            
            }            
          },
          imageReset() { 
            
             this.image_crop = false 
             this.image_crop_file = null
             this.$refs.imageFileUpload.value = ''
             this.image_crop_preview = this.imageUrl
            
             if( this.$refs.imageFileCrop ){                
                 this.$refs.imageFileCrop.refresh()                
             }
          },
          async cropUpdate(){             
              var imageFile = await this.$refs.imageFileCrop.result( {                  
                  size: { width: this.imageSize.width, height: this.imageSize.height},
                  format: 'png', 
                  circle: false,
                  backgroundColor: 'white'
              })
              
              this.image_crop_preview = imageFile
              this.image_crop_file = await $common.dataURLtoFile( imageFile, 'image.png' )
          }
      },
      watch: {
        imageUrl() {
          this.image_crop_preview = this.imageUrl
        }
      }         
    }
</script>