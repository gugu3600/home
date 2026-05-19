import { incomeRepository } from '../repositories/incomeRepository.js'

export const incomeService = {
  async getAll(userId) {
    return incomeRepository.findAll(userId)
  },

  async getByUserIds(userIds) {
    return incomeRepository.findAllByUserIds(userIds)
  },

  async getById(id, userId) {
    return incomeRepository.findById(id, userId)
  },

  async create(data) {
    return incomeRepository.create(data)
  },

  async update(id, data) {
    return incomeRepository.update(id, data)
  },

  async delete(id) {
    return incomeRepository.delete(id)
  },

  async total(userId) {
    const result = await incomeRepository.total(userId)
    return result._sum.amount || 0
  },
}
