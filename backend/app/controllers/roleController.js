import { roleService } from '../services/roleService.js'

export const roleController = {
  async index(req, res) {
    try {
      const roles = await roleService.getAll()
      res.json(roles)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async show(req, res) {
    try {
      const role = await roleService.getById(Number(req.params.id))
      if (!role) return res.status(404).json({ error: 'Role not found' })
      res.json(role)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async store(req, res) {
    try {
      const role = await roleService.create(req.body)
      res.status(201).json(role)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async update(req, res) {
    try {
      const role = await roleService.update(Number(req.params.id), req.body)
      res.json(role)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async destroy(req, res) {
    try {
      await roleService.delete(Number(req.params.id))
      res.json({ message: 'Role deleted' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}
