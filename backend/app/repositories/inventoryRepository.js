import { prisma } from '../../config/prisma.js'

export const inventoryRepository = {
  findByUser(userId) {
    return prisma.inventory.findMany({
      where: { userId },
      include: { item: { include: { category: true, photos: true } } },
      orderBy: { updatedAt: 'desc' },
    })
  },

  findById(id) {
    return prisma.inventory.findUnique({ where: { id } })
  },

  upsert(userId, itemId, quantityDelta) {
    return prisma.inventory.upsert({
      where: { userId_itemId: { userId, itemId } },
      update: { quantity: { increment: quantityDelta } },
      create: { userId, itemId, quantity: Math.max(quantityDelta, 1) },
    })
  },

  update(id, data) {
    return prisma.inventory.update({ where: { id }, data })
  },

  delete(id) {
    return prisma.inventory.delete({ where: { id } })
  },

  countByItemId(itemId) {
    return prisma.inventory.count({ where: { itemId } })
  },

  findFirstByItemId(itemId) {
    return prisma.inventory.findFirst({ where: { itemId } })
  },
}
