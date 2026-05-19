import http from './api.js'

class ExpenseService {
  async getAll(params = '') {
    const { data } = await http.get(`/expenses${params}`)
    return data
  }

  async getById(id) {
    const { data } = await http.get(`/expenses/${id}`)
    return data
  }

  async create(payload) {
    const { data } = await http.post('/expenses', payload)
    return data
  }

  async update(id, payload) {
    const { data } = await http.put(`/expenses/${id}`, payload)
    return data
  }

  async delete(id) {
    const { data } = await http.delete(`/expenses/${id}`)
    return data
  }
}

export const expenseService = new ExpenseService()
