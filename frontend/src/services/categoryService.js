import http from './api.js'

class CategoryService {
  async getAll() {
    const { data } = await http.get('/categories')
    return data
  }

  async getById(id) {
    const { data } = await http.get(`/categories/${id}`)
    return data
  }

  async create(payload) {
    const { data } = await http.post('/categories', payload)
    return data
  }

  async update(id, payload) {
    const { data } = await http.put(`/categories/${id}`, payload)
    return data
  }

  async delete(id) {
    const { data } = await http.delete(`/categories/${id}`)
    return data
  }
}

export const categoryService = new CategoryService()
