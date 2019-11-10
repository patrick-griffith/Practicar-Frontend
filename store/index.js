export const state = () => ({
  _currentUser: null,
  _token: null,
  toast: null //if we have an alert to show
})

export const actions = {
    
}

export const mutations = {
  SET_TOAST: function (state, toast){
    state.toast = toast
  },
  COMPLETE_USER: function (state, user) {
    state.auth.user.first_name = user.first_name
    state.auth.user.last_name = user.last_name
  },
}

export const getters = {
  isLoggedIn(state) {
    return state.auth.loggedIn && state.auth.user
  },
  memberProfile(state) {
    return state.auth.user
  },
  fullName(state){
    let u = state.auth.user
    return u.first_name + " " + u.last_name
  },
}