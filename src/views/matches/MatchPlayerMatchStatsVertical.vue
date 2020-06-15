<template>
  <div class="player-match-stats">
    <v-container class="position-stats" v-for="position in Object.keys(playerMatchStats)" :key="position">
      <div class="player-stat-names">
        <div class="player-stat-name player">{{ position }}s</div>
        <div class="player-stat-name points">P.</div>
      </div>
      <v-divider/>

      <div v-for="playerMatchStat in playerMatchStats[position]" :key="playerMatchStat.id">
        <div class="player-stats" v-bind:class="{ 'man-of-the-match': playerMatchStat.manOfTheMatch || playerMatchStat.sharedManOfTheMatch }">
          <div class="player-stat substitute" v-if="playerMatchStat.lineup === 1">SUB</div>
          <div class="player-stat player">
            <template v-if="playerMatchStat.player.name.length < 22">{{ playerMatchStat.player.name }}</template>
            <template v-else>{{ playerMatchStat.player.shortName }}</template>
          </div>
          <div class="player-stat man-of-the-match" v-if="playerMatchStat.manOfTheMatch || playerMatchStat.sharedManOfTheMatch">
            MoM
          </div>
          <div class="player-stat unused-substitute" v-if="playerMatchStat.lineup === 1 && playerMatchStat.substitutionOnTime === 0">
            Unused Sub
          </div>
          <div v-else class="player-stat match-events">
            <substitution-on-icon v-if="playerMatchStat.substitutionOnTime > 0"/>
            <yellow-card-icon v-if="playerMatchStat.yellowCardTime > 0"/>
            <red-card-icon v-if="playerMatchStat.redCardTime > 0"/>
            <substitution-off-icon v-if="playerMatchStat.substitutionOffTime > 0"/>
          </div>
          <div class="player-stat points">
            <span>{{ playerMatchStat.points}}</span>
          </div>
        </div>
        <v-divider/>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'MatchPlayerMatchStatsVertical',
  props: {
    playerMatchStats: Object
  },
  components: {
    YellowCardIcon: () => import('@/components/match-events/YellowCardIcon'),
    RedCardIcon: () => import('@/components/match-events/RedCardIcon'),
    SubstitutionOnIcon: () => import('@/components/match-events/SubstitutionOnIcon'),
    SubstitutionOffIcon: () => import('@/components/match-events/SubstitutionOffIcon')
  }
}
</script>

<style lang="scss" scoped>
  .player-stat-names {
    font-weight: 600;
  }

  .player-stats {
    .points,
    .substitute {
      font-weight: 600;
    }
    .unused-substitute {
      opacity: 0.6;
    }
  }

  .player-stat-names,
  .player-stats {
    display: flex;

    .player-stat-name.player,
    .player-stat.player {
      margin-right: auto;
    }

    .player-stat {
      line-height: 2em;
    }

    .player-stat-name,
    .player-stat {
      padding: $d11-spacer;
    }

    .substitute {
      padding-right: 0px;
    }

    .points {
      width: 2em;
      text-align: right;
    }
  }

  .player-stats.man-of-the-match {
    background-color: $d11-blue;
    color: white;

    .player-stat.player {
        margin-right: unset;
        padding-right: 0px;
    }

    .player-stat.man-of-the-match {
      margin-right: auto;
      font-weight: 600;
    }
  }

</style>
