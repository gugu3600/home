import bcrypt from 'bcrypt'
import { userRepository } from '../repositories/userRepository.js'

export const userService = {
  async getAll() {
    return userRepository.findAll()
  },

  async getById(id) {
    return userRepository.findById(id)
  },

  async getByEmail(email) {
    return userRepository.findByEmail(email)
  },

  async create(data) {
    const hashed = await bcrypt.hash(data.password, 10)
    return userRepository.create({ ...data, password: hashed,roleId : 2 })
  },

  async update(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10)
    }
    return userRepository.update(id, data)
  },

  async delete(id) {
    return userRepository.delete(id)
  },
}
