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
    .header-context {
      display: flex;
      padding: 0.75em;
      line-height: 1.8em;
      background-color: $d11-header-context-background-color;

      .v-icon {
        color: white;
      }

      .v-icon.chevron-icon {
        font-size: 1.8em;
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
      .header-context {
        line-height: 1em;
        display: inherit;
      }
    }
  }

</style>
