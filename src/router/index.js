import Vue from 'vue'
import VueRouter from 'vue-router'
import InitializationService from '../services/initialization.service'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/home/Home.vue') },
  { path: '/about', name: 'about', component: () => import('@/views/home/About.vue') },
  { path: '/seasons', name: 'seasons', component: () => import('@/views/seasons/Seasons.vue') },
  { path: '/seasons/:id', name: 'season', component: () => import('@/views/seasons/Season.vue') },
  { path: '/premier-leagues/:id', name: 'premierLeague', component: () => import('@/views/premier_leagues/PremierLeague.vue') },
  { path: '/match-days/:id', name: 'matchDay', component: () => import('@/views/match_days/MatchDay.vue') },
  { path: '/matches/:id', name: 'match', component: () => import('@/views/matches/Match.vue') },
  { path: '/d11-leagues/:id', name: 'd11League', component: () => import('@/views/d11_leagues/D11League.vue') },
  { path: '/d11-match-days/:id', name: 'd11MatchDay', component: () => import('@/views/d11_match_days/D11MatchDay.vue') },
  { path: '/d11-matches/:id', name: 'd11Match', component: () => import('@/views/d11_matches/D11Match.vue') },
  { path: '/players/:id', name: 'player', component: () => import('@/views/players/Player.vue') },
  { path: '/players/:id/:seasonId', name: 'playerSeason', component: () => import('@/views/players/Player.vue') },
  { path: '/teams/:id/:seasonId', name: 'team' },

  { path: '/about/placeholder', name: 'placeholder' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  InitializationService.initialize()
    .then(() => next())
})

export default router
