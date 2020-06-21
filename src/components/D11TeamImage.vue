<template>
  <d11-image class="d11-team-image" :type="'d11-team'" :version="version" :id="id"/>
</template>

<script>
export default {
  data: () => ({
    baseURL: process.env.BASE_URL
  }),
  props: {
    version: {
      type: String,
      default: 'default'
    },
    id: Number
  }
}
</script>

<style lang="scss" scoped>
  .d11-team-image {
    padding-right: $d11-spacer;
  }

  :not(.vertical) {
    .away {
      .d11-team-image {
        padding-left: $d11-spacer;
        padding-right: inherit;
      }
    }
  }

  .vertical {
    .away {
      .d11-team-image {
        padding-left: 0;
        padding-right: $d11-spacer;
      }
    }
  }

</style>
