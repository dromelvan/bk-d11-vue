<template>
  <div class="player-match-stats">
    <list-container columns class="position-stats" v-for="position in Object.keys(playerMatchStats)" :key="position">
      <template v-slot:header>
        <div class="position main-item">{{ position }}s</div>
        <div class="points">P.</div>
      </template>

      <div v-for="playerMatchStat in playerMatchStats[position]" :key="playerMatchStat.id">
        <list-container-item :to="{ name: 'player', params: { id: playerMatchStat.player.id }}" v-bind:class="{ 'man-of-the-match': playerMatchStat.manOfTheMatch || playerMatchStat.sharedManOfTheMatch }">
          <v-list-item-title class="player-stats">
            <div class="substitute" v-if="playerMatchStat.lineup === 1">SUB</div>
            <div class="player" v-bind:class="{ 'main-item': !playerMatchStat.manOfTheMatch && !playerMatchStat.sharedManOfTheMatch }">
              <template v-if="playerMatchStat.player.name.length < 22">{{ playerMatchStat.player.name }}</template>
              <template v-else>{{ playerMatchStat.player.shortName }}</template>
            </div>
            <div class="man-of-the-match main-item" v-if="playerMatchStat.manOfTheMatch || playerMatchStat.sharedManOfTheMatch">
              MoM
            </div>

            <div class="match-not-played" v-if="pending(playerMatchStat.match.status)">
              K/O {{ playerMatchStat.match.datetime | moment("DD.MM YYYY HH:mm") }}
            </div>
            <div class="did-not-participate" v-else-if="playerMatchStat.lineup === 0">
              Did not participate
            </div>
            <div class="unused-substitute" v-else-if="playerMatchStat.lineup === 1 && playerMatchStat.substitutionOnTime === 0">
              Unused Sub
            </div>

            <div v-else class="match-events">
              <template v-if="playerMatchStat.substitutionOnTime > 0">
                <substitution-on-icon/> {{ playerMatchStat.substitutionOnTime }}'
              </template>
              <template v-if="playerMatchStat.yellowCardTime > 0">
                <yellow-card-icon/>{{ playerMatchStat.yellowCardTime }}'
              </template>
              <template v-if="playerMatchStat.redCardTime > 0">
                <red-card-icon/>{{ playerMatchStat.redCardTime }}'
              </template>
              <template v-if="playerMatchStat.substitutionOffTime > 0">
                <substitution-off-icon/> {{ playerMatchStat.substitutionOffTime }}'
              </template>
            </div>
            <div class="points">
              <template v-if="!pending(playerMatchStat.match.status)">
                {{ playerMatchStat.points}}
              </template>
            </div>

          </v-list-item-title>
        </list-container-item>
        <v-divider/>
      </div>

    </list-container>
  </div>
</template>

<script>
export default {
  name: 'PlayerMatchStatsVertical',
  props: {
    playerMatchStats: Object
  },
  components: {
    ListContainer: () => import('@/components/ListContainer'),
    ListContainerItem: () => import('@/components/ListContainerItem'),
    YellowCardIcon: () => import('@/components/match-events/YellowCardIcon'),
    RedCardIcon: () => import('@/components/match-events/RedCardIcon'),
    SubstitutionOnIcon: () => import('@/components/match-events/SubstitutionOnIcon'),
    SubstitutionOffIcon: () => import('@/components/match-events/SubstitutionOffIcon')
  }
}
</script>

<style lang="scss" scoped>
  .player-match-stats {
    .v-list-item {
      .points,
      .substitute {
        font-weight: 600;
      }

      .substitute {
        padding-right: $d11-spacer;
      }

      .match-not-played,
      .did-not-participate,
      .unused-substitute {
        opacity: 0.6;
      }

      .match-not-played,
      .did-not-participate,
      .unused-substitute,
      .match-events {
        margin-right: $d11-spacer;
      }
    }

    .v-list-item.man-of-the-match {
      background-color: $d11-blue;
      color: white;

      .man-of-the-match {
        padding-left: $d11-spacer;
        font-weight: 600;
      }
    }
  }

</style>
