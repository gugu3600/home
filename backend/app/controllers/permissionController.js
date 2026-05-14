import { permissionService } from '../services/permissionService.js'

export const permissionController = {
  async index(req, res) {
    try {
      const permissions = await permissionService.getAll()
      res.json(permissions)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async show(req, res) {
    try {
      const permission = await permissionService.getById(Number(req.params.id))
      if (!permission) return res.status(404).json({ error: 'Permission not found' })
      res.json(permission)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async store(req, res) {
    try {
      const permission = await permissionService.create(req.body)
      res.status(201).json(permission)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async update(req, res) {
    try {
      const permission = await permissionService.update(Number(req.params.id), req.body)
      res.json(permission)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async destroy(req, res) {
    try {
      await permissionService.delete(Number(req.params.id))
      res.json({ message: 'Permission deleted' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}
