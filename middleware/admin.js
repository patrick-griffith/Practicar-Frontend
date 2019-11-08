export default async function ({ store, redirect, route }) {

    if (!store.getters.isSiteAdmin) {
      return redirect('/')
    }
  
  }