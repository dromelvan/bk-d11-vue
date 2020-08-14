<template>
  <d11-image class="player-image" :type="'player'" :version="version" :id="id"/>
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
