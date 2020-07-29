import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var initialState = {
  status: {
    loggedIn: localStorage.getItem('d11-token') === null
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
    }
  },
  actions: {
    login ({ commit }, token) {
      commit('loggedIn', token)
    },
    logout ({ commit }) {
      commit('loggedOut')
    }
  },
  modules: {
  }
})
