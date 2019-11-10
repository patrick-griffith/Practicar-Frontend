export default async function ({ store, redirect, route }) {
    if (store.state.auth.loggedIn) {        
        if(!store.getters.memberProfile.first_name){
            return redirect('/login/finish')
        }
    }
}