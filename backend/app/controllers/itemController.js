import { itemService } from '../services/itemService.js'
import { photoService } from '../services/photoService.js'
import { expenseService } from '../services/expenseService.js'
import { inventoryRepository } from '../repositories/inventoryRepository.js'

export const itemController = {
  async index(req, res) {
    try {
      const items = await itemService.getAll()
      res.json(items)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async show(req, res) {
    try {
      const item = await itemService.getById(Number(req.params.id))
      if (!item) return res.status(404).json({ error: 'Item not found' })
      res.json(item)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async store(req, res) {
    try {
      const item = await itemService.create(req.body)
      await inventoryRepository.upsert(req.user.id, item.id, item.quantity || 1)
      const result = await itemService.getById(item.id)
      res.status(201).json(result)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async update(req, res) {
    try {
      const item = await itemService.update(Number(req.params.id), req.body)
      res.json(item)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async destroy(req, res) {
    try {
      await itemService.delete(Number(req.params.id))
      res.json({ message: 'Item deleted' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async buy(req, res) {
    try {
      const id = Number(req.params.id)
      const item = await itemService.getById(id)
      if (!item) return res.status(404).json({ error: 'Item not found' })
      if (item.purchased) return res.status(400).json({ error: 'Item already purchased' })

      const updated = await itemService.update(id, { purchased: true, quantity: { decrement: 1 } })

      await expenseService.create({
        title: item.name,
        amount: item.price,
        date: new Date(),
        userId: req.user.id,
        itemId: id,
      })

      await inventoryRepository.upsert(req.user.id, id, 1)

      const result = await itemService.getById(id)
      res.json(result)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async uploadPhoto(req, res) {
    try {
      const photo = await photoService.create({
        url: `/uploads/${req.file.filename}`,
        itemId: Number(req.params.id),
      })
      res.status(201).json(photo)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}
