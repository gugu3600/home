import http from './api.js'

class InventoryService {
  async getAll() {
    const { data } = await http.get('/inventory')
    return data
  }

  async adjust(id, delta) {
    const { data } = await http.patch(`/inventory/${id}`, { delta })
    return data
  }

  async remove(id) {
    const { data } = await http.delete(`/inventory/${id}`)
    return data
  }
}

export const inventoryService = new InventoryService()
