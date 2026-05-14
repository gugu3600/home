import { prisma } from '../../config/prisma.js'

export const todoRepository = {
  findByUser(userId) {
    return prisma.todo.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  },

  create(data) {
    return prisma.todo.create({ data })
  },

  update(id, data) {
    return prisma.todo.update({ where: { id }, data })
  },

  delete(id) {
    return prisma.todo.delete({ where: { id } })
  },
}
