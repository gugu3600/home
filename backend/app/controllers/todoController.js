import { todoService } from '../services/todoService.js'

export const todoController = {
  async index(req, res) {
    try {
      const todos = await todoService.getAll(req.user.id)
      res.json(todos)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async store(req, res) {
    try {
      const todo = await todoService.create({ ...req.body, userId: req.user.id })
      res.status(201).json(todo)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async update(req, res) {
    try {
      const todo = await todoService.update(req.params.id, req.body)
      res.json(todo)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async destroy(req, res) {
    try {
      await todoService.delete(req.params.id)
      res.json({ message: 'Todo deleted' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}
