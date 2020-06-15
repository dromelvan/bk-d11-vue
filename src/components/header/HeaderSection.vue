<template>
  <section class="header-section">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'HeaderSection'
}
</script>

<style lang="scss" scoped>
  .header-section {
    position: relative;
    overflow: hidden;
    color: white;
    background: black;
  }
</style>

<style lang="scss">
  .header-section {
    .container,
    .header-navigation,
    .header-content-background {
      position: relative;
      z-index: 1;
    }
  }
</style>
