import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { expenseController } from '../controllers/expenseController.js'

const router = Router()

router.use(authMiddleware)

router.get('/', expenseController.index)
router.get('/:id', expenseController.show)
router.post('/', expenseController.store)
router.put('/:id', expenseController.update)
router.delete('/:id', expenseController.destroy)

export default router
