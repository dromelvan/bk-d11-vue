<template>
  <div class="match-day" v-if="matchDay">

    <background-picture :type="'match-day'" :id="7" :alt="'TODO'"/>

    <header-section>
      <header-navigation :link="{ name: 'premierLeague', params: { id: matchDay.premierLeague.id }}" :text="'Premier League ' + matchDay.season.name"/>

      <header-context v-if="smAndUp" class="match-day-context">
        <div class="date">{{ matchDay.date | moment("dddd, MMMM Do YYYY") }}</div>
        <div class="header-context-link-container">
          <router-link :to="{ name: 'd11MatchDay', params: { id: matchDay.d11MatchDay.id }}">
            D11 Match day {{ matchDay.d11MatchDay.matchDayNumber }}
          </router-link>
        </div>
        <v-icon medium>mdi-chevron-right</v-icon>
      </header-context>

      <header-context v-if="xs" class="match-day-context">
        <div class="date">{{ matchDay.date | moment("ddd, D.MM YYYY") }}</div>
        <div class="header-context-link-container">
          <router-link :to="{ name: 'd11MatchDay', params: { id: matchDay.d11MatchDay.id }}">
            D11 Match day {{ matchDay.d11MatchDay.matchDayNumber }}
          </router-link>
        </div>
        <v-icon medium>mdi-chevron-right</v-icon>
      </header-context>

      <header-content-background>
        <header-content class="match-day-name">
          <v-btn icon :to="{ name: 'matchDay', params: { id: matchDay.id - 1 }}" class="previous-btn"><v-icon x-large>mdi-chevron-left</v-icon></v-btn>
          Match Day {{ matchDay.matchDayNumber }} <template v-if="smAndUp">{{ matchDay.season.name }}</template>
          <v-btn icon :to="{ name: 'matchDay', params: { id: matchDay.id + 1 }}" class="next-btn"><v-icon x-large>mdi-chevron-right</v-icon></v-btn>
        </header-content>
      </header-content-background>
    </header-section>

    <content-section>
      <v-container class="h1-container fixtures-and-results">
        <h1>Fixtures and Results</h1>
      </v-container>

      <list-container class="matches-list" v-for="date in Object.keys(matchDay.matches)" :key="date">
        <template v-slot:header>
          <div class="match-day-date">{{ date | moment("dddd, MMMM Do YYYY") }}</div>
        </template>
        <div v-for="matchId in matchDay.matches[date]" :key="matchId">
          <list-container-item :to="{ name: 'match', params: { id: matchId }}">
            <match-day-match-horizontal v-if="smAndUp" :matchId="matchId"/>
            <match-day-match-vertical v-else :matchId="matchId"/>
          </list-container-item>
          <v-divider/>
        </div>

        <!--
        <div v-if="smAndUp" >
          <v-expansion-panels multiple accordion tile flat>
            <match-day-match-horizontal v-for="matchId in matchDay.matches[date]" :key="matchId" :matchId="matchId"/>
          </v-expansion-panels>
        </div>

        <v-list class="matches-by-date" v-if="xs" flat>
          <match-day-match-vertical v-for="matchId in matchDay.matches[date]" :key="matchId" :matchId="matchId"/>
        </v-list>
        -->
      </list-container>
    </content-section>

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
    ListContainer: () => import('@/components/ListContainer'),
    ListContainerItem: () => import('@/components/ListContainerItem'),
    MatchDayMatchHorizontal: () => import('@/views/match_days/MatchDayMatchHorizontal'),
    MatchDayMatchVertical: () => import('@/views/match_days/MatchDayMatchVertical')
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
  .matches-by-date {
    padding: 0;
  }
 </style>
