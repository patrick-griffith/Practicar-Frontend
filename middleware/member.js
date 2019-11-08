export default async function ({ store, redirect, route }) {

  if (!store.getters.isClaimed) {
    return redirect('/finish')
  }

}