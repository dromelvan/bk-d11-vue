<template>
  <v-container>
    <div class="previous-next-header">
      <v-btn icon :to="previous" class="previous-btn"><v-icon>mdi-chevron-left</v-icon></v-btn>
      <h3>{{ text }}</h3>
      <v-btn icon :to="next" class="next-btn"><v-icon>mdi-chevron-right</v-icon></v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'PreviousNextHeader',
  props: {
    previous: Object,
    next: Object,
    text: String
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding-left: 3px;
    padding-right: 3px;
  }

  .previous-next-header {
    display: flex;
    min-height: 36px;
    justify-content: center;
    position: relative;

    h3 {
      text-align: center;
      line-height: 36px;
    }

    .previous-btn {
        left: 0;
    }

    .next-btn {
        right: 0;
    }

    .previous-btn,
    .next-btn {
      position: absolute;
      .v-icon {
        font-size: 40px;
      }
    }

    // Get rid of the lingering grey background that sometimes appears.
    .v-btn::before {
      background-color: white;
    }
  }
</style>
