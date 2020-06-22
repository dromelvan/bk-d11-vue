<template>
  <v-container class="table-container">
    <div class="table-header-container">
      <slot name="header"></slot>
    </div>
    <v-divider/>
    <div class="table-rows-container">
      <slot></slot>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'TableContainer'
}
</script>

<style lang="scss">
  // Not scoping this in order to make it easier to use whereever we want.
  .table-container {
    padding-top: 0;
  }

  .table-header-container,
  .table-row {
    display: flex;
    padding: $d11-spacer 0;
    line-height: 2.2em;
    align-items: center;

    .main-column {
      margin-right: auto;
    }
    .after-main-column {
      margin-left: auto;
    }

    .emphasised {
      font-weight: 600;
    }
  }

  .table-header-container {
    font-weight: 600;
  }

  .table-header-container > div,
  .table-row > div {
    min-width: 3.8em;
    text-align: center;
  }

  .table-row.vertical {
    flex-direction: column;
    align-items: flex-start;
  }

</style>
