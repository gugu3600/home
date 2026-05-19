import http from './api.js'

class IncomeService {
  async getAll(params = '') {
    const { data } = await http.get(`/incomes${params}`)
    return data
  }

  async getById(id) {
    const { data } = await http.get(`/incomes/${id}`)
    return data
  }

  async create(payload) {
    const { data } = await http.post('/incomes', payload)
    return data
  }

  async update(id, payload) {
    const { data } = await http.put(`/incomes/${id}`, payload)
    return data
  }

  async delete(id) {
    const { data } = await http.delete(`/incomes/${id}`)
    return data
  }
}

export const incomeService = new IncomeService()
