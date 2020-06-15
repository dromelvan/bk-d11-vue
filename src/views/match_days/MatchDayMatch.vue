<template>
  <div class="match-container">
    <v-lazy v-model="visible" :options="{ threshold: .5 }" transition="fade-transition">
      <v-list-item :ripple='false' :to="{ name: 'match', params: { id: matchId }}" link>
        <v-list-item-content v-if="match">
          <v-list-item-title class="match">
            <span class="teams">
              <team-image :version="'icon'" :id="match.homeTeamId"/>
              {{ match.homeTeamName }}
              <br>
              <team-image :version="'icon'" :id="match.awayTeamId"/>
              {{ match.awayTeamName }}
            </span>
            <span class="score">
                {{ match.homeTeamGoals }}<br>
                {{ match.awayTeamGoals }}
            </span>
            <span class="chevron">
                <v-icon>mdi-chevron-right</v-icon>
            </span>
          </v-list-item-title>
          <v-list-item-subtitle class="times">
            <span class="kickoff">
              Kick Off <span v-if="match.datetime">{{ match.datetime | moment("HH:mm")}}</span>
            </span>
            <span class="elapsed">
              {{ this.elapsedText(match.elapsed) }}
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-lazy>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MatchDayMatch',
  data: () => ({
    match: {},
    visible: false
  }),
  props: {
    matchId: Number
  },
  watch: {
    visible: function () {
      axios
        .get(this.endpoint('match', { id: this.matchId }))
        .then(response => (this.match = response.data))
    }
  }
}
</script>

<style lang="scss" scoped>
  .match-container {
    min-height: 84px;
    border-top: $d11-divider-border;

    .v-list-item {
      padding-left: 0px;
      padding-right: 0px;
    }

    .v-list-item__subtitle {
      padding-top: $spacer;
    }
  }

  .match-container:last-child {
      border-bottom: $d11-divider-border;
  }

  .match,
  .times {
    display: table;
    width: 100%;
  }

  .teams,
  .score,
  .chevron,
  .kickoff {
    display: table-cell;
  }

  .teams {
    width: 100%;
  }

  .score {
      padding-right: $spacer;
  }

  .chevron {
      vertical-align: middle;
  }

  .kickoff,
  .elapsed {
      display: table-cell;
      width: 50%;
  }

  .elapsed {
      text-align: right;
      padding-right: 24px;
  }

</style>
