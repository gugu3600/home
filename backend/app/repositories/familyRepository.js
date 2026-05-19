import { prisma } from '../../config/prisma.js'

export const familyRepository = {
  create(data) {
    return prisma.family.create({ data })
  },

  findByCode(code) {
    return prisma.family.findUnique({ where: { code } })
  },

  findById(id) {
    return prisma.family.findUnique({ where: { id }, include: { users: { include: { user: true } } } })
  },

  findByUser(userId) {
    return prisma.familyUser.findMany({ where: { userId }, include: { family: true } })
  },

  addMember(familyId, userId) {
    return prisma.familyUser.create({ data: { familyId, userId } })
  },

  getFamilyUserIds(userId) {
    return prisma.familyUser.findMany({
      where: { family: { users: { some: { userId } } } },
      select: { userId: true },
    })
  },
}
