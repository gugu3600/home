import http from './api.js'

class ItemService {
  async getAll() {
    const { data } = await http.get('/items')
    return data
  }

  async getById(id) {
    const { data } = await http.get(`/items/${id}`)
    return data
  }

  async create(payload) {
    const { data } = await http.post('/items', payload)
    return data
  }

  async update(id, payload) {
    const { data } = await http.put(`/items/${id}`, payload)
    return data
  }

  async delete(id) {
    const { data } = await http.delete(`/items/${id}`)
    return data
  }

  async buy(id) {
    const { data } = await http.patch(`/items/${id}/buy`)
    return data
  }

  async uploadPhoto(id, formData) {
    const { data } = await http.post(`/items/${id}/photos`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  }
}

export const itemService = new ItemService()
