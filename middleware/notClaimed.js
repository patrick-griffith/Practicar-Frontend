export default async function ({ store, redirect, route }) {

    if (store.getters.memberProfile.first_name) {
      return redirect('/')
    }
  
  }