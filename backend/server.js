import "dotenv/config";
import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io'
import { prisma } from './config/prisma.js'
import routes from './app/routes/index.js'
import { corsConfig } from './config/cors.js';
import { setupSocket } from './config/socket.js';

const app = express();
const server = http.createServer(app)

const io = new Server(server, {
  cors: { origin: process.env.APP_URL, credentials: true },
})

setupSocket(io)

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig));
app.use('/uploads', express.static('uploads'))

app.use((req, res, next) => {
  req.io = io
  next()
})

app.get('/', (req, res) => {
  res.json({ message: 'Home Management API' })
})

app.use('/api', routes)

server.listen(8000, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:8000`)
})

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
