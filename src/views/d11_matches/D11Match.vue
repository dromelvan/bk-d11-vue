<template>
  <div class="d11-match" v-if="d11Match">
    <background-picture :type="'stadium'" :id="19" alt="TODO"/>

    <header-section>
      <header-navigation :link="{ name: 'd11MatchDay', params: { id: d11Match.d11MatchDay.id }}" :text="'D11 Match Day ' + d11Match.d11MatchDay.matchDayNumber"/>

      <header-context class="d11-match-context">
        <template v-if="smAndUp">
          <div class="date">{{ d11Match.date | moment("dddd, MMMM Do YYYY") }}</div>
          <v-icon medium class="context-icon">mdi-account-multiple</v-icon>
        </template>
        <div class="players-remaining">13 players remaining</div>

      </header-context>

      <header-spacer/>

      <d11-match-match-result-horizontal :d11Match="d11Match" v-if="smAndUp"/>
      <d11-match-match-result-vertical :d11Match="d11Match" v-if="xs"/>

    </header-section>

    <content-section>
      <v-container class="player-match-stats-container" v-if="playerMatchStats">
        <v-tabs :grow="xs" class="player-match-stats-tabs">
          <v-tab class="player-match-stats-tab">
            <d11-team-image :version="'tiny'" :id="d11Match.homeD11Team.id"/>
            <span v-if="smAndUp">{{ d11Match.homeD11Team.name }} Stats</span>
            <span v-if="xs">{{ d11Match.homeD11Team.shortName }}</span>
          </v-tab>
          <v-tab class="player-match-stats-tab">
            <d11-team-image :version="'tiny'" :id="d11Match.awayD11Team.id"/>
            <span v-if="smAndUp">{{ d11Match.awayD11Team.name }} Stats</span>
            <span v-if="xs">{{ d11Match.awayD11Team.shortName }}</span>
          </v-tab>

          <v-tab-item v-for="d11TeamId in [ d11Match.homeD11Team.id, d11Match.awayD11Team.id ]" :key="d11TeamId">
            <player-match-stats-by-position v-if="smAndUp" :view="'d11Match'" :playerMatchStats="playerMatchStats[d11TeamId]"/>
          </v-tab-item>
        </v-tabs>
      </v-container>
    </content-section>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'D11Match',
  data: () => ({
    d11Match: null,
    playerMatchStats: null
  }),
  components: {
    D11MatchMatchResultHorizontal: () => import('@/views/d11_matches/D11MatchMatchResultHorizontal'),
    D11MatchMatchResultVertical: () => import('@/views/d11_matches/D11MatchMatchResultVertical'),
    PlayerMatchStatsByPosition: () => import('@/views/player_match_stats/PlayerMatchStatsByPosition')
  },
  mounted () {
    axios
      .get(this.endpoint('d11Match', { id: this.$route.params.id }))
      .then(response => (this.d11Match = response.data))
  },
  watch: {
    d11Match: function (d11Match) {
      axios
        .get(this.endpoint('playerMatchStatsByD11MatchId', { id: d11Match.id }))
        .then(response => (this.playerMatchStats = response.data))
    }
  }
}
</script>

<style lang="scss" scoped>
  .player-match-stats-container {
    padding: 0px;

    .player-match-stats-tab {
      .d11-team-image {
        padding-right: $d11-spacer;
      }
    }
  }
</style>
