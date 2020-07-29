import axios from 'axios'
import RestService from './rest.service'

const AuthenticationService = {
  login (credentials) {
    return axios
      .post(RestService.endpoint('authenticate', {}), credentials)
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export default AuthenticationService
