import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { wishlistController } from '../controllers/wishlistController.js'

const router = Router()

router.use(authMiddleware)

router.get('/', wishlistController.index)
router.post('/', wishlistController.store)
router.delete('/:id', wishlistController.destroy)

export default router
