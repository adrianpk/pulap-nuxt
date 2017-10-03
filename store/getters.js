const getters = {
  urls (state) {
    return state.urls
  },
  loading (state) {
    return state.loading
  },
  error (state) {
    return state.error
  },
  token (state) {
    return state.token
  },
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  },
  users (state) {
    return state.users
  }
}

export default getters
