import store from '../store/index'
import CurrentService from './current.service'

const InitializationService = {
  async initialize () {
    const response = await CurrentService.currentSeason()
    store.dispatch('initialize', { season: response.data })
  }
}

export default InitializationService
