<template>
  <v-icon class="mom-icon shared-mom-icon"/>
</template>

<style lang="scss" scoped>
  .mom-icon.shared-mom-icon {
    height: $d11-match-even-icon-width;
    width: $d11-match-even-icon-height;
    background: url('~@/assets/images/MatchEventSprites.png') ($d11-match-even-icon-height * 3) * -1 $d11-match-even-icon-height * -1;
  }
</style>
