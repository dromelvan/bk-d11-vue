<template>
  <!-- <img style="vertical-align: middle" :src="`${baseURL}images/${type}/${version}/${id}.${fileType}`"> -->
  <d11-image class="team-image" :type="'team'" :version="version" :id="id"/>
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
  .team-image {
    padding-right: $d11-spacer;
  }

  :not(.vertical) {
    .away {
      .team-image {
        padding-left: $d11-spacer;
        padding-right: inherit;
      }
    }
  }

  .vertical {
    .away {
      .team-image {
        padding-left: 0;
        padding-right: $d11-spacer;
      }
    }
  }

</style>
