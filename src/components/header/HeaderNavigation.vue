<template>
  <div class="header-navigation">
    <v-container v-if="smAndUp">
      <router-link :to="link">
        <v-icon>mdi-chevron-left</v-icon><span>{{ text }}</span>
      </router-link>
    </v-container>
    <router-link :to="link" v-if="xs">
      <v-container>
        <v-icon>mdi-chevron-left</v-icon><span>{{ text }}</span>
      </v-container>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HeaderNavigation',
  props: {
    link: Object,
    text: String
  }
}
</script>

<style lang="scss" scoped>
  .header-navigation {
    background: rgba(0,0,0,.7);

    span {
      vertical-align: middle;
      font-size: 22px;
      font-weight: 700;
    }

    .v-icon {
      font-size: 1.8em;
      color: white;
    }

    a {
      color: white;
      text-decoration: none;
    }
  }
</style>
