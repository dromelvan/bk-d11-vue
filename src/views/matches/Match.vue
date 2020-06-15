<template>
  <div class="match" v-if="match">

    <background-picture :type="'stadium'" :id="19" :alt="match.stadiumName"/>

    <header-section>
      <header-navigation :link="{ name: 'matchDay', params: { id: match.matchDayId }}" :text="'Match Day ' + match.matchDayMatchDayNumber"/>

      <header-context class="match-context">
        <div class="datetime">{{ match.datetime | moment("dddd, MMMM Do YYYY") }}</div>
        <br v-if="xs"/>
        <v-icon v-if="smAndUp" class="stadium-icon">mdi-stadium</v-icon>
        <div class="stadium">{{ match.stadiumName }}, {{ match.stadiumCity }}</div>
        <div v-if="smAndUp" class="header-context-link-container">
          <a class="header-context-link whoscored-link" target="_blank" :href="'https://www.whoscored.com/Matches/' + match.whoScoredId + '/'">View on WhoScored</a>
        </div>
        <v-icon v-if="smAndUp" class="chevron-icon chevron-right-icon">mdi-chevron-right</v-icon>
      </header-context>

      <match-match-result-horizontal :match="match" v-if="smAndUp"/>

      <match-match-result-vertical :match="match" v-if="xs"/>

    </header-section>

    <content-section>
      <v-container class="player-match-stats-container">
        <v-tabs :grow="xs" class="player-match-stats-tabs">
          <v-tab class="player-match-stats-tab home">
            <team-image :version="'tiny'" :id="match.homeTeamId"/>
            <span v-if="smAndUp">{{ match.homeTeamName }} Stats</span>
            <span v-if="xs">{{ match.homeTeamShortName }}</span>
          </v-tab>
          <v-tab class="player-match-stats-tab away">
            <team-image :version="'tiny'" :id="match.awayTeamId"/>
            <span v-if="smAndUp">{{ match.awayTeamName }} Stats</span>
            <span v-if="xs">{{ match.awayTeamShortName }}</span>
          </v-tab>

          <v-tab-item v-for="teamId in [ match.homeTeamId, match.awayTeamId ]" :key="teamId">
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
  .stadium-icon {
    padding-left: 0.5em;
    padding-right: 0.25em;
  }

  .player-match-stats-container {
    padding: 0px;

    .player-match-stats-tab {
      .team-image {
        padding-right: $d11-spacer;
      }
    }
  }
</style>
