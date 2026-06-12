import express from 'express'
import { getOrders, updateProfile, updatePassword, getAdminOrders, updateOrderStatus, getAllUsers } from '../controllers/userController.js'
import { protect } from '../middleware/verify-token.middleware.js'
import { admin } from '../middleware/admin.middleware.js'
import { getQuickStats, revenueOverview } from '../controllers/overviewController.js'

const router = express.Router()

router.get('/orders', protect, getOrders)
router.get('/admin/orders', protect, admin, getAdminOrders)
router.put('/admin/order/:id', protect, admin, updateOrderStatus)
router.put('/profile', protect, updateProfile)
router.put('/update-password', protect, updatePassword)
router.get('/admin/revenue', protect, admin, revenueOverview)
router.get('/admin/quick-stats', protect, admin, getQuickStats)
router.get('/admin/all-users', protect, admin, getAllUsers)

export default router
