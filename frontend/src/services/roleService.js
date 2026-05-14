import http from './api.js'

class RoleService {
  async getAll() {
    const { data } = await http.get('/roles')
    return data
  }

  async getById(id) {
    const { data } = await http.get(`/roles/${id}`)
    return data
  }

  async create(payload) {
    const { data } = await http.post('/roles', payload)
    return data
  }

  async update(id, payload) {
    const { data } = await http.put(`/roles/${id}`, payload)
    return data
  }

  async delete(id) {
    const { data } = await http.delete(`/roles/${id}`)
    return data
  }
}

export const roleService = new RoleService()
