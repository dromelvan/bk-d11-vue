<template>
  <v-lazy class="match-lazy" v-model="visible" :options="{ threshold: .5 }" transition="fade-transition">
    <v-list-item-title v-if="match" class="match">
      <div class="kickoff">
        Kick Off {{ match.datetime | moment("HH:mm")}}
      </div>
      <div class="team home">
        {{ match.homeTeam.name }}
      </div>
      <div class="image home">
        <d11-image :type="'team'" :version="'tiny'" :id="match.homeTeam.id"/>
      </div>
      <div class="score">
        <template v-if="this.pending(match.status)">vs</template>
        <template v-else>{{ match.homeTeamGoals }}-{{ match.awayTeamGoals }}</template>
      </div>
      <div class="image home">
        <d11-image :type="'team'" :version="'tiny'" :id="match.awayTeam.id"/>
      </div>
      <div class="team away">
        {{ match.awayTeam.name }}
      </div>
      <div class="elapsed">
        <v-progress-circular class="progress" v-if="this.active(match.status)" :rotate="-90" :size="35" :width="5" :value="this.elapsed(this.match.elapsed)" color="#061958">
          {{ match.elapsed }}
        </v-progress-circular>
        <template v-if="this.fullTime(match.status) || this.finished(match.status)">
          Full Time
        </template>
      </div>
    </v-list-item-title>
  </v-lazy>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MatchDayMatchEvents',
  data: () => ({
    match: null,
    visible: false
  }),
  props: {
    matchId: Number
  },
  watch: {
    visible: function () {
      axios
        .get(this.endpoint('matchEvents', { id: this.matchId }))
        .then(response => (this.match = response.data))
    }
  }
}
</script>

<style lang="scss" scoped>
  .match {
    .kickoff,
    .elapsed {
      min-width: 7em;
    }

    .kickoff {
      text-align: left;
    }

    .elapsed {
      text-align: right;
      .progress {
        font-size: 0.6em;
      }
    }

    .team {
      min-width: 13em;
    }
    .team.home {
      margin-left: auto;
      text-align: right;
    }

    .team.away {
      margin-right: auto;
      text-align: left;
    }

    .image {
      padding: 0 $d11-spacer;
    }

    .score {
      min-width: 2em;
    }
  }
</style>
