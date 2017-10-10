<template>
  <p>Signing in...</p>
</template>

<script>
import { setToken, checkSecret, extractInfoFromHash } from '~/utils/auth'

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
    }
  }
}
</script>
