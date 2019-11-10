export default async function ({ store, redirect, route }) {
    if (store.state.auth.loggedIn) {        
        if(!store.getters.memberProfile.username){
            return redirect('/login/finish')
        }
    }
}