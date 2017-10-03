<template>
  <p>Signing in...</p>
</template>

<script>
import axios from 'axios'
import { setToken, checkSecret, extractInfoFromHash } from '~/utils/auth'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export default {
  data () {
    return {
      loading: false,
      error: ''
    }
  },
  mounted () {
    const { token, secret } = extractInfoFromHash()
    if (!checkSecret(secret) || !token) {
      console.error('Something happened with the Sign In request')
    }
    setToken(token)
    this.updateLocalUserData()
    this.$router.replace('/')
  },
  methods: {
    startLoading: function () {
      this.loading = true
    },
    finishLoading: function () {
      this.loading = false
    },
    setError: function (message) {
      this.error = message
    },
    clearError: function () {
      this.error = ''
    },
    updateLocalUserData: function () {
      this.startLoading()
      this.clearError()
      const user = this.$store.getters.loggedUser
      axios.post(this.$store.getters.urls.updateUserDataURL, user)
        .then(function (response) {
          this.finishLoading()
          console.log('Local user data updated.')
        })
        .catch(
          error => {
            this.finishLoading()
            this.setError(error)
            console.log('updateLocalUserData error.')
          }
        )
    }
  }
}
</script>
