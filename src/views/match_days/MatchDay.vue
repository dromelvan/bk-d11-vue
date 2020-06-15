<template>
  <div class="match-day" v-if="matchDay">
    <d11-header :breadcrumbs="breadcrumbs" text="Results"/>

    <v-container class="d11-button-container">
      <v-btn icon class="previous-btn"><v-icon>mdi-chevron-left</v-icon></v-btn>
      <h2>
        <router-link :to="{ name: 'premier-league', params: { id: matchDay.premierLeagueId }}">
          Premier League {{ matchDay.seasonName }}
        </router-link>
      </h2>
    </v-container>

    <v-divider/>

    <previous-next-header :previous="{ name: 'matchDay', params: { id: matchDay.id - 1 }}" :next="{ name: 'matchDay', params: { id: matchDay.id + 1 }}" :text="'Match Day ' + matchDay.matchDayNumber"/>

    <v-divider/>

    <v-container>
      <div class="main-content">
        <div class="match-date" v-for="date in Object.keys(matchDay.matches)" :key="date">
          <h4 class="match-date">{{ date | moment("dddd, MMMM Do YYYY") }}</h4>

          <div v-if="smAndUp" >
            <v-expansion-panels multiple accordion tile flat>
              <match-day-match-events v-for="matchId in matchDay.matches[date]" :key="matchId" :matchId="matchId"/>
            </v-expansion-panels>
            <v-divider/>
          </div>

          <v-list v-if="xs" flat>
            <match-day-match v-for="matchId in matchDay.matches[date]" :key="matchId" :matchId="matchId"/>
          </v-list>

        </div>
      </div>
    </v-container>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MatchDay',
  data: () => ({
    matchDay: null
  }),
  methods: {
    get: function () {
      axios
        .get(this.endpoint('matchDay', { id: this.$route.params.id }))
        .then(response => (this.matchDay = response.data))
    }
  },
  components: {
    PreviousNextHeader: () => import('@/components/PreviousNextHeader'),
    MatchDayMatch: () => import('@/views/match_days/MatchDayMatch'),
    MatchDayMatchEvents: () => import('@/views/match_days/MatchDayMatchEvents')
  },
  computed: {
    breadcrumbs: function () {
      var breadcrumbs = [
        { text: 'Home', disabled: false, to: { name: 'home' }, exact: true },
        { text: 'Premier League', disabled: false, to: { name: 'premierLeague', params: { id: this.matchDay.premierLeagueId } } },
        { text: 'Results', disabled: true }
      ]
      return breadcrumbs
    }
  },
  mounted () {
    this.get()
  },
  watch: {
    '$route' (to, from) {
      this.get()
    }
  }
}
</script>

<style lang="scss" scoped>
  .d11-button-container {
    a {
      text-decoration: none;
    }
  }
  .v-expansion-panels {
    padding-top: $d11-spacer;
  }

  div.match-date:first-child {
    padding-top: 8px;
  }

  div.match-date:not(:first-child) {
    padding-top: 20px;
  }

  .v-application-xs {
    div.match-date:not(:first-child) {
      padding-top: $d11-large-spacer;
    }
  }
 </style>
