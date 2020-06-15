<template>
  <div class="player-match-stats">
    <v-container class="position-stats" v-for="position in Object.keys(playerMatchStats)" :key="position">

      <div class="player-stat-names">
        <div class="player-stat-name player">{{ position }}s</div>
        <div class="player-stat-name goals">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Goals</span>
            </template>
            <span>Goals scored</span>
          </v-tooltip>
        </div>
        <div class="player-stat-name own-goals">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">OGs</span>
            </template>
            <span>Own goals scored</span>
          </v-tooltip>
        </div>
        <div class="player-stat-name goal-assists">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Ass.</span>
            </template>
            <span>Goal assists</span>
          </v-tooltip>
        </div>
        <div class="player-stat-name goals-conceded">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Con.</span>
            </template>
            <span>Goals conceded (defenders only)</span>
          </v-tooltip>
        </div>
        <div class="player-stat-name cards">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Cards</span>
            </template>
            <span>Yellow and red cards</span>
          </v-tooltip>
        </div>
        <div class="player-stat-name substitutions">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Subs</span>
            </template>
            <span>Substitutions on and/or off</span>
          </v-tooltip>
        </div>
        <div class="player-stat-name rating">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Rating</span>
            </template>
            <span>WhoScored player rating</span>
          </v-tooltip>
        </div>
        <div class="player-stat-name points">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" v-if="mdAndUp">Points</span>
              <span v-bind="attrs" v-on="on" v-if="smAndDown">Pts</span>
            </template>
            <span>D11 points scored</span>
          </v-tooltip>
        </div>
        <div class="player-stat-name d11-team">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" v-if="mdAndUp">D11 Team</span>
              <span v-bind="attrs" v-on="on" v-if="smAndDown">D11</span>
            </template>
            <span>Player D11 team for this match</span>
          </v-tooltip>
        </div>
      </div>

      <v-divider/>

      <div v-for="playerMatchStat in playerMatchStats[position]" :key="playerMatchStat.id">
        <div class="player-stats" v-bind:class="{ 'man-of-the-match': playerMatchStat.manOfTheMatch || playerMatchStat.sharedManOfTheMatch }">
          <div class="player-stat player">
            <player-image :version="'tiny'" :id="playerMatchStat.player.id"/>
            <span class="substitute" v-if="playerMatchStat.lineup === 1">SUB </span>
            {{ playerMatchStat.player.name }}
          </div>

          <div class="player-stat man-of-the-match" v-if="playerMatchStat.manOfTheMatch || playerMatchStat.sharedManOfTheMatch">
            <span v-if="mdAndUp">Man of the Match</span>
            <span v-if="smAndDown">MoM</span>
          </div>

          <div class="player-stat goals" v-if="!unusedSubstitute(playerMatchStat)">
            <span v-if="playerMatchStat.goals > 0">{{ playerMatchStat.goals}}</span><span v-else>&nbsp;</span>
          </div>
          <div class="player-stat own-goals" v-if="!unusedSubstitute(playerMatchStat)">
            <span v-if="playerMatchStat.ownGoals > 0">{{ playerMatchStat.ownGoals}}</span><span v-else>&nbsp;</span>
          </div>
          <div class="player-stat goal-assists" v-if="!unusedSubstitute(playerMatchStat)">
            <span v-if="playerMatchStat.goalAssists > 0">{{ playerMatchStat.goalAssists}}</span><span v-else>&nbsp;</span>
          </div>
          <div class="player-stat goals-conceded" v-if="!unusedSubstitute(playerMatchStat)">
            <span v-if="playerMatchStat.position.defender">{{ playerMatchStat.goalsConceded}}</span><span v-else>&nbsp;</span>
          </div>

          <div class="player-stat cards" v-if="!unusedSubstitute(playerMatchStat)">
            <yellow-card-icon v-if="playerMatchStat.yellowCardTime > 0"/>
            <span v-if="playerMatchStat.yellowCardTime > 0">{{ playerMatchStat.yellowCardTime }}'</span>
            <red-card-icon v-if="playerMatchStat.redCardTime > 0"/>
            <span v-if="playerMatchStat.redCardTime > 0">{{ playerMatchStat.redCardTime }}'</span>
          </div>

          <div class="player-stat substitutions" v-if="!unusedSubstitute(playerMatchStat)">
            <substitution-on-icon v-if="playerMatchStat.substitutionOnTime > 0"/>
            <span v-if="playerMatchStat.substitutionOnTime > 0">
              {{ playerMatchStat.substitutionOnTime }}'
            </span>
            <substitution-off-icon v-if="playerMatchStat.substitutionOffTime > 0"/>
            <span v-if="playerMatchStat.substitutionOffTime > 0">
              {{ playerMatchStat.substitutionOffTime }}'
            </span>
          </div>

          <div class="player-stat rating" v-if="!unusedSubstitute(playerMatchStat)">
            <span v-if="playerMatchStat.rating > 0">{{ (playerMatchStat.rating / 100).toFixed(2) }}</span><span v-else>&nbsp;</span>
          </div>

          <div class="player-stat unused-substitute" v-if="unusedSubstitute(playerMatchStat)">
            Unused Substitute
          </div>
          <div class="player-stat points">
            <span>{{ playerMatchStat.points}}</span>
          </div>
          <div class="player-stat d11-team">
            <span v-if="!playerMatchStat.d11Team.dummy && mdAndUp">{{ playerMatchStat.d11Team.name }}</span>
            <span v-else-if="!playerMatchStat.d11Team.dummy && smAndDown">{{ playerMatchStat.d11Team.code }}</span>
            <span v-else>&nbsp;</span>
          </div>
        </div>
        <v-divider/>
      </div>
     </v-container>
  </div>
</template>

<script>
export default {
  name: 'MatchPlayerMatchStatsHorizontal',
  props: {
    playerMatchStats: Object
  },
  components: {
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
  .player-match-stats {
    .position-stats {
      .player-stat-names {
        font-weight: 600;
      }

      .player-stats {
        .points {
          font-weight: 600;
        }
      }

      .player-stat-names,
      .player-stats {
        padding-top: $d11-spacer;
        padding-bottom: $d11-spacer;
        display: table;
        width: 100%;

        .player-stat-name,
        .player-stat {
          display: table-cell;
          vertical-align: middle;

          padding-left: $d11-spacer;
          padding-right: $d11-spacer;

          span {
            line-height: 1em;
            vertical-align: middle;
          }

          .player-image {
            padding-right: $d11-spacer;
          }

          .substitute {
            font-weight: 600;
          }
        }

        .goals,
        .own-goals,
        .goal-assists,
        .goals-conceded,
        .cards,
        .substitutions,
        .unused-substitute {
          text-align: center;
        }

        .rating,
        .points {
          text-align: right;
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
          width: 3.4em;
        }

        .d11-team {
          width: 9.4em;
        }

        .unused-substitute {
          width: 22.4em;
          opacity: 0.6;
        }
      }

      .player-stats.man-of-the-match {
        background-color: $d11-blue;
        color: white;

        .player-stat.man-of-the-match {
            text-align: right;
            font-weight: 600;
        }
      }
    }
  }

  .v-application-xl {
    .player-match-stats {
      .position-stats {
        .player-stat-names,
        .player-stats {
          .d11-team {
            width: 15em;
          }
        }
      }
    }
  }

  .v-application-sm {
    .player-match-stats {
      .position-stats {
        .player-stat-names,
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
