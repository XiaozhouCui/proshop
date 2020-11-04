import express from 'express'
const router = express.Router()
import {
  authUsers,
  registerUser,
  getUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUsers)
router.route('/profile').get(protect, getUserProfile)

export default router
