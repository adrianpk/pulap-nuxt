const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  setToken (state, payload) {
    state.token = payload
  },
  setSessionUser (state, payload) {
    state.sessionUser = payload
  },
  SET_USER (state, user) {
    state.user = user || null
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  clearError (state) {
    state.error = null
  }
}

export default mutations
