import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { todoController } from '../controllers/todoController.js'

const router = Router()

router.use(authMiddleware)

router.get('/', todoController.index)
router.post('/', todoController.store)
router.put('/:id', todoController.update)
router.delete('/:id', todoController.destroy)

export default router
