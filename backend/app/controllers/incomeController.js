import { incomeService } from '../services/incomeService.js'

export const incomeController = {
  async index(req, res) {
    try {
      const incomes = await incomeService.getAll(req.user.id)
      res.json(incomes)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async show(req, res) {
    try {
      const income = await incomeService.getById(Number(req.params.id), req.user.id)
      if (!income) return res.status(404).json({ error: 'Income not found' })
      res.json(income)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async store(req, res) {
    try {
      const data = { ...req.body, userId: req.user.id, date: req.body.date ? new Date(req.body.date) : new Date() }
      const income = await incomeService.create(data)
      res.status(201).json(income)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async update(req, res) {
    try {
      const income = await incomeService.update(Number(req.params.id), req.body)
      res.json(income)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async destroy(req, res) {
    try {
      await incomeService.delete(Number(req.params.id))
      res.json({ message: 'Income deleted' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}
