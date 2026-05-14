import { prisma } from '../../config/prisma.js'

export const itemRepository = {
  findAll() {
    return prisma.item.findMany({ include: { category: true, photos: true } })
  },

  findById(id) {
    return prisma.item.findUnique({ where: { id }, include: { category: true, photos: true } })
  },

  create(data) {
    return prisma.item.create({ data })
  },

  update(id, data) {
    return prisma.item.update({ where: { id }, data })
  },

  delete(id) {
    return prisma.item.delete({ where: { id } })
  },
}
