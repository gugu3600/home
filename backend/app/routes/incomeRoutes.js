import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { incomeController } from '../controllers/incomeController.js'

const router = Router()

router.use(authMiddleware)

router.get('/', incomeController.index)
router.get('/:id', incomeController.show)
router.post('/', incomeController.store)
router.put('/:id', incomeController.update)
router.delete('/:id', incomeController.destroy)

export default router
