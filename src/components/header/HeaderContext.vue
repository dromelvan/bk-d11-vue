<template>
  <v-container class="header-context-container">
    <div class="header-context">
      <slot></slot>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'HeaderContext'
}
</script>

<style lang="scss" scoped>
  .header-context-container {
    margin-bottom: $d11-background-picture-padding;

    .header-context {
      display: flex;
      padding: 0.75em;
      line-height: 1.8em;
      background-color: $d11-header-context-background-color;

      .v-icon {
        color: white;
      }

      .v-icon.context-icon {
        padding-left: 0.5em;
        padding-right: 0.25em;
      }

      .header-context-link-container {
        margin-left: auto;
        a {
          color:white;
          text-decoration: none;
        }
      }
    }
  }

  .v-application-xs {
    .header-context-container {
      margin-bottom: $d11-background-picture-padding / 2;

      .header-context {
        line-height: 1em;
        display: inherit;
      }
    }
  }

</style>
