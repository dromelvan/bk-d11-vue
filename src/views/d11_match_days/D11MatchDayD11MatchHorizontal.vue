<template>
  <v-lazy class="d11-match" v-model="visible" :options="{ threshold: .5 }" transition="fade-transition">
    <div class="table-row" v-if="d11Match">
      <div class="remaining-players home">
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
      <div class="d11-team home">{{ d11Match.homeD11Team.name }}<d11-team-image :version="'tiny'" :id="d11Match.homeD11Team.id"/></div>
      <div v-if="!pending(d11Match.status)" class="points home">{{ d11Match.homeTeamPoints }} pts</div>
      <div v-if="!pending(d11Match.status)" class="goals home">{{ d11Match.homeTeamGoals }}</div>
      <div class="divider">
        <template v-if="!pending(d11Match.status)">-</template>
        <template v-else>vs</template>
      </div>
      <div v-if="!pending(d11Match.status)" class="goals away">{{ d11Match.awayTeamGoals }}</div>
      <div v-if="!pending(d11Match.status)" class="points away">{{ d11Match.awayTeamPoints }} pts</div>
      <div class="d11-team away"><d11-team-image :version="'tiny'" :id="d11Match.awayD11Team.id"/>{{ d11Match.awayD11Team.name }}</div>
      <div class="remaining-players away">
        <template v-if="d11Match.awayD11Team.id in d11Match.remainingPlayerCount">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{ d11Match.remainingPlayerCount[d11Match.awayD11Team.id] }} <v-icon medium class="context-icon">mdi-account-multiple</v-icon></span>
            </template>
            <span>{{ d11Match.remainingPlayerCount[d11Match.awayD11Team.id] }} {{ d11Match.remainingPlayerCount[d11Match.awayD11Team.id] | pluralize('player') }}  remaining.</span>
          </v-tooltip>
        </template>
        <template v-else>&nbsp;</template>
      </div>
    </div>
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
  components: {
    D11TeamImage: () => import('@/components/D11TeamImage')
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
  .d11-match {
    min-height: 3em;

    .table-row {
      min-height: 3em;
    }
    .remaining-players.home {
      text-align: left;
      margin-right: auto;
    }

    .remaining-players.away {
      text-align: right;
      margin-left: auto;
      //background: blue;
    }

    .d11-team {
      min-width: 10em;
      //background: red;
    }

    .d11-team-image {
      padding-left: $d11-spacer !important;
      padding-right: $d11-spacer !important;
    }

    .points {
      min-width: 3em;
    }
    .goals {
      font-weight: 600;
      min-width: 2em;
    }

    .divider {
      min-width: inherit;
    }

    .home {
      text-align: right;
    }

    .away {
      text-align: left;
    }
  }
</style>
