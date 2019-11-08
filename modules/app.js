import axios from 'axios'

/**
 * Common API call method
 *
 * @param method string
 * @param url string
 * @param data object {}
 * @param headers object {}
 * @param auth boolean
 *
 * @returns {success: ...} |{error: ...}
 */
export async function _invoker(method, url, data = {}, headers = {}, auth = true) {
    
    
    if (auth) {
        var token = localStorage.getItem('auth._token.local')
        if (!token) {
            $nuxt.$router.push('/login')
            return {error: 'Unauthorized access.'}
        }
        axios.defaults.headers.common['Authorization'] = token
    }

    //shift data to formData
    const form_data = new FormData()
    for ( var key in data ) {
        form_data.append(key, data[key])
    }  
    data = form_data
      
    //hack due to issues with HTTP channels + files
    if( method == 'put'){
      method = 'post'
      form_data.append('_method', 'PUT');
    }    
  
    const result = await axios({method, url, data, headers}).then(function (response) {
      
        if (!response.data.error) {
            return {success: response}
        } else {
            return {error: response.data.error}
        }
    }).catch(function (error) {
        return {error: error}
    })

    return result
}

export async function dataPreflight(approvedData,formData) {
	  
  var putData = {};
  
  for (var key in formData) {
    if( approvedData.includes(key) ){
        putData[key] = formData[key];
    }
  }

  return putData;
  
}