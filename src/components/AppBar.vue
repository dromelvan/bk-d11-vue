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

      <login-dialog/>
      <a class="menu-link">Sign Up</a>

    </template>
  </v-app-bar>
</template>

<script>
import navigation from '@/mixins/navigation'

export default {
  name: 'AppBar',
  mixins: [navigation],
  components: {
    LoginDialog: () => import('@/views/authentication/LoginDialog')
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
