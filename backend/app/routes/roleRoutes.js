import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { roleController } from '../controllers/roleController.js'
import { validateCreateRole, validateUpdateRole } from '../validation/roleValidation.js'

const router = Router()

router.use(authMiddleware)

router.get('/', roleController.index)
router.get('/:id', roleController.show)
router.post('/', validateCreateRole, roleController.store)
router.put('/:id', validateUpdateRole, roleController.update)
router.delete('/:id', roleController.destroy)

export default router
