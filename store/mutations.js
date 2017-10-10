import { setToken } from '~/utils/auth'

const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  setToken (state, token) {
    state.token = token
    setToken(token)
  },
  setSignedInUser (state, user) {
    console.log('setSignedInUser')
    state.signedInUser = user || null
    // console.log('Usuario signeado ' + state.signedInUser)
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
