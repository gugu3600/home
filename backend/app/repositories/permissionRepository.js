import { prisma } from '../../config/prisma.js'

export const permissionRepository = {
  findAll() {
    return prisma.permission.findMany()
  },

  findById(id) {
    return prisma.permission.findUnique({ where: { id } })
  },

  findByName(name) {
    return prisma.permission.findUnique({ where: { name } })
  },

  create(data) {
    return prisma.permission.create({ data })
  },

  update(id, data) {
    return prisma.permission.update({ where: { id }, data })
  },

  delete(id) {
    return prisma.permission.delete({ where: { id } })
  },
}
