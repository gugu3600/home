import { itemRepository } from '../repositories/itemRepository.js'

export const itemService = {
  async getAll() {
    return itemRepository.findAll()
  },

  async getById(id) {
    return itemRepository.findById(id)
  },

  async create(data) {
    return itemRepository.create(data)
  },

  async update(id, data) {
    return itemRepository.update(id, data)
  },

  async delete(id) {
    return itemRepository.delete(id)
  },
}
