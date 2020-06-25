<template>
  <v-lazy class="d11-match-lazy" v-model="visible" :options="{ threshold: .5 }" transition="fade-transition">
    <v-list-item-title v-if="d11Match" class="d11-match">
      <div class="remaining-players home main-item">
        <template v-if="d11Match.homeD11Team.id in d11Match.remainingPlayerCount">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on"><v-icon medium class="context-icon">mdi-account-multiple</v-icon> {{ d11Match.remainingPlayerCount[d11Match.homeD11Team.id] }}</span>
            </template>
            <span>{{ d11Match.remainingPlayerCount[d11Match.homeD11Team.id] }} {{ d11Match.remainingPlayerCount[d11Match.homeD11Team.id] | pluralize('player') }}  remaining.</span>
          </v-tooltip>
        </template>
        <template v-else>&nbsp;</template>
      </div>
      <div class="d11-team home">{{ d11Match.homeD11Team.name }}</div>
      <div class="d11-team-image home">
        <d11-team-image :version="'tiny'" :id="d11Match.homeD11Team.id"/>
      </div>
      <div v-if="!pending(d11Match.status)" class="points home">{{ d11Match.homeTeamPoints }} pts</div>
      <div v-if="!pending(d11Match.status)" class="goals home emphasised">{{ d11Match.homeTeamGoals }}</div>
      <div class="divider" v-bind:class="{ 'pending': pending(d11Match.status) }">
        <template v-if="!pending(d11Match.status)">-</template>
        <template v-else>vs</template>
      </div>
      <div v-if="!pending(d11Match.status)" class="goals away emphasised">{{ d11Match.awayTeamGoals }}</div>
      <div v-if="!pending(d11Match.status)" class="points away">{{ d11Match.awayTeamPoints }} pts</div>
      <div class="d11-team-image away">
        <d11-team-image :version="'tiny'" :id="d11Match.awayD11Team.id"/>
      </div>
      <div class="d11-team away">{{ d11Match.awayD11Team.name }}</div>
      <div class="remaining-players away after-main-item">
        <template v-if="d11Match.awayD11Team.id in d11Match.remainingPlayerCount">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{ d11Match.remainingPlayerCount[d11Match.awayD11Team.id] }} <v-icon medium class="context-icon">mdi-account-multiple</v-icon></span>
            </template>
            <span>{{ d11Match.remainingPlayerCount[d11Match.awayD11Team.id] }} {{ d11Match.remainingPlayerCount[d11Match.awayD11Team.id] | pluralize('player') }}  remaining.</span>
          </v-tooltip>
        </template>
      </div>
    </v-list-item-title>
  </v-lazy>
</template>

<script>
import axios from 'axios'

export default {
  name: 'D11MatchDayD11MatchHorizontal',
  data: () => ({
    d11Match: null,
    visible: false
  }),
  props: {
    d11MatchId: Number
  },
  watch: {
    visible: function () {
      axios
        .get(this.endpoint('d11Match', { id: this.d11MatchId }))
        .then(response => (this.d11Match = response.data))
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-container {
    .d11-match {
      .remaining-players {
        min-width: 4em;
      }

      .remaining-players.home {
        text-align: left;
      }

      .remaining-players.away {
        text-align: right;
      }

      .d11-team {
        min-width: 10em;
      }

      .d11-team {
        padding-right: $d11-spacer;
        padding-left: $d11-spacer;
      }

      .d11-team-image {
        min-width: 32px
      }

      .points {
        min-width: 3em;
      }
      .goals {
        min-width: 1.5em;
      }

      .divider {
        min-width: inherit;
      }

      .divider.pending {
        min-width: 3em;
      }

      .home {
        text-align: right;
      }

      .away {
        text-align: left;
      }
    }
  }

</style>
