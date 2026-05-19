import crypto from 'crypto'
import { familyRepository } from '../repositories/familyRepository.js'

export const familyService = {
  async create(name, userId) {
    const code = crypto.randomBytes(4).toString('hex')
    const family = await familyRepository.create({ name, code })
    await familyRepository.addMember(family.id, userId)
    return family
  },

  async join(code, userId) {
    const family = await familyRepository.findByCode(code)
    if (!family) throw new Error('Family not found')
    const exists = await familyRepository.findByUser(userId)
    if (exists.some((f) => f.family.id === family.id)) throw new Error('Already in this family')
    await familyRepository.addMember(family.id, userId)
    return family
  },

  async getMyFamily(userId) {
    const memberships = await familyRepository.findByUser(userId)
    if (!memberships.length) return null
    const family = await familyRepository.findById(memberships[0].familyId)
    return family
  },

  async getFamilyMemberIds(userId) {
    const members = await familyRepository.getFamilyUserIds(userId)
    const ids = members.map((m) => m.userId)
    return [...new Set([userId, ...ids])]
  },
}
