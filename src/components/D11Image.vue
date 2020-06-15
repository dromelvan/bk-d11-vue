<template>
  <img style="vertical-align: middle" :src="`${baseURL}images/${type}/${version}/${id}.${fileType}`">
</template>

<script>
export default {
  data: () => ({
    baseURL: process.env.BASE_URL
  }),
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
