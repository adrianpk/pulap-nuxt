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
    return !!state.signedInUser
  },
  signedInUser (state) {
    return state.signedInUser
  }
}

export default getters
