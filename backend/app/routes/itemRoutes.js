import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { adminMiddleware } from '../middleware/admin.js'
import { itemController } from '../controllers/itemController.js'
import { upload } from '../../config/multer.js'
import { validateUpload } from '../validation/multerValidation.js'
import { validateCreateItem, validateUpdateItem } from '../validation/itemValidation.js'

const router = Router()

router.use(authMiddleware)

router.get('/', itemController.index)
router.get('/:id', itemController.show)
router.post('/', adminMiddleware, validateCreateItem, itemController.store)
router.put('/:id', adminMiddleware, validateUpdateItem, itemController.update)
router.delete('/:id', adminMiddleware, itemController.destroy)
router.patch('/:id/buy', itemController.buy)
router.post('/:id/photos', adminMiddleware, upload.single('photo'), validateUpload, itemController.uploadPhoto)

export default router
