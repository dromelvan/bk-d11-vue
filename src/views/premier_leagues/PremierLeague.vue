<template>
  <div class="premier-league" v-if="premierLeague">

    <background-picture :type="'premier-league'" :id="16" :alt="'TODO'"/>

    <header-section>
      <header-navigation :link="{ name: 'season', params: { id: premierLeague.seasonId }}" :text="'Season ' + premierLeague.seasonName"/>

      <header-context class="premier-league-context">
        <div class="period" v-if="smAndUp">{{ '2018-08-10' | moment("dddd, MMMM Do YYYY") }} to {{ '2019-05-11' | moment("dddd, MMMM Do YYYY") }}</div>
        <div class="period" v-else>{{ '2018-08-10' | moment("MMMM Do YYYY") }} to {{ '2019-05-11' | moment("MMMM Do YYYY") }}</div>
        <v-icon v-if="smAndUp" class="ball-icon">mdi-soccer</v-icon>
        <div v-if="smAndUp" class="matches-played">380 matches played</div>
        <br v-if="xs">
        <div class="header-context-link-container">
          <router-link :to="{ name: 'matchDay', params: { id: 547 }}">
            Current match day
          </router-link>
          <v-icon class="chevron-icon chevron-right-icon">mdi-chevron-right</v-icon>
        </div>
      </header-context>

      <v-container class="background-picture-padding"/>
      <header-content-background>
        <header-content>
          <div class="premier-league-name">
            <v-btn icon :to="{ name: 'premier-league', params: { id: premierLeague.id - 1 }}" class="previous-btn"><v-icon class="chevron-icon chevron-left-icon">mdi-chevron-left</v-icon></v-btn>
            <template v-if="smAndUp">Premier League {{ premierLeague.seasonName }} League Table</template>
            <template v-else>{{ premierLeague.seasonName }} PL Table</template>
            <v-btn icon :to="{ name: 'premier-league', params: { id: premierLeague.id + 1 }}" class="next-btn"><v-icon class="chevron-icon chevron-right-icon">mdi-chevron-right</v-icon></v-btn>
          </div>
        </header-content>
        <v-container/>
      </header-content-background>

    </header-section>

    <content-section>
      <v-container class="premier-league-table-container">
        <div class="premier-league-table" v-if="teamTableStats">
          <div class="premier-league-table-stat-names">
            <div class="premier-league-table-stat-name ranking">&nbsp;</div>
            <div class="premier-league-table-stat-name team">Team</div>
            <div class="premier-league-table-stat-name matches-played"><template v-if="smAndUp">Played</template><template v-else>Pl</template></div>
            <template v-if="smAndUp">
              <div class="premier-league-table-stat-name matches-won">Won</div>
              <div class="premier-league-table-stat-name matches-drawn">Drawn</div>
              <div class="premier-league-table-stat-name matches-lost">Lost</div>
              <div class="premier-league-table-stat-name goals-for"><template v-if="smAndDown">G+</template><template v-else>Goals+</template></div>
              <div class="premier-league-table-stat-name goals-against"><template v-if="smAndDown">G-</template><template v-else>Goals-</template></div>
            </template>
            <div class="premier-league-table-stat-name goal-difference">GD</div>
            <div class="premier-league-table-stat-name points"><template v-if="smAndUp">Points</template><template v-else>Pts</template></div>
          </div>
          <v-divider/>

          <div v-for="teamTableStat in teamTableStats" :key="teamTableStat.id">
            <div class="premier-league-table-stats" v-bind:class="'ranking-' + teamTableStat.ranking">
              <div class="premier-league-table-stat ranking">{{ teamTableStat.ranking }}</div>
              <div><team-image :version="'tiny'" :id="teamTableStat.team.id"/></div>
              <div class="premier-league-table-stat team"><template v-if="smAndUp">{{ teamTableStat.team.name }}</template><template v-else>{{ teamTableStat.team.shortName }}</template></div>
              <div class="premier-league-table-stat table-up" v-if="smAndUp && teamTableStat.ranking < teamTableStat.previousRanking">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on"><table-up-icon/> +{{ teamTableStat.previousRanking - teamTableStat.ranking }}</span>
                  </template>
                  <span>Up {{ teamTableStat.previousRanking - teamTableStat.ranking }} positions from {{ teamTableStat.previousRanking }}</span>
                </v-tooltip>
              </div>
              <div class="premier-league-table-stat table-down" v-if="smAndUp && teamTableStat.ranking > teamTableStat.previousRanking">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on"><table-down-icon/> -{{ teamTableStat.ranking - teamTableStat.previousRanking }}</span>
                  </template>
                  <span>Down {{ teamTableStat.ranking - teamTableStat.previousRanking }} positions from {{ teamTableStat.previousRanking }}</span>
                </v-tooltip>
              </div>
              <div class="premier-league-table-stat winner" v-if="smAndUp && finished(premierLeague.seasonStatus) && teamTableStat.ranking === 1">Winner</div>
              <div class="premier-league-table-stat matches-played">{{ teamTableStat.matchesPlayed }}</div>
              <template v-if="smAndUp">
                <div class="premier-league-table-stat matches-won">{{ teamTableStat.matchesWon }}</div>
                <div class="premier-league-table-stat matches-drawn">{{ teamTableStat.matchesDrawn }}</div>
                <div class="premier-league-table-stat matches-lost">{{ teamTableStat.matchesLost }}</div>
                <div class="premier-league-table-stat goals-for">{{ teamTableStat.goalsFor }}</div>
                <div class="premier-league-table-stat goals-against">{{ teamTableStat.goalsAgainst }}</div>
              </template>
              <div class="premier-league-table-stat goal-difference"><template v-if="teamTableStat.goalDifference > 0">+</template>{{ teamTableStat.goalDifference }}</div>
              <div class="premier-league-table-stat points">{{ teamTableStat.points }}</div>
            </div>
            <v-divider/>
          </div>
        </div>
      </v-container>
    </content-section>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PremierLeague',
  data: () => ({
    premierLeague: null,
    teamTableStats: null
  }),
  components: {
    HeaderSection: () => import('@/components/header/HeaderSection'),
    BackgroundPicture: () => import('@/components/header/BackgroundPicture'),
    HeaderNavigation: () => import('@/components/header/HeaderNavigation'),
    HeaderContext: () => import('@/components/header/HeaderContext'),
    HeaderContent: () => import('@/components/header/HeaderContent'),
    HeaderContentBackground: () => import('@/components/header/HeaderContentBackground'),
    ContentSection: () => import('@/components/ContentSection'),
    TableUpIcon: () => import('@/components/match-events/TableUpIcon'),
    TableDownIcon: () => import('@/components/match-events/TableDownIcon')
  },
  methods: {
    getPremierLeague: function () {
      axios
        .get(this.endpoint('premierLeague', { id: this.$route.params.id }))
        .then(response => (this.premierLeague = response.data))
    }
  },
  mounted () {
    this.getPremierLeague()
  },
  watch: {
    '$route' (to, from) {
      this.getPremierLeague()
    },
    premierLeague: function (premierLeague) {
      axios
        .get(this.endpoint('teamTableStatsByMatchDayId', { id: premierLeague.matchDays[premierLeague.matchDays.length - 1] }))
        .then(response => (this.teamTableStats = response.data))
    }
  }
}
</script>

<style lang="scss" scoped>
  .ball-icon {
    padding-left: 0.5em;
    padding-right: 0.25em;
  }

  .background-picture-padding {
    margin-top: $d11-background-picture-padding;
  }

  .premier-league-name {
    display: flex;
    line-height: 2.3em;
    padding-right: 0.25em;
    padding-left: 0.25em;

    .previous-btn,
    .next-btn {
      align-self: center;
      color: white;
      font-size: 1em;

      .v-icon {
        font-size: 1.75em;
      }
    }

    .previous-btn {
      margin-right: $d11-spacer;
    }

    .next-btn {
      margin-left: auto;
    }
  }

  .premier-league-table-container {
    .premier-league-table {
      .premier-league-table-stat-names,
      .premier-league-table-stats {
        display: flex;
        width: 100%;
        padding-top: $d11-spacer;
        padding-bottom: $d11-spacer;
        padding-left: 0.5em;
        padding-right: 1em;
        line-height: 2.2em;
      }

      .premier-league-table-stat-names {
        font-weight: 600;
      }

      .premier-league-table-stat-name,
      .premier-league-table-stat {
        padding-left: $d11-spacer;
        padding-right: $d11-spacer;
      }

      .team-image {
        padding-right: $d11-spacer;
      }

      .ranking {
        font-weight: 600;
        width: 2em;
        text-align: center;
      }

      .winner,
      .table-up,
      .table-down {
        font-weight: 600;
      }

      .matches-played {
        margin-left: auto;
      }

      .matches-played,
      .matches-won,
      .matches-drawn,
      .matches-lost,
      .goals-for,
      .goals-against,
      .goal-difference {
        text-align: center;
      }

      .points {
        font-weight: 600;
        text-align: right;
      }

      .matches-played,
      .matches-won,
      .matches-drawn,
      .matches-lost,
      .goals-for,
      .goals-against,
      .goal-difference,
      .points {
        width: 3.8em;
      }

      .ranking-1 {
        background-color: $d11-blue;
        color: white;
      }

      .ranking-2,
      .ranking-3,
      .ranking-4 {
        background-color: $d11-blue-gray;
        color: white;
      }

      .ranking-18,
      .ranking-19,
      .ranking-20 {
        background-color: $d11-gray;
        color: white;
      }
    }
  }

  .v-application-sm {
    .premier-league-table-container {
      .premier-league-table {
        .premier-league-table-stat-names,
        .premier-league-table-stats {

          .goals-for,
          .goals-against {
            width: 2em;
          }
          .points,
          .goal-difference {
            width: 2.5em;
          }
        }
      }
    }
  }

  .v-application-xs {
    .background-picture-padding {
      margin-top: 0px;
    }

    .premier-league-table-container {
      .premier-league-table {
        .premier-league-table-stat-names,
        .premier-league-table-stats {
          .matches-played,
          .goal-difference,
          .points {
            width: 2em;
          }
        }
      }
    }
  }

</style>
