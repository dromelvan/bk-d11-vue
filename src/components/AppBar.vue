<template>
  <v-app-bar app color="primary" src="@/assets/images/header-background.png">
    <template v-slot:default>
      <div>
        <v-img alt="D11" src="@/assets/images/D11Logo.png"/>
      </div>

      <v-spacer></v-spacer>

      <v-btn icon style="color:white">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>

    <template v-slot:extension>
      <v-menu open-on-hover v-for="navigationGroup in navigationGroups" :key="navigationGroup.header" offset-y dark transition="scale-transition" auto origin="top center">
        <template v-slot:activator="{ on }">
          <a style="color: white; padding-right: 1em" v-on="on">
            {{ navigationGroup.header }}
            <v-icon style="color: white">mdi-chevron-down</v-icon>
          </a>
        </template>
        <v-list>
          <v-list-item v-for="link in navigationGroup.links" :key="link.text" exact router :to="{ name: link.route }">
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>

      <login-dialog @logging-in="onLoggingIn" v-if="!loggedIn() || loggingIn"/>
      <a class="menu-link" v-if="!loggedIn() || loggingIn">Sign Up</a>

      <a class="menu-link" v-if="loggedIn() && !loggingIn" @click="logout()">Sign Out</a>
   </template>
  </v-app-bar>
</template>

<script>
import navigation from '@/mixins/navigation'
import AuthenticationService from '../services/authentication.service'

export default {
  name: 'AppBar',
  mixins: [navigation],
  data () {
    return {
      loggingIn: false
    }
  },
  components: {
    LoginDialog: () => import('@/views/authentication/LoginDialog')
  },
  methods: {
    onLoggingIn: function (value) {
      this.loggingIn = value
    },
    logout: function () {
      AuthenticationService.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-app-bar.v-toolbar.v-sheet {
    .v-btn {
      background: transparentize($d11-blue, 0.1);
    }
  }

  a.menu-activator,
  a.menu-link {
    color: white;
  }

  a.menu-activator {
    padding-left: 10px;
    padding-right: 20px;
  }

  a.menu-link {
    padding-right: 10px;
    padding-left: 20px;
  }
</style>
