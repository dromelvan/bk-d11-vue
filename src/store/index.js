import Vue from 'vue'
import Vuex from 'vuex'
import AuthenticationService from '../services/authentication.service'

Vue.use(Vuex)

var initialState = {
  status: {
    loggedIn: localStorage.getItem('d11-token') === null
  }
}

export default new Vuex.Store({
  state: initialState,
  mutations: {
    loginSuccess (state, token) {
      localStorage.setItem('d11-token', JSON.stringify(token))
      state.status.loggedIn = true
    },
    loginFailure (state) {
      localStorage.removeItem('d11-token')
      state.status.loggedIn = false
    }
  },
  actions: {
    login ({ commit }, credentials) {
      return AuthenticationService.login(credentials)
        .then(response => {
          commit('loginSuccess', response.data.token)
        })
        .catch(error => {
          commit('loginFailure')
          throw error
        })
    }
  },
  modules: {
  }
})
