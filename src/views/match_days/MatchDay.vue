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

      <header-content-background>
        <header-content class="match-day-name">
          <v-btn icon :to="{ name: 'matchDay', params: { id: matchDay.id - 1 }}" class="previous-btn"><v-icon x-large>mdi-chevron-left</v-icon></v-btn>
          Match Day {{ matchDay.matchDayNumber }} <template v-if="smAndUp">{{ matchDay.season.name }}</template>
          <v-btn icon :to="{ name: 'matchDay', params: { id: matchDay.id + 1 }}" class="next-btn"><v-icon x-large>mdi-chevron-right</v-icon></v-btn>
        </header-content>
      </header-content-background>
    </header-section>

    <content-section>
      <v-container>
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
      </v-container>
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
    HeaderSection: () => import('@/components/header/HeaderSection'),
    BackgroundPicture: () => import('@/components/header/BackgroundPicture'),
    HeaderNavigation: () => import('@/components/header/HeaderNavigation'),
    HeaderContext: () => import('@/components/header/HeaderContext'),
    HeaderContent: () => import('@/components/header/HeaderContent'),
    HeaderContentBackground: () => import('@/components/header/HeaderContentBackground'),
    ContentSection: () => import('@/components/ContentSection'),
    MatchDayMatch: () => import('@/views/match_days/MatchDayMatch'),
    MatchDayMatchEvents: () => import('@/views/match_days/MatchDayMatchEvents')
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
