<template>
  <v-container class="header-content-container">
    <div class="header-content" v-bind:class="{ vertical: vertical }">
      <slot></slot>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'HeaderContent',
  props: {
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-content-container {
    padding-top: 0px;
    padding-bottom: 0px;

    .header-content {
      font-size: 1.75em;
      font-weight: 600;
      line-height: 2.3em;
      background: $d11-blue;
      padding: 0 0.25em;
      display: flex;

      .emphasised {
        background: $d11-blue-gray;
      }

      .previous-btn,
      .next-btn {
        font-size: 1.8em;
        align-self: center;
        color: white;
      }

      .previous-btn {
        margin-right: $d11-spacer;
      }

      .next-btn {
        margin-left: auto;
      }
    }

    .header-content.vertical {
      flex-direction: column;
      padding-right: 0;
    }
  }

  .v-application-xs {
    .header-content-background {
      .header-content-container {
        .header-content {
          font-size: 1.5em;
          font-weight: 600;
          line-height: inherit;
          max-height: none;
        }
        .header-content:not(.vertical) {
          padding: 0.25em 0.25em;
        }
      }
    }
  }
</style>
