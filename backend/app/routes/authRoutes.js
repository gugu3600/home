import { Router } from 'express'
import { authController } from '../controllers/authController.js'
import { authMiddleware } from '../middleware/auth.js'
import { validateLogin } from '../validation/authValidation.js'

const router = Router()

router.post('/login', validateLogin, authController.login)
router.post('/logout', authController.logout)
router.get('/me', authMiddleware, authController.me)

export default router
