import { familyService } from '../services/familyService.js'

export const familyController = {
  async create(req, res) {
    try {
      const { name } = req.body
      const family = await familyService.create(name, req.user.id)
      res.status(201).json(family)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async join(req, res) {
    try {
      const { code } = req.body
      const family = await familyService.join(code, req.user.id)
      res.json(family)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  async mine(req, res) {
    try {
      const family = await familyService.getMyFamily(req.user.id)
      if (!family) return res.json(null)
      const ids = await familyService.getFamilyMemberIds(req.user.id)
      res.json({ ...family, memberIds: ids })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}
