<template>
  <div class="header-content-background">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HeaderContent'
}
</script>

<style lang="scss" scoped>
  .header-content-background {
    background-color: $d11-header-content-background-color;
  }
</style>
