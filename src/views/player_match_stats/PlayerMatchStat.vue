<template>
  <list-container-item class="player-match-stat-container" :to="{ name: 'player', params: { id: playerMatchStat.player.id }}" v-bind:class="{ 'man-of-the-match': playerMatchStat.manOfTheMatch || playerMatchStat.sharedManOfTheMatch }">
    <v-list-item-title class="player-match-stat">

      <!-- XS device player data --------------------------------------------------->

      <template v-if="xs">
        <div class="player" v-bind:class="{ 'main-item': !playerMatchStat.manOfTheMatch && !playerMatchStat.sharedManOfTheMatch }">
          <template v-if="!pending(playerMatchStat.match.status)">
            <span class="substitute" v-if="playerMatchStat.lineup === 1">SUB </span>
            <span class="did-not-participate" v-else-if="playerMatchStat.lineup === 0">DNP </span>
          </template>
          <template v-if="mdAndUp || playerMatchStat.player.name.length < 22">{{ playerMatchStat.player.name }}</template>
          <template v-else>{{ playerMatchStat.player.shortName }}</template>
        </div>

        <div class="man-of-the-match main-item" v-if="playerMatchStat.manOfTheMatch || playerMatchStat.sharedManOfTheMatch">
          <span v-if="mdAndUp">Man of the Match</span>
          <span v-if="smAndDown">MoM</span>
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
      </template>

      <!-- Sm and up device player data -------------------------------------------->

      <template v-if="smAndUp">
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
      </template>
    </v-list-item-title>
  </list-container-item>
</template>

<script>
export default {
  name: 'PlayerMatchStatHorizontal',
  props: {
    playerMatchStat: Object,
    view: String
  },
  components: {
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
  }
}
</script>

<style lang="scss" scoped>
  .player-match-stat-container {
    .player-match-stat > div {
      padding: 0 $d11-spacer;
    }

    .player-match-stat {

      div.substitute {
        padding-right: $d11-spacer;
      }

      .substitute,
      .did-not-participate,
      .points {
        font-weight: 600;
      }

      .elapsed {
        .progress {
          font-size: 0.6em;
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

      .rating,
      .points {
        text-align: right;
        width: 3.4em;
      }

      .d11-team {
        text-align: left;
        width: 15em;
      }
    }
  }

  .player-match-stat-container.man-of-the-match {
    background-color: $d11-blue;
    .man-of-the-match {
      font-weight: 600;
    }

    .v-list-item__content {
      .player-match-stat {
        color: white;
      }

      .elapsed {
        .progress {
          color: white !important;
        }
      }
    }
  }

  .v-application-md {
    .player-match-stat-container {
      .player-match-stat {
        .points {
          width: 2.4em;
        }
        .d11-team {
          width: 9.8em;
        }
      }
    }
  }

  .v-application-sm {
    .player-match-stat-container {
      .player-match-stat {
        .points {
          width: 2.4em;
        }
        .d11-team {
          width: 3.5em;
        }
      }
    }
  }

  .v-application-xs {
    .list-container {
      .player-match-stat-container {
        padding: 0;
        .player-match-stat {
          .match-not-played,
          .did-not-participate,
          .unused-substitute {
            width: unset;
            text-align: right;
          }
          .points {
            width: 1.8em;
          }
        }
      }
    }
  }

</style>
