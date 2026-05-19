import { Router } from 'express'
import authRoutes from './authRoutes.js'
import roleRoutes from './roleRoutes.js'
import permissionRoutes from './permissionRoutes.js'
import categoryRoutes from './categoryRoutes.js'
import itemRoutes from './itemRoutes.js'
import incomeRoutes from './incomeRoutes.js'
import expenseRoutes from './expenseRoutes.js'
import wishlistRoutes from './wishlistRoutes.js'
import todoRoutes from './todoRoutes.js'
import inventoryRoutes from './inventoryRoutes.js'
import statsRoutes from './statsRoutes.js'
import familyRoutes from './familyRoutes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/roles', roleRoutes)
router.use('/permissions', permissionRoutes)
router.use('/categories', categoryRoutes)
router.use('/items', itemRoutes)
router.use('/incomes', incomeRoutes)
router.use('/expenses', expenseRoutes)
router.use('/wishlists', wishlistRoutes)
router.use('/todos', todoRoutes)
router.use('/inventory', inventoryRoutes)
router.use('/stats', statsRoutes)
router.use('/families', familyRoutes)

export default router
