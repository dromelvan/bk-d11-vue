<template>
  <div class="premier-league" v-if="premierLeague">

    <background-picture :type="'premier-league'" :id="16" :alt="'TODO'"/>

    <header-section>
      <header-navigation :link="{ name: 'season', params: { id: premierLeague.season.id }}" :text="'Season ' + premierLeague.season.name"/>

      <header-context v-if="smAndUp" class="premier-league-context">
        <div class="period" >{{ '2018-08-10' | moment("dddd, MMMM Do YYYY") }} to {{ '2019-05-11' | moment("dddd, MMMM Do YYYY") }}</div>
        <v-icon medium class="context-icon">mdi-soccer</v-icon>
        <div class="matches-played">380 matches played</div>
        <div class="header-context-link-container">
          <router-link :to="{ name: 'matchDay', params: { id: 547 }}">
            Current match day
          </router-link>
        </div>
        <v-icon medium>mdi-chevron-right</v-icon>
      </header-context>

      <header-context v-if="xs" class="premier-league-context">
        <div class="period" >{{ '2018-08-10' | moment("D.M YY") }} - {{ '2019-05-11' | moment("D.M YY") }}</div>
        <div class="header-context-link-container">
          <router-link :to="{ name: 'matchDay', params: { id: 547 }}">
            Current match day
          </router-link>
        </div>
        <v-icon medium>mdi-chevron-right</v-icon>
      </header-context>

      <header-content-background>
        <header-content class="premier-league-name">
          <v-btn icon :to="{ name: 'premierLeague', params: { id: premierLeague.id - 1 }}" class="previous-btn"><v-icon x-large>mdi-chevron-left</v-icon></v-btn>
          <template v-if="smAndUp">Premier League {{ premierLeague.season.name }}</template>
          <template v-else>Prem. League {{ premierLeague.season.shortName }}</template>
          <v-btn icon :to="{ name: 'premierLeague', params: { id: premierLeague.id + 1 }}" class="next-btn"><v-icon x-large>mdi-chevron-right</v-icon></v-btn>
        </header-content>
      </header-content-background>

    </header-section>

    <content-section>
      <v-container class="h1-container fixtures-and-results">
        <h1>League Table</h1>
      </v-container>

      <list-container class="premier-league-table">

        <template v-slot:header>
          <div class="ranking">#</div>
          <div class="team">Team</div>
          <div class="matches-played stat after-main-item"><template v-if="smAndUp">Played</template><template v-else>Pl</template></div>
          <template v-if="smAndUp">
            <div class="matches-won stat">Won</div>
            <div class="matches-drawn stat">Drawn</div>
            <div class="matches-lost stat">Lost</div>
            <div class="goals-for stat"><template v-if="smAndDown">G+</template><template v-else>Goals+</template></div>
            <div class="goals-against stat"><template v-if="smAndDown">G-</template><template v-else>Goals-</template></div>
          </template>
          <div class="goal-difference stat">GD</div>
          <div class="points stat"><template v-if="smAndUp">Points</template><template v-else>Pts</template></div>
        </template>

        <div v-for="teamTableStat in teamTableStats" :key="teamTableStat.id">
          <list-container-item :to="{ name: 'team', params: { id: teamTableStat.team.id }}" v-bind:class="'ranking-' + teamTableStat.ranking">
            <v-list-item-title class="team">
              <div class="ranking emphasised">{{ teamTableStat.ranking }}</div>
              <div class="image"><team-image :version="'tiny'" :id="teamTableStat.team.id"/></div>
              <div class="name"><template v-if="xs">{{ teamTableStat.team.shortName }}</template><template v-else>{{ teamTableStat.team.name }}</template></div>
              <div class="table-up" v-if="teamTableStat.ranking < teamTableStat.previousRanking">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on"><table-up-icon/> +{{ teamTableStat.previousRanking - teamTableStat.ranking }}</span>
                  </template>
                  <span>Up {{ teamTableStat.previousRanking - teamTableStat.ranking }} positions from {{ teamTableStat.previousRanking }}</span>
                </v-tooltip>
              </div>
              <div class="table-down" v-if="teamTableStat.ranking > teamTableStat.previousRanking">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on"><table-down-icon/> -{{ teamTableStat.ranking - teamTableStat.previousRanking }}</span>
                  </template>
                  <span>Down {{ teamTableStat.ranking - teamTableStat.previousRanking }} positions from {{ teamTableStat.previousRanking }}</span>
                </v-tooltip>
              </div>
              <div class="winner emphasised" v-if="smAndUp && finished(premierLeague.season.status) && teamTableStat.ranking === 1">Winner</div>
              <div class="matches-played stat after-main-item">{{ teamTableStat.matchesPlayed }}</div>
              <template v-if="smAndUp">
                <div class="matches-won stat">{{ teamTableStat.matchesWon }}</div>
                <div class="matches-drawn stat">{{ teamTableStat.matchesDrawn }}</div>
                <div class="matches-lost stat">{{ teamTableStat.matchesLost }}</div>
                <div class="goals-for stat">{{ teamTableStat.goalsFor }}</div>
                <div class="goals-against stat">{{ teamTableStat.goalsAgainst }}</div>
              </template>
              <div class="goal-difference stat"><template v-if="teamTableStat.goalDifference > 0">+</template>{{ teamTableStat.goalDifference }}</div>
              <div class="points stat emphasised">{{ teamTableStat.points }}</div>
            </v-list-item-title>
          </list-container-item>
          <v-divider/>
        </div>

      </list-container>
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
    TableUpIcon: () => import('@/components/match-events/TableUpIcon'),
    TableDownIcon: () => import('@/components/match-events/TableDownIcon'),
    ListContainer: () => import('@/components/ListContainer'),
    ListContainerItem: () => import('@/components/ListContainerItem')
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
  .premier-league-table {
    .ranking {
      min-width: 3em;
    }

    .name {
      text-align: left;
    }

    .table-up,
    .table-down,
    .winner {
      padding-left: $d11-spacer;
    }

    .stat {
      min-width: 3.8em;
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

  .v-application-sm {
    .premier-league-table {
      .stat {
        min-width: 3.4em;
      }
    }
  }

  .v-application-xs {
    .premier-league-table {
      .ranking,
      .stat {
        min-width: 2em;
      }
    }
  }

</style>
