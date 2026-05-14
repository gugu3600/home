import { categoryService } from '../services/categoryService.js'

export const categoryController = {
  async index(req, res) {
    try {
      const categories = await categoryService.getAll()
      res.json(categories)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async show(req, res) {
    try {
      const category = await categoryService.getById(Number(req.params.id))
      if (!category) return res.status(404).json({ error: 'Category not found' })
      res.json(category)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async store(req, res) {
    try {
      const category = await categoryService.create(req.body)
      res.status(201).json(category)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async update(req, res) {
    try {
      const category = await categoryService.update(Number(req.params.id), req.body)
      res.json(category)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async destroy(req, res) {
    try {
      await categoryService.delete(Number(req.params.id))
      res.json({ message: 'Category deleted' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}
