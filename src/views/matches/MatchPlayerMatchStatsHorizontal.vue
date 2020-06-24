<template>
  <div class="player-match-stats">
    <list-container narrowHeader class="position-stats" v-for="position in Object.keys(playerMatchStats)" :key="position">
      <template v-slot:header>
        <div class="position">{{ position }}s</div>
        <div class="goals after-main-item">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Goals</span>
            </template>
            <span>Goals scored</span>
          </v-tooltip>
        </div>
        <div class="own-goals">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">OGs</span>
            </template>
            <span>Own goals scored</span>
          </v-tooltip>
        </div>
        <div class="goal-assists">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Ass.</span>
            </template>
            <span>Goal assists</span>
          </v-tooltip>
        </div>
        <div class="goals-conceded">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Con.</span>
            </template>
            <span>Goals conceded (defenders only)</span>
          </v-tooltip>
        </div>
        <div class="cards">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Cards</span>
            </template>
            <span>Yellow and red cards</span>
          </v-tooltip>
        </div>
        <div class="substitutions">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Subs</span>
            </template>
            <span>Substitutions on and/or off</span>
          </v-tooltip>
        </div>
        <div class="rating">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Rating</span>
            </template>
            <span>WhoScored player rating</span>
          </v-tooltip>
        </div>
        <div class="points">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" v-if="lgAndUp">Points</span>
              <span v-bind="attrs" v-on="on" v-else>Pts</span>
            </template>
            <span>D11 points scored</span>
          </v-tooltip>
        </div>
        <div class="d11-team">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" v-if="mdAndUp">D11 Team</span>
              <span v-bind="attrs" v-on="on" v-else>D11</span>
            </template>
            <span>Player D11 team for this match</span>
          </v-tooltip>
        </div>
      </template>
      <div v-for="playerMatchStat in playerMatchStats[position]" :key="playerMatchStat.id">
        <list-container-item :to="{ name: 'player', params: { id: playerMatchStat.player.id }}" v-bind:class="{ 'man-of-the-match': playerMatchStat.manOfTheMatch || playerMatchStat.sharedManOfTheMatch }">
          <v-list-item-title class="player-stats">
            <div class="image">
              <player-image :version="'tiny'" :id="playerMatchStat.player.id"/>
            </div>
            <div class="player">
              <span class="substitute" v-if="playerMatchStat.lineup === 1">SUB </span>
              {{ playerMatchStat.player.name }}
            </div>

            <div class="man-of-the-match" v-if="playerMatchStat.manOfTheMatch || playerMatchStat.sharedManOfTheMatch">
              <span v-if="mdAndUp">Man of the Match</span>
              <span v-if="smAndDown">MoM</span>
            </div>

            <div class="goals after-main-item" v-if="!unusedSubstitute(playerMatchStat)">
              <template v-if="playerMatchStat.goals > 0">{{ playerMatchStat.goals}}</template><template v-else>&nbsp;</template>
            </div>
            <div class="own-goals" v-if="!unusedSubstitute(playerMatchStat)">
              <template v-if="playerMatchStat.ownGoals > 0">{{ playerMatchStat.ownGoals}}</template><template v-else>&nbsp;</template>
            </div>
            <div class="goal-assists" v-if="!unusedSubstitute(playerMatchStat)">
              <template v-if="playerMatchStat.goalAssists > 0">{{ playerMatchStat.goalAssists}}</template><template v-else>&nbsp;</template>
            </div>
            <div class="goals-conceded" v-if="!unusedSubstitute(playerMatchStat)">
              <template v-if="playerMatchStat.position.defender">{{ playerMatchStat.goalsConceded}}</template><template v-else>&nbsp;</template>
            </div>

            <div class="cards" v-if="!unusedSubstitute(playerMatchStat)">
              <yellow-card-icon v-if="playerMatchStat.yellowCardTime > 0"/>
              <template v-if="playerMatchStat.yellowCardTime > 0">{{ playerMatchStat.yellowCardTime }}'</template>
              <br v-if="playerMatchStat.yellowCardTime > 0 && playerMatchStat.redCardTime > 0">
              <red-card-icon v-if="playerMatchStat.redCardTime > 0"/>
              <template v-if="playerMatchStat.redCardTime > 0">{{ playerMatchStat.redCardTime }}'</template>
            </div>

            <div class="substitutions" v-if="!unusedSubstitute(playerMatchStat)">
              <substitution-on-icon v-if="playerMatchStat.substitutionOnTime > 0"/>
              <template v-if="playerMatchStat.substitutionOnTime > 0">
                {{ playerMatchStat.substitutionOnTime }}'
              </template>
              <br v-if="playerMatchStat.substitutionOnTime > 0 && playerMatchStat.substitutionOffTime > 0">
              <substitution-off-icon v-if="playerMatchStat.substitutionOffTime > 0"/>
              <template v-if="playerMatchStat.substitutionOffTime > 0">
                {{ playerMatchStat.substitutionOffTime }}'
              </template>
            </div>

            <div class="rating" v-if="!unusedSubstitute(playerMatchStat)">
              <template v-if="playerMatchStat.rating > 0">{{ (playerMatchStat.rating / 100).toFixed(2) }}</template><template v-else>&nbsp;</template>
            </div>

            <div class="unused-substitute after-main-item" v-if="unusedSubstitute(playerMatchStat)">
              Unused Substitute
            </div>
            <div class="points">
              <template>{{ playerMatchStat.points}}</template>
            </div>
            <div class="d11-team">
              <template v-if="!playerMatchStat.d11Team.dummy && mdAndUp">{{ playerMatchStat.d11Team.name }}</template>
              <template v-else-if="!playerMatchStat.d11Team.dummy && smAndDown">{{ playerMatchStat.d11Team.code }}</template>
              <template v-else>&nbsp;</template>
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
  name: 'MatchPlayerMatchStatsHorizontal',
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
  },
  methods: {
    unusedSubstitute: function (playerMatchStat) {
      return playerMatchStat.lineup === 1 && playerMatchStat.substitutionOnTime === 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-container-header > div,
  .player-stats > div {
    padding: 0 $d11-spacer;
  }

  .player-match-stats {
    .list-container-header {
      padding-bottom: 0;
    }

    .position-stats,
    .player-stats {
      .substitute,
      .points {
        font-weight: 600;
      }

      .man-of-the-match {
        background-color: $d11-blue;
        color: white;
        .man-of-the-match {
          font-weight: 600;
        }
      }

      .goals,
      .own-goals,
      .goal-assists,
      .goals-conceded {
        width: 3em;
      }

      .cards,
      .substitutions {
        width: 3.5em;
      }

      .rating,
      .points {
        text-align: right;
        width: 3.4em;
      }

      .d11-team {
        text-align: left;
        width: 15em;
      }

      .unused-substitute {
        width: 22.4em;
        opacity: 0.6;
      }
    }
  }

  .v-application-md {
    .player-match-stats {
      .position-stats {
        .list-container-header,
        .player-stats {
          .points {
            width: 2.4em;
          }
          .d11-team {
            width: 9.8em;
          }
        }
      }
    }
  }

  .v-application-sm {
    .player-match-stats {
      .position-stats {
        .list-container-header,
        .player-stats {
          .points {
            width: 2.4em;
          }
          .d11-team {
            width: 3.5em;
          }
        }
      }
    }
  }
</style>
