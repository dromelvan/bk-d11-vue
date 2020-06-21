<template>
  <img :class="version" :src="`${baseURL}images/${type}/${version}/${id}.${fileType}`" @error="missing">
</template>

<script>
export default {
  data: () => ({
    baseURL: process.env.BASE_URL
  }),
  methods: {
    missing: function () {
      this.$el.setAttribute('src', `${this.baseURL}images/${this.type}/${this.version}/missing.${this.fileType}`)
    }
  },
  props: {
    type: String,
    version: {
      type: String,
      default: 'default'
    },
    id: Number,
    fileType: {
      type: String,
      default: 'png'
    }
  }
}
</script>

<style lang="scss" scoped>
  img {
    vertical-align: middle;
  }
</style>
