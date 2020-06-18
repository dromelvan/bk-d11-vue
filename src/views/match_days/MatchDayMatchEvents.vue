<template>
  <v-expansion-panel class="match-events">
    <v-divider/>

    <v-expansion-panel-header class="match-events-header">
      <v-lazy v-model="visible" :options="{ threshold: .5 }" transition="fade-transition">
        <div class="match-events" v-if="match">
          <span class="kickoff">
            Kick Off {{ match.datetime | moment("HH:mm")}}
          </span>
          <span class="team home">
            {{ match.homeTeam.name }}
            <d11-image :type="'team'" :version="'tiny'" :id="match.homeTeam.id"/>
          </span>
          <span class="score">
            <span v-if="this.pending(match.status)">
              vs
            </span>
            <span v-else>
              {{ match.homeTeamGoals }}-{{ match.awayTeamGoals }}
            </span>
          </span>
          <span class="team away">
            <d11-image :type="'team'" :version="'tiny'" :id="match.awayTeam.id"/>
            {{ match.awayTeam.name }}
          </span>
          <span class="elapsed">
            <v-progress-circular class="progress" v-if="this.active(match.status)" :rotate="-90" :size="35" :width="5" :value="this.elapsed(this.match.elapsed)" color="#061958">
              {{ match.elapsed }}
            </v-progress-circular>
            <span v-if="this.finished(match.status)">
              Full Time
            </span>
          </span>
        </div>
      </v-lazy>
    </v-expansion-panel-header>

    <v-expansion-panel-content class="match-events-content">
      <div v-if="match">
        <div class="match-events" v-if="!this.pending(match.status)">
          <span class="stadium"> {{ match.stadium.namee }}</span>
          <span class="events home">
            <div class="events-container" v-if="match.matchEvents[match.homeTeam.id].goals.length">
              <h4>Goals</h4>
              <ol class="goals">
                <li class="goal" v-for="goal in match.matchEvents[match.homeTeam.id].goals" :key="goal.id">
                  {{ goal.player.name }} ({{ goal.time }})
                  <goal-image :goal="goal"/>
                </li>
              </ol>
            </div>
            <div class="events-container" v-if="match.matchEvents[match.homeTeam.id].cards.length">
              <h4>Cards</h4>
              <ol class="cards">
                <li class="card" v-for="card in match.matchEvents[match.homeTeam.id].cards" :key="card.id">
                  {{ card.player.name }} ({{ card.time }})
                  <card-image :card="card"/>
                </li>
              </ol>
            </div>
            <div class="events-container" v-if="match.matchEvents[match.homeTeam.id].substitutions.length">
              <h4>Subsitutions</h4>
              <ol class="subsitutions">
                <li class="subsitutions" v-for="substitution in match.matchEvents[match.homeTeam.id].substitutions" :key="substitution.id">
                  {{ substitution.player.name }} ({{ substitution.time }}) <substitution-image :substitution="substitution" :playerOut="true"/><br>
                  {{ substitution.playerInName }} ({{ substitution.time }}) <substitution-image :substitution="substitution" :playerOut="false"/>
                </li>
              </ol>
            </div>
          </span>
          <span class="score">
            &nbsp;
          </span>
          <span class="events away">
            <div class="events-container" v-if="match.matchEvents[match.awayTeam.id].goals.length">
              <h4>Goals</h4>
              <ol>
                <li v-for="goal in match.matchEvents[match.awayTeam.id].goals" :key="goal.id">
                  <goal-image :goal="goal"/>
                  ({{ goal.time }}) {{ goal.player.name }}
                </li>
              </ol>
            </div>
            <div class="events-container" v-if="match.matchEvents[match.awayTeam.id].cards.length">
              <h4>Cards</h4>
              <ol class="cards">
                <li class="card" v-for="card in match.matchEvents[match.awayTeam.id].cards" :key="card.id">
                  <card-image :card="card"/>
                  {{ card.player.name }} ({{ card.time }})
                </li>
              </ol>
            </div>
            <div class="events-container" v-if="match.matchEvents[match.awayTeam.id].substitutions.length">
              <h4>Subsitutions</h4>
              <ol class="subsitutions">
                <li class="subsitutions" v-for="substitution in match.matchEvents[match.awayTeam.id].substitutions" :key="substitution.id">
                  <substitution-image :substitution="substitution" :playerOut="true"/>{{ substitution.player.name }} ({{ substitution.time }})<br>
                  <substitution-image :substitution="substitution" :playerOut="false"/>{{ substitution.playerInName }} ({{ substitution.time }})
                </li>
              </ol>
            </div>
          </span>
          <span class="match-stats">
            <v-btn :to="{ name: 'match', params: { id: match.id }}" link>Match Stats</v-btn>
          </span>
        </div>

        <div class="match-preview" v-else>
          Preview
        </div>

      </div>

    </v-expansion-panel-content>
  </v-expansion-panel>
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
  components: {
    GoalImage: () => import('@/components/GoalImage'),
    CardImage: () => import('@/components/CardImage'),
    SubstitutionImage: () => import('@/components/SubstitutionImage')
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
  .match-events {
    display: table;
    width: 100%;
  }

  .match-events-header {
    min-height: 70px
  }

  .match-events-content {
    padding-right: 24px;
  }

  .kickoff,
  .stadium,
  .team,
  .score,
  .elapsed,
  .events,
  .match-stats {
    display: table-cell;
  }

  .score {
    text-align: center;
  }

  .team.home,
  .events.home {
    text-align: right;
  }

  .team.away,
  .events.away {
    text-align: left;
  }

  .elapsed {
    .progress {
      font-size: 10px;
    }
    text-align: right;
    padding-right: 15px;
  }

  .events {
    .events-container {
      padding-top: $spacer;
    }

    .events-container:first-child {
      padding-top: 0px;
    }

    ol {
      padding: 0px;
      list-style: none;
    }
  }

  .match-stats {
    text-align: right;
    position: relative;
    .v-btn {
      position: absolute;
      right: -24px;
    }
  }

  .kickoff,
  .stadium {
    width: 17%;
  }

  .team,
  .events {
    width: 33%;
  }

  .score {
    width: 4%;
  }

  .elapsed,
  .match-stats {
    width: 13%;
  }

</style>

<style lang="scss">
  // TODO: Find out why this doesn't work in a scoped style.
  .match-events {
    .narrow {
      .v-expansion-panel-header__icon {
        display: none;
      }
    }
  }
 </style>
