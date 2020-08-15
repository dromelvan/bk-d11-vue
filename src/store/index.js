import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var initialState = {
  status: {
    initialized: false,
    loggedIn: localStorage.getItem('d11-token') !== null
  },
  current: {
    season: null
  }
}

export default new Vuex.Store({
  state: initialState,
  mutations: {
    loggedIn (state, token) {
      localStorage.setItem('d11-token', JSON.stringify(token))
      state.status.loggedIn = true
    },
    loggedOut (state) {
      localStorage.removeItem('d11-token')
      state.status.loggedIn = false
    },
    initialized (state, current) {
      state.current = current
      state.status.initialized = true
      console.log('Initialized with current season ' + state.current.season.name)
    }
  },
  actions: {
    login ({ commit }, token) {
      commit('loggedIn', token)
    },
    logout ({ commit }) {
      commit('loggedOut')
    },
    initialize ({ commit }, current) {
      commit('initialized', current)
    }
  },
  modules: {
  },
  getters: {
    initialized: state => {
      return state.status.initialized
    },
    currentSeason: state => {
      return state.current.season
    }
  }
})
