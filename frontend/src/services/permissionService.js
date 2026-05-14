import http from './api.js'

class PermissionService {
  async getAll() {
    const { data } = await http.get('/permissions')
    return data
  }

  async getById(id) {
    const { data } = await http.get(`/permissions/${id}`)
    return data
  }

  async create(payload) {
    const { data } = await http.post('/permissions', payload)
    return data
  }

  async update(id, payload) {
    const { data } = await http.put(`/permissions/${id}`, payload)
    return data
  }

  async delete(id) {
    const { data } = await http.delete(`/permissions/${id}`)
    return data
  }
}

export const permissionService = new PermissionService()
