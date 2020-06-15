<template>
  <div class="d11-header">
    <div class="breadcrumbs-container">
      <v-container>
        <v-breadcrumbs :items="breadcrumbs" divider=">"/>
      </v-container>
    </div>
    <div class="h1-container">
      <v-container>
        <h1>{{ text }}</h1>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'D11Header',
  props: {
    breadcrumbs: Array,
    text: String
  }
}
</script>

<style lang="scss" scoped>
  .v-breadcrumbs {
      padding: 0px;
  }

  .h1-container {
    background: $d11-blue;
    color: white;
    background-image: url('~@/assets/images/header-background.png')
  }

</style>
