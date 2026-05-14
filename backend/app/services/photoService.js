import { photoRepository } from '../repositories/photoRepository.js'

export const photoService = {
  async getAll() {
    return photoRepository.findAll()
  },

  async getById(id) {
    return photoRepository.findById(id)
  },

  async getByItemId(itemId) {
    return photoRepository.findByItemId(itemId)
  },

  async create(data) {
    return photoRepository.create(data)
  },

  async delete(id) {
    return photoRepository.delete(id)
  },
}
