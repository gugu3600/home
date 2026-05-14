import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { statsController } from '../controllers/statsController.js'

const router = Router()

router.use(authMiddleware)

router.get('/dashboard', statsController.dashboard)

export default router
