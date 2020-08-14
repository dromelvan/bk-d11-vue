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

    .header-content {
      padding: $d11-spacer;
      background:rgb(0,0,0,.5);
      display: flex;

      .name {
        font-size: 1.75em;
        font-weight: 600;
      }

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

  .header-content-background {
    .header-content-container {
      padding-top: 0px;
      padding-bottom: 0px;
      .header-content {
        font-weight: 600;
        line-height: 2.3em;
        font-size: 1.75em;
        padding: 0 0.25em;
        background: $d11-blue;
      }
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
