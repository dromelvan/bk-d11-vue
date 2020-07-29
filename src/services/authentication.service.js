import axios from 'axios'
import store from '../store/index'
import RestService from './rest.service'

const AuthenticationService = {
  async login (credentials) {
    try {
      const response = await axios
        .post(RestService.endpoint('authenticate', {}), credentials)
      store.dispatch('login', response.data.token)
      return Promise.resolve(response)
    } catch (error) {
      store.dispatch('logout')
      return Promise.reject(error)
    }
  }
}

export default AuthenticationService
