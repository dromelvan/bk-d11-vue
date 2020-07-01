<template>
  <div class="player-match-stats">
    <list-container columns class="position-stats" v-for="position in Object.keys(playerMatchStats)" :key="position">
      <template v-slot:header>
        <div class="position">{{ position }}s</div>
        <template v-if="view !== 'match'">
          <div class="team after-main-item">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">Team</span>
              </template>
              <span>The team the player played for this match day</span>
            </v-tooltip>
          </div>
          <div class="match">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">Match</span>
              </template>
              <span>The match the player played for this match day</span>
            </v-tooltip>
          </div>
        </template>
        <div class="goals" :class="{ 'after-main-item':  view === 'match' }">
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
        <div class="goals-conceded" v-if="view !== 'd11Match' || mdAndUp">
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
        <div class="d11-team" v-if="view === 'match'">
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
              <template v-if="!pending(playerMatchStat.match.status)">
                <span class="substitute" v-if="playerMatchStat.lineup === 1">SUB </span>
                <span class="did-not-participate" v-else-if="playerMatchStat.lineup === 0">DNP </span>
              </template>
              <template v-if="mdAndUp || playerMatchStat.player.name.length < 22">{{ playerMatchStat.player.name }}</template>
              <template v-else>{{ playerMatchStat.player.shortName }}</template>
            </div>

            <div class="man-of-the-match" v-if="playerMatchStat.manOfTheMatch || playerMatchStat.sharedManOfTheMatch">
              <span v-if="mdAndUp">Man of the Match</span>
              <span v-if="smAndDown">MoM</span>
            </div>

            <div class="elapsed" v-if="playerMatchStat.lineup >= 1 && active(playerMatchStat.match.status)">
              <v-progress-circular class="progress" :rotate="-90" :size="35" :width="5" :value="elapsed(playerMatchStat.match.elapsed)" color="#061958">
                {{ playerMatchStat.match.elapsed }}
              </v-progress-circular>
            </div>

            <template v-if="view !== 'match'">
              <div class="team after-main-item">
                <team-image :version="'icon'" :id="playerMatchStat.team.id"/>
              </div>
              <div class="match" v-if="view !== 'match'">
                <team-image :version="'icon'" :id="playerMatchStat.match.homeTeam.id"/>
                <template v-if="!pending(playerMatchStat.match.status)">
                  {{ playerMatchStat.match.homeTeamGoals }}-{{ playerMatchStat.match.awayTeamGoals }}
                </template>
                <template v-else>
                  vs
                </template>
                <team-image :version="'icon'" :id="playerMatchStat.match.awayTeam.id"/>
              </div>
            </template>

            <template v-if="participated(playerMatchStat)">
              <div class="goals" :class="{ 'after-main-item':  view === 'match' }">
                <template v-if="playerMatchStat.goals > 0">{{ playerMatchStat.goals}}</template><template v-else>&nbsp;</template>
              </div>
              <div class="own-goals">
                <template v-if="playerMatchStat.ownGoals > 0">{{ playerMatchStat.ownGoals}}</template><template v-else>&nbsp;</template>
              </div>
              <div class="goal-assists">
                <template v-if="playerMatchStat.goalAssists > 0">{{ playerMatchStat.goalAssists}}</template><template v-else>&nbsp;</template>
              </div>
              <div class="goals-conceded" v-if="view !== 'd11Match' || mdAndUp">
                <template v-if="playerMatchStat.position.defender">{{ playerMatchStat.goalsConceded}}</template><template v-else>&nbsp;</template>
              </div>

              <div class="cards">
                <yellow-card-icon v-if="playerMatchStat.yellowCardTime > 0"/>
                <template v-if="playerMatchStat.yellowCardTime > 0">{{ playerMatchStat.yellowCardTime }}'</template>
                <br v-if="playerMatchStat.yellowCardTime > 0 && playerMatchStat.redCardTime > 0">
                <red-card-icon v-if="playerMatchStat.redCardTime > 0"/>
                <template v-if="playerMatchStat.redCardTime > 0">{{ playerMatchStat.redCardTime }}'</template>
              </div>

              <div class="substitutions">
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

              <div class="rating">
                <template v-if="playerMatchStat.rating > 0">{{ (playerMatchStat.rating / 100).toFixed(2) }}</template><template v-else>&nbsp;</template>
              </div>
            </template>

            <div class="unused-substitute" v-else-if="playerMatchStat.lineup === 1" :class="{ 'after-main-item':  view === 'match', 'narrow': smAndDown && view === 'd11Match' }">
              Unused Substitute
            </div>
            <div class="match-not-played" v-else-if="pending(playerMatchStat.match.status)" :class="{ 'after-main-item':  view === 'match', 'narrow': smAndDown && view === 'd11Match' }">
              Kickoff {{ playerMatchStat.match.datetime | moment("DD.MM YYYY [at] HH:mm") }}
            </div>
            <div class="did-not-participate" v-else :class="{ 'after-main-item':  view === 'match', 'narrow': smAndDown && view === 'd11Match' }">
              Did not participate
            </div>
            <div class="points">
              <template v-if="!pending(playerMatchStat.match.status)">{{ playerMatchStat.points}}</template>
            </div>
            <div class="d11-team" v-if="view === 'match'">
              <template v-if="!playerMatchStat.d11Team.dummy && mdAndUp">{{ playerMatchStat.d11Team.name }}</template>
              <template v-else-if="!playerMatchStat.d11Team.dummy && smAndDown">{{ playerMatchStat.d11Team.code }}</template>
              <template v-else>&nbsp;</template>
            </div>

          </v-list-item-title>
        </list-container-item>
        <v-divider/>
      </div>
    </list-container>
    <v-container class="total-points" v-if="view === 'd11Match'">
      Total: {{ totalPoints }}
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'PlayerMatchStatsHorizontal',
  props: {
    playerMatchStats: Object,
    view: String
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
    participated: function (playerMatchStat) {
      return playerMatchStat.lineup === 2 || playerMatchStat.substitutionOnTime > 0
    }
  },
  computed: {
    totalPoints: function () {
      var points = 0
      for (var position in this.playerMatchStats) {
        this.playerMatchStats[position].forEach(element => {
          points += element.points
        })
      }
      return points
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
      .player > .substitute,
      .player > .did-not-participate,
      .points {
        font-weight: 600;
      }

      .elapsed {
        .progress {
          font-size: 0.6em;
        }
      }

      .man-of-the-match {
        background-color: $d11-blue;
        color: white;
        .man-of-the-match {
          font-weight: 600;
        }

        .elapsed {
          .progress {
            color: white !important;
          }
        }
      }

      .team {
        width: 3em;
      }
      .match {
        width: 4.5em;
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

      div.unused-substitute,
      div.match-not-played,
      div.did-not-participate {
        width: 22.4em;
        opacity: 0.6;
      }

      div.unused-substitute.narrow,
      div.match-not-played.narrow,
      div.did-not-participate.narrow {
        width: 19.4em;
      }
    }

    .total-points {
      text-align: right;
      font-weight: 600;
      padding-top: 0;
      padding-right: $d11-spacer * 3;
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
