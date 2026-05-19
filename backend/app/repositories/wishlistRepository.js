import { prisma } from '../../config/prisma.js'

export const wishlistRepository = {
  findByUser(userId) {
    return prisma.wishlist.findMany({
      where: { userId },
      include: { item: { include: { category: true, photos: true } }, user: { select: { id: true, name: true } } },
    })
  },

  findByUserIds(userIds) {
    return prisma.wishlist.findMany({
      where: { userId: { in: userIds } },
      include: { item: { include: { category: true, photos: true } }, user: { select: { id: true, name: true } } },
    })
  },

  create(userId, itemId) {
    return prisma.wishlist.create({ data: { userId, itemId } })
  },

  delete(id, userId) {
    return prisma.wishlist.deleteMany({ where: { id, userId } })
  },
}
