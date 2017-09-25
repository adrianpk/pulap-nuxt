import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const store = () => {
  return new Vuex.Store({
    state: {
      sidebar: false,
      user: null,
      loading: false,
      error: null
    },
    mutations,
    actions,
    getters
  })
}

export default store
