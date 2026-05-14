import { wishlistRepository } from '../repositories/wishlistRepository.js'

export const wishlistService = {
  async getAll(userId) {
    return wishlistRepository.findByUser(userId)
  },

  async add(userId, itemId) {
    return wishlistRepository.create(userId, Number(itemId))
  },

  async remove(id, userId) {
    return wishlistRepository.delete(Number(id), userId)
  },
}
