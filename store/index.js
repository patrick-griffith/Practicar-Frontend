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
    state.auth.user.username = user.username
  },
}

export const getters = {
  isLoggedIn(state) {
    return state.auth.loggedIn && state.auth.user
  },
  memberProfile(state) {
    return state.auth.user
  },
}