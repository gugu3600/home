import { wishlistService } from '../services/wishlistService.js'
import { familyService } from '../services/familyService.js'

export const wishlistController = {
  async index(req, res) {
    try {
      const userIds = req.query.family ? await familyService.getFamilyMemberIds(req.user.id) : [req.user.id]
      const items = await wishlistService.getByUserIds(userIds)
      res.json(items)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async store(req, res) {
    try {
      const item = await wishlistService.add(req.user.id, req.body.itemId)
      res.status(201).json(item)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async destroy(req, res) {
    try {
      await wishlistService.remove(req.params.id, req.user.id)
      res.json({ message: 'Removed from wishlist' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}
