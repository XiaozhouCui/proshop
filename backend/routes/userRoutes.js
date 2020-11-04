import express from 'express'
const router = express.Router()
import { authUsers, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/login', authUsers)
router.route('/profile').get(protect, getUserProfile)

export default router
