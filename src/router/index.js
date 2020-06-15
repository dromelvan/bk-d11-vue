import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/home/Home.vue') },
  { path: '/about', name: 'about', component: () => import('@/views/home/About.vue') },
  { path: '/seasons', name: 'seasons', component: () => import('@/views/seasons/Seasons.vue') },
  { path: '/premier-leagues/:id', name: 'premierLeague' },
  { path: '/match-days/:id', name: 'matchDay', component: () => import('@/views/match_days/MatchDay.vue') },
  { path: '/matches/:id', name: 'match', component: () => import('@/views/matches/Match.vue') },

  { path: '/about/placeholder', name: 'placeholder' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
