import { prisma } from '../../config/prisma.js'

export async function adminMiddleware(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { role: true },
    })

    if (!user || user.role?.name !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' })
    }

    next()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
