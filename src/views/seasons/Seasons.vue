<template>
  <v-container>
    <h1>Season History</h1>

    <p>Winners and runners up of the current and previous seasons.</p>

    <Season v-for="seasonId in seasonIds" :key="seasonId" :seasonId="seasonId"/>

  </v-container>
</template>

<script>
import axios from 'axios'
import Season from './Season'

export default {
  name: 'Seasons',
  data: () => ({
    seasonIds: null
  }),
  components: {
    Season
  },
  mounted () {
    axios
      .get(this.endpoint('seasonIds'))
      .then(response => (this.seasonIds = response.data))
  }
}
</script>
