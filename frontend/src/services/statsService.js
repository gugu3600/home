import http from './api.js'

class StatsService {
  async dashboard() {
    const { data } = await http.get('/stats/dashboard')
    return data
  }
}

export const statsService = new StatsService()
