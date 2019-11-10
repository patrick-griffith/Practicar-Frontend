export default async function ({ store, redirect, route }) {

    if (store.getters.memberProfile.username) {
      return redirect('/')
    }
  
  }