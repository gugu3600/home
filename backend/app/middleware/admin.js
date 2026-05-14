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

//  Session   New session - 2026-05-13T08:27:44.689Z
//   Continue  opencode -s ses_1df8d0d4effeXvEjAeojJ2T4TQ
