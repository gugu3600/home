import { Router } from 'express'
import { authController } from '../controllers/authController.js'
import { authMiddleware } from '../middleware/auth.js'
import { validateLogin } from '../validation/authValidation.js'
import { registerValidate } from '../validation/registerValidation.js';

const router = Router()

router.post("/register",registerValidate,authController.register);
router.post('/login', validateLogin, authController.login)
router.post('/logout', authController.logout)
router.get('/me', authMiddleware, authController.me)

export default router
