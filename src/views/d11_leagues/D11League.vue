<template>
  <div class="premier-league" v-if="d11League">

    <background-picture :type="'league'" :id="16" :alt="'TODO'"/>

    <header-section>
      <header-navigation :link="{ name: 'season', params: { id: d11League.season.id }}" :text="'Season ' + d11League.season.name"/>

      <header-context v-if="smAndUp" class="d11-league-context">
        <div class="period" >{{ '2018-08-10' | moment("dddd, MMMM Do YYYY") }} to {{ '2019-05-11' | moment("dddd, MMMM Do YYYY") }}</div>
        <v-icon medium class="context-icon">mdi-soccer</v-icon>
        <div class="matches-played">380 matches played</div>
        <div class="header-context-link-container">
          <router-link :to="{ name: 'd11MatchDay', params: { id: 547 }}">
            Current D11 match day
          </router-link>
        </div>
        <v-icon medium>mdi-chevron-right</v-icon>
      </header-context>

      <header-context v-if="xs" class="d11-league-context">
        <div class="period" >{{ '2018-08-10' | moment("D.M YY") }} - {{ '2019-05-11' | moment("D.M YY") }}</div>
        <div class="header-context-link-container">
          <router-link :to="{ name: 'd11MatchDay', params: { id: 547 }}">
            Results
          </router-link>
        </div>
        <v-icon medium>mdi-chevron-right</v-icon>
      </header-context>

      <header-content-background>
        <header-content class="d11-league-name">
          <v-btn icon :to="{ name: 'd11League', params: { id: d11League.id - 1 }}" class="previous-btn"><v-icon x-large>mdi-chevron-left</v-icon></v-btn>
          <template>D11 {{ d11League.season.name }}</template>
          <v-btn icon :to="{ name: 'd11League', params: { id: d11League.id + 1 }}" class="next-btn"><v-icon x-large>mdi-chevron-right</v-icon></v-btn>
        </header-content>
      </header-content-background>
    </header-section>

    <content-section>
      <v-container class="h1-container fixtures-and-results">
        <h1>League Table</h1>
      </v-container>

      <list-container columns class="d11-league-table">
        <template v-slot:header>
          <div class="ranking">#</div>
          <div class="d11-team">D11 Team</div>
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

        <div v-for="d11TeamTableStat in d11TeamTableStats" :key="d11TeamTableStat.id">
          <list-container-item :to="{ name: 'd11Team', params: { id: d11TeamTableStat.d11Team.id }}" v-bind:class="'ranking-' + d11TeamTableStat.ranking">
            <v-list-item-title class="d11-team">
              <div class="ranking emphasised">{{ d11TeamTableStat.ranking }}</div>
              <div class="image"><d11-team-image :version="'tiny'" :id="d11TeamTableStat.d11Team.id"/></div>
              <div class="name"><template v-if="xs">{{ d11TeamTableStat.d11Team.shortName }}</template><template v-else>{{ d11TeamTableStat.d11Team.name }}</template></div>
              <div class="table-up" v-if="d11TeamTableStat.ranking < d11TeamTableStat.previousRanking">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on"><table-up-icon/> +{{ d11TeamTableStat.previousRanking - d11TeamTableStat.ranking }}</span>
                  </template>
                  <span>Up {{ d11TeamTableStat.previousRanking - d11TeamTableStat.ranking }} positions from {{ d11TeamTableStat.previousRanking }}</span>
                </v-tooltip>
              </div>
              <div class="table-down" v-if="d11TeamTableStat.ranking > d11TeamTableStat.previousRanking">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on"><table-down-icon/> -{{ d11TeamTableStat.ranking - d11TeamTableStat.previousRanking }}</span>
                  </template>
                  <span>Down {{ d11TeamTableStat.ranking - d11TeamTableStat.previousRanking }} positions from {{ d11TeamTableStat.previousRanking }}</span>
                </v-tooltip>
              </div>
              <div class="winner emphasised" v-if="smAndUp && finished(d11League.season.status) && d11TeamTableStat.ranking === 1">Winner</div>
              <div class="matches-played stat after-main-item">{{ d11TeamTableStat.matchesPlayed }}</div>
              <template v-if="smAndUp">
                <div class="matches-won stat">{{ d11TeamTableStat.matchesWon }}</div>
                <div class="matches-drawn stat">{{ d11TeamTableStat.matchesDrawn }}</div>
                <div class="matches-lost stat">{{ d11TeamTableStat.matchesLost }}</div>
                <div class="goals-for stat">{{ d11TeamTableStat.goalsFor }}</div>
                <div class="goals-against stat">{{ d11TeamTableStat.goalsAgainst }}</div>
              </template>
              <div class="goal-difference stat"><template v-if="d11TeamTableStat.goalDifference > 0">+</template>{{ d11TeamTableStat.goalDifference }}</div>
              <div class="points stat emphasised">{{ d11TeamTableStat.points }}</div>
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
  name: 'D11League',
  data: () => ({
    d11League: null,
    d11TeamTableStats: null
  }),
  components: {
    TableUpIcon: () => import('@/components/match-events/TableUpIcon'),
    TableDownIcon: () => import('@/components/match-events/TableDownIcon'),
    ListContainer: () => import('@/components/ListContainer'),
    ListContainerItem: () => import('@/components/ListContainerItem')
  },
  methods: {
    getD11League: function () {
      axios
        .get(this.endpoint('d11League', { id: this.$route.params.id }))
        .then(response => (this.d11League = response.data))
    }
  },
  mounted () {
    this.getD11League()
  },
  watch: {
    '$route' (to, from) {
      this.getD11League()
    },
    d11League: function (d11League) {
      axios
        .get(this.endpoint('d11TeamTableStatsByMatchDayId', { id: d11League.d11MatchDays[d11League.d11MatchDays.length - 1] }))
        .then(response => (this.d11TeamTableStats = response.data))
    }
  }
}
</script>

<style lang="scss" scoped>
  .d11-league-table {
    .ranking {
      min-width: 3em;
    }

    .image {
      padding-right: $d11-spacer;
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
  }

  .v-application-sm {
    .d11-league-table {
      .stat {
        min-width: 3.4em;
      }
    }
  }

  .v-application-xs {
    .d11-league-table {
      .ranking,
      .stat {
        min-width: 2em;
      }
    }
  }

</style>
