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

<style lang="scss" scoped>

  .table-header-container,
  .table-row {
    display: flex;
    padding: $d11-spacer 0;
    line-height: 2.2em;

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
</style>
