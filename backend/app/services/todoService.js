import { todoRepository } from '../repositories/todoRepository.js'

export const todoService = {
  async getAll(userId) {
    return todoRepository.findByUser(userId)
  },

  async create(data) {
    return todoRepository.create(data)
  },

  async update(id, data) {
    return todoRepository.update(Number(id), data)
  },

  async delete(id) {
    return todoRepository.delete(Number(id))
  },
}
