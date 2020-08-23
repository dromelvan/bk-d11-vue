<template>
  <div class="player-match-stats">
    <list-container columns class="position-stats" v-for="position in Object.keys(playerMatchStats)" :key="position">
      <template v-slot:header>
        <player-match-stat-header :position="position" :view="view"/>
      </template>

      <div v-for="playerMatchStat in playerMatchStats[position]" :key="playerMatchStat.id">
        <player-match-stat :view="view" :playerMatchStat="playerMatchStat"/>
        <v-divider/>
      </div>
    </list-container>
    <v-container class="total-points" v-if="view === 'd11Match'">
      Total: {{ totalPoints }}
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'PlayerMatchStatsByPosition',
  props: {
    playerMatchStats: Object,
    view: String
  },
  components: {
    ListContainer: () => import('@/components/ListContainer'),
    PlayerMatchStatHeader: () => import('@/views/player_match_stats/PlayerMatchStatHeader'),
    PlayerMatchStat: () => import('@/views/player_match_stats/PlayerMatchStat')
  },
  methods: {
    participated: function (playerMatchStat) {
      return playerMatchStat.lineup === 2 || playerMatchStat.substitutionOnTime > 0
    }
  },
  computed: {
    totalPoints: function () {
      var points = 0
      for (var position in this.playerMatchStats) {
        this.playerMatchStats[position].forEach(element => {
          points += element.points
        })
      }
      return points
    }
  }
}

</script>

<style lang="scss">
  .list-container-header > div {
    padding: 0 $d11-spacer;
  }

  .player-match-stats {
    .total-points {
      text-align: right;
      font-weight: 600;
      padding-top: 0;
      padding-right: $d11-spacer * 3;
    }
  }

</style>
