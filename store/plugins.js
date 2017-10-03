import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

const plugins = [
  createPersistedState({
    // paths: ['user', 'token'],
    storage: {
      getItem: (key) => Cookies.getJSON(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
      removeItem: (key) => Cookies.remove(key)
    }
  })
]

export default plugins
