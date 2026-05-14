import http from './api.js'

class TodoService {
  async getAll() {
    const { data } = await http.get('/todos')
    return data
  }

  async create(payload) {
    const { data } = await http.post('/todos', payload)
    return data
  }

  async update(id, payload) {
    const { data } = await http.put(`/todos/${id}`, payload)
    return data
  }

  async delete(id) {
    const { data } = await http.delete(`/todos/${id}`)
    return data
  }
}

export const todoService = new TodoService()
