import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { inventoryController } from '../controllers/inventoryController.js'

const router = Router()

router.use(authMiddleware)

router.get('/', inventoryController.index)
router.patch('/:id', inventoryController.adjust)
router.delete('/:id', inventoryController.destroy)

export default router
