import { prisma } from '../../config/prisma.js'

export const incomeRepository = {
  findAll(userId) {
    return prisma.income.findMany({ where: { userId }, orderBy: { date: 'desc' }, include: { user: { select: { id: true, name: true } } } })
  },

  findAllByUserIds(userIds) {
    return prisma.income.findMany({
      where: { userId: { in: userIds } },
      orderBy: { date: 'desc' },
      include: { user: { select: { id: true, name: true } } },
    })
  },

  findById(id, userId) {
    return prisma.income.findFirst({ where: { id, userId } })
  },

  create(data) {
    return prisma.income.create({ data })
  },

  update(id, data) {
    return prisma.income.update({ where: { id }, data })
  },

  delete(id) {
    return prisma.income.delete({ where: { id } })
  },

  total(userId) {
    return prisma.income.aggregate({ where: { userId }, _sum: { amount: true } })
  },
}
