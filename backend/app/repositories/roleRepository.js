import { prisma } from '../../config/prisma.js'

export const roleRepository = {
  findAll() {
    return prisma.role.findMany({ include: { permissions: { include: { permission: true } } } })
  },

  findById(id) {
    return prisma.role.findUnique({ where: { id }, include: { permissions: { include: { permission: true } } } })
  },

  findByName(name) {
    return prisma.role.findUnique({ where: { name } })
  },

  create(data) {
    return prisma.role.create({ data })
  },

  update(id, data) {
    return prisma.role.update({ where: { id }, data })
  },

  delete(id) {
    return prisma.role.delete({ where: { id } })
  },
}
