import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { adminMiddleware } from '../middleware/admin.js'
import { categoryController } from '../controllers/categoryController.js'
import { validateCreateCategory, validateUpdateCategory } from '../validation/categoryValidation.js'

const router = Router()

router.use(authMiddleware)

router.get('/', categoryController.index)
router.get('/:id', categoryController.show)
router.post('/', adminMiddleware, validateCreateCategory, categoryController.store)
router.put('/:id', adminMiddleware, validateUpdateCategory, categoryController.update)
router.delete('/:id', adminMiddleware, categoryController.destroy)

export default router
