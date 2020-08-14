<template>
  <img class="country-image" :src="`${baseURL}images/country/${version}/${iso}.png`">
</template>

<script>
export default {
  data: () => ({
    baseURL: process.env.BASE_URL
  }),
  props: {
    version: {
      type: String,
      default: 'default'
    },
    iso: String
  }
}
</script>

<style lang="scss" scoped>
  img {
    vertical-align: middle;
  }
</style>
