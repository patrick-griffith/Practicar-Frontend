window.$invoke = require('~/modules/app')

/**
 * Get providers by page (pagination)
 *
 * @param recordsPerPage int
 * @param offset int
 * @param sort string
 * @param query string (optional)
 *
 * @returns {success: business object}|{error: object}
 */

export async function getMemberMe()
{ 
    return await $invoke._invoker(
        'get',
        process.env.baseApiUrl + '/me'
    )
}

export async function getAllMembers()
{ 
    return await $invoke._invoker(
        'get',
        process.env.baseApiUrl + '/members'
    )
}

export async function getMember(member_id)
{ 
    return await $invoke._invoker(
        'get',
        process.env.baseApiUrl + '/members/'+member_id
    )
}

export async function setCustomPassword(formData) {

    return  await $invoke._invoker(
           'put',
           process.env.baseApiUrl + '/members/'+formData.id+'/set-custom-password', formData,
           { headers:
                   {
                       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                   }
           } 
      
    )
   }

export async function updateMember(formData) {

 return  await $invoke._invoker(
        'put',
        process.env.baseApiUrl + '/members/'+formData.id, formData,
        { headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
        } 
   
 )
}

export async function updateMemberSettings(formData) {

    return  await $invoke._invoker(
           'put',
           process.env.baseApiUrl + '/members/settings/'+formData.id, formData,
           { headers:
                   {
                       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                   }
           } 
      
    )
   }

export async function createMember(formData) {

    return  await $invoke._invoker(
            'post',
            process.env.baseApiUrl + '/members', 
            formData,
            { headers:
                    {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
            } ,
            false
        
    )
}

export async function getMemberBusinesses()
{ 
    return await $invoke._invoker(
        'get',
        process.env.baseApiUrl + '/me/businesses'
    )
}

export async function validateBusiness(businessList, domain)
{ 
    var valid = false
    var businesses = businessList

    businesses.forEach( function(business, key ) {
       if( business.domain == domain ){
          valid = true
       }
    })
    
    return valid;
  
}

export async function requestPasswordReset(email) {
    return await $invoke._invoker(
        'post',
        process.env.baseApiUrl + '/members/password-reset',
        {
            email: email,
            resetURL: 'http://' + window.location.host + '/reset-password/'
        },
        {},
        false
    )
}