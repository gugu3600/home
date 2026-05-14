import { inventoryService } from '../services/inventoryService.js'

export const inventoryController = {
  async index(req, res) {
    try {
      const items = await inventoryService.getAll(req.user.id)
      console.log("Inventory get successfully");
      
      return res.json(items)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },

  async adjust(req, res) {
    try {
      const { delta } = req.body
      const inv = await inventoryService.adjust(Number(req.params.id), delta, req.user.id)
      res.json(inv)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async destroy(req, res) {
    try {
      await inventoryService.remove(Number(req.params.id))
      res.json({ message: 'Removed from inventory' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}
