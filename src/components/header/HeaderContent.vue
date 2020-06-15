<template>
  <v-container class="header-content-container">
    <div class="header-content">
      <slot></slot>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'HeaderContent'
}
</script>

<style lang="scss" scoped>
  .header-content-container {
    padding-top: 0px;
    padding-bottom: 0px;

    .header-content {
      font-size: 1.75em;
      font-weight: 600;
      background: $d11-blue;

      .emphasised {
        background: $d11-blue-gray;
      }
    }
  }

  .v-application-xs {
    .header-content-background {
      .header-content-container {
        .header-content {
          font-size: 1.5em;
          font-weight: 600;

          max-height: none;
          padding-right: 0px;
        }
      }
    }
  }
</style>
