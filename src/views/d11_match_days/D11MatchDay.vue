<template>
  <div class="d11-match-day" v-if="d11MatchDay">

    <background-picture :type="'d11-match-day'" :id="7" :alt="'TODO'"/>

    <header-section>
      <header-navigation :link="{ name: 'd11League', params: { id: d11MatchDay.d11League.id }}" :text="'D11 ' + d11MatchDay.season.name"/>

      <header-context class="premier-league-context">
        <div class="date">{{ d11MatchDay.date | moment("dddd, MMMM Do YYYY") }}</div>
        <v-icon v-if="smAndUp" medium class="context-icon">mdi-account-multiple</v-icon>
        <div class="matches-played">13 players remaining</div>
        <div class="header-context-link-container">
          <router-link :to="{ name: 'matchDay', params: { id: d11MatchDay.matchDay.id }}">
            Match day {{ d11MatchDay.matchDay.matchDayNumber }}
          </router-link>
          <v-icon medium>mdi-chevron-right</v-icon>
        </div>
      </header-context>

      <header-content-background>
        <header-content class="d11-match-day-name">
          <v-btn icon :to="{ name: 'd11MatchDay', params: { id: d11MatchDay.id - 1 }}" class="previous-btn"><v-icon x-large>mdi-chevron-left</v-icon></v-btn>
          D11 Match Day {{ d11MatchDay.matchDayNumber }} <template v-if="smAndUp">{{ d11MatchDay.season.name }}</template>
          <v-btn icon :to="{ name: 'd11MatchDay', params: { id: d11MatchDay.id + 1 }}" class="next-btn"><v-icon x-large>mdi-chevron-right</v-icon></v-btn>
        </header-content>
      </header-content-background>
    </header-section>

    <content-section>
      <v-container class="fixtures-and-results">
        <h1>Fixtures and Results</h1>
      </v-container>

      <table-container class="d11-matches-table" v-for="date in Object.keys(d11MatchDay.d11Matches)" :key="date">
        <template v-slot:header>
          <div class="d11-match-day-date">{{ date | moment("dddd, MMMM Do YYYY") }}</div>
        </template>
        <div v-for="d11MatchId in d11MatchDay.d11Matches[date]" :key="d11MatchId">
          <d11-match-day-d11-match-horizontal v-if="smAndUp" :d11MatchId="d11MatchId"/>
          <d11-match-day-d11-match-vertical v-else :d11MatchId="d11MatchId"/>
          <v-divider/>
        </div>
      </table-container>
    </content-section>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'D11MatchDay',
  data: () => ({
    d11MatchDay: null
  }),
  components: {
    HeaderSection: () => import('@/components/header/HeaderSection'),
    BackgroundPicture: () => import('@/components/header/BackgroundPicture'),
    HeaderNavigation: () => import('@/components/header/HeaderNavigation'),
    HeaderContext: () => import('@/components/header/HeaderContext'),
    HeaderContent: () => import('@/components/header/HeaderContent'),
    HeaderContentBackground: () => import('@/components/header/HeaderContentBackground'),
    ContentSection: () => import('@/components/ContentSection'),
    TableContainer: () => import('@/components/TableContainer'),
    D11MatchDayD11MatchHorizontal: () => import('@/views/d11_match_days/D11MatchDayD11MatchHorizontal'),
    D11MatchDayD11MatchVertical: () => import('@/views/d11_match_days/D11MatchDayD11MatchVertical')
  },
  methods: {
    getD11MatchDay: function () {
      axios
        .get(this.endpoint('d11MatchDay', { id: this.$route.params.id }))
        .then(response => (this.d11MatchDay = response.data))
    }
  },
  mounted () {
    this.getD11MatchDay()
  },
  watch: {
    '$route' (to, from) {
      this.getD11MatchDay()
    }
  }
}
</script>

<style lang="scss" scoped>
  .d11-match-day {
    .content-section {
      .fixtures-and-results {
        padding-top: $d11-spacer;
      }
    }
  }
</style>
