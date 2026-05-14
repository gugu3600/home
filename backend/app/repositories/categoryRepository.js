import { prisma } from '../../config/prisma.js'

export const categoryRepository = {
  findAll() {
    return prisma.category.findMany({ include: { items: true } })
  },

  findById(id) {
    return prisma.category.findUnique({ where: { id }, include: { items: true } })
  },

  create(data) {
    return prisma.category.create({ data })
  },

  update(id, data) {
    return prisma.category.update({ where: { id }, data })
  },

  delete(id) {
    return prisma.category.delete({ where: { id } })
  },
}
