import { prisma } from '../../config/prisma.js'

export const photoRepository = {
  findAll() {
    return prisma.photo.findMany()
  },

  findById(id) {
    return prisma.photo.findUnique({ where: { id } })
  },

  findByItemId(itemId) {
    return prisma.photo.findMany({ where: { itemId } })
  },

  create(data) {
    return prisma.photo.create({ data })
  },

  delete(id) {
    return prisma.photo.delete({ where: { id } })
  },
}
