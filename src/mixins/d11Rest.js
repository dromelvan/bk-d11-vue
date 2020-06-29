// import router from '@/router'

var d11Rest = {
  data: () => ({
    endpoints: {
      seasons: 'seasons',
      seasonIds: 'seasons/ids',
      season: 'seasons/:id',

      premierLeague: 'premier-leagues/:id',
      matchDay: 'match-days/:id',
      match: 'matches/:id',
      matchEvents: 'matches/:id/events',

      d11League: 'd11-leagues/:id',
      d11MatchDay: 'd11-match-days/:id',
      d11Match: 'd11-matches/:id',

      playerMatchStatsByMatchId: 'player-match-stats/match/:id',

      teamTableStatsByMatchDayId: 'team-table-stats/match-day/:id',
      d11TeamTableStatsByMatchDayId: 'd11-team-table-stats/d11-match-day/:id'
    }
  }),
  methods: {
    // route: function (name) {
    //   return router.resolve({ name: name }).href
    // },
    d11RestHost () {
      return process.env.VUE_APP_D11_REST_API_HOST
    },
    endpoint: function (name, params) {
      var endpoint = this.d11RestHost() + this.endpoints[name]
      if (params) {
        for (var param in params) {
          endpoint = endpoint.replace(':' + param, params[param])
        }
      }
      console.log(endpoint)
      return endpoint
    }
  }
}

export default d11Rest
