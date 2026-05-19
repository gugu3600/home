import http from './api.js'

class StatsService {
  async dashboard(family = false) {
    const params = family ? '?family=true' : ''
    const { data } = await http.get(`/stats/dashboard${params}`)
    return data
  }
}

export const statsService = new StatsService()
