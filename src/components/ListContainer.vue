<template>
  <v-container class="list-container">
    <div class="list-container-header">
      <slot name="header"></slot>
    </div>
    <v-divider/>
    <v-list class="list-container-list" flat style="padding-top: 0">
      <slot></slot>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: 'ListContainer'
}
</script>

<style lang="scss">
  // Not scoping this in order to make it easier to use whereever we want.
  .list-container {
    padding-top: 0;

    .list-container-header {
      padding: $d11-spacer 0;
      line-height: 2.2em;
      font-weight: 600;
    }

    .v-list-item {
      padding: 0;
    }

    .v-list-item__content {
      padding: 0;

      .v-list-item__title {
        display: flex;
        line-height: unset;
        align-items: center;

        .main-item {
          margin-right: auto;
        }

        .after-main-item {
          margin-left: auto;
        }

        .emphasised {
          font-weight: 600;
        }
      }

      .v-list-item__title.vertical {
        display: unset;
      }

      .v-list-item__title > * {
        //min-width: 3.8em;
        text-align: center;
      }
    }

    .v-list-item__content > * {
      line-height: unset;
    }
  }
</style>
