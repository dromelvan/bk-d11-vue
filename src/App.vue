<template>
  <v-app  :class="{ 'v-application-xs' : $vuetify.breakpoint.xs, 'v-application-sm' : $vuetify.breakpoint.sm, 'v-application-md' : $vuetify.breakpoint.md, 'v-application-lg' : $vuetify.breakpoint.lg, 'v-application-xl' : $vuetify.breakpoint.xl }">
    <template v-if="$vuetify.breakpoint.smAndDown">
      <app-bar-small/>
      <navigation-drawer/>
    </template>

    <app-bar class="app-bar" v-if="$vuetify.breakpoint.mdAndUp"/>

    <v-content>
        <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    AppBarSmall: () => import('@/components/AppBarSmall'),
    NavigationDrawer: () => import('@/components/NavigationDrawer'),
    AppBar: () => import('@/components/AppBar')
  }
}
</script>

<style lang="scss" scoped>
  @media only screen and (min-width: $d11-app-width) {
    .app-bar ::v-deep .v-toolbar__content,
    .app-bar ::v-deep .v-toolbar__extension {
      width: $d11-app-width;
      margin: auto;
    }
  }
</style>

<style lang="scss">
  .container {
    max-width: $d11-app-width !important;
  }
</style>
