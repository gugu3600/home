import { roleRepository } from '../repositories/roleRepository.js'

export const roleService = {
  async getAll() {
    return roleRepository.findAll()
  },

  async getById(id) {
    return roleRepository.findById(id)
  },

  async create(data) {
    return roleRepository.create(data)
  },

  async update(id, data) {
    return roleRepository.update(id, data)
  },

  async delete(id) {
    return roleRepository.delete(id)
  },
}
