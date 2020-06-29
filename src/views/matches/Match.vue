<template>
  <div class="match" v-if="match">

    <background-picture :type="'stadium'" :id="19" :alt="match.stadium.name"/>

    <header-section>
      <header-navigation :link="{ name: 'matchDay', params: { id: match.matchDay.id }}" :text="'Match Day ' + match.matchDay.matchDayNumber"/>

      <header-context v-if="smAndUp" class="match-context">
        <div class="datetime">{{ match.datetime | moment("dddd, MMMM Do YYYY") }}</div>
        <v-icon medium class="context-icon">mdi-stadium</v-icon>
        <div class="stadium">{{ match.stadium.name }}, {{ match.stadium.city }}</div>
        <div class="header-context-link-container">
          <a class="header-context-link whoscored-link" target="_blank" :href="'https://www.whoscored.com/Matches/' + match.whoScoredId + '/'">View on WhoScored</a>
        </div>
        <v-icon medium>mdi-chevron-right</v-icon>
      </header-context>

      <header-context v-if="xs" class="match-context">
        <div class="datetime">{{ match.datetime | moment("ddd, D.M YYYY") }}</div>
        <div class="header-context-link-container">
          <a class="header-context-link whoscored-link" target="_blank" :href="'https://www.whoscored.com/Matches/' + match.whoScoredId + '/'">View on WhoScored</a>
        </div>
        <v-icon medium>mdi-chevron-right</v-icon>
      </header-context>

      <match-match-result-horizontal :match="match" v-if="smAndUp"/>

      <match-match-result-vertical :match="match" v-if="xs"/>

    </header-section>

    <content-section>
      <v-container class="player-match-stats-container" v-if="playerMatchStats">
        <v-tabs :grow="xs" class="player-match-stats-tabs">
          <v-tab class="player-match-stats-tab">
            <team-image :version="'tiny'" :id="match.homeTeam.id"/>
            <span v-if="smAndUp">{{ match.homeTeam.name }} Stats</span>
            <span v-if="xs">{{ match.homeTeam.shortName }}</span>
          </v-tab>
          <v-tab class="player-match-stats-tab">
            <team-image :version="'tiny'" :id="match.awayTeam.id"/>
            <span v-if="smAndUp">{{ match.awayTeam.name }} Stats</span>
            <span v-if="xs">{{ match.awayTeam.shortName }}</span>
          </v-tab>

          <v-tab-item v-for="teamId in [ match.homeTeam.id, match.awayTeam.id ]" :key="teamId">
            <match-player-match-stats-horizontal v-if="smAndUp" :playerMatchStats="playerMatchStats[teamId]"/>
            <match-player-match-stats-vertical v-if="xs" :playerMatchStats="playerMatchStats[teamId]"/>
          </v-tab-item>
        </v-tabs>
      </v-container>
    </content-section>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Match',
  data: () => ({
    match: null,
    playerMatchStats: null
  }),
  components: {
    MatchMatchResultHorizontal: () => import('@/views/matches/MatchMatchResultHorizontal'),
    MatchMatchResultVertical: () => import('@/views/matches/MatchMatchResultVertical'),
    MatchPlayerMatchStatsHorizontal: () => import('@/views/matches/MatchPlayerMatchStatsHorizontal'),
    MatchPlayerMatchStatsVertical: () => import('@/views/matches/MatchPlayerMatchStatsVertical')
  },
  mounted () {
    axios
      .get(this.endpoint('matchEvents', { id: this.$route.params.id }))
      .then(response => (this.match = response.data))
  },
  watch: {
    match: function (match) {
      axios
        .get(this.endpoint('playerMatchStatsByMatchId', { id: match.id }))
        .then(response => (this.playerMatchStats = response.data))
    }
  }
}
</script>

<style lang="scss" scoped>
  .player-match-stats-container {
    padding: 0px;

    .player-match-stats-tab {
      .team-image {
        padding-right: $d11-spacer;
      }
    }
  }
</style>
