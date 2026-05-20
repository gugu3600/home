import { io } from 'socket.io-client'

let socket = null

const SERVER_URL = import.meta.env.VITE_API_URL.replace('/api', '')

export function connectSocket(token) {
  if (socket?.connected) {
    socket.disconnect()
    socket = null
  }
  if (!token) return null

  socket = io(SERVER_URL, {
    auth: { token },
    transports: ['websocket'],
  })

  return new Promise((resolve, reject) => {
    socket.on('connect', () => resolve(socket))
    socket.on('connect_error', (err) => reject(err))
    setTimeout(() => reject(new Error('timeout')), 5000)
  })
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export function getSocket() {
  return socket
}
