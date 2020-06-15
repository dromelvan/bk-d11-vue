<template>
  <v-lazy v-model="visible" :options="{ threshold: .5 }" min-height="200" transition="fade-transition">

    <v-skeleton-loader v-if="!season" height="394" type="list-item-two-line"/>

    <div v-else>
      <h2>{{ season.name }}</h2>
      <p>TODO</p>
   </div>

  </v-lazy>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Season',
  data: () => ({
    season: null,
    visible: false,
    transition: 'scale-transition'
  }),
  props: {
    seasonId: Number
  },
  watch: {
    visible: function () {
      axios
        .get(this.endpoint('season', { id: this.seasonId }))
        .then(response => (this.season = response.data))
    }
  }
}
</script>
