import axios from 'axios'

const env = {
  apiHost: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://pulap.com:8080',
  apiPath: '/api/v1'
}

const config = {
  signupURL: env.apiHost + env.apiPath + '/signup',
  signinURL: env.apiHost + env.apiPath + '/login'
}

const actions = {
  signUserUp ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    axios.post(config.signupURL, payload)
      .then(
        user => {
          commit('setLoading', false)
          console.log(user)
          const newUser = {
            id: user.ID
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
  },
  signUserIn ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    console.log(payload)
    axios.post(config.signinURL, payload)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
  },
  autoSignIn ({commit}, payload) {
    commit('setUser', {id: payload.uid})
  },
  logout ({commit}) {
    // firebase.auth().signOut()
    commit('setUser', null)
  },
  clearError ({commit}) {
    commit('clearError')
  }
}

export default actions
