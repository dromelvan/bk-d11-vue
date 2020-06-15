<template>
  <v-app-bar app color="primary" src="@/assets/images/header-background-small.png">
    <template v-slot:default>
      <v-app-bar-nav-icon @click="show()"></v-app-bar-nav-icon>
      <v-spacer style="margin-left: -48px"/>
      <v-img alt="D11" height="38px" contain aspect-ratio="1" src="@/assets/images/D11Logo.png" />
      <v-spacer/>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBarSmall',
  methods: {
    show: function () {
      this.$parent.$emit('navigationDrawer.show', true)
    }
  }
}
</script>
