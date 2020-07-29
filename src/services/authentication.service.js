import axios from 'axios'
import RestService from './rest.service'

const AuthenticationService = {
  login (credentials) {
    return axios
      .post(RestService.endpoint('authenticate', {}), credentials)
      .then(response => {
        credentials.valid = true
        return Promise.resolve(response)
      })
      .catch(() => {
        credentials.valid = false
      })
  }
}

export default AuthenticationService
