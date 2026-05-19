import "dotenv/config";
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { prisma } from './config/prisma.js'
import routes from './app/routes/index.js'
import { corsConfig } from './config/cors.js';
 

const app = express();
// const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig));
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
  res.json({ message: 'Home Management API' })
})

app.use('/api', routes)

app.listen(8000,"0.0.0.0", () => {
  console.log(`Server running on http://localhost:8000`)
})

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
