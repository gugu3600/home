import jwt from 'jsonwebtoken'
import { familyService } from '../app/services/familyService.js'

const JWT_SECRET = process.env.JWT_SECRET

const userSockets = new Map()

export function setupSocket(io) {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token
    if (!token) return next(new Error('Not authenticated'))
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      socket.userId = decoded.id
      next()
    } catch {
      next(new Error('Invalid token'))
    }
  })

  io.on('connection', (socket) => {
    if (!userSockets.has(socket.userId)) userSockets.set(socket.userId, new Set())
    userSockets.get(socket.userId).add(socket.id)

    socket.join(`user:${socket.userId}`)

    socket.on('disconnect', () => {
      const sockets = userSockets.get(socket.userId)
      if (sockets) {
        sockets.delete(socket.id)
        if (sockets.size === 0) userSockets.delete(socket.userId)
      }
    })
  })

  return io
}

export async function notifyFamily(io, userId, event, data) {
  try {
    const memberIds = await familyService.getFamilyMemberIds(userId)
    for (const memberId of memberIds) {
      if (memberId !== userId) {
        io.to(`user:${memberId}`).emit(event, data)
      }
    }
  } catch (err) {
    console.error('Socket notification error:', err.message)
  }
}
