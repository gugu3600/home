import http from './api.js'

class FamilyService {
  async create(name) {
    const { data } = await http.post('/families', { name })
    return data
  }

  async join(code) {
    const { data } = await http.post('/families/join', { code })
    return data
  }

  async mine() {
    const { data } = await http.get('/families/mine')
    return data
  }
}

export const familyService = new FamilyService()
