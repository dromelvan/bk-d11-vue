import axios from 'axios'
import RestService from './rest.service'

const CurrentService = {
  async currentSeason () {
    try {
      const response = await axios
        .get(RestService.endpoint('currentSeason', {}))
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async currentMatchDay () {
    try {
      const response = await axios
        .get(RestService.endpoint('currentMatchDay', {}))
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default CurrentService
