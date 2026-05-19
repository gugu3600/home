import { incomeService } from '../services/incomeService.js'
import { familyService } from '../services/familyService.js'

export const incomeController = {
  async index(req, res) {
    try {
      const userIds = req.query.family ? await familyService.getFamilyMemberIds(req.user.id) : [req.user.id]
      const incomes = await incomeService.getByUserIds(userIds)
      return res.json(incomes)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },

  async show(req, res) {
    try {
      const income = await incomeService.getById(Number(req.params.id), req.user.id)
      if (!income) return res.status(404).json({ error: 'Income not found' })
      return res.json(income)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async store(req, res) {
    try {
      const data = { ...req.body, userId: req.user.id, date: req.body.date ? new Date(req.body.date) : new Date() }
      const income = await incomeService.create(data)
      return res.status(201).json(income)
    } catch (err) {
      return res.status(500).json({ error: err.message })
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
