import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { permissionController } from '../controllers/permissionController.js'
import { validateCreatePermission, validateUpdatePermission } from '../validation/permissionValidation.js'

const router = Router()

router.use(authMiddleware)

router.get('/', permissionController.index)
router.get('/:id', permissionController.show)
router.post('/', validateCreatePermission, permissionController.store)
router.put('/:id', validateUpdatePermission, permissionController.update)
router.delete('/:id', permissionController.destroy)

export default router
