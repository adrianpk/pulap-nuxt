import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

export default ({store, isHMR}) => {
  // In case of HMR, mutation occurs before nuxReady, so previously saved state
  // gets replaced with original state received from server. So, we've to skip HMR.
  // Also nuxtReady event fires for HMR as well, which results multiple registration of
  // vuex-persistedstate plugin
  if (isHMR) return

  window.onNuxtReady((nuxt) => {
    createPersistedState({
      // getState: (key) => Cookies.getJSON(key),
      // setState: (key, state) => Cookies.set(key, state, { expires: 300000, secure: true })
      getItem: (key) => Cookies.getJSON(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
      removeItem: (key) => Cookies.remove(key)
    })
  })
}

// export default ({store, isHMR}) => {
//   // In case of HMR, mutation occurs before nuxReady, so previously saved state
//   // gets replaced with original state received from server. So, we've to skip HMR.
//   // Also nuxtReady event fires for HMR as well, which results multiple registration of
//   // vuex-persistedstate plugin
//   if (isHMR) return

//   window.onNuxtReady((nuxt) => {
//     createPersistedState()(store) // vuex plugins can be connected to store, even after creation
//   })
// }
