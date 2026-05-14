import { prisma } from '../../config/prisma.js'

export const expenseRepository = {
  findAll(userId) {
    return prisma.expense.findMany({ where: { userId }, orderBy: { date: 'desc' } })
  },

  findById(id, userId) {
    return prisma.expense.findFirst({ where: { id, userId } })
  },

  create(data) {
    return prisma.expense.create({ data })
  },

  update(id, data) {
    return prisma.expense.update({ where: { id }, data })
  },

  delete(id) {
    return prisma.expense.delete({ where: { id } })
  },

  total(userId) {
    return prisma.expense.aggregate({ where: { userId }, _sum: { amount: true } })
  },
}
