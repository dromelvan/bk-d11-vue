<template>
  <div class="d11-match-day" v-if="d11MatchDay">

    <background-picture :type="'d11-match-day'" :id="7" :alt="'TODO'"/>

    <header-section>
      <header-navigation :link="{ name: 'd11League', params: { id: d11MatchDay.d11League.id }}" :text="'D11 ' + d11MatchDay.season.name"/>

      <header-context class="d11-match-day-context">
        <template v-if="smAndUp">
          <div class="date">{{ d11MatchDay.date | moment("dddd, MMMM Do YYYY") }}</div>
          <v-icon medium class="context-icon">mdi-account-multiple</v-icon>
        </template>
        <div class="players-remaining">13 players remaining</div>
        <div class="header-context-link-container">
          <router-link :to="{ name: 'matchDay', params: { id: d11MatchDay.matchDay.id }}">
            Match day {{ d11MatchDay.matchDay.matchDayNumber }}
          </router-link>
        </div>
        <v-icon medium>mdi-chevron-right</v-icon>
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
      <v-container class="h1-container fixtures-and-results">
        <h1>Fixtures and Results</h1>
      </v-container>

      <list-container class="d11-matches-list" v-for="date in Object.keys(d11MatchDay.d11Matches)" :key="'x' + date">
        <template v-slot:header>
          <div class="d11-match-day-date">{{ date | moment("dddd, MMMM Do YYYY") }}</div>
        </template>
        <div v-for="d11MatchId in d11MatchDay.d11Matches[date]" :key="d11MatchId">
          <list-container-item :to="{ name: 'd11Match', params: { id: d11MatchId }}">
            <d11-match-day-d11-match-horizontal v-if="smAndUp" :d11MatchId="d11MatchId"/>
            <d11-match-day-d11-match-vertical v-else :d11MatchId="d11MatchId"/>
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
  name: 'D11MatchDay',
  data: () => ({
    d11MatchDay: null
  }),
  components: {
    ListContainer: () => import('@/components/ListContainer'),
    ListContainerItem: () => import('@/components/ListContainerItem'),
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
