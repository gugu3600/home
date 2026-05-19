import http from './api.js'

class WishlistService {
  async getAll(params = '') {
    const { data } = await http.get(`/wishlists${params}`)
    return data
  }

  async add(itemId) {
    const { data } = await http.post('/wishlists', { itemId })
    return data
  }

  async remove(id) {
    const { data } = await http.delete(`/wishlists/${id}`)
    return data
  }
}

export const wishlistService = new WishlistService()
