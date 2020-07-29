import axios from 'axios'
import RestService from './rest.service'

const AuthenticationService = {
  async login (credentials) {
    try {
      const response = await axios
        .post(RestService.endpoint('authenticate', {}), credentials)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default AuthenticationService
