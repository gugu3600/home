import { inventoryService } from '../services/inventoryService.js'
import { familyService } from '../services/familyService.js'

export const inventoryController = {
  async index(req, res) {
    try {
      const userIds = req.query.family ? await familyService.getFamilyMemberIds(req.user.id) : [req.user.id]
      const items = await inventoryService.getByUserIds(userIds)
      return res.json(items)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },

  async adjust(req, res) {
    try {
      const { delta } = req.body
      const inv = await inventoryService.adjust(Number(req.params.id), delta, req.user.id)
      return res.json(inv)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },

  async destroy(req, res) {
    try {
      await inventoryService.remove(Number(req.params.id))
      return res.json({ message: 'Removed from inventory' })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
}
