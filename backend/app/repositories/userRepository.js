import { prisma } from '../../config/prisma.js'

export const userRepository = {
  findAll() {
    return prisma.user.findMany({ include: { role: true } })
  },

  findById(id) {
    return prisma.user.findUnique({ where: { id }, include: { role: true } })
  },

  findByEmail(email) {
    return prisma.user.findUnique({ where: { email }, include: { role: true } })
  },

  create(data) {
    return prisma.user.create({ data })
  },

  update(id, data) {
    return prisma.user.update({ where: { id }, data })
  },

  delete(id) {
    return prisma.user.delete({ where: { id } })
  },
}
