import express from 'express'
import { getOrders, updateProfile, updatePassword, getAdminOrders, updateOrderStatus } from '../controllers/userController.js'
import { protect } from '../middleware/verify-token.middleware.js'
import { admin } from '../middleware/admin.middleware.js'

const router = express.Router()

router.get('/orders', protect, getOrders)
router.get('/admin/orders', protect, admin, getAdminOrders)
router.put('/admin/order/:id', protect, admin, updateOrderStatus)
router.put('/profile', protect, updateProfile)
router.put('/update-password', protect, updatePassword)

export default router
