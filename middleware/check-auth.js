import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'

export default function ({ isServer, store, req }) {
// If nuxt generate, pass this middleware
  if (isServer && !req) return
  const signedInUser = isServer ? getUserFromCookie(req) : getUserFromLocalStorage()
  console.log('check-auth')
  store.commit('setSignedInUser', signedInUser)
}
