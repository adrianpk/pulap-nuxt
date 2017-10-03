import axios from 'axios'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const env = {
  apiHost: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://pulap.com:8080',
  apiPath: '/api/v1'
}

const config = {
  signupURL: env.apiHost + env.apiPath + '/signup',
  signinURL: env.apiHost + env.apiPath + '/login',
  usersURL: env.apiHost + env.apiPath + '/users'
}

const actions = {
  clearError ({commit}) {
    commit('clearError')
  },
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
          commit('setSessionUser', newUser)
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
    console.log(config.signinURL)
    console.log(payload)
    axios.post(config.signinURL, payload)
      .then(function (response) {
        commit('setLoading', false)
        const jsonData = response.data.data
        // const user = data.user
        // console.log('User ' + user)
        // const data = JSON.parse(response.data)
        // console.log(JSON.stringify(jsonData.token, null, 4))
        const token = jsonData.token
        commit('setToken', token)
        const user = jsonData.user
        const sessionUser = {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name
        }
        commit('setSessionUser', sessionUser)
      })
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
    commit('setUser', null)
  }
}

export default actions
