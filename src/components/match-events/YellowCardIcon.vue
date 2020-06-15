<template>
  <v-icon class="card-icon yellow-card-icon"/>
</template>

<style lang="scss" scoped>
  .card-icon.yellow-card-icon {
    height: $d11-match-even-icon-width;
    width: $d11-match-even-icon-height;
    background: url('~@/assets/images/MatchEventSprites.png') ($d11-match-even-icon-height * 2) * -1 0;
  }
</style>
