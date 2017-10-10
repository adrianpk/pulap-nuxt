import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// import plugins from './plugins'

const env = {
  apiHost: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://pulap.com:8080',
  apiPath: '/api/v1'
}
const appURL = {
  signupURL: env.apiHost + env.apiPath + '/signup',
  signinURL: env.apiHost + env.apiPath + '/login',
  usersURL: env.apiHost + env.apiPath + '/users',
  updateUserDataURL: env.apiHost + env.apiPath + '/users/update-local-data'
}

const store = () => {
  return new Vuex.Store({
    state: {
      urls: appURL,
      sidebar: false,
      loading: false,
      error: null,
      token: null,
      signedInUser: null
    },
    mutations,
    actions,
    getters
    // plugins
  })
}

export default store
