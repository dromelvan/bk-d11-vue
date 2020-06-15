// import router from '@/router'

var d11Rest = {
  data: () => ({
    endpoints: {
      seasons: 'seasons',
      seasonIds: 'seasons/ids',
      season: 'seasons/:id',

      matchDay: 'match-days/:id',

      match: 'matches/:id',
      matchEvents: 'matches/:id/events',
      matchStats: 'matches/:id/stats'
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
