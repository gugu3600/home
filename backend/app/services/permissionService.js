import { permissionRepository } from '../repositories/permissionRepository.js'

export const permissionService = {
  async getAll() {
    return permissionRepository.findAll()
  },

  async getById(id) {
    return permissionRepository.findById(id)
  },

  async create(data) {
    return permissionRepository.create(data)
  },

  async update(id, data) {
    return permissionRepository.update(id, data)
  },

  async delete(id) {
    return permissionRepository.delete(id)
  },
}
