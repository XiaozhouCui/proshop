import express from 'express'
const router = express.Router()
import {
  authUsers,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUsers)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
