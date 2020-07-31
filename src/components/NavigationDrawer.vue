<template>
  <v-navigation-drawer v-model="show" app dark temporary>
    <v-list nav flat dense>
      <v-list-item-group v-for="navigationGroup in navigationGroups" :key="navigationGroup.header" color="d11BlueGray">
        <v-subheader>{{ navigationGroup.header }}</v-subheader>
        <v-list-item v-for="link in navigationGroup.links" :key="link.text" exact router :to="{ name: link.route }">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group>
        <v-list-item v-if="!loggedIn() || loggingIn">
          <v-list-item-title>
            <login-dialog @logging-in="onLoggingIn"/>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!loggedIn() || loggingIn">
          <v-list-item-title>
            Sign Up
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="loggedIn()" @click="logout(); show = false">
          <v-list-item-title>
            Sign Out
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import navigation from '@/mixins/navigation'
import AuthenticationService from '../services/authentication.service'

export default {
  name: 'NavigationDrawer',
  mixins: [navigation],
  data: function () {
    return {
      show: false,
      loggingIn: false
    }
  },
  components: {
    LoginDialog: () => import('@/views/authentication/LoginDialog')
  },
  methods: {
    onLoggingIn: function (value) {
      this.loggingIn = value
      this.show = false
    },
    logout: function () {
      AuthenticationService.logout()
    }
  },
  mounted () {
    this.$parent.$on('navigationDrawer.show', show => {
      this.show = show
    })
  }
}
</script>

<style scoped>
  .v-subheader {
    text-transform: uppercase;
  }
</style>
