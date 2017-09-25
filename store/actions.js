import axios from 'axios'

const config = {
  apiHost: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://pulap.com:8080'
}

const actions = {
  signUserUp ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    axios.post(config.apiHost + '/api/v1/signup', payload)
      .then(
        user => {
          commit('setLoading', false)
          console.log(user)
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
  signUserIn ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    axios.get(`http://localhost:8080/api/v1/signin`)
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
