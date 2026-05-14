import { expenseRepository } from '../repositories/expenseRepository.js'

export const expenseService = {
  async getAll(userId) {
    return expenseRepository.findAll(userId)
  },

  async getById(id, userId) {
    return expenseRepository.findById(id, userId)
  },

  async create(data) {
    return expenseRepository.create(data)
  },

  async update(id, data) {
    return expenseRepository.update(id, data)
  },

  async delete(id) {
    return expenseRepository.delete(id)
  },

  async total(userId) {
    const result = await expenseRepository.total(userId)
    return result._sum.amount || 0
  },
}
