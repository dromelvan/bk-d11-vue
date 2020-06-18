<template>
  <div class="match" v-if="match">

    <background-picture :type="'stadium'" :id="19" :alt="match.stadium.name"/>

    <header-section>
      <header-navigation :link="{ name: 'matchDay', params: { id: match.matchDay.id }}" :text="'Match Day ' + match.matchDay.matchDayNumber"/>

      <header-context class="match-context">
        <div class="datetime">{{ match.datetime | moment("dddd, MMMM Do YYYY") }}</div>
        <br v-if="xs"/>
        <v-icon v-if="smAndUp" medium class="context-icon">mdi-stadium</v-icon>
        <div class="stadium">{{ match.stadium.name }}, {{ match.stadium.city }}</div>
        <div v-if="smAndUp" class="header-context-link-container">
          <a class="header-context-link whoscored-link" target="_blank" :href="'https://www.whoscored.com/Matches/' + match.whoScoredId + '/'">View on WhoScored</a>
        </div>
        <v-icon medium v-if="smAndUp">mdi-chevron-right</v-icon>
      </header-context>

      <match-match-result-horizontal :match="match" v-if="smAndUp"/>

      <match-match-result-vertical :match="match" v-if="xs"/>

    </header-section>

    <content-section>
      <v-container class="player-match-stats-container">
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
            <match-player-match-stats-horizontal v-if="smAndUp" :playerMatchStats="match.playerMatchStats[teamId]"/>
            <match-player-match-stats-vertical v-if="xs" :playerMatchStats="match.playerMatchStats[teamId]"/>
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
    match: null
  }),
  components: {
    HeaderSection: () => import('@/components/header/HeaderSection'),
    BackgroundPicture: () => import('@/components/header/BackgroundPicture'),
    HeaderNavigation: () => import('@/components/header/HeaderNavigation'),
    HeaderContext: () => import('@/components/header/HeaderContext'),
    MatchMatchResultHorizontal: () => import('@/views/matches/MatchMatchResultHorizontal'),
    MatchMatchResultVertical: () => import('@/views/matches/MatchMatchResultVertical'),
    ContentSection: () => import('@/components/ContentSection'),
    MatchPlayerMatchStatsHorizontal: () => import('@/views/matches/MatchPlayerMatchStatsHorizontal'),
    MatchPlayerMatchStatsVertical: () => import('@/views/matches/MatchPlayerMatchStatsVertical')
  },
  mounted () {
    axios
      .get(this.endpoint('matchStats', { id: this.$route.params.id }))
      .then(response => (this.match = response.data))
  }
}
</script>

<style lang="scss" scoped>
  .player-match-stats-container {
    padding: 0px;
  }
</style>
