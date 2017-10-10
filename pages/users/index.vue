<template>
  <v-container fluid>
    <v-layout v-if="error">
      <v-flex xs12>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            Users <v-btn @click="reloadUsers()">Reload</v-btn>
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>
          <v-data-table
              v-bind:headers="headers"
              v-bind:items="users"
              v-bind:search="search"
            >
            <template slot="items" scope="props">
              <td>
                <v-edit-dialog
                  lazy
                > {{ props.item.username }}
                  <v-text-field
                    slot="input"
                    label="Edit"
                    v-model="props.item.username"
                    single-line
                    counter
                    :rules="[max25chars]"
                  ></v-text-field>
                </v-edit-dialog>
              </td>
              <td class="text-xs-right">{{ props.item.email }}</td>
              <td class="text-xs-right">{{ props.item.firstName }}</td>
              <td class="text-xs-right">{{ props.item.lastName }}</td>
              <td class="text-xs-right">{{ props.item.isActive }}</td>
            </template>
            <template slot="pageText" scope="{ pageStart, pageStop }">
              From {{ pageStart }} to {{ pageStop }}
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import { getToken } from '~/utils/auth'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export default {
  data () {
    return {
      loading: false,
      error: '',
      max25chars: (v) => v.length <= 25 || 'Input too long!',
      tmp: '',
      search: '',
      pagination: {},
      headers: [
        {
          text: 'Username',
          align: 'left',
          sortable: true,
          value: 'Username'
        },
        { text: 'Email', value: 'Email' },
        { text: 'Name', value: 'FirstName' },
        { text: 'LastName', value: 'LastName' },
        { text: 'Active', value: 'IsActive' }
      ],
      users: []
    }
  },
  middleware: 'authenticated',
  mounted: function () {
    this.reloadUsers()
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    signedInUser () {
      return this.$store.getters.signedInUser
    }
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
    onDismissed () {
      this.$store.dispatch('clearError')
    },
    reloadUsers () {
      var self = this
      self.startLoading()
      self.clearError()
      const token = getToken()
      if (typeof token !== 'undefined') {
        self.users = getUsers(this.$store.getters.urls.usersURL + '?access_token=' + token)
        self.finishLoading()
      }
    },
    reloadUserss () {
      var self = this
      self.startLoading()
      self.clearError()
      // const token = this.$store.getters.token
      const token = getToken()
      console.log('typeof token !== undefined' + ': ' + (typeof token !== 'undefined'))
      if (typeof token !== 'undefined') {
        const url = this.$store.getters.urls.usersURL + '?access_token=' + token
        console.log('Get users url is ' + url)
        axios.get(url)
          .then(function (response) {
            self.finishLoading()
            const jsonData = response.data.data
            self.users = JSON.parse(JSON.stringify(jsonData))
          })
          .catch(
            error => {
              self.finishLoading()
              self.setError(error)
              console.log(error)
              console.log('Error: Empty array returned.')
              return []
            }
          )
      }
      console.log('Empty array returned.')
      return []
    }
  }
}

async function getUsers (url) {
  try {
    console.log('Hola')
    const response = await axios.get(url)
    const jsonData = response.data.data
    return JSON.parse(JSON.stringify(jsonData))
  } catch (error) {
    console.log(error)
    return []
  }
}
</script>
