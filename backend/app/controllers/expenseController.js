import { expenseService } from '../services/expenseService.js'
import { familyService } from '../services/familyService.js'
import { notifyFamily } from '../../config/socket.js'

export const expenseController = {
  async index(req, res) {
    try {
      const userIds = req.query.family ? await familyService.getFamilyMemberIds(req.user.id) : [req.user.id]
      const expenses = await expenseService.getByUserIds(userIds)
      res.json(expenses)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async show(req, res) {
    try {
      const expense = await expenseService.getById(Number(req.params.id), req.user.id)
      if (!expense) return res.status(404).json({ error: 'Expense not found' })
      res.json(expense)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async store(req, res) {
    try {
      const data = { ...req.body, userId: req.user.id, date: req.body.date ? new Date(req.body.date) : new Date() }
      const expense = await expenseService.create(data)
      const full = await expenseService.getById(expense.id, req.user.id)
      notifyFamily(req.io, req.user.id, 'new:expense', full)
      res.status(201).json(expense)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async update(req, res) {
    try {
      const expense = await expenseService.update(Number(req.params.id), req.body)
      res.json(expense)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async destroy(req, res) {
    try {
      const expense = await expenseService.getById(Number(req.params.id), req.user.id)
      await expenseService.delete(Number(req.params.id))
      if (expense) notifyFamily(req.io, req.user.id, 'delete:expense', expense)
      res.json({ message: 'Expense deleted' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}
