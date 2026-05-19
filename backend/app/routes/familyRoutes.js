import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { familyController } from '../controllers/familyController.js'

const router = Router()
router.use(authMiddleware)

router.post('/', familyController.create)
router.post('/join', familyController.join)
router.get('/mine', familyController.mine)

export default router
