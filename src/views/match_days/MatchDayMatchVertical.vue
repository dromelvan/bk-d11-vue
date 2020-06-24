<template>
  <v-lazy class="match-lazy" v-model="visible" :options="{ threshold: .5 }" transition="fade-transition">
    <diV v-if="match" class="match">
      <v-list-item-title>
        <div class="teams">
          <div class="team home">
            <div class="image">
              <team-image :version="'icon'" :id="match.homeTeam.id"/>
            </div>
            <div class="name main-item">
              {{ match.homeTeam.name }}
            </div>
            <template v-if="!pending(match.status)">
              <div class="goals emphasised">
                {{ match.homeTeamGoals }}
              </div>
            </template>
            <template v-else>
              <div class="preview">
                Preview
              </div>
            </template>
          </div>
          <div class="team away">
            <div class="image">
              <team-image :version="'icon'" :id="match.awayTeam.id"/>
            </div>
            <div class="name main-item">
              {{ match.awayTeam.name }}
            </div>
            <template v-if="!pending(match.status)">
              <div class="goals emphasised">
                {{ match.awayTeamGoals }}
              </div>
            </template>
            <template v-else>
              <div class="preview">
                Preview
              </div>
            </template>
          </div>
        </div>
        <div>
          <v-icon medium class="chevron-icon chevron-right-icon">mdi-chevron-right</v-icon>
        </div>
      </v-list-item-title>
      <v-list-item-subtitle v-if="match" class="times">
        <div class="kickoff">
          Kick Off <template v-if="match.datetime">{{ match.datetime | moment("HH:mm")}}</template>
        </div>
        <div class="elapsed" v-if="!pending(match.status)">
          {{ this.elapsedText(match.elapsed) }}
        </div>
      </v-list-item-subtitle>
    </diV>
  </v-lazy>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MatchDayMatch',
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
        .get(this.endpoint('match', { id: this.matchId }))
        .then(response => (this.match = response.data))
    }
  }
}
</script>

<style lang="scss" scoped>
  .teams {
    padding: $d11-spacer 0;
    width: 100%;

    .team {
      display: flex;

      .image {
        display: flex;
        align-items: center;
        padding-right: $d11-spacer;
      }

      .goals {
        min-width: 1.5em;
        text-align: right;
      }
    }
  }

  .times {
    padding-bottom: $d11-spacer;
    display: flex;

    .kickoff {
      margin-right: auto;
    }

    .elapsed {
      padding-right: 24px;
    }
  }
</style>
