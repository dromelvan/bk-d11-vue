import axios from 'axios'
import RestService from './rest.service'

const SearchService = {
  async search (search) {
    try {
      const response = await axios
        .get(RestService.endpoint('search', { search }))
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default SearchService
