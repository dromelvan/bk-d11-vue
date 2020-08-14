import axios from 'axios'
import RestService from './rest.service'

const PlayerService = {
  async getPlayer (id) {
    try {
      const response = await axios
        .get(RestService.endpoint('player', { id: id }))
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async getPlayerSeasonInfo (playerId, seasonId) {
    try {
      const response = await axios
        .get(RestService.endpoint('playerSeasonInfo', { playerId: playerId, seasonId: seasonId }))
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async getPlayerSeasonStat (playerId, seasonId) {
    try {
      const response = await axios
        .get(RestService.endpoint('playerSeasonStat', { playerId: playerId, seasonId: seasonId }))
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default PlayerService
