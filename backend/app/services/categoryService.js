import { categoryRepository } from '../repositories/categoryRepository.js'

export const categoryService = {
  async getAll() {
    return categoryRepository.findAll()
  },

  async getById(id) {
    return categoryRepository.findById(id)
  },

  async create(data) {
    return categoryRepository.create(data)
  },

  async update(id, data) {
    return categoryRepository.update(id, data)
  },

  async delete(id) {
    return categoryRepository.delete(id)
  },
}
