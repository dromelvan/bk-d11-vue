<template>
  <d11-image class="d11-team-image" :type="'d11-team'" :version="version" :id="id"/>
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
    id: Number
  }
}
</script>
